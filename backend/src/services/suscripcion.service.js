const SuscripcionModel = require('../models/suscripcion.model');

const crearSuscripcion = async (usuario_id, plan_id) => {
  const fecha_inicio = new Date();
  const fecha_fin = new Date();
  fecha_fin.setDate(fecha_fin.getDate() + 30); // 30 días

  const suscripcion_id = await SuscripcionModel.crearSuscripcion(
    usuario_id,
    plan_id,
    fecha_inicio,
    fecha_fin
  );

  return {
    suscripcion_id,
    mensaje: 'Suscripción activada correctamente'
  };
};

module.exports = {
  crearSuscripcion
};
