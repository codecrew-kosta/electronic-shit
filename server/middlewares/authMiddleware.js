const { verifyAccessToken } = require('../middlewares/tokenUtils'); 
// verifyAccessToken 함수를 tokenUtils에서 가져옴. 이 함수는 JWT 토큰의 유효성을 검증하는 역할을 함.

exports.authenticateJWT = (req, res, next) => {
  // authenticateJWT 함수는 미들웨어로, JWT 토큰을 확인하고 유효성을 검증하는 역할을 함.
  
  const token = req.headers.authorization?.split(' ')[1]; 
  // 요청 헤더의 authorization 필드에서 JWT 토큰을 추출함.
  // Authorization 헤더는 "Bearer [토큰]" 형식일 수 있으므로, "Bearer " 이후의 토큰 부분만 추출함.
  // 만약 authorization 헤더가 없거나 형식이 맞지 않으면 undefined가 될 수 있음.

  if (!token) { 
    // 토큰이 없는 경우 (사용자가 인증되지 않은 경우) 401 Unauthorized 상태를 반환함.
    return res.status(401).json({ message: 'Access token required' });
  }

  const decoded = verifyAccessToken(token); 
  // 추출한 토큰을 verifyAccessToken 함수를 사용하여 검증함.
  // verifyAccessToken 함수는 토큰을 해독하고, 유효하지 않으면 null 또는 false를 반환할 것으로 예상됨.

  if (!decoded) { 
    // 토큰이 유효하지 않거나 해독에 실패한 경우 403 Forbidden 상태를 반환함.
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.user = decoded; 
  // 토큰이 유효한 경우, 해독된 정보 (사용자 정보)를 req 객체에 저장함.
  // 이로 인해 이후의 미들웨어나 라우트 핸들러에서 req.user를 사용하여 사용자 정보를 참조할 수 있음.

  next(); 
  // 미들웨어가 성공적으로 실행된 후, 다음 미들웨어나 라우트 핸들러로 진행되도록 함.
};
