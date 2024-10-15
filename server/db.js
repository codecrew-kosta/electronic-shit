const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL 연결 설정
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

// Connection Pool 생성
const pool = mysql.createPool(dbConfig);

// 미들웨어로 pool 전달
const db = async (req, res, next) => {
    try {
        req.db = await pool.getConnection(); // req 객체에 db 연결 추가
        console.log(`db ok`);
        
        next(); // 다음 미들웨어 또는 라우트로 이동
    } catch (error) {
        console.error('DB connection error:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
};

module.exports = db;
