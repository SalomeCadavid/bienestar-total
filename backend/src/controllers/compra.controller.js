const CompraService = require('../services/compra.service');

const checkout = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const resultado = await CompraService.realizarCompra(usuario_id);

    res.json({
      mensaje: 'Compra realizada con éxito',
      ...resultado
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  checkout
};
