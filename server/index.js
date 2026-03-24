import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the root .env file from the parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post('/api/register', async (req, res) => {
  const { email, country, ia_used, knows_a2a, project_reason } = req.body;
  
  if (!email || !country || !ia_used) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const query = `
      INSERT INTO users_projects (email, country, ia_used, knows_a2a, project_reason, terms_accepted)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email
    `;
    const values = [email, country, ia_used, knows_a2a === 'Yes', project_reason, true];
    
    const result = await pool.query(query, values);
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Registration error:', error);
    // If user exists error (constraint violation)
    if (error.code === '23505') {
       return res.status(409).json({ error: 'Email already registered. Proceed to Login.' });
    }
    res.status(500).json({ error: 'Database error occurred' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const result = await pool.query('SELECT id, email, project_api_key FROM users_projects WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

app.post('/api/generate-key', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'User ID required' });

  // Simple Key Generator
  const newApiKey = 'AIT_' + Math.random().toString(36).substring(2, 15).toUpperCase() + 
                    Math.random().toString(36).substring(2, 15).toUpperCase();

  try {
    const query = 'UPDATE users_projects SET project_api_key = $1 WHERE id = $2 RETURNING id, email, project_api_key';
    const result = await pool.query(query, [newApiKey, userId]);
    if (result.rows.length === 0) {
       return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, apiKey: result.rows[0].project_api_key });
  } catch (error) {
    console.error('Token gen error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`[AITENETIA-CORE] Backend running on http://localhost:${PORT}`);
  });
}

// Export for Vercel Serverless
export default app;
