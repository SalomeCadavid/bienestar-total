const SuscripcionService = require('../services/suscripcion.service');

const crear = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { plan_id } = req.body;

    const resultado = await SuscripcionService.crearSuscripcion(
      usuario_id,
      plan_id
    );

    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crear
};
