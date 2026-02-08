const Producto = require('../models/producto.model');

const listar = async (req, res) => {
  const productos = await Producto.obtenerProductos();
  res.json(productos);
};

module.exports = { listar };
