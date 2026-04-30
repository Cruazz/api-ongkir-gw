require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

// Biar API kita bisa nerima format JSON
app.use(express.json()); 

// Endpoint Cek Ongkir Kita
app.post('/api/ongkir', async (req, res) => {
    try {
        // 1. Terima data dari user (dari RapidAPI nanti)
        const { asal, tujuan, berat, kurir } = req.body;

        // 2. Kita teruskan pertanyaannya ke RajaOngkir (Kita jadi Makelar)
        const response = await axios.post('https://api.rajaongkir.com/starter/cost', {
            origin: asal,
            destination: tujuan,
            weight: berat,
            courier: kurir
        }, {
            headers: { 'key': process.env.API_KEY_RAJAONGKIR } // <- MASUKKAN API KEY KAMU
        });

        // 3. Ambil hasil dari RajaOngkir, rapikan, kirim ke user kita
        const dataOngkir = response.data.rajaongkir.results[0];
        
        res.json({
            status: "sukses",
            kurir: dataOngkir.name,
            layanan: dataOngkir.costs
        });

    } catch (error) {
        res.status(500).json({ error: "Waduh, ada yang salah nih" });
    }
});

app.listen(3000, () => console.log("Server jalan..."));