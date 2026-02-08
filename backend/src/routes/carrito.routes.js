const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');
const auth = require('../middlewares/auth.middleware');

console.log('auth:', typeof auth);
console.log('agregarProducto:', typeof carritoController.agregarProducto);

router.post('/agregar', auth, carritoController.agregarProducto);
router.get('/', auth, carritoController.verCarrito);
router.delete('/:id', auth, carritoController.eliminarProducto);

module.exports = router;

