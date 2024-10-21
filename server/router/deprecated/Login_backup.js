const express = require('express');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2'); // 비밀번호 암호화용
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const pool = require('./db'); // MySQL DB 연결
const router = express().router();

app.use(express.json());
app.use(cookieParser());

// CSRF 미들웨어 설정
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// JWT 비밀 키 설정 (환경변수로 설정할 것)
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// JWT 토큰 생성 함수
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '10m' });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

// 로그인 라우트
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [user] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0 || !await argon2.verify(user[0].password, password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // JWT 토큰 생성
    const accessToken = generateAccessToken(user[0]);
    const refreshToken = generateRefreshToken(user[0]);

    // 리프레시 토큰을 HttpOnly 쿠키로 설정
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,  // HTTPS에서만 사용
      sameSite: 'Strict',  // 크로스 사이트 요청 차단
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
    });

    // CSRF 토큰 발급
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
      secure: true,
      sameSite: 'Strict'
    });

    // 액세스 토큰과 CSRF 토큰 반환
    res.json({ accessToken, csrfToken: req.csrfToken() });

    connection.release(); // db 해제
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// 리프레시 토큰을 사용해 새로운 액세스 토큰 발급
app.post('/token', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

// 로그아웃: 리프레시 토큰 삭제
app.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

// 인증이 필요한 API에서 CSRF 토큰 검증
app.get('/protected', csrfProtection, (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Access to protected route', user: decoded });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
});

module.exports = router;