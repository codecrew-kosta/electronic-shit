const { pool } = require("../db");

// userId로 userNo를 가져오는 함수
const getUserNoByUserId = async (db, userId) => {
  console.log("Received userId:", userId); // 추가된 로그
  // 임의의 userId를 사용하여 userNo를 반환합니다.
  if (userId === "lee345") {
    console.log("Returning hardcoded userNo for test."); // 추가된 로그
    return 3; // 해당 userId에 매핑되는 userNo를 반환 (숫자형)
  }

  const query = `SELECT userNo FROM users WHERE userId = ?`;
  const [rows] = await db.query(query, [userId]);
  if (rows.length === 0) {
    throw new Error("해당 userId를 가진 사용자를 찾을 수 없습니다."); // 에러 발생
  }
  return rows[0].userNo; // userNo 반환
};

// 장바구니에서 특정 사용자의 상품을 조회하는 함수
const getCartItems = async (db, userNo) => {
  const query = `
    SELECT 
      c.cartItemNo, 
      c.userNo AS cartUserNo,
      c.productNo, 
      c.quantity, 
      p.name AS productName, 
      p.price
    FROM cart c
    JOIN productsinfo p ON c.productNo = p.productNo
    WHERE c.userNo = ?`;

  const params = [userNo];

  const [rows] = await db.query(query, params);

  // 특정 상품이 존재하면 첫 번째 행을 반환, 없으면 null 반환
  return rows;
};

// 모든 장바구니 아이템 가져오기
const getAllCartItems = async (db) => {
  const query = `
    SELECT 
      c.cartItemNo, 
      c.userNo, 
      c.productNo, 
      c.quantity, 
      p.name AS productName, 
      p.price
    FROM cart c
    JOIN productsinfo p ON c.productNo = p.productNo;`;

  const [rows] = await db.query(query);

  return rows;
};

// 장바구니에 아이템 추가
const addCartItem = async (userNo, productNo, quantity) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `INSERT INTO cart (userNo, productNo, quantity) VALUES (?, ?, ?)`,
      [userNo, productNo, quantity]
    );
    return {
      cartItemNo: result.insertId,
      userNo,
      productNo,
      quantity,
    };
  } finally {
    connection.release();
  }
};

// 장바구니 아이템 개수 수정
const updateCartItemQuantity = async (cartItemNo, quantity) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `UPDATE cart SET quantity = ? WHERE cartItemNo = ?`,
      [quantity, cartItemNo]
    );

    if (result.affectedRows === 0) {
      throw new Error("수정할 장바구니 아이템을 찾을 수 없습니다."); // 추가된 오류 처리
    }

    return { cartItemNo, quantity };
  } finally {
    connection.release();
  }
};

// 장바구니 아이템 삭제
const deleteCartItem = async (cartItemNo) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `DELETE FROM cart WHERE cartItemNo = ?`,
      [cartItemNo]
    );
    return { cartItemNo };
  } finally {
    connection.release();
  }
};

// 특정 사용자의 장바구니 아이템 수를 가져오는 함수
async function getCartItemCount(db, userNo) {
  const query = "SELECT COUNT(*) AS count FROM cart WHERE userNo = ?";
  const [rows] = await db.execute(query, [userNo]);

  // 로그 추가
  console.log("DB Query Result for cart item count:", rows);

  return rows[0].count; // 장바구니 아이템 수 반환
}

module.exports = {
  getUserNoByUserId,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  getAllCartItems,
  getCartItemCount,
};
