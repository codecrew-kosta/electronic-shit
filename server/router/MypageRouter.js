const express = require('express');
const argon2 = require('argon2');
const router = express.Router()
const expressSession = require('express-session');
router.route("/userinfo").get(async (req, res) => {
    try {
        const connection = req.db;
        if (req.session.user) {
            const sessionId = req.session.user.id;
            // 사용자 존재 여부 확인
            const [user] = await connection.execute('SELECT userId, username, email, phoneNumber FROM users WHERE userId = ?', [sessionId]);
            const { userId, username, email, phoneNumber } = user[0];
            connection.release();
            res.status(200).json({
                userId,
                username,
                email,
                phoneNumber
            });
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