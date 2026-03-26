import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const PRODUCT_CODE = 'AITENETIA';
const SESSION_COOKIE = 'ait_core_session';
const OTP_TTL_MINUTES = Number(process.env.OTP_TTL_MINUTES || 10);

function nowIso() {
  return new Date().toISOString();
}

function randomId(size = 24) {
  return crypto.randomBytes(size).toString('hex');
}

function generateLicenseKey() {
  const segments = Array.from({ length: 4 }, () => crypto.randomBytes(3).toString('hex').toUpperCase());
  return `AIT-${segments.join('-')}`;
}

function normalizeStatus(status) {
  const clean = String(status || 'active').trim().toLowerCase();
  return ['active', 'revoked', 'expired', 'suspended'].includes(clean) ? clean : 'active';
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').reduce((acc, pair) => {
    const [rawKey, ...rest] = pair.trim().split('=');
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join('=') || '');
    return acc;
  }, {});
}

function getSessionSecret() {
  return process.env.APP_SESSION_SECRET || process.env.AUTH_SESSION_SECRET || 'local-dev-session-secret-change-me';
}

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function signSessionToken(body) {
  return crypto.createHmac('sha256', getSessionSecret()).update(body).digest('base64url');
}

function createSessionCookie(sessionId) {
  const payload = JSON.stringify({ sid: sessionId, exp: Date.now() + 1000 * 60 * 60 * 24 * 30 });
  const body = base64url(payload);
  const sig = signSessionToken(body);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${encodeURIComponent(`${body}.${sig}`)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${secure}`;
}

function clearSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`;
}

function readSignedSession(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  if (signSessionToken(body) !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload?.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

async function hashSecret(value, salt = crypto.randomBytes(16).toString('hex')) {
  return await new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function verifySecret(value, storedHash) {
  const [salt, expectedHex] = String(storedHash || '').split(':');
  if (!salt || !expectedHex) return false;
  return await new Promise((resolve, reject) => {
    crypto.scrypt(value, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      const expected = Buffer.from(expectedHex, 'hex');
      resolve(expected.length === derivedKey.length && crypto.timingSafeEqual(expected, derivedKey));
    });
  });
}

function generateOtpCode() {
  return `${crypto.randomInt(0, 1000000)}`.padStart(6, '0');
}

async function sendOtpEmail(email, otpCode) {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (!resendApiKey || !resendFrom) {
    console.log(`[AUTH OTP] Email provider not configured. OTP for ${email}: ${otpCode}`);
    return { delivered: false, mode: 'console' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [email],
      subject: 'AITENETIA access code',
      html: `<div style="font-family:Arial,sans-serif;padding:24px"><h2>AITENETIA access code</h2><p>Your one-time verification code is:</p><div style="font-size:32px;font-weight:700;letter-spacing:8px;margin:16px 0">${otpCode}</div><p>This code expires in ${OTP_TTL_MINUTES} minutes.</p></div>`
    })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => 'Email delivery failed');
    throw new Error(`Failed to deliver OTP email: ${text}`);
  }

  return { delivered: true, mode: 'resend' };
}

async function verifyTurnstileToken(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { success: true, mode: 'disabled' };
  }
  if (!token) {
    return { success: false, error: 'Turnstile token is required.' };
  }

  const formData = new URLSearchParams();
  formData.set('secret', secret);
  formData.set('response', token);
  if (remoteIp) formData.set('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString()
  });
  const payload = await response.json().catch(() => null);
  return {
    success: Boolean(payload?.success),
    payload,
    error: payload?.['error-codes']?.join(', ') || 'Turnstile verification failed.'
  };
}

async function findUserById(userId) {
  const result = await pool.query(
    `SELECT id, email, country, ia_used, knows_a2a, project_reason, terms_accepted, project_api_key, password_hash, email_verified_at, created_at, last_login_at
     FROM users_projects WHERE id = $1`,
    [userId]
  );
  return result.rows[0] || null;
}

