const express = require('express');
const argon2 = require('argon2');

const router = express.Router();

// 로그인 처리 - 세션에 정보를 저장
router.route("/").post(async (req, res) => {
    const connection = req.db;
    try {
        const { userId, password } = req.body;
        // 세션에 사용자 정보 등록
        // 데이터베이스의 사용자 정보와 비교 후 세션 처리

        // 사용자 존재 여부 확인
        const [user] = await connection.execute('SELECT * FROM users WHERE userId = ?', [userId]);
        if (user.length < 1) {
            return res.status(400).json({ message: 'User ID does not exists' });
        }
        console.log(user[0].username);
        // 비밀번호 암호화
        const isPasswordValid = await argon2.verify(user[0].password, password);

        if (!isPasswordValid) {
            // 비밀번호가 일치하지 않으면 잘못된 자격 증명임을 반환함.
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.session.user = {
            id: userId,
            name: user[0].username,
            authorized: true
        }
        console.log(req.session);
        
        res.status(200).json({
            status: 200,
            message: 'ok'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Unknown Server Error: ${error}` });
    } finally {
        connection.release();
    }
});
// // 로그인 처리 - 세션에 정보를 저장
// router.route("/").post(async (req, res) => {
//     const connection = req.db;
//     try {
//         const { userId, password } = req.body;
//         // 세션에 사용자 정보 등록
//         // 데이터베이스의 사용자 정보와 비교 후 세션 처리

//         // 사용자 존재 여부 확인
//         const [user] = await connection.execute('SELECT * FROM users WHERE userId = ?', [userId]);
//         if (user.length < 1) {
//             return res.status(400).json({ message: 'User ID does not exists' });
//         }
//         console.log(user[0].username);
//         // 비밀번호 암호화
//         const isPasswordValid = await argon2.verify(user[0].password, password);

//         if (!isPasswordValid) {
//             // 비밀번호가 일치하지 않으면 잘못된 자격 증명임을 반환함.
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         req.session.user = {
//             id: userId,
//             name:user[0].username,
//             sessionId: req.sessionID,
//         }

//         console.log(req.session.user);
//         // localStorage.setItem('sessionId', req.session.user.sessionID);
//         res.status(200).json(req.session.user);
//         // 로그인 성공 후 상품페이지로 이동하는 링크 추가
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: `Unknown Server Error: ${error}` });
//     } finally {
//         connection.release();
//     }
// });

module.exports = router;