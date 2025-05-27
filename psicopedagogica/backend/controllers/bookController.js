// controllers/bookController.js
const bookModel = require('../models/bookModel');

exports.getAllbooks = async (req, res) => {
  try {
    const books = await bookModel.getAllbooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los libro' });
  }
};

exports.getbookById = async (req, res) => {
  try {
    const book = await bookModel.getbookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el Libro' });
  }
};

exports.createbook = async (req, res) => {
  try {
    const { title, description, pdf_url, video_url } = req.body;
    const bookId = await bookModel.createbook(title, description, pdf_url, video_url);
    res.status(201).json({ message: 'Libro creado', bookId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el Libro' });
  }
};

exports.updatebook = async (req, res) => {
  try {
    const { title, description, pdf_url, video_url, is_active } = req.body;
    await bookModel.updatebook(req.params.id, title, description, pdf_url, video_url, is_active);
    res.json({ message: 'Libro actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el Libro' });
  }
};

exports.deletebook = async (req, res) => {
  try {
    await bookModel.deletebook(req.params.id);
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el Libro' });
  }
};
