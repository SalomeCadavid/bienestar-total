const CarritoModel = require('../models/carrito.model');

const agregar = async (usuario_id, producto_id, cantidad) => {
  if (cantidad <= 0) throw new Error('Cantidad inválida');
  return CarritoModel.agregarProducto(usuario_id, producto_id, cantidad);
};

const listar = async (usuario_id) => {
  return CarritoModel.obtenerCarrito(usuario_id);
};

const eliminar = async (id) => {
  return CarritoModel.eliminarProducto(id);
};

module.exports = {
  agregar,
  listar,
  eliminar
};
