const authMiddleware = (req, res, next) => {
    const sessionId = req.headers['x-session-id']; // 헤더에서 세션 ID 추출

    if (!sessionId) {
        return res.status(401).json({ message: 'Session ID가 제공되지 않았습니다.' });
    }

    req.sessionStore.get(sessionId, (err, session) => {
        if (err) {
            console.error('세션 조회 중 에러:', err);
            return res.status(500).json({ message: '서버 에러: 세션 조회 실패' });
        }

        if (!session || !session.user) {
            return res.status(401).json({ message: 'Unauthorized: 유효하지 않은 세션입니다.' });
        }

        req.user = session.user; // 세션에서 사용자 정보 저장
        next(); // 다음 미들웨어로 이동
    });
};

module.exports = authMiddleware;




