const ImcService = require('../services/imc.service');

const calcular = async (req, res) => {
  try {
    const { peso, estatura } = req.body;
    const usuario_id = req.user.id;

    const resultado = await ImcService.calcularIMC(
      usuario_id,
      peso,
      estatura
    );

    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  calcular
};
