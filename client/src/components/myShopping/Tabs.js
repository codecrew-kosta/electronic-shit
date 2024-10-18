import React from "react";
import { Nav } from "react-bootstrap";
import "./Tabs.css"; // CSS 파일을 분리하여 사용합니다.

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Nav className="flex-column tabs">
      {tabs.map((tab, index) => (
        <Nav.Link
          key={index}
          className={`tab-item ${activeTab === index ? "active" : ""}`}
          onClick={() => onTabChange(index)}
          style={{ color: activeTab === index ? "white" : "black" }} // 텍스트 색상 변경
        >
          {tab}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Tabs;
