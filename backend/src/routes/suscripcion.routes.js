const express = require('express');
const router = express.Router();
const SuscripcionController = require('../controllers/suscripcion.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, SuscripcionController.crear);

module.exports = router;
