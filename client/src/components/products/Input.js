/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 입력컴포넌트_상품정보입력함
 * 파일은 일단 텍스트 형식으로 집어넣는걸로 만듬, 파일 업로드 구현하면 수정할것
 * 유저no,유저id는 직접 넣는방식으로 일단 만듬, 로그인 구현되면 수정할것
 */

import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';

import axios from 'axios'
import "./Input.css"

const Input = () => {
    const { productList, setProductList } = useContext(GlobalContext);
    const { product, setProduct } = useContext(GlobalContext);


    // 로딩 상태를 관리하는 state 추가
    const [loading, setLoading] = useState(true);

    // 데이터가 로드 중이면 로딩 메시지 표시
    if (loading) {
        return <div>Loading...</div>;
    }

    // 데이터가 없는 경우 대비
    if (!productList || productList.length === 0) {
        return <div>No products available.</div>;
    }


    // async function addData() {
    //     try {
    //         const response = await axios.post('http://localhost:3035/carList/', getCar, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log('POST 요청 성공:', response.data);
    //         setCarList(response.data);
    //     } catch (error) {
    //         console.error('오류 발생:', error);
    //     }
    // }



    // 노드 서버와 통신 get요청
    async function getdata() {
        try {
            const { data } = await axios.post('http://localhost:3001/product/');
            console.log(data); // 데이터를 로그로 출력
            setProductList(data); // 가져온 데이터를 상태로 설정
        } catch (error) {
            console.error('오류 발생:', error);
        } finally {
            setLoading(false); // 데이터 요청 후 로딩 상태 false로 설정
        }
    }

    // useEffect(() => {
    //     getdata();
    // }, []); // 빈 배열을 전달해 컴포넌트가 마운트될 때 한 번만 실행


    return (<div className="container">
        <h3>상품 등록</h3>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">category</span>
            </div>
            <input type="text" className="form-control" value={product.category}
                onChange={e => { setProduct((pre) => { return { ...pre, category: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">name</span>
            </div>
            <input type="text" className="form-control" value={product.name}
                onChange={e => { setProduct((pre) => { return { ...pre, name: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">brand</span>
            </div>
            <input type="text" className="form-control" value={product.brand}
                onChange={e => { setProduct((pre) => { return { ...pre, brand: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">releasedDate</span>
            </div>
            <input type="date" className="form-control" value={product.releasedDate}
                onChange={e => { setProduct((pre) => { return { ...pre, releasedDate: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">price</span>
            </div>
            <input type="number" className="form-control" value={product.price}
                onChange={e => { setProduct((pre) => { return { ...pre, price: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">price</span>
            </div>
            <input type="text" className="form-control" value={product.photo}
                onChange={e => { setProduct((pre) => { return { ...pre, photo: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">salesStatus</span>
            </div>
            <input type="number" className="form-control" value={product.salesStatus}
                onChange={e => { setProduct((pre) => { return { ...pre, salesStatus: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">stocks</span>
            </div>
            <input type="number" className="form-control" value={product.stocks}
                onChange={e => { setProduct((pre) => { return { ...pre, stocks: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">userNo</span>
            </div>
            <input type="number" className="form-control" value={product.userNo}
                onChange={e => { setProduct((pre) => { return { ...pre, userNo: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">userId</span>
            </div>
            <input type="text" className="form-control" value={product.userId}
                onChange={e => { setProduct((pre) => { return { ...pre, userId: e.target.value } }) }} />
        </div>

        <div className="input-group mb-0 input-group-lg">
            <button onClick={e => {
                getdata();
            }} type="button" className="btn btn-primary btn-block">SAVE</button>
        </div>
    </div>);
}

export default Input;