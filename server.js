const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Import database connection

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint for each query
app.get('/favorites', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM favorites');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /favorites endpoint:', err.message);
    res.status(500).send('Error fetching favorites');
  }
});

app.get('/menuitems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menuitem');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /menuitems endpoint:', err.message);
    res.status(500).send('Error fetching menu items');
  }
});

app.get('/operatinghours', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM operatinghours');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /operatinghours endpoint:', err.message);
    res.status(500).send('Error fetching operating hours');
  }
});

app.get('/restaurants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /restaurants endpoint:', err.message);
    res.status(500).send('Error fetching restaurants');
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /users endpoint:', err.message);
    res.status(500).send('Error fetching users');
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
