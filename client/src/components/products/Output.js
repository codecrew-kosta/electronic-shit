/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 목록컴포넌트_상품정보목록 보여줌
 * 
 * 단순히 파일을 보여주는 곳임, 모달로 되어있기 때문에 수정은 따로 모달창에서 이루어지며
 * productItem.js를 통해 행을 구현하기 때문에 행의 구현을 보려면 해당 파일을 봐야됨
 */
import ProductItem from "./ProductItem";

import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';

import axios from 'axios'

const Output = () => {
    const { productList, setProductList } = useContext(GlobalContext);
    const { product, setProduct } = useContext(GlobalContext);


    // 로딩 상태를 관리하는 state 추가
    const [loading, setLoading] = useState(true);

    // 컴포넌트가 마운트될 때 데이터 가져오기
    // 이거 안해주면 무한루프돔
    // 이게 상단으로 와서 먼저 시행되고 아래의 데이터 로드쪽이 작동하는거임
    useEffect(() => {
        getdata(); // 데이터 가져오기 호출
    }, []);

    // 데이터가 로드 중이면 로딩 메시지 표시
    if (loading) {
        return <div>Loading...</div>;
    }

    // 데이터가 없는 경우 대비
    if (!productList || productList.length === 0) {
        return <div>No products available.</div>;
    }

    // 노드 서버와 통신 get요청
    async function getdata() {
        try {
            const { data } = await axios.get('http://localhost:3001/product/');
            console.log(data); // 데이터를 로그로 출력
            setProductList(data); // 가져온 데이터를 상태로 설정
        } catch (error) {
            console.error('오류 발생:', error);
        } finally {
            setLoading(false); // 데이터 요청 후 로딩 상태 false로 설정
        }
    }



    // 노드 서버와 통신 get요청
    // async function getdata() {
    //     try {
    //         const { data } = await axios.get('http://localhost:3035/carList/');
    //         setCarList(data); // 가져온 데이터를 상태로 설정
    //     } catch (error) {
    //         console.error('오류 발생:', error);
    //     }
    // }



    // 여기서는 배열을 돌리면서 작업, 주의점은 key값을 넘겨줄것
    const makeRow = () => {
        return (
            productList.map((product) => {
                return <ProductItem
                    key={product.productNo}
                    product={product} />
            })
        );
    }

    return (<div className="container">
        <h2>등록된 상품 목록</h2>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>productNo</th>
                    <th>category</th>
                    <th>name</th>
                    <th>brand</th>
                    <th>releasedDate</th>
                    <th>price</th>
                    <th>photo</th>
                    <th>salesStatus</th>
                    <th>stocks</th>
                    <th>dateAdded</th>
                    <th>dateModified</th>
                    <th>userNo</th>
                    <th>userId</th>
                </tr>
            </thead>
            <tbody>
                {makeRow()}
            </tbody>
        </table>
    </div>);
}

export default Output;