import axios from 'axios';

// 로그인 API 호출
export const login = async (userId, password) => {
  const response = await axios.post('http://localhost:3001/auth/login',
    { userId, password },  // 전송할 데이터
    {
      withCredentials: true // 쿠키 포함
    });
  return response.data;
};

// export const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post('http://localhost:3001/auth/token', {}, {
//       withCredentials: true
//     });
//     const { accessToken } = response.data;
//     localStorage.setItem('accessToken', accessToken); // 새로운 액세스 토큰 저장
//     return accessToken;
//   } catch (error) {
//     console.error('Failed to refresh access token:', error);

//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//       // 리프레시 토큰이 없거나 만료된 경우 로그아웃 처리
//       handleLogout();
//     }
//     return null;
//   }
// };

