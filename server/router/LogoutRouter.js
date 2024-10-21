const express = require('express');
const router = express.Router();

// 로그아웃 처리 - 세션에 저장된 정보 제거
router.route("/").get((req, res) => {
    console.log("GET - /session/logout 처리");
    if (req.session.user) {
        // 로그인 되었다면 세션의 정보 초기화.
        req.session.user = null;
    }
    res.json({
        message: "GET - /session/logout",
    });
});

module.exports = router;