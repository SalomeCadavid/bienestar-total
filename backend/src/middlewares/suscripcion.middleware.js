const pool = require('../config/db');

const verificarSuscripcionActiva = async (req, res, next) => {
  try {
    const usuario_id = req.user.id;

    const [rows] = await pool.execute(
      `SELECT * FROM suscripciones 
       WHERE usuario_id = ?
       AND estado = 'activa'
       AND fecha_fin >= CURDATE()
       LIMIT 1`,
      [usuario_id]
    );

    if (rows.length === 0) {
      return res.status(403).json({
        error: 'No tienes una suscripción activa'
      });
    }

    // Guardamos la suscripción por si se necesita luego
    req.suscripcion = rows[0];

    next();
  } catch (error) {
    res.status(500).json({
      error: 'Error validando suscripción'
    });
  }
};

module.exports = verificarSuscripcionActiva;
