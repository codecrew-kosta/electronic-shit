const express = require('express');
const argon2 = require('argon2');
// const pool = require('../db'); // DB 연결

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, userId, password, phoneNumber, email } = req.body;

  try {
    const connection = req.db;

    // 사용자 존재 여부 확인
    const [rows] = await connection.execute('SELECT * FROM users WHERE userId = ?', [userId]);
    if (rows.length > 0) {
      connection.release(); // 연결 반환
      return res.status(400).json({ message: 'User ID already exists' });
    }

    // 비밀번호 암호화
    const hashedPassword = await argon2.hash(password);

    // 사용자 정보 저장
    await connection.execute(
      'INSERT INTO users (username, userId, password, phoneNumber, email) VALUES (?, ?, ?, ?, ?)',
      [username, userId, hashedPassword, phoneNumber, email]
    );

    connection.release(); // 연결 반환

    // 성공 응답
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