async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT id, email, country, ia_used, knows_a2a, project_reason, terms_accepted, project_api_key, password_hash, email_verified_at, created_at, last_login_at
     FROM users_projects WHERE email = $1`,
    [String(email || '').trim().toLowerCase()]
  );
  return result.rows[0] || null;
}

async function getLicenseByUserId(userId) {
  const result = await pool.query(
    `SELECT id, user_id, product, license_key, status, customer_name, customer_email, plan, issued_at, expires_at, revoked_at, last_validated_at, notes
     FROM licenses
     WHERE user_id = $1 AND product = $2
     ORDER BY issued_at DESC
     LIMIT 1`,
    [userId, PRODUCT_CODE]
  );
  return result.rows[0] || null;
}

async function getLicenseByKey(licenseKey) {
  const result = await pool.query(
    `SELECT id, user_id, product, license_key, status, customer_name, customer_email, plan, issued_at, expires_at, revoked_at, last_validated_at, notes
     FROM licenses
     WHERE license_key = $1
     LIMIT 1`,
    [licenseKey]
  );
  return result.rows[0] || null;
}

async function upsertLicenseForUser({ user, plan = 'pro', expiresAt = null, notes = null }) {
  const licenseKey = generateLicenseKey();
  const issuedAt = nowIso();
  const result = await pool.query(
    `INSERT INTO licenses (
      user_id, product, license_key, status, customer_name, customer_email, plan, issued_at, expires_at, notes
    ) VALUES ($1, $2, $3, 'active', $4, $5, $6, $7, $8, $9)
    ON CONFLICT (user_id, product)
    DO UPDATE SET
      license_key = EXCLUDED.license_key,
      status = 'active',
      customer_name = EXCLUDED.customer_name,
      customer_email = EXCLUDED.customer_email,
      plan = EXCLUDED.plan,
      issued_at = EXCLUDED.issued_at,
      expires_at = EXCLUDED.expires_at,
      revoked_at = NULL,
      notes = EXCLUDED.notes,
      updated_at = CURRENT_TIMESTAMP
    RETURNING id, user_id, product, license_key, status, customer_name, customer_email, plan, issued_at, expires_at, revoked_at, last_validated_at, notes`,
    [user.id, PRODUCT_CODE, licenseKey, user.email, user.email, plan, issuedAt, expiresAt, notes]
  );

  await pool.query('UPDATE users_projects SET project_api_key = $1 WHERE id = $2', [licenseKey, user.id]);
  await pool.query(
    `INSERT INTO license_events (license_id, event_type, detail_json, created_at)
     VALUES ($1, 'generated', $2::jsonb, $3)`,
    [result.rows[0].id, JSON.stringify({ plan, expiresAt }), issuedAt]
  );

  return result.rows[0];
}

async function logValidation(licenseId, payload, resultStatus, message) {
  await pool.query(
    `INSERT INTO license_validations (
      license_id, product, source, machine_id, app_version, request_payload_json, result_status, message, validated_at
    ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9)`,
    [licenseId, payload?.product || PRODUCT_CODE, payload?.source || 'unknown', payload?.machineId || null, payload?.version || null, JSON.stringify(payload || {}), resultStatus, message, nowIso()]
  );
}

async function createOtpChallenge({ userId, email, purpose }) {
  const otpCode = generateOtpCode();
  const otpHash = await hashSecret(otpCode);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString();
  const challengeId = randomId(18);
  await pool.query(
    `INSERT INTO auth_otp_challenges (id, user_id, email, otp_hash, purpose, expires_at, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [challengeId, userId, email, otpHash, purpose, expiresAt, nowIso()]
  );
  await sendOtpEmail(email, otpCode);
  return { challengeId, expiresAt };
}

