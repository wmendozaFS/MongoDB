const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
mysqlPool.getConnection().then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
}).catch(err => {
    console.error('MySQL connection error:', err);
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const sqlite = new sqlite3.Database(process.env.SQLITE_DB, (err) => {
    if (err) {
        console.error('SQLite connection error:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

sqlite.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_id INTEGER, 
    action TEXT, 
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)`);

app.get('/', (req, res) => {
    res.send('Welcome to the Consultoria Mind')
}
);

module.exports = {
    app,
    mysqlPool,
    sqlite,
    mongoose
};  