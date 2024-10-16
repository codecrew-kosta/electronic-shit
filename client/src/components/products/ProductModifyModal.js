/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 목록컴포넌트_productItem.js에서 수정을 누르면 상세정보를 보여주는 모달임
 * 이름을 누르면 상세정보창이 뜨고 수정버튼을 누르면 수정모달창,삭제버튼을 누르면 삭제임
 */


import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';

import axios from "axios";


const ProductModifyModal = ({ modalData, modifyOk }) => {

    const { productList, setProductList } = useContext(GlobalContext);
    const { product, setProduct } = useContext(GlobalContext);

    // 노드 서버와 통신 get요청
    // async function modifyCarById() {
    //     try {
    //         const { data } = await axios.post(`http://localhost:3035/carList/${getCar._id}`, getCar);
    //         console.log(data);
    //         setCarList(data);
    //     } catch (error) {
    //         console.error('오류 발생:', error);
    //     }
    // }

    async function modifyProductById() {
        try {
            const { data } = await axios.post(`http://localhost:3035/carList/${product.productNo}`, product);
            console.log(data);
            setProductList(data);
        } catch (error) {
            console.error('오류 발생:', error);
        }
    }


    return (<>
        {/* <!-- The Modal --> */}
        <div className="modal fade" id="modifyModal">
            <div className="modal-dialog">
                <div className="modal-content">

                    {/* <!-- Modal Header --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">상품 정보 수정</h4>
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="modal-body">
                        <table>
                            <tbody>
                                <tr>
                                    <th>productNo</th>
                                    <td>{product.num}</td>
                                </tr>
                                <tr>
                                    <th>category</th>
                                    <td><input type="text" value={product.category}
                                        onChange={e => { setProduct((pre) => { return { ...pre, category: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>name</th>
                                    <td><input type="text" value={product.name}
                                        onChange={e => { setProduct((pre) => { return { ...pre, name: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>brand</th>
                                    <td><input type="text" value={product.brand}
                                        onChange={e => { setProduct((pre) => { return { ...pre, brand: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>releasedDate</th>
                                    <td><input type="text" value={product.releasedDate}
                                        onChange={e => { setProduct((pre) => { return { ...pre, releasedDate: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>price</th>
                                    <td><input type="text" value={product.price}
                                        onChange={e => { setProduct((pre) => { return { ...pre, price: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>photo</th>
                                    <td><input type="text" value={product.pricphotoe}
                                        onChange={e => { setProduct((pre) => { return { ...pre, photo: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>salesStatus</th>
                                    <td><input type="text" value={product.salesStatus}
                                        onChange={e => { setProduct((pre) => { return { ...pre, salesStatus: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>stocks</th>
                                    <td><input type="text" value={product.stocks}
                                        onChange={e => { setProduct((pre) => { return { ...pre, stocks: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>dateAdded</th>
                                    <td>{product.dateAdded}</td>
                                </tr>
                                <tr>
                                    <th>dateModified</th>
                                    <td>{product.dateModified}</td>
                                </tr>
                                <tr>
                                    <th>userNo</th>
                                    <td>{product.userNo}</td>
                                </tr>
                                <tr>
                                    <th>userId</th>
                                    <td>{product.userId}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button onClick={(e) => { modifyProductById() }} type="button" className="btn btn-primary" data-dismiss="modal">수정완료</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </>);
}

export default ProductModifyModal;