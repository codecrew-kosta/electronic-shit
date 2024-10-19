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

    // 노드 서버와 통신 get요청
    async function getdata() {
        try {
            await axios.post('http://localhost:3001/product/', product);
            const { data } = await axios.get('http://localhost:3001/product/', product);
            console.log(data); // 데이터를 로그로 출력
            setProductList(data); // 가져온 데이터를 상태로 설정
        } catch (error) {
            console.error('오류 발생:', error);
        }

    }

    // 이미지 파일 업로드 처리 부분------------------------------------------------

    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);

    const imgbbApiKey = "d25985e1a346e08945ce7abfbd94f6c2"; // 여기에 본인의 imgbb API 키를 입력하세요.

    //넘겨줄 urls
    const urls = [];

    // 실제로 리턴받은 url 갯수
    let returnUrlNum = 0;

    // 업로드한 파일과 반환받은 url 갯수 체크해주는 함수
    function uploadNumCheck(data) {
        console.log("postImg: " + postImg.length);

        returnUrlNum++;

        console.log("returnUrlNum: " + returnUrlNum);
        postImg.length === returnUrlNum ? console.log("전송완료") : console.log("대기중");

        // 누적해서 url 값을 저장함
        urls.push(data);
    }

    function uploadFile(event) {
        let fileArr = event.target.files;
        setPostImg((prevImages) => [...prevImages, ...Array.from(fileArr)]);

        Array.from(fileArr).forEach((file) => {
            let fileRead = new FileReader();
            fileRead.onload = function () {
                setPreviewImg((prevUrls) => [...prevUrls, fileRead.result]);
            };
            fileRead.readAsDataURL(file);
        });
    }

    async function uploadToImgBB(file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                console.log("Uploaded Image URL:", data.data.url);
                uploadNumCheck(data.data.url);
            } else {
                console.error("Error uploading image:", data.error.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function handleUpload() {
        for (const file of postImg) {
            await uploadToImgBB(file); // 선택된 모든 파일을 차례로 업로드
        }

        console.log(urls);

        setProduct((pre) => { return { ...pre, photo: urls } });
        setPostImg([]);
        setPreviewImg([]);
    }

    function removeImage(index) {
        setPreviewImg((prevUrls) => prevUrls.filter((_, i) => i !== index));
        setPostImg((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    // 이미지 파일 업로드 처리 부분------------------------------------------------


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
                <span className="input-group-text">photo</span>
            </div>

            <input
                type="file"
                multiple
                onChange={uploadFile}
                style={{ display: "none" }}
                id="file-input"
            />
            <label htmlFor="file-input" style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", display: "inline-block" }}>
                파일 선택
            </label>

            <div style={{ marginTop: "20px" }}>
                <h2>선택된 파일: {postImg.length}개</h2>
                <ul>
                    {postImg.map((file, i) => (
                        <li key={i}>{file.name}</li>
                    ))}
                </ul>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", border: "1px solid" }}>
                {previewImg.map((imgSrc, i) => (
                    <div key={i} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                        <button
                            type="button"
                            onClick={() => removeImage(i)}
                            style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none', cursor: 'pointer' }}>
                            X
                        </button>
                        <img alt={imgSrc} src={imgSrc} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    </div>
                ))}
            </div>

            <button
                onClick={handleUpload}
                style={{ marginTop: "20px", padding: "10px 15px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                전송하기
            </button>


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