const express = require('express');
const { login, logout, refreshToken, validateToken } = require('../controller/authController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

// 로그인
router.post('/login', login);

// 로그아웃
router.post('/logout', logout);

// 리프레시 토큰으로 액세스 토큰 재발급
router.post('/token', refreshToken);

// /auth/validate-token 경로에서 토큰 검증
router.get('/validate-token', authenticateJWT, validateToken); 
// 토큰 검증 라우터 추가 (validate-token 경로로 GET 요청 시 토큰 검증 및 사용자 정보 반환)

module.exports = router;
