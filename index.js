require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Jalur depan biar browser seneng
app.get('/', (req, res) => {
    res.json({ pesan: "Halo! Ini adalah API Cek Ongkir. Server Vercel jalan aman!" });
});

app.post('/api/ongkir', async (req, res) => {
    try {
        const { asal, tujuan, berat, kurir } = req.body;

        const response = await axios.post('https://api.rajaongkir.com/starter/cost', {
            origin: asal,
            destination: tujuan,
            weight: berat,
            courier: kurir
        }, {
            headers: { 'key': process.env.API_KEY_RAJAONGKIR }
        });

        const dataOngkir = response.data.rajaongkir.results[0];
        
        res.json({
            status: "sukses",
            kurir: dataOngkir.name,
            layanan: dataOngkir.costs
        });

    } catch (error) {
        // INI YANG DIUBAH: Biar error aslinya dikirim ke Postman
        const errorAsli = error.response ? error.response.data : error.message;
        console.error("Error Detail:", errorAsli); // Ini biar masuk log Vercel

        res.status(500).json({ 
            error: "Gagal minta data ke RajaOngkir",
            penyebab: errorAsli // Postman lu bakal nampilin ini
        });
    }
});

app.listen(3000, () => console.log("Server jalan..."));