async function consumeOtpChallenge(challengeId, otp, expectedPurpose) {
  const result = await pool.query(
    `SELECT id, user_id, email, otp_hash, purpose, expires_at, consumed_at FROM auth_otp_challenges WHERE id = $1`,
    [challengeId]
  );
  const challenge = result.rows[0];
  if (!challenge) return { ok: false, status: 404, error: 'OTP challenge not found.' };
  if (challenge.purpose !== expectedPurpose) return { ok: false, status: 400, error: 'OTP challenge purpose mismatch.' };
  if (challenge.consumed_at) return { ok: false, status: 410, error: 'OTP already used.' };
  if (new Date(challenge.expires_at).getTime() < Date.now()) return { ok: false, status: 410, error: 'OTP expired.' };

  const validOtp = await verifySecret(String(otp), challenge.otp_hash);
  if (!validOtp) return { ok: false, status: 401, error: 'Invalid OTP code.' };

  await pool.query('UPDATE auth_otp_challenges SET consumed_at = $1 WHERE id = $2', [nowIso(), challengeId]);
  return { ok: true, challenge };
}

async function createSessionForUser(userId) {
  const sessionId = randomId(24);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
  await pool.query(
    `INSERT INTO auth_sessions (id, user_id, expires_at, created_at, last_seen_at)
     VALUES ($1, $2, $3, $4, $5)`,
    [sessionId, userId, expiresAt, nowIso(), nowIso()]
  );
  await pool.query('UPDATE users_projects SET last_login_at = $1, email_verified_at = COALESCE(email_verified_at, $1) WHERE id = $2', [nowIso(), userId]);
  return sessionId;
}

async function getAuthenticatedUser(req) {
  const payload = readSignedSession(req);
  if (!payload?.sid) return null;
  const result = await pool.query(
    `SELECT s.id AS session_id, s.user_id, s.expires_at, u.email, u.country, u.ia_used, u.knows_a2a, u.project_reason, u.project_api_key, u.email_verified_at
     FROM auth_sessions s
     JOIN users_projects u ON u.id = s.user_id
     WHERE s.id = $1`,
    [payload.sid]
  );
  const row = result.rows[0];
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await pool.query('DELETE FROM auth_sessions WHERE id = $1', [payload.sid]);
    return null;
  }
  await pool.query('UPDATE auth_sessions SET last_seen_at = $1 WHERE id = $2', [nowIso(), payload.sid]);
  return row;
}

