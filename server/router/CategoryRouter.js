const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = decodeURIComponent(req.query.category);
  console.log("Requested category:", category);

  // 데이터베이스 쿼리 실행
  try {
    const [fetchedData] = await req.db.query(
      "SELECT * FROM dummydata WHERE category = ?",
      [category]
    );
    console.log("DB Query executed successfully.");

    // 결과를 클라이언트로 보내기 (MainRouter.js의 데이터 구조에 맞춤)
    res.status(200).json({
      status: 200,
      data: fetchedData, // 데이터를 "data" 필드에 담음
    });
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

module.exports = router;
