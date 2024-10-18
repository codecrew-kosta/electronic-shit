const { pool } = require("../cart_db");

// userId로 userNo를 가져오는 함수
const getUserNoByUserId = async (db, userId) => {
  const query = `SELECT userNo FROM users WHERE userId = ?`;
  const [rows] = await db.query(query, [userId]);
  if (rows.length === 0) {
    throw new Error("해당 userId를 가진 사용자를 찾을 수 없습니다.");
  }
  return rows[0].userNo;
};

// 장바구니 아이템 가져오기
const getCartItems = async (db, userNo) => {
  const query = `
    SELECT 
      c.cartItemNo, 
      c.userNo, 
      c.productNo, 
      c.quantity, 
      p.name AS productName, 
      p.price
    FROM cart c
    JOIN productsinfo p ON c.productNo = p.productNo
    WHERE c.userNo = ?`;

  const [rows] = await db.query(query, [userNo]);
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

module.exports = {
  getUserNoByUserId,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  getAllCartItems,
};
