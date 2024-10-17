/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 목록컴포넌트_reviewItem.js에서 수정을 누르면 상세정보를 보여주는 모달임
 * 이름을 누르면 상세정보창이 뜨고 수정버튼을 누르면 수정모달창,삭제버튼을 누르면 삭제임
 */


import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';

import axios from "axios";


const ReviewModifyModal = ({ modalData, modifyOk }) => {

    const { reviewList, setReviewList } = useContext(GlobalContext);
    const { review, setReview } = useContext(GlobalContext);

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

    async function modifyReviewById() {
        try {
            const { data } = await axios.post(`http://localhost:3001/product/review/${review.CommentNo}`, review);
            console.log(data);
            setReviewList(data);
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
                                    <th>CommentNo</th>
                                    <td>{review.CommentNo}</td>
                                </tr>
                                <tr>
                                    <th>rate</th>
                                    <td><input type="text" value={review.rate}
                                        onChange={e => { setReview((pre) => { return { ...pre, rate: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>commentText</th>
                                    <td><input type="text" value={review.commentText}
                                        onChange={e => { setReview((pre) => { return { ...pre, commentText: e.target.value } }) }} /></td>
                                </tr>
                                <tr>
                                    <th>dateAdded</th>
                                    <td>{review.dateAdded}</td>
                                </tr>
                                <tr>
                                    <th>dateModified</th>
                                    <td>{review.dateModified}</td>
                                </tr>
                                <tr>
                                    <th>userNo</th>
                                    <td>{review.userNo}</td>
                                </tr>
                                <tr>
                                    <th>userId</th>
                                    <td>{review.userId}</td>
                                </tr>
                                <tr>
                                    <th>productId</th>
                                    <td>{review.productId}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="modal-footer">
                        <button onClick={(e) => { modifyReviewById() }} type="button" className="btn btn-primary" data-dismiss="modal">수정완료</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </>);
}

export default ReviewModifyModal;