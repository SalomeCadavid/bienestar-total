const pool = require('../config/db');

const crearSuscripcion = async (usuario_id, plan_id, fecha_inicio, fecha_fin) => {
  const [result] = await pool.execute(
    `INSERT INTO suscripciones 
     (usuario_id, plan_id, fecha_inicio, fecha_fin)
     VALUES (?, ?, ?, ?)`,
    [usuario_id, plan_id, fecha_inicio, fecha_fin]
  );

  return result.insertId;
};

module.exports = {
  crearSuscripcion
};
