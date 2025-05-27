const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../models/userModel');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, role = 'standard' } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const userId = await createUser(name, email, hashedPassword, role);
        
        // Generar token JWT
        const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuario creado exitosamente', token });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;