// components/ProductCard.js
import React from "react";

function ProductCard({ product }) {
  // 기본 이미지 경로 설정
  const defaultImage = "/images/noimage.jpg";
  // console.dir(product);

  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* salesStatus가 1(true)일 때만 Sale 배지를 표시 */}
        {product.salesStatus === 1 && (
          <div
            className="badge bg-dark text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            Sale
          </div>
        )}
        {/* 이미지가 없을 경우 기본 이미지(noimage.jpg)를 사용 */}
        <img
          className="card-img-top"
          src={product.photo ? product.photo : defaultImage}
          alt={product.name}
        />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.name}</h5>
            {product.price && <p>{product.price}$</p>}
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <a className="btn btn-outline-dark mt-auto" href="#">
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
