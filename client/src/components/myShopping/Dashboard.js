import React, { useState } from "react";
import Tabs from "./Tabs";
import Cart from "./Cart";
import WishList from "./WishList";
import RecentViewed from "./RecentViewed";
import OrderHistory from "./OrderHistory";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <Cart />;
      case 1:
        return <WishList />;
      case 2:
        return <RecentViewed />;
      case 3:
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ maxWidth: "1200px", height: "800px" }}
    >
      <div className="dashboard-content w-100 d-flex">
        <div className="tab-container me-3">
          <Tabs
            tabs={["장바구니", "찜 목록", "최근 본 상품", "주문 내역"]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        <div className="tab-content flex-grow-1">
          {renderActiveTab()} {/* 선택된 탭에 맞는 콘텐츠 렌더링 */}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
