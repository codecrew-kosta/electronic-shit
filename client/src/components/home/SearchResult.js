import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { GlobalContext } from "../../GlobalContext";
import SearchForm from "../SearchForm"; // SearchForm 컴포넌트 가져오기

function SearchResult() {
  const {
    productList,
    setProductList,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
  } = useContext(GlobalContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  let itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setProductList([]);

      if (!query) {
        console.error("유효하지 않은 검색어:", query);
        setLoading(false);
        return;
      }

      const url = `http://localhost:3001/search?query=${encodeURIComponent(
        query
      )}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && Array.isArray(data.data)) {
          setProductList(data.data);
        } else {
          console.error("잘못된 데이터 구조:", data);
        }
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="category-products container py-5">
      <h2 className="mb-4">
        {query} 키워드 검색 결과: {productList.length}건
      </h2>

      <SearchForm initialValue={query} />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row mt-4">
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <div
                className="col-6 col-md-4 col-lg-3 mb-4"
                key={product.productNo}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default SearchResult;
