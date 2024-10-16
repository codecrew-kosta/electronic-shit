/**
 * 2024_10_14_남윤호 product CRUD 작업중_ Product 라우터추가
 * 2024_10_15_남윤호 기존 라우터를 app으로 대체 서브어플리이션화
 * 2024_10_15_전역에다가 영우님이 추가한 코드 넣으니까 url요청이 제대로 안감 조정필요 일단 주석처리해놓음
 */

const express = require("express");
const http = require("http");
const cors = require("cors");
const db = require("./db");

const app = express();
// const productRouter = require("./router/Product"); //20241014_남윤호 상품관련 라우터
// const loginRouter = require("./router/Login");//20241014_조영우 로그인 및 회원가입 관련 라우터
const authRouter = require("./router/authRouter");//20241014_조영우 로그인 및 회원가입 관련 라우터
const cookieParser = require('cookie-parser');
// const csrfProtection = require('./middlewares/csrfMiddleware'); // CSRF 미들웨어 조영우 20241015 추가
const { authenticateJWT } = require('./middlewares/authMiddleware'); // JWT 인증 미들웨어 조영우 20241015 추가

const NamApp = require("./NamApp"); //20241015_남윤호 앱

// 10-16 한채경 router 추가(더 늘어나면 app 따로 분리 필요)
const mainRouter = require("./router/MainRouter");
const categoryRouter = require("./router/CategoryRouter");
const registerRouter = require("./router/Register");

const server = http.createServer(app);

app.set("port", 3001);
app.use(db);

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트 도메인을 명시
    credentials: true, // 자격 증명 허용
}));//credentials 옵션 설정으로 인해 변화를 줌
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // 모든 서버의 통신은 json 으로 한다. res.send 쓰지 말 것.

app.use(cookieParser()); // 쿠키 파서 적용 조영우 20241015 추가
// app.use(csrfProtection); // CSRF 보호 미들웨어 적용 (특정 라우트에서 사용 가능) 조영우 20241015 추가

/* 남윤호 구현 기능 시작 */
/* 이곳에 남윤호가 구현한 기능을 넣는다 */
app.use("/product", NamApp);
/* 남윤호 구현 기능 끝 */

/* 조영우 구현 기능 시작 */
/* 이곳에 조영우가 구현한 기능을 넣는다 */
// app.use('/login', loginRouter);

app.use('/auth', authRouter);
app.use('/register', registerRouter);

// 보호된 경로에 JWT 미들웨어 적용 (예시)
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'Protected route accessed!', user: req.user });
});

/* 조영우 구현 기능 끝 */

/* 한채경 구현 기능 시작 */
/* 이곳에 한채경이 구현한 기능을 넣는다 */

app.use("/", mainRouter); // 전체목록, 추천목록
app.use("/products", categoryRouter); // 카테고리 별 아이템

/* 한채경 구현 기능 끝 */

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "hello world",
    });
    console.log("200 ok");
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `${error}`,
    });
    console.error("500 error: ", error);
  }
});

server.listen(app.get(`port`), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
