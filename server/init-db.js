import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Connecting to NeonDB...');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users_projects (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        country VARCHAR(100),
        ia_used VARCHAR(255),
        knows_a2a BOOLEAN,
        project_reason TEXT,
        terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
        project_api_key VARCHAR(255) UNIQUE,
        password_hash TEXT,
        email_verified_at TIMESTAMP WITH TIME ZONE,
        last_login_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`ALTER TABLE users_projects ADD COLUMN IF NOT EXISTS password_hash TEXT;`);
    await pool.query(`ALTER TABLE users_projects ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMP WITH TIME ZONE;`);
    await pool.query(`ALTER TABLE users_projects ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS licenses (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users_projects(id) ON DELETE CASCADE,
        product VARCHAR(120) NOT NULL,
        license_key VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(40) NOT NULL DEFAULT 'active',
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        plan VARCHAR(80) NOT NULL DEFAULT 'pro',
        issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE,
        revoked_at TIMESTAMP WITH TIME ZONE,
        last_validated_at TIMESTAMP WITH TIME ZONE,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_product UNIQUE (user_id, product)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS license_validations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        license_id UUID REFERENCES licenses(id) ON DELETE SET NULL,
        product VARCHAR(120),
        source VARCHAR(120),
        machine_id VARCHAR(255),
        app_version VARCHAR(80),
        request_payload_json JSONB,
        result_status VARCHAR(40) NOT NULL,
        message TEXT,
        validated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS license_events (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
        event_type VARCHAR(80) NOT NULL,
        detail_json JSONB,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS auth_otp_challenges (
        id VARCHAR(64) PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users_projects(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        otp_hash TEXT NOT NULL,
        purpose VARCHAR(40) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        consumed_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS auth_sessions (
        id VARCHAR(64) PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users_projects(id) ON DELETE CASCADE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_seen_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`CREATE INDEX IF NOT EXISTS idx_licenses_license_key ON licenses(license_key);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_license_validations_license_id ON license_validations(license_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_auth_otp_user_id ON auth_otp_challenges(user_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_auth_sessions_user_id ON auth_sessions(user_id);`);

    console.log('Database schema successfully created or confirmed.');
    process.exit(0);
  } catch (err) {
    console.error('Database connection/init error:', err);
    process.exit(1);
  }
}

createTables();

