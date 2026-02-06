const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const imcRoutes = require('./routes/imc.routes');



const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Bienestar Total funcionando 🚀' });
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a MySQL correctamente 🐬');
    connection.release();
  } catch (error) {
    console.error('Error conectando a MySQL ❌', error.message);
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/imc', imcRoutes);
app.use('/api/suscripciones', require('./routes/suscripcion.routes'));


