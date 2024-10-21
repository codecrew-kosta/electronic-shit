import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가

const brandMapping = {
  삼성: "Samsung",
  애플: "Apple",
  소니: "Sony",
  마이크로소프트: "Microsoft",
  "얼티밋 이어": "Ultimate Ears",
  아마존: "Amazon",
  코보: "Kobo",
  레이저: "Razer",
  아수스: "ASUS",
};

function SearchForm({ initialValue, onSearch }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialValue || ""); // 로컬 상태로 검색어 관리
  const [searchType, setSearchType] = useState("all"); // 검색 타입을 위한 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleInputChange = (event) => {
    setLocalSearchTerm(event.target.value); // 로컬 상태 업데이트
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // 검색어가 공백만 있거나 입력되지 않았을 경우 제출 방지
    if (!localSearchTerm.trim()) {
      console.log("검색어가 입력되지 않았습니다.");
      return;
    }

    // 입력된 검색어로 브랜드 매핑을 찾기
    const mappedBrand = brandMapping[localSearchTerm] || localSearchTerm;

    // 검색어를 URL 파라미터로 전달하여 페이지 이동
    navigate(
      `/search?query=${encodeURIComponent(
        mappedBrand
      )}&type=${encodeURIComponent(searchType)}`
    );

    // 부모 컴포넌트에 검색어와 타입 전달
    if (onSearch) {
      onSearch(localSearchTerm, searchType); // 검색어와 타입을 부모로 전달
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSearchSubmit}>
      <select
        className="form-select me-2 flex-grow-0 w-auto"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="all">전체</option>
        <option value="category">카테고리</option>
        <option value="name">이름</option>
        <option value="brand">브랜드</option>
      </select>
      <input
        id="search"
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={localSearchTerm}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-dark me-2" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
