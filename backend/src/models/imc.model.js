const pool = require('../config/db');

const actualizarIMCUsuario = async (usuario_id, peso, estatura, imc, clasificacion, plan_id) => {
  await pool.execute(
    `UPDATE usuarios 
     SET peso = ?, estatura = ?, imc = ?, imc = ?, plan_id = ?
     WHERE id = ?`,
    [peso, estatura, imc, clasificacion, plan_id, usuario_id]
  );
};

module.exports = {
  actualizarIMCUsuario
};

