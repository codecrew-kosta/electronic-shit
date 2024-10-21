// 2024-10-17 한채경
// cart 기능을 구현하기 위한 임시 파일입니다.
// 2024-10-18 로그인 기능이 구현되지 않아 일단 userId를 받아오지 않고 CUD 기능을 구현했습니다.

const express = require("express");
const router = express.Router();
const {
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  getUserNoByUserId,
  getAllCartItems,
  getCartItemCount,
} = require("../controller/CartListController"); // CRUD 기능 컨트롤러에서 가져오기

// 모든 유저의 장바구니 조회
router.get("/all", async (req, res) => {
  try {
    const cartItems = await getAllCartItems(req.db); // 모든 사용자 장바구니 아이템 가져오기
    res.status(200).json({
      status: 200,
      data: cartItems,
      message: "모든 사용자 장바구니 아이템",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

// 특정 유저의 장바구니 조회
router.get("/", async (req, res) => {
  const userId = req.query.userId; // 쿼리 매개변수에서 userId 가져오기

  if (!userId) {
    return res.status(400).json({
      status: 400,
      message: "userId가 필요합니다.",
    });
  }

  try {
    const userNo = await getUserNoByUserId(req.db, userId); // userId로 userNo 찾기
    console.log("Retrieved userNo:", userNo); // 추가된 로그
    const cartItems = await getCartItems(req.db, userNo); // userNo로 장바구니 아이템 가져오기
    res.status(200).json({
      status: 200,
      data: cartItems,
      message: "장바구니 페이지",
    });
  } catch (error) {
    console.error("Error fetching cart items:", error); // 추가된 로그
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

// 장바구니에 아이템 추가
router.post("/", async (req, res) => {
  const { userNo, productNo, quantity } = req.body;
  console.log("Received data:", req.body); // 요청 데이터 로그 추가

  try {
    const existingItems = await getCartItems(req.db, userNo); // 기존 장바구니 아이템 가져오기

    // productNo와 일치하는 기존 아이템 찾기
    const existingItem = existingItems.find(
      (item) => item.productNo === productNo
    );

    if (existingItem) {
      // console.log("Existing item found:", existingItem); // 기존 아이템 로그 추가

      const currentQuantity = existingItem.quantity; // 이제 기존 수량을 정상적으로 가져옴
      // console.log("Current quantity from existing item:", currentQuantity); // 로그 추가
      const updatedQuantity = currentQuantity + quantity; // 요청으로 받은 수량을 더함
      // console.log("Updated quantity:", updatedQuantity); // 업데이트할 수량 로그 추가

      await updateCartItemQuantity(existingItem.cartItemNo, updatedQuantity);
      res.status(200).json({
        status: 200,
        message: "상품이 이미 존재하여 수량이 증가되었습니다.",
      });
    } else {
      const newItem = await addCartItem(userNo, productNo, quantity);
      res.status(201).json({
        status: 201,
        data: newItem,
        message: "장바구니에 새로운 상품이 추가되었습니다.",
      });
    }
  } catch (error) {
    console.error("Error in POST /cart:", error); // 오류 로그 추가
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    console.log("DB connection released");
    req.db.release();
  }
});

// 장바구니 아이템 개수 수정
router.put("/:cartItemNo", async (req, res) => {
  const { cartItemNo } = req.params; // URL 파라미터에서 cartItemNo 가져오기
  const { quantity } = req.body; // 클라이언트로부터 받은 새로운 수량

  // 수량 및 cartItemNo 로그로 확인
  // console.log("Received cartItemNo:", cartItemNo);
  // console.log("Received quantity:", quantity);

  // 수량 유효성 검사
  if (typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({
      status: 400,
      message: "수량은 1 이상의 정수여야 합니다.", // 수량이 1 이하일 경우 메시지 변경
    });
  }

  try {
    const updateItem = await updateCartItemQuantity(cartItemNo, quantity); // 아이템 수량 업데이트
    res.status(200).json({
      status: 200,
      data: updateItem,
      message: "장바구니 아이템 개수가 수정되었습니다.",
    });
  } catch (error) {
    console.error("Error updating item:", error); // 에러 로그 추가
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

// 장바구니 아이템 삭제
router.delete("/:cartItemNo", async (req, res) => {
  const { cartItemNo } = req.params; // URL 파라미터에서 cartItemNo 가져오기

  if (!cartItemNo) {
    return res.status(400).json({
      status: 400,
      message: "cartItemNo가 필요합니다.",
    });
  }

  try {
    const deleteItem = await deleteCartItem(cartItemNo); // 아이템 삭제
    if (!deleteItem) {
      return res.status(404).json({
        status: 404,
        message: "장바구니 아이템을 찾을 수 없습니다.",
      });
    }
    res.status(200).json({
      status: 200,
      data: deleteItem,
      message: "장바구니에서 아이템이 삭제되었습니다.",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

// 장바구니 아이템 수 조회
router.get("/count/:userId", async (req, res) => {
  const userId = req.params.userId; // 쿼리 매개변수에서 userId 가져오기
  console.log("req.params:", req.params);

  // const userId = "lee345"; // 쿼리 매개변수에서 userId 가져오기

  if (!userId) {
    return res.status(400).json({
      status: 400,
      message: "userId가 필요합니다.",
    });
  }

  try {
    const userNo = await getUserNoByUserId(req.db, userId); // userId로 userNo 찾기
    console.log("Retrieved userNo:", userNo); // 추가된 로그
    const count = await getCartItemCount(req.db, userNo); // userNo로 장바구니 아이템 수 가져오기
    console.log("Cart item count:", count); // 추가된 로그

    res.status(200).json({
      status: 200,
      count,
      message: "장바구니 아이템 수",
    });
  } catch (error) {
    console.error("Error fetching cart item count:", error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    console.log("DB connection released");
    req.db.release(); // 연결 해제
  }
});

module.exports = router;
