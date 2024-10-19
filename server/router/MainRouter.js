const express = require("express");
const router = express.Router();

// 전체 데이터 가져오기(dummydata, 수정 필요)
router.route("/dummydata").get(async (req, res) => {
  const sql = "SELECT * FROM productsinfo";

  try {
    const [results] = await req.db.query(sql); // req.db를 통해 쿼리 실행
    res.status(200).json({
      status: 200,
      data: results, // 결과를 json data로 반환
    });
    console.log("데이터 전송 성공");
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `MySQL Error: ${error}`,
    });
    console.error("500 Error: ", error);
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

router.route("/recommended").get(async (req, res) => {
  const sql = "SELECT * FROM productsinfo WHERE stocks >= 100";

  try {
    const [results] = await req.db.query(sql); // req.db를 통해 쿼리 실행
    res.status(200).json({
      status: 200,
      data: results,
    });
    console.log("추천 상품 데이터 전송 성공");
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
