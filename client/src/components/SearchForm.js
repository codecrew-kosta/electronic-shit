import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

function SearchForm({ initialValue }) {
  // 초기값을 props로 받기
  const { searchTerm, setSearchTerm } = useContext(GlobalContext); // 검색어 스테이트 가져오기

  // 검색어 입력 핸들러
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 폼 제출 핸들러
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    // 검색어가 비어있으면 제출하지 않음
    if (!searchTerm) return;

    // 검색어가 비어있지 않다면 검색 요청을 보냄
    // 검색어를 쿼리 파라미터로 전달
    const url = `http://localhost:3000/search?query=${encodeURIComponent(
      searchTerm
    )}`;
    window.location.href = url; // 페이지 이동
  };

  return (
    <form className="d-flex" onSubmit={handleSearchSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm || initialValue} // 초기값으로 설정
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-dark me-2" type="submit">
        <i className="bi-search"></i>
      </button>
    </form>
  );
}

export default SearchForm;
