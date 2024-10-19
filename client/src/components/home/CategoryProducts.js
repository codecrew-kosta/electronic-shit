import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination"; // Pagination 컴포넌트 가져오기
import { GlobalContext } from "../../GlobalContext";

function CategoryProducts() {
  // GlobalContext에서 필요한 스테이트 받아오기
  const {
    productList,
    setProductList,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
  } = useContext(GlobalContext);

  const { categoryName } = useParams();
  let itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // 로딩 시작
      setProductList([]); // 새로운 카테고리로 이동할 때 데이터 초기화

      if (!categoryName) {
        console.error("유효하지 않은 카테고리 이름:", categoryName);
        setLoading(false); // 카테고리 이름이 잘못되었을 때 로딩 해제
        return;
      }

      const encodedCategory = encodeURIComponent(categoryName);
      const url =
        encodedCategory === encodeURIComponent("전체")
          ? `http://localhost:3001/dummydata`
          : `http://localhost:3001/products?category=${encodedCategory}`;

      console.log("Fetching products for category:", encodedCategory);

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
          setProductList(data.data); // fetchedData는 배열로 받아옴
        } else {
          console.error("잘못된 데이터 구조:", data);
        }
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      } finally {
        setLoading(false); // 데이터 가져오기가 끝나면 로딩 해제
      }
    };

    fetchProducts();
  }, [categoryName]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="category-products container py-5">
      <h2 className="mb-4">{categoryName} 상품</h2>
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

export default CategoryProducts;