async function requireAuth(req, res, next) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    req.authUser = user;
    next();
  } catch (error) {
    next(error);
  }
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, service: 'orchestrator-a2a-license-server', product: PRODUCT_CODE });
  } catch (error) {
    console.error('Health error:', error);
    res.status(500).json({ ok: false, error: 'Database unavailable' });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, password, country, ia_used, knows_a2a, project_reason, turnstileToken } = req.body;
  if (!email || !password || !country || !ia_used) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
  }

  try {
    const turnstile = await verifyTurnstileToken(turnstileToken, req.ip);
    if (!turnstile.success) {
      return res.status(400).json({ error: turnstile.error });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const passwordHash = await hashSecret(String(password));
    const query = `
      INSERT INTO users_projects (email, country, ia_used, knows_a2a, project_reason, terms_accepted, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email
    `;
    const values = [normalizedEmail, country, ia_used, knows_a2a === 'Yes', project_reason, true, passwordHash];
    const result = await pool.query(query, values);
    const user = result.rows[0];
    const challenge = await createOtpChallenge({ userId: user.id, email: user.email, purpose: 'register' });
    res.json({ success: true, challengeId: challenge.challengeId, email: user.email, nextStep: 'verify_otp' });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already registered. Proceed to Login.' });
    }
    res.status(500).json({ error: 'Database error occurred' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password, turnstileToken } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });

  try {
    const turnstile = await verifyTurnstileToken(turnstileToken, req.ip);
    if (!turnstile.success) {
      return res.status(400).json({ error: turnstile.error });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }
    const validPassword = await verifySecret(String(password), user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const challenge = await createOtpChallenge({ userId: user.id, email: user.email, purpose: 'login' });
    res.json({ success: true, challengeId: challenge.challengeId, email: user.email, nextStep: 'verify_otp' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

app.post('/api/verify-otp', async (req, res) => {
  const { challengeId, otp } = req.body;
  if (!challengeId || !otp) {
    return res.status(400).json({ error: 'Challenge ID and OTP are required.' });
  }

  try {
    const otpResult = await consumeOtpChallenge(challengeId, otp, 'login');
    if (!otpResult.ok) return res.status(otpResult.status).json({ error: otpResult.error });
    const { challenge } = otpResult;
    const sessionId = await createSessionForUser(challenge.user_id);
    const user = await findUserById(challenge.user_id);
    const license = await getLicenseByUserId(challenge.user_id);

    res.setHeader('Set-Cookie', createSessionCookie(sessionId));
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        license: license
          ? {
              id: license.id,
              key: license.license_key,
              status: license.status,
              plan: license.plan,
              expires_at: license.expires_at,
              last_validated_at: license.last_validated_at
            }
          : null
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'OTP verification failed.' });
  }
});

app.post('/api/password-reset/request', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const turnstileToken = req.body?.turnstileToken;
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const turnstile = await verifyTurnstileToken(turnstileToken, req.ip);
    if (!turnstile.success) {
      return res.status(400).json({ error: turnstile.error });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.json({ success: true, message: 'If the account exists, a recovery code has been sent.' });
    }
    const challenge = await createOtpChallenge({ userId: user.id, email: user.email, purpose: 'password_reset' });
    return res.json({
      success: true,
      challengeId: challenge.challengeId,
      email: user.email,
      message: 'If the account exists, a recovery code has been sent.'
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({ error: 'Could not start password reset.' });
  }
});

app.post('/api/password-reset/confirm', async (req, res) => {
  const { challengeId, otp, newPassword } = req.body;
  if (!challengeId || !otp || !newPassword) {
    return res.status(400).json({ error: 'Challenge ID, OTP and new password are required.' });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
  }

  try {
    const otpResult = await consumeOtpChallenge(challengeId, otp, 'password_reset');
    if (!otpResult.ok) return res.status(otpResult.status).json({ error: otpResult.error });
    const { challenge } = otpResult;
    const passwordHash = await hashSecret(String(newPassword));
    await pool.query('UPDATE users_projects SET password_hash = $1 WHERE id = $2', [passwordHash, challenge.user_id]);
    await pool.query('DELETE FROM auth_sessions WHERE user_id = $1', [challenge.user_id]);

    return res.json({ success: true, message: 'Password updated. You can now log in with the new password.' });
  } catch (error) {
    console.error('Password reset confirm error:', error);
    return res.status(500).json({ error: 'Could not reset password.' });
  }
});

app.get('/api/session', async (req, res) => {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return res.status(401).json({ authenticated: false });
    }
    const license = await getLicenseByUserId(authUser.user_id);
    res.json({
      authenticated: true,
      user: {
        id: authUser.user_id,
        email: authUser.email,
        country: authUser.country,
        ia_used: authUser.ia_used,
        knows_a2a: authUser.knows_a2a,
        project_reason: authUser.project_reason,
        project_api_key: authUser.project_api_key,
        email_verified_at: authUser.email_verified_at,
        license: license
          ? {
              id: license.id,
              key: license.license_key,
              status: license.status,
              plan: license.plan,
              expires_at: license.expires_at,
              last_validated_at: license.last_validated_at
            }
          : null
      }
    });
  } catch (error) {
    console.error('Session read error:', error);
    res.status(500).json({ authenticated: false, error: 'Session unavailable.' });
  }
});

app.post('/api/logout', async (req, res) => {
  try {
    const payload = readSignedSession(req);
    if (payload?.sid) {
      await pool.query('DELETE FROM auth_sessions WHERE id = $1', [payload.sid]);
    }
    res.setHeader('Set-Cookie', clearSessionCookie());
    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed.' });
  }
});

