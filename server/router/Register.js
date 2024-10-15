const express = require('express');
// const argon2 = require('argon2');
const db = require('./db'); // DB 모듈 불러오기

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, userId, password, phoneNumber } = req.body;

  try {
    // Connection db에서 연결을 가져옴
    const connection = await db.getConnection();

    // 사용자 존재 여부 확인
    const [rows] = await connection.execute('SELECT * FROM users WHERE userId = ?', [userId]);
    if (rows.length > 0) {
      connection.release(); // 연결 반환
      return res.status(400).json({ message: 'User ID already exists' });
    }

    // 비밀번호 암호화
    // const hashedPassword = await argon2.hash(password);

    // 사용자 정보 저장
    await connection.execute(
      'INSERT INTO users (username, userId, password, phoneNumber) VALUES (?, ?, ?, ?)',
      [username, userId, password, phoneNumber]
    );
    // // 사용자 정보 저장
    // await connection.execute(
    //   'INSERT INTO users (username, userId, password, phoneNumber) VALUES (?, ?, ?, ?)',
    //   [username, userId, hashedPassword, phoneNumber]
    // );

    connection.release(); // 연결 반환

    // 성공 응답
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
