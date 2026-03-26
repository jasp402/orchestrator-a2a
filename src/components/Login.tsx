import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyRound, ShieldAlert } from 'lucide-react';
import { TurnstileWidget } from './TurnstileWidget';

type PendingChallenge = {
  challengeId: string;
  email: string;
};

type AuthMode = 'login' | 'otp' | 'forgot' | 'reset';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialChallenge = (location.state as { pendingChallenge?: PendingChallenge } | null)?.pendingChallenge ?? null;
  const [email, setEmail] = useState(initialChallenge?.email || '');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pendingChallenge, setPendingChallenge] = useState<PendingChallenge | null>(initialChallenge);
  const [mode, setMode] = useState<AuthMode>(initialChallenge ? 'otp' : 'login');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const BASE_URL = useMemo(() => (import.meta.env.MODE === 'development' ? 'http://localhost:3005' : ''), []);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const resp = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, turnstileToken })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Authentication offline');
      setPendingChallenge({ challengeId: data.challengeId, email: data.email || email });
      setOtp('');
      setTurnstileToken('');
      setMode('otp');
      setMessage('We sent a one-time login code to your email.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingChallenge) return;
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const resp = await fetch(`${BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ challengeId: pendingChallenge.challengeId, otp })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'OTP verification failed');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const resp = await fetch(`${BASE_URL}/api/password-reset/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Could not start password reset');
      if (data.challengeId) {
        setPendingChallenge({ challengeId: data.challengeId, email: data.email || email });
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTurnstileToken('');
        setMode('reset');
      }
      setMessage(data.message || 'If the account exists, a recovery code has been sent.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingChallenge) return;
    if (newPassword.length < 8) {
      setError('The new password must contain at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('The new passwords do not match.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const resp = await fetch(`${BASE_URL}/api/password-reset/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: pendingChallenge.challengeId, otp, newPassword })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Password reset failed');
      setPendingChallenge(null);
      setPassword('');
      setOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTurnstileToken('');
      setMode('login');
      setMessage(data.message || 'Password updated successfully.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetToLogin = () => {
    setPendingChallenge(null);
    setOtp('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTurnstileToken('');
    setError('');
    setMessage('');
    setMode('login');
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-outline-variant/30 shadow-2xl">
        <div className="flex justify-between items-start mb-6 w-full">
          <button type="button" onClick={() => navigate('/')} className="text-on-surface-variant hover:text-primary text-xs font-label uppercase tracking-widest transition-colors border border-outline/30 px-3 py-1 rounded">
            Back Home
          </button>
          <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center bg-primary/10">
            <KeyRound className="text-primary" size={18} />
          </div>
          <div className="w-[74px]" />
        </div>

        <h2 className="font-headline text-3xl font-bold text-center mb-2">Authentication</h2>
        <p className="text-on-surface-variant text-center font-label uppercase tracking-widest text-xs mb-8">
          {mode === 'reset' ? 'Recover password' : pendingChallenge ? 'Verify email OTP' : 'Email, password and OTP'}
        </p>

        {error && (
          <div className="bg-error/10 border border-error/50 text-error p-3 rounded mb-6 text-sm flex gap-2">
            <ShieldAlert size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="bg-primary/10 border border-primary/30 text-on-surface p-3 rounded mb-6 text-sm">
            {message}
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Registered Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                placeholder="operator@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              />
            </div>

            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                placeholder="Your secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setTurnstileToken} />

            <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-on-primary font-bold uppercase font-label tracking-widest rounded hover:brightness-110 disabled:opacity-50 transition-all">
              {loading ? 'Sending OTP...' : 'Continue to OTP'}
            </button>

            <button type="button" onClick={() => { setError(''); setMessage(''); setTurnstileToken(''); setMode('forgot'); }} className="w-full text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </form>
        )}

        {mode === 'otp' && pendingChallenge && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-on-surface-variant">
              We sent a one-time code to <span className="font-bold text-on-surface">{pendingChallenge.email}</span>. Enter it below to open your panel.
            </div>

            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">OTP Code</label>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={6}
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none tracking-[0.5em] text-center text-xl"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={resetToLogin} className="flex-1 py-4 border border-outline/30 rounded text-on-surface hover:bg-surface-container uppercase font-label text-sm tracking-widest">
                Back
              </button>
              <button type="submit" disabled={loading || otp.length !== 6} className="flex-1 py-4 bg-primary text-on-primary font-bold uppercase font-label tracking-widest rounded hover:brightness-110 disabled:opacity-50 transition-all">
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleRequestPasswordReset} className="space-y-6">
            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Registered Email Address</label>
              <input
                type="email"
                required
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                placeholder="operator@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
              />
            </div>

            <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setTurnstileToken} />

            <div className="flex gap-3">
              <button type="button" onClick={resetToLogin} className="flex-1 py-4 border border-outline/30 rounded text-on-surface hover:bg-surface-container uppercase font-label text-sm tracking-widest">
                Back
              </button>
              <button type="submit" disabled={loading} className="flex-1 py-4 bg-primary text-on-primary font-bold uppercase font-label tracking-widest rounded hover:brightness-110 disabled:opacity-50 transition-all">
                {loading ? 'Sending code...' : 'Send recovery code'}
              </button>
            </div>
          </form>
        )}

        {mode === 'reset' && pendingChallenge && (
          <form onSubmit={handleConfirmPasswordReset} className="space-y-6">
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-on-surface-variant">
              Enter the recovery code sent to <span className="font-bold text-on-surface">{pendingChallenge.email}</span> and choose a new password.
            </div>

            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Recovery OTP</label>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={6}
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none tracking-[0.5em] text-center text-xl"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>

            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-label uppercase text-on-surface-variant mb-2">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full bg-surface-container border border-outline/30 rounded p-3 text-on-surface focus:border-primary outline-none"
                placeholder="Repeat new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={resetToLogin} className="flex-1 py-4 border border-outline/30 rounded text-on-surface hover:bg-surface-container uppercase font-label text-sm tracking-widest">
                Cancel
              </button>
              <button type="submit" disabled={loading || otp.length !== 6} className="flex-1 py-4 bg-primary text-on-primary font-bold uppercase font-label tracking-widest rounded hover:brightness-110 disabled:opacity-50 transition-all">
                {loading ? 'Updating...' : 'Reset password'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-on-surface-variant">
          Need access first? <button onClick={() => navigate('/onboarding')} className="text-primary hover:underline font-bold">Start onboarding</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
