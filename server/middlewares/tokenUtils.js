const jwt = require('jsonwebtoken'); 
// jsonwebtoken 모듈을 가져옴. 이 모듈은 JWT(JSON Web Token)를 생성하고 검증하는 기능을 제공함.

// 환경 변수에서 비밀 키를 가져옴
const JWT_SECRET = process.env.JWT_SECRET; 
// Access Token을 서명할 때 사용할 비밀 키. 환경 변수에서 불러옴.

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; 
// Refresh Token을 서명할 때 사용할 비밀 키. 환경 변수에서 불러옴.

const generateAccessToken = (user) => {
  // Access Token을 생성하는 함수.
  // 인자로 받은 `user` 객체에서 `id`와 `username`을 JWT의 payload로 사용함.
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
  // 첫 번째 인자는 payload로, 사용자의 id와 username을 포함함.
  // 두 번째 인자는 서명을 위한 비밀 키(JWT_SECRET).
  // 세 번째 인자는 옵션으로, 토큰의 유효기간을 15분으로 설정함.
};

const generateRefreshToken = (user) => {
  // Refresh Token을 생성하는 함수.
  // 인자로 받은 `user` 객체에서 `id`와 `username`을 JWT의 payload로 사용함.
  return jwt.sign({ id: user.id, username: user.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  // 첫 번째 인자는 payload로, 사용자의 id와 username을 포함함.
  // 두 번째 인자는 서명을 위한 비밀 키(JWT_REFRESH_SECRET).
  // 세 번째 인자는 옵션으로, 토큰의 유효기간을 7일로 설정함.
  // Refresh Token은 Access Token보다 긴 유효기간을 가짐.
};

const verifyAccessToken = (token) => {
  // Access Token을 검증하는 함수.
  try {
    return jwt.verify(token, JWT_SECRET); 
    // 주어진 토큰을 JWT_SECRET을 사용해 검증하고, 유효한 경우 해독된 payload를 반환함.
  } catch (error) {
    return null; 
    // 유효하지 않은 토큰일 경우 null을 반환함.
  }
};

const verifyRefreshToken = (token) => {
  // Refresh Token을 검증하는 함수.
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET); 
    // 주어진 토큰을 JWT_REFRESH_SECRET을 사용해 검증하고, 유효한 경우 해독된 payload를 반환함.
  } catch (error) {
    return null; 
    // 유효하지 않은 토큰일 경우 null을 반환함.
  }
};

module.exports = {
  generateAccessToken, 
  // Access Token 생성 함수 내보냄.
  
  generateRefreshToken, 
  // Refresh Token 생성 함수 내보냄.

  verifyAccessToken, 
  // Access Token 검증 함수 내보냄.

  verifyRefreshToken, 
  // Refresh Token 검증 함수 내보냄.
};
