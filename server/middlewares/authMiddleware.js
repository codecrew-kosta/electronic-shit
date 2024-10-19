// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// JWT 토큰 검증 미들웨어
exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies.accessToken; // HTTP-Only 쿠키에서 토큰 추출
  
    if (!token) {
      return res.status(401).json({ message: 'Access token required' }); // 토큰이 없으면 401 반환
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰 검증
      req.user = decoded; // 해독된 사용자 정보를 req.user에 저장
      next(); // 다음 미들웨어로 진행
    } catch (error) {
      console.error('Token validation error:', error);
      return res.status(403).json({ message: 'Invalid token' }); // 유효하지 않은 토큰일 경우
    }
  };
