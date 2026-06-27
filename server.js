const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Arahkan ke folder saat ini (tempat server.js berada)
app.use(express.static(__dirname));

// Database Sementara
let databaseTugas = [
    { id: 1, nama: "Tugas 1: PWA", status: "Selesai" }
];

// 1. Endpoint GET
app.get('/api/data', (req, res) => {
    res.json(databaseTugas);
});

// 2. Endpoint POST
app.post('/api/data', (req, res) => {
    const dataBaru = {
        id: Date.now(),
        nama: req.body.nama,
        status: "Belum Selesai"
    };
    databaseTugas.push(dataBaru);
    res.status(201).json(dataBaru);
});

// 3. Endpoint DELETE
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    databaseTugas = databaseTugas.filter(t => t.id !== id);
    res.status(200).json({ message: "Data dihapus!" });
});

// Rute utama (cari index.html di folder yang sama)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gunakan port dari environment (untuk Railway/Vercel) atau 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));