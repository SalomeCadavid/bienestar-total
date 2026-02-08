const CompraModel = require('../models/compra.model');

const realizarCompra = async (usuario_id) => {
  const carrito = await CompraModel.obtenerCarrito(usuario_id);

  if (carrito.length === 0) {
    throw new Error('El carrito está vacío');
  }

  let total = 0;

  for (const item of carrito) {
    if (item.cantidad > item.stock) {
      throw new Error('Stock insuficiente');
    }
    total += item.cantidad * item.precio;
  }

  const compra_id = await CompraModel.crearCompra(usuario_id, total);

  for (const item of carrito) {
    await CompraModel.crearDetalle(
      compra_id,
      item.producto_id,
      item.cantidad,
      item.precio
    );
    await CompraModel.descontarStock(item.producto_id, item.cantidad);
  }

  await CompraModel.vaciarCarrito(usuario_id);

  return { compra_id, total };
};

module.exports = {
  realizarCompra
};
