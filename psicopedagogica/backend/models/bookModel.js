const mysqlPool = require('../config/mysql');

async function getAllbooks() {
  const [rows] = await mysqlPool.query('SELECT * FROM books');
  return rows;
}

async function getbookById(id) {
  const [rows] = await mysqlPool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

async function createbook(title, description, pdf_url, video_url) {
  const [result] = await mysqlPool.query(
    'INSERT INTO books (title, description, pdf_url, video_url) VALUES (?, ?, ?, ?)',
    [title, description, pdf_url, video_url]
  );
  return result.insertId;
}   

async function updatebook(id, title, description, pdf_url, video_url) {       
    await mysqlPool.query(
        'UPDATE books SET title = ?, description = ?, pdf_url = ?, video_url = ? WHERE id = ?',
        [title, description, pdf_url, video_url, id]
    );
    }

async function deletebook(id) {
    await mysqlPool.query('DELETE FROM books WHERE id = ?', [id]);
}

module.exports = {
  getAllbooks,
  getbookById,
  createbook,
  updatebook,
  deletebook  
};
