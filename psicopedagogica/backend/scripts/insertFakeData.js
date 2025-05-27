// scripts/insertFakeData.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function insertFakeData() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    console.log('✅ Conectado a MySQL');

    // Hashear contraseñas
    const password1 = await bcrypt.hash('123456', 10);
    const password2 = await bcrypt.hash('abcdef', 10);
    const password3 = await bcrypt.hash('adminpass', 10);

    // Usuarios
    const users = [
      ["María López", "maria@example.com", password1, "standard"],
      ["Carlos Pérez", "carlos@example.com", password2, "premium"],
      ["Admin", "admin@example.com", password3, "admin"]
    ];

    for (const user of users) {
      await connection.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        user
      );
    }

    // Cursos
    const courses = [
      ["Motivación Escolar", "Curso para mejorar la motivación en estudiantes.", "/docs/motivacion.pdf", "https://youtu.be/abcd123"],
      ["Gestión del Estrés", "Técnicas para manejar el estrés académico.", "/docs/estres.pdf", "https://youtu.be/xyz789"]
    ];

    for (const course of courses) {
      await connection.query(
        "INSERT INTO courses (title, description, pdf_url, video_url) VALUES (?, ?, ?, ?)",
        course
      );
    }

    // Libros
    const books = [
      ["Educar con Amor", "Juana Martín", 19.99, 20, "/images/educar.jpg", "Guía para padres sobre disciplina positiva."],
      ["Aprender Jugando", "Luis Ortega", 14.50, 15, "/images/aprender.jpg", "Recursos lúdicos para el aula y el hogar."]
    ];

    for (const book of books) {
      await connection.query(
        "INSERT INTO books (title, author, price, stock, cover_url, description) VALUES (?, ?, ?, ?, ?, ?)",
        book
      );
    }

    console.log('✅ Datos insertados correctamente');

    await connection.end();
  } catch (error) {
    console.error('❌ Error insertando datos:', error.message);
  }
}

insertFakeData();
