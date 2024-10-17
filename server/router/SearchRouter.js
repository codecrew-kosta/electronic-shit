const express = require("express");
const router = express.Router();

const brandMapping = {
  삼성: "Samsung",
  애플: "Apple",
  소니: "Sony",
  마이크로소프트: "Microsoft",
  "얼티밋 이어": "Ultimate Ears",
  아마존: "Amazon",
  코보: "Kobo",
  레이저: "Razer",
  아수스: "ASUS",
};

// 검색 요청 처리
router.get("/", async (req, res) => {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({
      status: 400,
      message: "검색어와 타입은 필수입니다.",
    });
  }

  console.log("받은 검색어:", query);
  console.log("받은 검색 타입:", type);

  const mappedBrand = brandMapping[query] || query;

  try {
    let searchQuery = "";
    let searchParam = `%${mappedBrand}%`;

    switch (type) {
      case "category":
        searchQuery =
          "SELECT DISTINCT * FROM productsinfo WHERE category LIKE ?;";
        break;
      case "name":
        searchQuery = "SELECT DISTINCT * FROM productsinfo WHERE name LIKE ?;";
        break;
      case "brand":
        searchQuery = "SELECT DISTINCT * FROM productsinfo WHERE brand LIKE ?;";
        break;
      default:
        searchQuery = `
          SELECT DISTINCT * FROM productsinfo
          WHERE category LIKE ?
          OR name LIKE ?
          OR brand LIKE ?;
        `;
        searchParam = [searchParam, searchParam, searchParam];
        break;
    }

    const [rows] = await req.db.execute(
      searchQuery,
      Array.isArray(searchParam) ? searchParam : [searchParam]
    );

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
    req.db.release();
  }
});

module.exports = router;
