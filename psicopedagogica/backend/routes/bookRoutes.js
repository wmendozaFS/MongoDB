// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rutas públicas o protegidas (a proteger con middleware más adelante)
router.get('/', bookController.getAllbooks);
router.get('/:id', bookController.getbookById);
router.post('/', bookController.createbook);
router.put('/:id', bookController.updatebook);
router.delete('/:id', bookController.deletebook);

module.exports = router;
