// components/ProductCard.js
import React, { useEffect, useState } from "react";

function ProductCard({ product }) {
  // 기본 이미지 경로 설정
  const defaultImage = "/images/noImage.jpg";
  const [imageSrc, setImageSrc] = useState(product.photo || defaultImage);

  useEffect(() => {
    const img = new Image();
    img.src = product.photo;

    img.onload = () => {
      setImageSrc(product.photo); // 이미지가 존재할 경우 사용
    };

    img.onerror = () => {
      setImageSrc(defaultImage); // 이미지가 없을 경우 기본 이미지 사용
    };
  }, [product.photo]);

  // 가격에 콤마 추가하는 함수
  const formatPrice = (price) => {
    return price ? new Intl.NumberFormat().format(price) : "";
  };

  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* salesStatus가 1(true)일 때만 Sale 배지를 표시 / saleStatus에 대한 합의 필요(할인 여부 or 비매품 여부), 잠시 주석으로 처리해둠 */}
        {/* {product.salesStatus === 1 && (
          <div
            className="badge bg-dark text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
          >
            Sale
          </div>
        )} */}
        {/* 이미지 표시 */}
        <img className="card-img-top" src={imageSrc} alt={product.name} />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.name}</h5>
            {product.price && <p>{formatPrice(product.price)}원</p>}
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
