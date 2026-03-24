import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("Connecting to NeonDB...");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTables() {
  try {
    console.log("Dropping existing table (if dev environment)...");
    // Depending on user preference this shouldn't drop in production, 
    // but useful for this first init task to ensure correct schema.
    // Uncomment next line if fresh schema needed:
    // await pool.query('DROP TABLE IF EXISTS users_projects CASCADE;');

    console.log("Creating users_projects table...");
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log("Table successfully created or confirmed!");
    process.exit(0);
  } catch (err) {
    console.error("Database connection/init error:", err);
    process.exit(1);
  }
}

createTables();
