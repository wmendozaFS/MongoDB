const mysqlPool = require('../config/mysql');

async function getAllCourses() {
  const [rows] = await mysqlPool.query('SELECT * FROM courses WHERE is_active = TRUE');
  return rows;
}

async function getCourseById(id) {
  const [rows] = await mysqlPool.query('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0];
}

async function createCourse(title, description, pdf_url, video_url) {
  const [result] = await mysqlPool.query(
    'INSERT INTO courses (title, description, pdf_url, video_url) VALUES (?, ?, ?, ?)',
    [title, description, pdf_url, video_url]
  );
  return result.insertId;
}   

async function updateCourse(id, title, description, pdf_url, video_url) {       
    await mysqlPool.query(
        'UPDATE courses SET title = ?, description = ?, pdf_url = ?, video_url = ? WHERE id = ?',
        [title, description, pdf_url, video_url, id]
    );
    }

async function deleteCourse(id) {
    await mysqlPool.query('DELETE FROM courses WHERE id = ?', [id]);
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse  
};
