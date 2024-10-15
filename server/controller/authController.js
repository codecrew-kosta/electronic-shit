const argon2 = require('argon2');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/tokenUtils');
const pool = require('../db'); // MySQL 연결

// 로그인 처리
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [user] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (user.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Argon2를 사용해 해시된 비밀번호와 비교
    const isPasswordValid = await argon2.verify(user[0].password, password);
    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 비밀번호가 맞다면 JWT 토큰 생성
    const accessToken = generateAccessToken(user[0]);
    const refreshToken = generateRefreshToken(user[0]);

    // 리프레시 토큰을 HttpOnly 쿠키에 저장
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });

    res.cookie('XSRF-TOKEN', req.csrfToken(), {
      secure: true,
      sameSite: 'Strict',
    });

    // 액세스 토큰 반환
    res.json({ accessToken, csrfToken: req.csrfToken() });

    connection.release();
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// 로그아웃 처리
exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

// 리프레시 토큰으로 새로운 액세스 토큰 발급
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};
