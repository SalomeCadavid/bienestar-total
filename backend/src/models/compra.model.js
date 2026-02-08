const pool = require('../config/db');

const crearCompra = async (usuario_id, total) => {
  const [result] = await pool.execute(
    'INSERT INTO compras (usuario_id, total, fecha) VALUES (?, ?, NOW())',
    [usuario_id, total]
  );
  return result.insertId;
};

const obtenerCarrito = async (usuario_id) => {
  const [rows] = await pool.execute(
    `SELECT c.producto_id, c.cantidad, p.precio, p.stock
     FROM carrito c
     JOIN productos p ON c.producto_id = p.id
     WHERE c.usuario_id = ?`,
    [usuario_id]
  );
  return rows;
};

const crearDetalle = async (compra_id, producto_id, cantidad, precio) => {
  await pool.execute(
    `INSERT INTO detalle_compra 
     (compra_id, producto_id, cantidad, precio_unitario)
     VALUES (?, ?, ?, ?)`,
    [compra_id, producto_id, cantidad, precio]
  );
};

const descontarStock = async (producto_id, cantidad) => {
  await pool.execute(
    'UPDATE productos SET stock = stock - ? WHERE id = ?',
    [cantidad, producto_id]
  );
};

const vaciarCarrito = async (usuario_id) => {
  await pool.execute(
    'DELETE FROM carrito WHERE usuario_id = ?',
    [usuario_id]
  );
};

module.exports = {
  crearCompra,
  obtenerCarrito,
  crearDetalle,
  descontarStock,
  vaciarCarrito
};
