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
        } else {

            console.log(user);
        }

        // 비밀번호 암호화 된거 비교
        const isPasswordValid = await argon2.verify(user[0].password, password);
        console.log(isPasswordValid);

        //통과됨
        if (!isPasswordValid) {
            // 비밀번호가 일치하지 않으면 잘못된 자격 증명임을 반환함.
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            console.log("비번 통과됨");
            //세션에다가 올리기

            //유저의 모든 정보를 반환처리한후, 프론트 단에서 세션에 넣어준다.
            let { userNo, username, userId, points } = user[0];
            return res.status(200).json({ userNo: userNo, username: username, userId: userId, points: points });
            // req.session.userInfo = user[0];
            // req.sessionStore

            return res.status(200).json({ message: '세션을 설정했습니다.' });
        }

        res.status(200).json({
            status: 200,
            message: '로그인 되었음, 세션에 유저정보 저장함'
        });

        // //이친구 뭐임?
        // req.session.user = {
        //     id: userId,
        //     name: user[0].username,
        //     authorized: true
        // }
        // console.log(req.session.user);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Unknown Server Error: ${error}` });
    } finally {
        connection.release();
    }
});
module.exports = router;