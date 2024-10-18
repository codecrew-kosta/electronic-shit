const mysql2 = require("mysql2/promise");
require("dotenv").config();

// MySQL 연결 설정
const dbConfig = {
  host: process.env.DUMMY_HOST,
  user: process.env.DUMMY_USER,
  password: process.env.DUMMY_PASSWORD,
  database: process.env.DUMMY_DATABASE,
  waitForConnections: true,
  connectionLimit: 30,
  queueLimit: 0,
};

// connection Pool 생성
const pool = mysql2.createPool(dbConfig);

// 미들웨어로 pool 전달
const cart_db = async (req, res, next) => {
  try {
    req.db = await pool.getConnection();
    console.log("더미데이터 db 연결");
    next();
  } catch (error) {
    console.error("DB connection error:", error);
    res.status(500).json({
      status: 500,
      message: "Database connection failed",
    });
  }
};

module.exports = { cart_db, pool };
