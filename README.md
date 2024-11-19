

---

# Back-End Penugasan dengan Express.js

Proyek ini adalah implementasi sederhana dari backend menggunakan **Express.js**. Proyek ini bertujuan untuk membantu memahami dasar-dasar REST API, termasuk pengolahan data dengan database menggunakan MySQL.

## 📂 Struktur Proyek
```
├── db.js             # Konfigurasi database
├── server.js         # File utama aplikasi Express.js
├── package.json      # Konfigurasi npm untuk dependensi
└── README.md         # Dokumentasi proyek
```

## 🛠️ Fitur
- **CRUD Operations**:
  - Create: Menambahkan data baru ke database.
  - Read: Mendapatkan data dari database.
  - Update: Memperbarui data yang ada.
  - Delete: Menghapus data dari database.
- Validasi input menggunakan middleware.
- Terintegrasi dengan MySQL sebagai database.

## 📋 Persyaratan
Sebelum menjalankan proyek ini, pastikan Anda telah menginstal perangkat berikut:
- **Node.js** (v14 atau lebih baru)
- **npm** (tersedia dengan Node.js)
- **MySQL** (untuk database)

## 🚀 Cara Menjalankan
1. **Clone repository**:
   ```bash
   git clone https://github.com/username/project-name.git
   cd project-name
   ```

2. **Instal dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi database**:
   Edit file `db.js` dan sesuaikan dengan informasi database Anda:
   ```javascript
   const mysql = require('mysql');

   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'nama_database',
   });
   ```

4. **Jalankan server**:
   ```bash
   node server.js
   ```

5. **Akses server**:
   Buka browser atau Postman, lalu akses `http://localhost:3000`.

## 🛠️ Endpoint API
| Method | Endpoint        | Deskripsi                   |
|--------|-----------------|-----------------------------|
| POST   | `/items`        | Membuat item baru           |
| GET    | `/items`        | Mendapatkan semua item      |
| GET    | `/items/:id`    | Mendapatkan item berdasarkan ID |
| PUT    | `/items/:id`    | Memperbarui item berdasarkan ID |
| DELETE | `/items/:id`    | Menghapus item berdasarkan ID |

### Contoh Payload (POST `/items`)
```json
{
  "name": "Contoh Item",
  "value": 100
}
```

## 🛠️ Dependensi
Proyek ini menggunakan beberapa dependensi:
- **express**: Framework untuk membangun server Node.js.
- **body-parser**: Middleware untuk parsing body request.
- **mysql**: Library untuk integrasi dengan database MySQL.

## 🧑‍💻 Kontribusi
Silakan buat Pull Request untuk menambahkan fitur baru atau memperbaiki bug.

---
