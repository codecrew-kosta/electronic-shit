import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemList from "./ItemList";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/cart/?userId=user1");
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const result = await response.json();
      setItems(result.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 아이템 선택 처리 함수
  const handleSelectItem = (cartItemNo) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemNo)
        ? prev.filter((id) => id !== cartItemNo)
        : [...prev, cartItemNo]
    );
  };

  // 수량 변경 처리 함수
  const handleQuantityChange = async (cartItemNo, newQuantity) => {
    try {
      // 백엔드에 수량 업데이트 요청
      await fetch(`http://localhost:3001/cart/${cartItemNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: parseInt(newQuantity, 10) }), // 수량을 JSON 형태로 전송
      });

      // 로컬 상태 업데이트
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemNo === cartItemNo
            ? { ...item, quantity: parseInt(newQuantity, 10) }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // 선택된 아이템 전체 삭제 함수
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedItems.map((cartItemNo) =>
          fetch(`http://localhost:3001/cart/${cartItemNo}`, {
            method: "DELETE",
          })
        )
      );
      setItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.cartItemNo))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">장바구니</h2>
      <Row>
        <Col>
          <ItemList
            items={items}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleDeleteSelected={handleDeleteSelected}
            handleQuantityChange={handleQuantityChange} // 수량 변경 처리 함수 전달
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
