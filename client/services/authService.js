import axios from 'axios';

// 로그인 API 호출
export const login = async (username, password) => {
  const response = await axios.post('http://localhost:3001/auth/login', { username, password }, { withCredentials: true });
  return response.data;
};

// 보호된 경로에 접근 (액세스 토큰과 CSRF 토큰 사용)
export const getProtectedData = async (accessToken, csrfToken) => {
  const response = await axios.get('http://localhost:3001/auth/protected', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'X-XSRF-TOKEN': csrfToken // CSRF 토큰 헤더에 추가
    },
    withCredentials: true
  });
  return response.data;
};

