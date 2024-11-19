const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import konfigurasi database

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// POST route untuk membuat item baru
app.post('/items', (req, res) => {
  const { name, value } = req.body;

  // Validasi input
  if (!name || !value) {
    return res.status(400).json({ message: 'Name and Value are required' });
  }

  // Query SQL untuk insert data
  const query = 'INSERT INTO items (name, value) VALUES (?, ?)';
  db.query(query, [name, value], (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({
      message: 'Item created successfully',
      item: { id: result.insertId, name, value },
    });
  });
});
