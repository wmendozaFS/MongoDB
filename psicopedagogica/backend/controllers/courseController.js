// controllers/courseController.js
const courseModel = require('../models/courseModel');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseModel.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { title, description, pdf_url, video_url } = req.body;
    const courseId = await courseModel.createCourse(title, description, pdf_url, video_url);
    res.status(201).json({ message: 'Curso creado', courseId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el curso' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, pdf_url, video_url, is_active } = req.body;
    await courseModel.updateCourse(req.params.id, title, description, pdf_url, video_url, is_active);
    res.json({ message: 'Curso actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await courseModel.deleteCourse(req.params.id);
    res.json({ message: 'Curso eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
};
