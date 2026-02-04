const UsuarioService = require('../services/usuario.service');

const registrar = async (req, res) => {
  try {
    const usuario = await UsuarioService.registrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registrar
};
