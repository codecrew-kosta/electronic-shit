const argon2 = require('argon2'); 
// argon2 모듈을 가져옴. 비밀번호를 해시하고 검증하는 기능을 제공하는 보안 알고리즘임.

const { generateAccessToken, generateRefreshToken } = require('../middlewares/tokenUtils'); 
// 미들웨어에서 가져온 JWT 토큰 생성 함수들. 
// generateAccessToken은 액세스 토큰을, generateRefreshToken은 리프레시 토큰을 생성함.

// 로그인 처리
exports.login = async (req, res) => {
  // login 함수는 사용자의 로그인 요청을 처리하는 역할을 함.
  const { userId, password } = req.body; 
  // 클라이언트 요청으로부터 전달된 사용자 이름(username)과 비밀번호(password)를 req.body에서 가져옴.

  try {
    const connection = req.db; 
    // 데이터베이스 연결을 가져옴. 
    // getConnection() 함수는 데이터베이스와의 연결을 반환함.

    const [user] = await connection.execute('SELECT * FROM users WHERE userId = ?', [userId]);
    // MySQL 쿼리를 실행하여 username이 일치하는 사용자를 데이터베이스에서 조회함.
    // connection.execute()는 쿼리를 실행하고, 결과를 반환함. [user]는 조회된 사용자 정보를 배열로 받음.

    if (user.length === 0) {
      // 사용자가 조회되지 않으면(배열의 길이가 0) 잘못된 자격 증명임을 반환함.
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Argon2를 사용해 해시된 비밀번호와 비교
    const isPasswordValid = await argon2.verify(user[0].password, password); 
    // 사용자로부터 받은 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 비교하여 검증함.

    if (!isPasswordValid) {
      // 비밀번호가 일치하지 않으면 잘못된 자격 증명임을 반환함.
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 비밀번호가 맞다면 JWT 토큰 생성
    const accessToken = generateAccessToken(user[0]); 
    // 사용자의 정보를 포함한 액세스 토큰을 생성함.

    const refreshToken = generateRefreshToken(user[0]); 
    // 사용자의 정보를 포함한 리프레시 토큰을 생성함.

    // 리프레시 토큰을 HttpOnly 쿠키에 저장
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, 
      // HttpOnly 옵션을 사용하여 클라이언트 측 JavaScript에서 쿠키에 접근할 수 없게 함.
      secure: true, 
      // secure 옵션은 HTTPS 연결에서만 쿠키가 전송되도록 함.
      sameSite: 'Strict', 
      // sameSite 옵션은 CSRF 공격을 방지하기 위해 쿠키가 같은 사이트에서만 전송되도록 함.
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      // 쿠키의 만료 시간을 7일로 설정함.
    });

    console.log(`welcome,${userId}`);
    
    connection.release(); 
    // 데이터베이스 연결을 해제함.
  } catch (error) {
    console.error('Login error:', error);
    // 로그인 처리 중 발생한 오류를 콘솔에 출력함.
    res.status(500).json({ message: 'Login failed' });
    // 서버 에러가 발생한 경우 500 Internal Server Error 응답을 보냄.
  }
};

// 로그아웃 처리
exports.logout = (req, res) => {
  // 로그아웃 요청을 처리하는 함수.
  res.clearCookie('refreshToken'); 
  // 클라이언트의 refreshToken 쿠키를 삭제함.
  res.json({ message: 'Logged out successfully' });
  // 로그아웃 성공 메시지를 클라이언트에게 응답으로 보냄.
};

// 리프레시 토큰으로 새로운 액세스 토큰 발급
exports.refreshToken = (req, res) => {
  // 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급하는 함수.
  const refreshToken = req.cookies.refreshToken; 
  // 클라이언트로부터 쿠키에 저장된 리프레시 토큰을 가져옴.

  if (!refreshToken) {
    // 리프레시 토큰이 없으면 401 Unauthorized 상태를 반환함.
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); 
    // 리프레시 토큰을 JWT_REFRESH_SECRET을 사용해 검증하고, 유효하다면 해독된 사용자 정보를 반환함.

    const newAccessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
    // 해독된 사용자 정보로 새로운 액세스 토큰을 생성함.

    res.json({ accessToken: newAccessToken });
    // 새로 발급된 액세스 토큰을 클라이언트에게 응답으로 보냄.
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
    // 리프레시 토큰이 유효하지 않으면 403 Forbidden 상태를 반환함.
  }
};
