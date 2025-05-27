const connect = require('../config/db');
const { ObjectId } = require('mongodb');

exports.crearAlumno = async (req, res) => {
    try {
        const db = await connect();
        const result = await db.collection('alumnos').insertOne(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerAlumnos = async (req, res) => {
    try {
        const db = await connect();
        const alumnos = await db.collection('alumnos').find().toArray();
        res.json(alumnos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerAlumno = async (req, res) => {
    try {
        const db = await connect();
        const alumno = await db.collection('alumnos').findOne({ _id: new ObjectId(req.params.id) });
        if (!alumno) return res.status(404).json({ error: "Alumno no encontrado" });
        res.json(alumno);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarAlumno = async (req, res) => {
    try {
        const db = await connect();
        const result = await db.collection('alumnos').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarAlumno = async (req, res) => {
    try {
        const db = await connect();
        const result = await db.collection('alumnos').deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
