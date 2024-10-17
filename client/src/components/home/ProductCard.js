import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 사용

function ProductCard({ product }) {
  const navigate = useNavigate(); // useNavigate로 navigate 함수 생성
  const defaultImage = "/images/noImage.jpg";
  const [imageSrc, setImageSrc] = useState(product.photo || defaultImage);

  useEffect(() => {
    const img = new Image();
    img.src = product.photo;

    img.onload = () => {
      setImageSrc(product.photo);
    };

    img.onerror = () => {
      setImageSrc(defaultImage);
    };
  }, [product.photo]);

  const formatPrice = (price) => {
    return price ? new Intl.NumberFormat().format(price) : "";
  };

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/products/${product.productNo}`); // useNavigate로 페이지 이동
  };

  return (
    <div className="col mb-5">
      <div
        className="card h-100"
        onClick={handleCardClick} // 카드 클릭 이벤트 추가
        style={{ cursor: "pointer" }} // 클릭 가능한 UI로 보이게 스타일 추가
      >
        <img className="card-img-top" src={imageSrc} alt={product.name} />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.name}</h5>
            {product.price && <p>{formatPrice(product.price)}원</p>}
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            {/* 버튼은 남겨두지만, 카드 전체가 클릭되도록 이벤트 핸들러 설정 */}
            <button className="btn btn-outline-dark mt-auto">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
