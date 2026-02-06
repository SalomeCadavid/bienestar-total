const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const verificarSuscripcion = require('../middlewares/suscripcion.middleware');

router.get('/', auth, verificarSuscripcion, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido a rutinas',
    suscripcion: req.suscripcion
  });
});

module.exports = router;
