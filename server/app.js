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
const authMiddleware = require("./middlewares/authMiddleware"); //20241014_조영우 로그인 및 회원가입 관련 라우터
const cookieParser = require("cookie-parser");
// const { authenticateJWT } = require('./middlewares/authMiddleware'); // JWT 인증 미들웨어 조영우 20241015 추가

const loginRouter = require("./router/LoginRouter");
const logoutRouter = require("./router/LogoutRouter");
const mypageRouter = require("./router/MypageRouter");

const NamApp = require("./NamApp"); //20241015_남윤호 앱

// 10-16 한채경 router 추가(더 늘어나면 app 따로 분리 필요)
const mainRouter = require("./router/MainRouter");
const categoryRouter = require("./router/CategoryRouter");
const searchRouter = require("./router/SearchRouter");

const registerRouter = require("./router/Register");
const expressSession = require("express-session");
const server = http.createServer(app);

app.set("port", 3001);
app.use(db);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // 모든 서버의 통신은 json 으로 한다. res.send 쓰지 말 것.

app.use(cookieParser()); // 쿠키 파서 적용 조영우 20241015 추가
app.use(
  expressSession({
    secret: "codecrewontrain", //시크릿 키 적용 필요
    resave: true,
    saveUninitialized: true,
  })
);
/* 남윤호 구현 기능 시작 */
/* 이곳에 남윤호가 구현한 기능을 넣는다 */
app.use("/product", NamApp);
/* 남윤호 구현 기능 끝 */

/* 조영우 구현 기능 시작 */
/* 이곳에 조영우가 구현한 기능을 넣는다 */
// app.use('/login', loginRouter);

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/mypage", authMiddleware, mypageRouter);

/* 조영우 구현 기능 끝 */

/* 한채경 구현 기능 시작 */
/* 이곳에 한채경이 구현한 기능을 넣는다 */

app.use("/", mainRouter); // 전체목록, 추천목록
app.use("/products", categoryRouter); // 카테고리 별 아이템
app.use("/search", searchRouter); // 검색 기능

// 10-17 한채경 장바구니 연결 테스트용
// 오류가 뜬다면 -----까지의 코드를 지워주시면 됩니다.
const cartRouter = require("./router/CartRouter");
app.use("/cart", cartRouter);
// -------
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
