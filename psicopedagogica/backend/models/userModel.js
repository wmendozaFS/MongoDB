const mysqlPool = require('../app')

async function createUser(name, email, hashedPassword, role = 'standard') {
    const [result] = await connection.query(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        );
        return result.insertId; // Retorna el ID del nuevo usuario
} 

async function getUserByEmail(email) {
    const [rows] = await mysqlPool.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );
    return rows[0]; // Retorna el primer usuario encontrado o undefined
}