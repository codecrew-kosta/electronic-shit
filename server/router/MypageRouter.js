const express = require('express');
const router = express.Router()


//20241021 조영우 작성
//여기 있는 코드 전부 정상 작동하지 않음

router.route("/userinfo").post(async (req, res) => {
    let connection;
    console.log(req.session);
    
    
    try {
        connection = req.db; // DB 연결 객체 가져오기
        console.log("DB 연결 객체:", connection ? "성공" : "실패");

        console.log("세션 데이터:", req.session); // 세션 로그 추가
        const { id, name, authorized } = req.session.user;

        if (req.session.user) {
            // 사용자 정보 조회
            const [rows] = await connection.execute(
                'SELECT userId, username, email, phoneNumber FROM users WHERE userId = ?',
                [id]
            );

            if (rows.length === 0) {
                console.warn("사용자 정보가 없습니다.");
                return res.status(404).json({ message: "User not found" });
            }

            // 사용자 데이터 추출
            const { userId: id, username, email, phoneNumber } = rows[0];

            // 사용자 정보 응답
            res.status(200).json({
                userId: id,
                username,
                email,
                phoneNumber
            });
        }
    } catch (error) {
        console.error("서버 에러:", error);
        res.status(500).json({ message: `Unknown Server Error: ${error.message}` });
    } finally {
        // DB 연결 해제
        if (connection) {
            connection.release();
        }
    }
});


// 로그인 처리 - 세션에 정보를 저장
router.route("/reviews").get(async (req, res) => {
    try {
        const connection = req.db;
        if (req.session.user) {
            const sessionId = req.session.user.id;
            // 사용자 존재 여부 확인
            const [reviews] = await connection.execute('SELECT * FROM reviews WHERE userId = ?', [sessionId]);
            connection.release();
            res.status(200).json(reviews);
        } else {
            res.status(401).json({
                message: "Unauthorized Access",
            });
        }
        // 로그인 성공 후 상품페이지로 이동하는 링크 추가
    } catch (error) {
        connection.release();
        return res.status(500).json({ message: `Unknown Server Error: ${error}` });
    }
});

// 로그인 처리 - 세션에 정보를 저장
router.route("/productsInfo").get(async (req, res) => {
    try {
        const connection = req.db;
        if (req.session.user) {
            const sessionId = req.session.user.id;
            // 사용자 존재 여부 확인
            const [productsInfo] = await connection.execute('SELECT * FROM productsInfo WHERE userId = ?', [sessionId]);
            connection.release();
            res.status(200).json(productsInfo);
        } else {
            res.status(401).json({
                message: "Unauthorized Access",
            });
        }
        // 로그인 성공 후 상품페이지로 이동하는 링크 추가
    } catch (error) {
        connection.release();
        return res.status(500).json({ message: `Unknown Server Error: ${error}` });
    }
});

module.exports = router;