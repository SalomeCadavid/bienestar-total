const CarritoService = require('../services/carrito.service');

const agregarProducto = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { producto_id, cantidad } = req.body;

    await CarritoService.agregar(usuario_id, producto_id, cantidad);

    res.json({ mensaje: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verCarrito = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const carrito = await CarritoService.listar(usuario_id);

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await CarritoService.eliminar(id);

    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = {
  agregarProducto,
  verCarrito,
  eliminarProducto
};
