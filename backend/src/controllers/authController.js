
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


function calcularIMC(peso, estatura) {
  return peso / (estatura * estatura);
}

async function obtenerPlanPorIMC(imc) {
  let nombrePlan = '';

  if (imc < 18.5) nombrePlan = 'PLAN AUMENTO DE MASA';
  else if (imc < 25) nombrePlan = 'PLAN MANTENIMIENTO';
  else if (imc < 30) nombrePlan = 'PLAN PERDIDA DE GRASA';
  else nombrePlan = 'PLAN CONTROL INTENSIVO';

  const [rows] = await db.execute(
    'SELECT id FROM planes WHERE nombre = ?',
    [nombrePlan]
  );

  return rows[0].id;
}

exports.register = async (req, res) => {
  try {
    const { nombre, email, password, edad, peso, estatura, genero } = req.body;

    const [existe] = await db.execute(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    const hash = await bcrypt.hash(password, 10);

    const imc = calcularIMC(peso, estatura);

    const plan_id = await obtenerPlanPorIMC(imc);

    const rol_id = 2;

    await db.execute(
      `INSERT INTO usuarios
      (nombre, email, password, edad, peso, estatura, genero, imc, plan_id, rol_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, email, hash, edad, peso, estatura, genero, imc, plan_id, rol_id]
    );

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      imc: imc.toFixed(2)
    });

  } catch (error) {
    console.error('ERROR REGISTRO:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol_id: usuario.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol_id: usuario.rol_id
      }
    });

  } catch (error) {
    console.error('ERROR LOGIN 👉', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
