const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Bienestar Total funcionando' });
});

module.exports = app;
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);
