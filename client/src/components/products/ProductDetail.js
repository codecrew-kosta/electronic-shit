import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import axios from 'axios'

function ProductDetail() {
  const { productList, setProductList } = useContext(GlobalContext);

  // 로딩 상태를 관리하는 state 추가
  const [loading, setLoading] = useState(true);

  // 노드 서버와 통신 get요청
  async function getdata() {
    try {
      const { data } = await axios.get('http://localhost:3001/product/1');
      console.log(data); // 데이터를 로그로 출력
      setProductList(data); // 가져온 데이터를 상태로 설정
    } catch (error) {
      console.error('오류 발생:', error);
    } finally {
      setLoading(false); // 데이터 요청 후 로딩 상태 false로 설정
    }
  }

  useEffect(() => {
    getdata();
  }, []); // 빈 배열을 전달해 컴포넌트가 마운트될 때 한 번만 실행

  // 데이터가 로드 중이면 로딩 메시지 표시
  if (loading) {
    return <div>Loading...</div>;
  }

  // 데이터가 없는 경우 대비
  if (!productList || productList.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="Product" />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">{productList[0]?.category}</div>
            <h1 className="display-5 fw-bolder">{productList[0]?.name}</h1>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">{productList[0]?.price + " 원"}</span>
              <span>{productList[0]?.price + " 원"}</span>
            </div>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?</p>
            <div className="d-flex">
              <input className="form-control text-center me-3" id="inputQuantity" type="number" value="1" style={{ maxWidth: '3rem' }} />
              <button className="btn btn-outline-dark flex-shrink-0" type="button">
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
