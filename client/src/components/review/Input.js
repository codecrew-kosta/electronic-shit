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
    const { reviewList, setReviewList } = useContext(GlobalContext);
    const { review, setReview } = useContext(GlobalContext);


    // 노드 서버와 통신 get요청
    async function getdata() {
        console.log("버튼눌림");

        try {
            await axios.post('http://localhost:3001/product/review/', review);
            const { data } = await axios.get('http://localhost:3001/product/review/');
            console.log(data); // 데이터를 로그로 출력
            setReviewList(data); // 가져온 데이터를 상태로 설정
        } catch (error) {
            console.error('오류 발생:', error);
        }
        finally {

        }
    }

    // useEffect(() => {
    //     getdata();
    // }, []); // 빈 배열을 전달해 컴포넌트가 마운트될 때 한 번만 실행


    return (<div className="container">
        <h3>상품 등록</h3>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">rate</span>
            </div>
            <input type="text" className="form-control" value={review.rate}
                onChange={e => { setReview((pre) => { return { ...pre, rate: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">commentText</span>
            </div>
            <input type="text" className="form-control" value={review.commentText}
                onChange={e => { setReview((pre) => { return { ...pre, commentText: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">userNo</span>
            </div>
            <input type="text" className="form-control" value={review.userNo}
                onChange={e => { setReview((pre) => { return { ...pre, userNo: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">userId</span>
            </div>
            <input type="date" className="form-control" value={review.userId}
                onChange={e => { setReview((pre) => { return { ...pre, userId: e.target.value } }) }} />
        </div>
        <div className="input-group mb-0 input-group-lg">
            <div className="input-group-prepend">
                <span className="input-group-text">productId</span>
            </div>
            <input type="number" className="form-control" value={review.productId}
                onChange={e => { setReview((pre) => { return { ...pre, productId: e.target.value } }) }} />
        </div>

        <div className="input-group mb-0 input-group-lg">
            <button onClick={e => {
                getdata();
            }} type="button" className="btn btn-primary btn-block">SAVE</button>
        </div>
    </div>);
}

export default Input;