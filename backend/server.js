const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'portfolio_user',
  password: process.env.DB_PASS || 'portfolio_pass',
  database: process.env.DB_NAME || 'portfolio'
});

app.get('/api/elementos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM elementos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.listen(3001, () => console.log('API running on port 3001'));