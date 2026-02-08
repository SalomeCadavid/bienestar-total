const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compra.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/checkout', auth, compraController.checkout);

module.exports = router;
