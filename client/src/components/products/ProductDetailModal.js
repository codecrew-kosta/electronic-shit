/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 목록컴포넌트_productItem.js에서 이름을 누르면 상세정보를 보여주는 모달임
 * 사실상 현재 기능은 의미없는 기능, 상품설명값이 추가되면 의미있어지는 페이지임
 * 
 * 상품정보를 기존에 목록창과 동일하게 보여주긴하는데 상품 DB 에 상품 설명값이 추가되면
 * 기본 목록창에선 보여주지 않았던 상품 설명을 여기서 보여주는것으로 수정하면 좋을듯함
 */
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';

const CarDetailModal = () => {

    const { product, setProduct } = useContext(GlobalContext);

    // 굳이 할필요없음, 물론 추가적인 데이터를 받아와야하면 필요하겠지만?

    // // 노드 서버와 통신 get요청
    // async function getdataById() {
    //     try {
    //         const { data } = await axios.get(`http://localhost:3035/carList/${car.id}`);
    //         console.log("id로 불러오기 통신됨");

    //         setCar({ ...getCar, ...data })
    //     } catch (error) {
    //         console.error('오류 발생:', error);
    //     }
    // }
    // getdataById();


    return (<>
        {/* <!-- 모달 검정박스 --> */}
        <div className="modal fade" id="detailModal">
            {/* 모달 흰박스*/}
            <div className="modal-dialog">
                {/* 모달 내용 */}
                <div className="modal-content">

                    {/* <!-- 모달 제목 --> */}
                    <div className="modal-header">
                        <h4 className="modal-title">상품 상세 정보</h4>
                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>

                    {/* <!-- 모달 내용 --> */}
                    <div className="modal-body">
                        <table>
                            <tbody>
                                <tr>
                                    <th>productNo</th>
                                    <td>{product.productNo}</td>
                                </tr>
                                <tr>
                                    <th>category</th>
                                    <td> {product.category}</td>

                                </tr>
                                <tr>
                                    <th>name</th>
                                    <td>{product.name}</td>

                                </tr>
                                <tr>
                                    <th>brand</th>
                                    <td>{product.brand}</td>

                                </tr>
                                <tr>
                                    <th>releasedDate</th>
                                    <td>{product.releasedDate}</td>

                                </tr>
                                <tr>
                                    <th>price</th>
                                    <td>{product.price}</td>

                                </tr>
                                <tr>
                                    <th>photo</th>
                                    <td>{product.photo}</td>

                                </tr>
                                <tr>
                                    <th>salesStatus</th>
                                    <td>{product.salesStatus}</td>

                                </tr>
                                <tr>
                                    <th>stocks</th>
                                    <td>{product.stocks}</td>

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

                    {/* <!-- 모달 버튼 --> */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </>);
}

export default CarDetailModal;