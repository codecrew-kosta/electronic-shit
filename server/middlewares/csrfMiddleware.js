const csrf = require('csurf');

// CSRF 토큰 생성 및 검증 미들웨어
const csrfProtection = csrf({ cookie: true });

module.exports = csrfProtection;
