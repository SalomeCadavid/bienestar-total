const pool = require('../config/db');

const crearUsuario = async (usuario) => {
  const { nombre, email, password } = usuario;
  const [result] = await pool.execute(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password]
  );
  return result.insertId;
};

const obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0];
};

module.exports = {
  crearUsuario,
  obtenerUsuarioPorEmail
};
