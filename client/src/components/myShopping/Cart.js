import React, { useEffect, useState, useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../GlobalContext";
import ItemList from "./ItemList";

const Cart = () => {
  //세션스토리지에서 값꺼내기
  const sessionUser = sessionStorage.getItem("user");
  const userId = sessionUser ? JSON.parse(sessionUser).userId : null; // 세션 스토리지에 user가 없으면 임시로 lee345를 집어넣음
  const { items, setItems, fetchItems } = useContext(GlobalContext); // 상태 초기화 함수와 페이지네이션 스테이트 가져오기
  const [selectedItems, setSelectedItems] = useState([]);

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
      <h2 className="text-center mb-4">장바구니</h2>
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
