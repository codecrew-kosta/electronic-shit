/**
 * 2024.10.15_남윤호
 * mysql 연동을 위해 사용한 디비 접속코드
 *영우님 방식이 훨 좋아보임, 그걸로 대체하여 사용하기로
 */

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

module.exports = pool; // pool을 바로 export