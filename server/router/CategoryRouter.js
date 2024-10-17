const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = decodeURIComponent(req.query.category);
  console.log("Requested category:", category);

  // 데이터베이스 쿼리 실행
  try {
    const [fetchedData] = await req.db.query(
      "SELECT * FROM productsinfo WHERE category = ?",
      [category]
    );
    console.log("DB Query executed successfully.");

    // 결과를 클라이언트로 보내기 (MainRouter.js의 데이터 구조에 맞춤)
    res.status(200).json({
      status: 200,
      data: fetchedData, // 데이터를 "data" 필드에 담음
    });
    console.log(`${category} 상품 데이터 전송 성공`);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

router.route("/popular").get(async (req, res) => {
  const sql = "SELECT * FROM productsinfo WHERE stocks <= 40";

  try {
    const [results] = await req.db.query(sql); // req.db를 통해 쿼리 실행
    res.status(200).json({
      status: 200,
      data: results,
    });
    console.log("인기 상품 데이터 전송 성공");
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `MySQL Error: ${error}`,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

router.route("/new").get(async (req, res) => {
  const sql =
    "SELECT * FROM productsinfo WHERE dateAdded BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH ) AND NOW();";

  try {
    const [results] = await req.db.query(sql); // req.db를 통해 쿼리 실행
    res.status(200).json({
      status: 200,
      data: results,
    });
    console.log("최근 상품 데이터 전송 성공");
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `MySQL Error: ${error}`,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

module.exports = router;
