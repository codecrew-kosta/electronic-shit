const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL 연결 설정
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Connection Pool 생성
const pool = mysql.createPool(dbConfig);

// 미들웨어로 pool 전달
const db = async (req, res, next) => {
  try {
    req.db = await pool.getConnection(); // req 객체에 db 연결 추가
    next(); // 다음 미들웨어 또는 라우트로 이동
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
};

module.exports = db;
