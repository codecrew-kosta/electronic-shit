const express = require("express");
const router = express.Router();

// 검색 요청 처리
router.get("/", async (req, res) => {
  const { query } = req.query; // 클라이언트에서 보낸 검색어 받기
  console.log("받은 검색어:", query);

  try {
    // SQL 쿼리: category, name, brand에서 검색어가 포함된 데이터 가져오기
    const searchQuery = `
      SELECT DISTINCT * FROM productsinfo
      WHERE
        category LIKE ?
        OR name LIKE ?
        OR brand LIKE ?;
    `;

    // 와일드카드를 사용해 검색어를 쿼리에 적용
    const searchParam = `%${query}%`;

    // DB에서 검색 쿼리 실행
    const [rows] = await req.db.execute(searchQuery, [
      searchParam,
      searchParam,
      searchParam,
    ]);

    // 결과가 있는지 확인
    if (rows.length > 0) {
      res.status(200).json({
        status: 200,
        message: `검색어: ${query}에 대한 검색 결과`,
        data: rows,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `검색어: ${query}에 대한 결과가 없습니다.`,
      });
    }
  } catch (error) {
    console.error("검색 처리 중 오류 발생:", error);
    res.status(500).json({
      status: 500,
      message: `MySQL Error: ${error}`,
    });
  } finally {
    req.db.release(); // 연결 해제
  }
});

module.exports = router;
