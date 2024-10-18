const express = require('express');
const router = express.Router();

// 로그아웃 처리 - 세션에 저장된 정보 제거
router.post('/', (req, res) => {
    console.log('POST - /session/logout 처리');
  
    req.session.destroy((err) => {
      if (err) {
        console.error('세션 삭제 실패:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
  
      console.log('로그아웃 성공');
      res.status(200).json({ message: 'Logout successful' });
    });
  });

module.exports = router;
