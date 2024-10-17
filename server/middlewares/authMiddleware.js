

const loggerMiddleware = (req, res, next) => {
    if (req.session.user) {
        res.status(200).json({
            status: 200,
            message: 'ok'
        })
    } else {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        })
    }
    next(); // 로그를 기록한 후 다음 미들웨어로 넘어감
}

module.exports = loggerMiddleware;
