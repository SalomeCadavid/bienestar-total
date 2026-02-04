const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/usuario.model');

const registrarUsuario = async (data) => {
  const existe = await UsuarioModel.obtenerUsuarioPorEmail(data.email);
  if (existe) {
    throw new Error('El usuario ya existe');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const id = await UsuarioModel.crearUsuario({
    nombre: data.nombre,
    email: data.email,
    password: passwordHash
  });

  return { id, nombre: data.nombre, email: data.email };
};

module.exports = {
  registrarUsuario
};
