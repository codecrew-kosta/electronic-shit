import React from "react";
import { Button, ListGroup } from "react-bootstrap";

const ItemList = ({
  items,
  selectedItems,
  handleSelectItem,
  handleDeleteSelected,
  handleQuantityChange, // 수량 변경 처리 함수 추가
  handleDelete,
}) => {
  // 전체 선택/해제 처리 함수
  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      // 모든 아이템이 선택된 상태이면 선택 해제
      items.forEach((item) => handleSelectItem(item.cartItemNo)); // 각 아이템에 대해 선택 해제
    } else {
      // 모든 아이템을 선택
      const allItemIds = items.map((item) => item.cartItemNo);
      allItemIds.forEach((id) => handleSelectItem(id)); // 모든 아이템에 대해 선택
    }
  };
  return (
    <>
      <Button className="mb-3 me-1" variant="dark" onClick={handleSelectAll}>
        {selectedItems.length === items.length ? "전체 선택 해제" : "전체 선택"}
      </Button>
      <Button
        variant="dark"
        className="mb-3"
        onClick={handleDeleteSelected}
        disabled={selectedItems.length === 0}
      >
        선택된 아이템 삭제
      </Button>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item
            key={item.wishlist_id}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.wishlist_id)}
                onChange={() => handleSelectItem(item.wishlist_id)}
                id={`checkbox-${item.wishlist_id}`} // 고유한 ID 추가
                style={{ marginRight: "0.5rem" }} // 체크박스와 라벨 간격
              />
              <label
                htmlFor={`checkbox-${item.wishlist_id}`} // 클릭 시 체크박스 선택
                style={{ cursor: "pointer", marginBottom: 0 }} // 포인터 커서 추가
              >
                제품: {item.name}
              </label>
              {/* <input
                type="number"
                value={item.quantity} // 현재 수량 표시
                min="1" // 최소값 1
                onChange={
                  (e) => handleQuantityChange(item.cartItemNo, e.target.value) // 수량 변경 시 호출
                }
                style={{ width: "60px", marginLeft: "1rem" }} // 스타일 조정
              /> */}
            </div>
            <Button
              variant="dark"
              className="ml-2"
              onClick={() => handleDelete(item.cartItemNo)}
            >
              삭제
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ItemList;
