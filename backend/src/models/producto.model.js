const pool = require('../config/db');

const obtenerProductos = async () => {
  const [rows] = await pool.execute('SELECT * FROM productos');
  return rows;
};

module.exports = { obtenerProductos };
