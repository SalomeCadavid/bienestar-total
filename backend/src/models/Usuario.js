const db = require('../config/db');

class Usuario {

  static async buscarPorEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async crear(data) {
    const {
      nombre,
      email,
      password,
      edad,
      peso,
      estatura,
      genero,
      imc,
      plan_id,
      rol_id
    } = data;

    await db.execute(
      `INSERT INTO usuarios
       (nombre, email, password, edad, peso, estatura, genero, imc, plan_id, rol_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, email, password, edad, peso, estatura, genero, imc, plan_id, rol_id]
    );
  }
}

module.exports = Usuario;
