/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 페이지_output.js에서 넘겨준 product 정보들로 for문 돌려서 li 만듬
 * 이름을 누르면 상세정보창이 뜨고 수정버튼을 누르면 수정모달창,삭제버튼을 누르면 삭제임
 */
import ProductModifyModal from "./ProductModifyModal";

import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import axios from "axios";

const ProductItem = ({ productli }) => {

    const { productList, setProductList } = useContext(GlobalContext);
    const { product, setProduct } = useContext(GlobalContext);

    // async function deleteDate() {
    //     try {
    //         //_id값은 잘 받는거 확인함
    //         // console.log(`삭제 요청: http://localhost:3035/carList/${car._id}`);
    //         // 해당 요청이 가지 않는 문제가 발생
    //         const response = await axios.delete(`http://localhost:3035/carList/${car._id}`);
    //         console.log('delete 요청 성공:', response);
    //         setCarList(response.data);
    //     } catch (error) {
    //         console.error('오류 발생:', error);
    //     }
    // }

    // 노드 서버와 통신 get요청
    async function deleteDate() {
        try {
            const { data } = await axios.delete(`http://localhost:3001/product/${productli.productNo}`);
            console.log(data); // 데이터를 로그로 출력
            setProductList(data); // 가져온 데이터를 상태로 설정
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    return (<tr>
        <td>{productli.productNo}</td>
        <td>{productli.category}</td>
        <td><button data-toggle="modal" data-target="#detailModal"
            onClick={e => { setProduct((pre) => { return { ...pre, ...productli } }) }} type="button" className="btn" style={{ fontWeight: "bolder", color: "darkblue" }}>{productli.name}</button ></td>
        <td>{productli.brand}</td>
        <td>{productli.releasedDate}</td>
        <td>{productli.price}</td>
        <td>{productli.photo}</td>
        <td>{productli.salesStatus}</td>
        <td>{productli.stocks}</td>
        <td>{productli.dateAdded}</td>
        <td>{productli.dateModified}</td>
        <td>{productli.userNo}</td>
        <td>{productli.userId}</td>
        <td><button data-toggle="modal" data-target="#modifyModal"
            onClick={e => { setProduct((pre) => { return { ...pre, ...productli } }) }} type="button" className="btn btn-primary">수정</button></td>
        <td><button onClick={e => deleteDate()} type="button" className="btn btn-danger">삭제</button></td>
    </tr >)
}

export default ProductItem;