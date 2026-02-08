const pool = require('../config/db');

const agregarProducto = async (usuario_id, producto_id, cantidad) => {
  const [rows] = await pool.execute(
    'SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?',
    [usuario_id, producto_id]
  );

  if (rows.length > 0) {
    return pool.execute(
      'UPDATE carrito SET cantidad = cantidad + ? WHERE id = ?',
      [cantidad, rows[0].id]
    );
  } else {
    return pool.execute(
      'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
      [usuario_id, producto_id, cantidad]
    );
  }
};

const obtenerCarrito = async (usuario_id) => {
  const [rows] = await pool.execute(
    `SELECT c.id, p.nombre, p.precio, c.cantidad,
            (p.precio * c.cantidad) AS subtotal
     FROM carrito c
     JOIN productos p ON c.producto_id = p.id
     WHERE c.usuario_id = ?`,
    [usuario_id]
  );
  return rows;
};

const eliminarProducto = async (id) => {
  return pool.execute('DELETE FROM carrito WHERE id = ?', [id]);
};

module.exports = {
  agregarProducto,
  obtenerCarrito,
  eliminarProducto
};
