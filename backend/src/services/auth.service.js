const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');

const login = async (email, password) => {
  const usuario = await UsuarioModel.obtenerUsuarioPorEmail(email);

  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      rol_id: usuario.rol_id
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol_id: usuario.rol_id
    }
  };
};

module.exports = {
  login
};
