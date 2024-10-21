const mysql = require("mysql2/promise");
require("dotenv").config();

// MySQL 연결 설정
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 30, // 최대 동시 연결 수 상향 20241016 조영우
  queueLimit: 0, // 대기열 제한 없음 설정 20241016 조영우
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
    console.error("DB connection error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
};

module.exports = {db, pool};
