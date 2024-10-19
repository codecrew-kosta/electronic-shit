const csrf = require('csurf'); 
// csurf 모듈을 가져옴. 이 모듈은 CSRF(Cross-Site Request Forgery) 공격을 방어하기 위한 미들웨어를 제공함.

const csrfProtection = csrf({ cookie: true }); 
// CSRF 보호 미들웨어를 생성함.
// `{ cookie: true }` 옵션은 CSRF 토큰을 쿠키에 저장하겠다는 의미임.
// 이 옵션은 사용자의 브라우저에 CSRF 토큰을 쿠키로 전달하고, 요청 시 그 토큰을 비교하여 CSRF 공격 여부를 확인함.
// 기본적으로는 세션을 사용하여 토큰을 저장하지만, 이 경우 쿠키를 이용해 CSRF 토큰을 처리함.

module.exports = csrfProtection; 
// csrfProtection 미들웨어를 모듈로 내보냄.
// 이 미들웨어는 요청에서 CSRF 토큰을 생성하거나 검증하는 역할을 함.
// 생성된 CSRF 토큰은 클라이언트에게 전달되고, 이후의 요청에서는 그 토큰을 제출하여 서버에서 검증함.
// 이를 통해 CSRF 공격으로부터 보호함.
