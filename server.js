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

// 1. Create User
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) {
      console.error('Error inserting user: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: { id: result.insertId, name, email },
    });
  });
});

// POST route untuk menambahkan Jenis Lubang baru
app.post('/jenis-lubang', (req, res) => {
  const { jenis, deskripsi } = req.body;

  if (!jenis || !deskripsi) {
    return res.status(400).json({ message: 'Jenis and Deskripsi are required' });
  }

  const query = 'INSERT INTO jenis_lubang (jenis, deskripsi) VALUES (?, ?)';
  db.query(query, [jenis, deskripsi], (err, result) => {
    if (err) {
      console.error('Error inserting jenis lubang: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({
      message: 'Jenis Lubang created successfully',
      jenisLubang: { id: result.insertId, jenis, deskripsi },
    });
  });
});


// POST route untuk membuat laporan
app.post('/pelaporan', (req, res) => {
  const { nama_pelapor, jenis_lubang, lokasi, deskripsi } = req.body;

  // Validasi input
  if (!nama_pelapor || !jenis_lubang || !lokasi || !deskripsi) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Query SQL untuk insert data
  const query = 'INSERT INTO pelaporan (nama_pelapor, jenis_lubang, lokasi, deskripsi) VALUES (?, ?, ?, ?)';
  db.query(query, [nama_pelapor, jenis_lubang, lokasi, deskripsi], (err, result) => {
    if (err) {
      console.error('Error inserting laporan: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({
      message: 'Laporan created successfully',
      laporan: { 
        id: result.insertId, 
        nama_pelapor, 
        jenis_lubang, 
        lokasi, 
        deskripsi 
      },
    });
  });
});

// GET route untuk mengambil semua data dari tabel users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(results);
  });
});

// GET route untuk mengambil semua data dari tabel jenis_lubang
app.get('/jenis-lubang', (req, res) => {
  const query = 'SELECT * FROM jenis_lubang';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching jenis lubang: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(results);
  });
});

// GET route untuk mengambil semua data dari tabel pelaporan
app.get('/pelaporan', (req, res) => {
  const query = 'SELECT * FROM pelaporan';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pelaporan: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(200).json(results);
  });
});

