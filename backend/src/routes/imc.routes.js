const express = require('express');
const router = express.Router();
const ImcController = require('../controllers/imc.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/calcular', authMiddleware, ImcController.calcular);

module.exports = router;
