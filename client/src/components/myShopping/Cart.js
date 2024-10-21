import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import ItemList from "./ItemList";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const fetchItems = async () => {
    if (isRequestInProgress) return; // 요청이 진행 중이면 무시

    setIsRequestInProgress(true);

    try {
      const response = await fetch("http://localhost:3001/cart/?userId=lee345");
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const result = await response.json();
      setItems(result.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsRequestInProgress(false); // 요청 완료 후 상태 초기화
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
    const parsedQuantity = parseInt(newQuantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      console.error("유효하지 않은 수량입니다:", newQuantity);
      return; // 유효하지 않은 수량이면 처리 중단
    }
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

      // 상품 목록 재페치
      fetchItems(); // 추가된 부분
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // 개별 아이템 삭제 함수
  const handleDelete = async (cartItemNo) => {
    try {
      await fetch(`http://localhost:3001/cart/${cartItemNo}`, {
        method: "DELETE",
      });
      setItems((prev) => prev.filter((item) => item.cartItemNo !== cartItemNo));
    } catch (error) {
      console.error("Error deleting item:", error);
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

  // 전체 가격 계산 함수
  function calculateTotalPrice(items) {
    console.log(items); // 여기에 items의 값을 출력하여 확인
    if (!Array.isArray(items)) {
      return 0; // items가 배열이 아닐 경우 기본값 반환
    }
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">장바구니</h2>
      <Row>
        <Col>
          <ItemList
            items={items}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleDelete={handleDelete} // 개별 삭제 처리 함수 전달
            handleDeleteSelected={handleDeleteSelected}
            handleQuantityChange={handleQuantityChange} // 수량 변경 처리 함수 전달
          />
          <div className="mt-4 text-end">
            <h4>총 가격: {formatPrice(calculateTotalPrice(items))} 원</h4>
            <Button variant="dark">구매하기</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
