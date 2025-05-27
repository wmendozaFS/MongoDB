// scripts/createTables.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function createTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      multipleStatements: true // ✅ Esto permite ejecutar varios CREATE a la vez

    });

    console.log('✅ Conectado a MySQL');

    const sql = `

      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('standard', 'premium', 'admin') DEFAULT 'standard',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150),
        description TEXT,
        pdf_url VARCHAR(255),
        video_url VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150),
        author VARCHAR(100),
        price DECIMAL(8,2),
        stock INT DEFAULT 0,
        cover_url VARCHAR(255),
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        total DECIMAL(10,2),
        status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        book_id INT,
        quantity INT,
        price DECIMAL(8,2),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (book_id) REFERENCES books(id)
      );`;

    await connection.query(sql);
    console.log('✅ Tablas MySQL creadas correctamente');
    await connection.end();
  } catch (error) {
    console.error('❌ Error al crear tablas:', error.message);
  }
}

createTables();
