const mysqlPool = require('../config/mysql');

async function createUser(name, email, hashedPassword, role = 'standard') {
  const [result] = await mysqlPool.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );
  return result.insertId;
}

async function findUserByEmail(email) {
  const [rows] = await mysqlPool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = {
  createUser,
  findUserByEmail
};
