const mysqlPool = require('../config/mysql');

async function getAllCurses() {
    const [rows] = await mysqlPool.query('SELECT * FROM curses');
    return rows;
}  

async function createCurse(title, description, pdfUrl, videoUrl) {
    const [result] = await mysqlPool.query(
        `INSERT INTO curses (title, description, pdf_url, video_url) VALUES (?, ?, ?, ?)`,
        [title, description, pdfUrl, videoUrl]
    );
    return result.insertId; // Retorna el ID del nuevo curso
}

async function updateCurse(id, title, description, pdfUrl, videoUrl) {
    const [result] = await mysqlPool.query(
        `UPDATE curses SET title = ?, description = ?, pdf_url = ?, video_url = ? WHERE id = ?`,
        [title, description, pdfUrl, videoUrl, id]
    );
    return result.affectedRows > 0; // Retorna true si se actualizó
}

async function deleteCurse(id) {
    const [result] = await mysqlPool.query(
        `DELETE FROM curses WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0; // Retorna true si se eliminó
}

module.exports = {
    getAllCurses,
    createCurse,
    updateCurse,
    deleteCurse
};
