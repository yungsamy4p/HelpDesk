const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas Públicas (Lectura)
router.get('/tickets', ticketController.listar);

// Rutas Protegidas por API Key (Escritura / Borrado)
router.post('/tickets', authMiddleware, ticketController.crear);
router.delete('/tickets/:id', authMiddleware, ticketController.eliminar);

module.exports = router;