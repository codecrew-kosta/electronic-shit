/**
 * 2024.10.15_남윤호
 * 상품 상세페이지_http:/localhost:3001/product/id:? 파라미터 요청시
 *
 * 여기서 ajax요청을 하면서 넘어온 id가 있다 가정하고 임의의 값을 넣어놨음
 *
 * 2024-10-17 한채경 useParams로 id값을 받아오도록 코드 추가, 수정
 * input에 value 썼다고 warning 뜨는데 어카죠 수정할까요
 */
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams 사용

function ProductDetail() {
  const { productList, setProductList } = useContext(GlobalContext);

  // 로딩 상태를 관리하는 state 추가
  const [loading, setLoading] = useState(true);
  // 수량을 관리할 state 추가
  const [quantity, setQuantity] = useState(1);

  const { no } = useParams(); // URL에서 id 값을 가져옴

  // 노드 서버와 통신 get요청
  async function getdata() {
    try {
      const { data } = await axios.get(`http://localhost:3001/product/${no}`);
      console.log(data); // 데이터를 로그로 출력
      setProductList(data); // 가져온 데이터를 상태로 설정
    } catch (error) {
      console.error("오류 발생:", error);
    } finally {
      setLoading(false); // 데이터 요청 후 로딩 상태 false로 설정
    }
  }

  useEffect(
    (res, req) => {
      getdata();
    },
    [no]
  ); // 빈 배열을 전달해 컴포넌트가 마운트될 때 한 번만 실행

  // 데이터가 로드 중이면 로딩 메시지 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  // 데이터가 없는 경우 대비
  if (!productList || productList.length === 0) {
    return <div>No products available.</div>;
  }

  // 수량을 1 이상으로만 설정하도록 변경
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  // 장바구니에 아이템을 추가하는 함수
  const addToCart = async () => {
    const userNo = 3; // 임시로 userNo를 3으로 설정 (로그인 기능 구현 후 수정 필요)
    try {
      const response = await axios.post("http://localhost:3001/cart", {
        userNo,
        productNo: productList[0].productNo, // 현재 상품의 productNo 사용
        quantity,
      });
      console.log("장바구니에 추가되었습니다:", response.data);
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생:", error);
    }
  };

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
              alt="Product"
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">{productList[0]?.category}</div>
            <h1 className="display-5 fw-bolder">{productList[0]?.name}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">
                {productList[0]?.price + " 원"}
              </span>
              <span>{productList[0]?.price + " 원"}</span>
            </div>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium at dolorem quidem modi. Nam sequi consequatur
              obcaecati excepturi alias magni, accusamus eius blanditiis
              delectus ipsam minima ea iste laborum vero?
            </p>
            <div className="d-flex">
              <input
                className="form-control text-center me-3"
                id="inputQuantity"
                type="number"
                value={quantity} // 상태값 사용
                onChange={handleQuantityChange} // 값이 변경될 때 state 업데이트
                style={{ maxWidth: "3rem" }}
                min="1" // input 태그의 최소값 설정
              />
              <button
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
                onClick={addToCart} // 버튼 클릭 시 장바구니에 추가하는 함수 호출
              >
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
