import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const ItemList = ({
  items,
  selectedItems,
  handleSelectItem,
  handleDeleteSelected,
  handleQuantityChange, // 수량 변경 처리 함수 추가
}) => {
  return (
    <>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item
            key={item.cartItemNo}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.cartItemNo)}
                onChange={() => handleSelectItem(item.cartItemNo)}
                id={`checkbox-${item.cartItemNo}`} // 고유한 ID 추가
                style={{ marginRight: "0.5rem" }} // 체크박스와 라벨 간격
              />
              <label
                htmlFor={`checkbox-${item.cartItemNo}`} // 클릭 시 체크박스 선택
                style={{ cursor: "pointer", marginBottom: 0 }} // 포인터 커서 추가
              >
                제품: {item.productName}
              </label>
              <input
                type="number"
                value={item.quantity} // 현재 수량 표시
                min="1" // 최소값 1
                onChange={
                  (e) => handleQuantityChange(item.cartItemNo, e.target.value) // 수량 변경 시 호출
                }
                style={{ width: "60px", marginLeft: "1rem" }} // 스타일 조정
              />
            </div>
            <Button variant="dark" className="ml-2">
              삭제
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button
        variant="dark"
        className="mt-3"
        onClick={handleDeleteSelected}
        disabled={selectedItems.length === 0}
      >
        선택된 아이템 삭제
      </Button>
    </>
  );
};

export default ItemList;
