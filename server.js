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

app.put('/items/:id', (req, res) => { 
  const { id } = req.params; // Ambil ID dari parameter URL 
  const { name, value } = req.body; // Ambil data dari body request 
 
  if (!name || !value) { 
    return res.status(400).json({ message: 'Name and Value are required' }); 
  } 
 
  // Query SQL untuk memperbarui data 
  const query = 'UPDATE items SET name = ?, value = ? WHERE id =?';
  db.query(query, [name, value, id], (err, result) => { 
    if (err) { 
      console.error('Error updating data: ', err); 
      return res.status(500).json({ message: 'Database error' }); 
    } 
 
    if (result.affectedRows === 0) { 
      return res.status(404).json({ message: `Item with ID ${id} not found` }); 
    } 
 
    res.status(200).json({ message: `Item with ID ${id} updated successfully` }); 
  }); 
}); 

// CREATE Users
app.put('/users/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { name, email } = req.body; // Ambil data dari body request

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  // Query SQL untuk memperbarui data
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, id], (err, result) => {
    if (err) {
      console.error('Error updating user: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    res.status(200).json({ message: `User with ID ${id} updated successfully` });
  });
});

//CREATE LUBANG JALAN
app.put('/jenis-lubang/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { jenis, deskripsi } = req.body; // Ambil data dari body request

  if (!jenis || !deskripsi) {
    return res.status(400).json({ message: 'Jenis and Deskripsi are required' });
  }

  // Query SQL untuk memperbarui data
  const query = 'UPDATE jenis_lubang SET jenis = ?, deskripsi = ? WHERE id = ?';
  db.query(query, [jenis, deskripsi, id], (err, result) => {
    if (err) {
      console.error('Error updating jenis lubang: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Jenis Lubang with ID ${id} not found` });
    }

    res.status(200).json({ message: `Jenis Lubang with ID ${id} updated successfully` });
  });
});


//CREATE PELAPORAN
app.put('/pelaporan/:id', (req, res) => {
  const { id } = req.params; // Ambil ID dari parameter URL
  const { nama_pelapor, jenis_lubang, lokasi, deskripsi } = req.body; // Ambil data dari body request

  if (!nama_pelapor || !jenis_lubang || !lokasi || !deskripsi) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Query SQL untuk memperbarui data
  const query = 'UPDATE pelaporan SET nama_pelapor = ?, jenis_lubang = ?, lokasi = ?, deskripsi = ? WHERE id = ?';
  db.query(query, [nama_pelapor, jenis_lubang, lokasi, deskripsi, id], (err, result) => {
    if (err) {
      console.error('Error updating pelaporan: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Pelaporan with ID ${id} not found` });
    }

    res.status(200).json({ message: `Pelaporan with ID ${id} updated successfully` });
  });
});

// DELETE route untuk menghapus data berdasarkan ID 
app.delete('/items/:id', (req, res) => { 
  const { id } = req.params; // Ambil ID dari parameter URL 
 
  // Query SQL untuk menghapus data 
  const query = 'DELETE FROM items WHERE id = ?'; 
  db.query(query, [id], (err, result) => { 
    if (err) { 
      console.error('Error deleting data: ', err); 
      return res.status(500).json({ message: 'Database error' }); 
      5 
    } 
 
    if (result.affectedRows === 0) { 
      return res.status(404).json({ message: `Item with ID ${id} not found` }); 
    } 
 
    res.status(200).json({ message: `Item with ID ${id} deleted successfully` }); 
  }); 
}); 
 
// DELETE route untuk menghapus data dari tabel users berdasarkan ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  });
});

// DELETE route untuk menghapus data dari tabel jenis_lubang berdasarkan ID
app.delete('/jenis-lubang/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM jenis_lubang WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting jenis lubang: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Jenis Lubang with ID ${id} not found` });
    }

    res.status(200).json({ message: `Jenis Lubang with ID ${id} deleted successfully` });
  });
});

// DELETE route untuk menghapus data dari tabel pelaporan berdasarkan ID
app.delete('/pelaporan/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM pelaporan WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting laporan: ', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Laporan with ID ${id} not found` });
    }

    res.status(200).json({ message: `Laporan with ID ${id} deleted successfully` });
  });
});
