const mysql = require('mysql'); 
 
// Buat koneksi ke database 
const db = mysql.createConnection({ 
  host: 'localhost', // Ganti sesuai konfigurasi Anda 
  user: 'root', // Username database Anda 
  password: '', // Password database Anda 
  database: 'percobaan1', // Nama database Anda 
}); 
 
// Cek koneksi 
db.connect((err) => { 
  if (err) { 
    console.error('Database connection failed: ', 
err.stack); 
    return; 
  } 
  console.log('Connected to database'); 
}); 
 
module.exports = db;