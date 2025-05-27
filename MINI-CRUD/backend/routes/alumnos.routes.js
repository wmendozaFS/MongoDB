const express = require('express');
const router = express.Router();
const controller = require('../controllers/alumnosController');

router.post('/', controller.crearAlumno);
router.get('/', controller.obtenerAlumnos);
router.get('/:id', controller.obtenerAlumno);
router.put('/:id', controller.actualizarAlumno);
router.delete('/:id', controller.eliminarAlumno);

module.exports = router;