// components/NewProducts.js
import React, { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { GlobalContext } from "../../GlobalContext";

function NewProducts() {
  // GlobalContext에서 필요한 스테이트 받아오기
  const {
    productList,
    setProductList,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
  } = useContext(GlobalContext);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setProductList([]);

      const url = "http://localhost:3001/products/new"; // 최근 상품 요청
      console.log("Fetching new products:", url);

      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Network response was not ok: ${response.status}`);

        const data = await response.json();
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
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="new-products container py-5">
      <h2 className="mb-4">최근 추가된 상품</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row">
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

export default NewProducts;
