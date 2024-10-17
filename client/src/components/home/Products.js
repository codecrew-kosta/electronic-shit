// components/home/Products.js
import React, { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { GlobalContext } from "../../GlobalContext";

function Products() {
  const { productList, setProductList, currentPage, setCurrentPage } =
    useContext(GlobalContext); // currentPage와 setCurrentPage 추가
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:3001/recommended")
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <h2 className="mb-4">추천 상품</h2>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {currentItems.length > 0 ? (
            currentItems.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default Products;
