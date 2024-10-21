const express = require('express');
const router = express.Router();

// // 로그아웃 처리 - 세션에 저장된 정보 제거
// router.post('/', (req, res) => {
//     console.log('POST - /session/logout 처리');

//     req.session.destroy((err) => {
//         if (err) {
//             console.error('세션 삭제 실패:', err);
//             return res.status(500).json({ message: 'Logout failed' });
//         }

//         console.log('로그아웃 성공');
//         res.status(200).json({ message: 'Logout successful' });
//     });
// });

// 로그아웃 처리 - 세션에 저장된 정보 제거
router.post('/', (req, res) => {
    console.log("GET - /session/logout 처리");
    if(req.session.user) {
        // 로그인 되었다면 세션의 정보 초기화.
        req.session.user = null;
    }
});

module.exports = router;
