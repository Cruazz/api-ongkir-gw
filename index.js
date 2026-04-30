const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ pesan: "Halo! Server API Cek Ongkir siap melayani RapidAPI!" });
});

app.post('/api/ongkir', (req, res) => {
    // Kita tangkap permintaan dari pembeli di RapidAPI
    const { asal, tujuan, berat, kurir } = req.body;

    // Kita tembak pakai data buatan kita sendiri (sementara)
    res.json({
        status: "sukses",
        pesan: "Ini data contoh. API siap dihubungkan ke provider asli.",
        data_request: { asal, tujuan, berat, kurir },
        hasil: {
            kurir: kurir.toUpperCase(),
            layanan: [
                { service: "REG", harga: 15000, estimasi: "2-3 Hari" },
                { service: "YES", harga: 25000, estimasi: "1 Hari" }
            ]
        }
    });
});

app.listen(3000, () => console.log("Server jalan..."));