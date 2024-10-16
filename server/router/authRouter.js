const express = require('express');
const { login, logout, refreshToken } = require('../controller/authController');
const cookieParser = require('cookie-parser');
const csrfProtection = require('../middlewares/csrfMiddleware');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(cookieParser()); // 쿠키 파싱 미들웨어 추가

// 로그인
router.post('/login', login);

// 로그아웃
router.post('/logout', csrfProtection, logout);

// 리프레시 토큰으로 액세스 토큰 재발급
router.post('/token', csrfProtection, refreshToken);

// 인증된 사용자만 접근 가능한 보호된 경로 (CSRF 검증 포함)
router.get('/protected', csrfProtection, authenticateJWT, (req, res) => {
  res.json({ message: 'Protected route accessed!', user: req.user });
});

module.exports = router;