app.post('/api/generate-key', requireAuth, async (req, res) => {
  const { plan, expiresAt, notes } = req.body;

  try {
    const user = await findUserById(req.authUser.user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const license = await upsertLicenseForUser({ user, plan, expiresAt, notes });
    res.json({
      success: true,
      apiKey: license.license_key,
      license: {
        id: license.id,
        key: license.license_key,
        status: license.status,
        plan: license.plan,
        expiresAt: license.expires_at,
        issuedAt: license.issued_at
      }
    });
  } catch (error) {
    console.error('Token gen error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.post('/api/licenses/validate', async (req, res) => {
  const activationKey = String(req.body?.activationKey || '').trim();
  const expectedSecret = process.env.LICENSE_WEBHOOK_SECRET?.trim();
  const providedSecret = req.headers['x-license-webhook-secret'];

  if (expectedSecret && providedSecret !== expectedSecret) {
    return res.status(401).json({ valid: false, message: 'Unauthorized license validation request.' });
  }
  if (!activationKey) {
    return res.status(400).json({ valid: false, message: 'Activation key is required.' });
  }

  try {
    const license = await getLicenseByKey(activationKey);
    if (!license) {
      await logValidation(null, req.body, 'rejected', 'License not found');
      return res.status(404).json({ valid: false, message: 'License not found.' });
    }

    const status = normalizeStatus(license.status);
    const now = Date.now();
    const expiresAt = license.expires_at ? new Date(license.expires_at).getTime() : null;

    if (status !== 'active') {
      await logValidation(license.id, req.body, status, `License ${status}.`);
      return res.status(403).json({ valid: false, message: `License ${status}.` });
    }

    if (expiresAt && expiresAt < now) {
      await pool.query('UPDATE licenses SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', ['expired', license.id]);
      await logValidation(license.id, req.body, 'expired', 'License expired.');
      return res.status(403).json({ valid: false, message: 'License expired.' });
    }

    const validatedAt = nowIso();
    await pool.query('UPDATE licenses SET last_validated_at = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [validatedAt, license.id]);
    await logValidation(license.id, req.body, 'approved', 'Activation approved.');

    return res.json({
      valid: true,
      licenseId: license.id,
      customerName: license.customer_name || license.customer_email || 'Operator',
      customerEmail: license.customer_email,
      plan: license.plan,
      status: 'active',
      expiresAt: license.expires_at,
      message: 'Activation approved.'
    });
  } catch (error) {
    console.error('License validation error:', error);
    res.status(500).json({ valid: false, message: 'License validation failed.' });
  }
});

app.post('/api/licenses/revoke', requireAuth, async (req, res) => {
  const licenseKey = String(req.body?.licenseKey || '').trim();
  if (!licenseKey) {
    return res.status(400).json({ success: false, error: 'License key required.' });
  }

  try {
    const license = await getLicenseByKey(licenseKey);
    if (!license || license.user_id !== req.authUser.user_id) {
      return res.status(404).json({ success: false, error: 'License not found.' });
    }

    const revokedAt = nowIso();
    await pool.query('UPDATE licenses SET status = $1, revoked_at = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3', ['revoked', revokedAt, license.id]);
    await pool.query(
      `INSERT INTO license_events (license_id, event_type, detail_json, created_at)
       VALUES ($1, 'revoked', $2::jsonb, $3)`,
      [license.id, JSON.stringify({ reason: req.body?.reason || null }), revokedAt]
    );

    res.json({ success: true, licenseId: license.id, status: 'revoked', revokedAt });
  } catch (error) {
    console.error('License revoke error:', error);
    res.status(500).json({ success: false, error: 'Failed to revoke license.' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`[AITENETIA-CORE] Backend running on http://localhost:${PORT}`);
  });
}

export default app;

