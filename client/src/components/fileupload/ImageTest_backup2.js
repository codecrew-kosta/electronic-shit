import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';

function ImageUpload() {
    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviewImg] = useState([]);
    const [uploadedUrls, setUploadedUrls] = useState([]);


    const imgbbApiKey = "d25985e1a346e08945ce7abfbd94f6c2"; // 여기에 본인의 imgbb API 키를 입력하세요.

    //넘겨줄 urls
    const urls = [];

    // 실제로 리턴받은 url 갯수
    let returnUrlNum = 0;

    // 업로드한 파일과 반환받은 url 갯수 체크해주는 함수
    // url 반환이 비동기 적으로 처리해지기 때문에 갯수체크후 다 넘어왔는지를 체크해야한다.
    function uploadNumCheck(data) {
        // 업로드한 파일 갯수
        console.log("postImg: " + postImg.length);

        returnUrlNum++;

        //리턴받은 
        console.log("returnUrlNum: " + returnUrlNum);
        postImg.length == returnUrlNum ? console.log("전송완료") : console.log("대기중");

        //  누적해서 url 값을 저장함
        // setImgUrl((prevImgUrl) => [...prevImgUrl, data]);
        urls.push(data);

        // imgUrl.forEach((item) => {
        //     console.log("url: " + item);
        // })
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
                setUploadedUrls((prevUrls) => [...prevUrls, data.data.url]);
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

        // 모든 이미지 업로드후 상태 확인
        // 잘 추가되서 스테이트로 표현되는거 확인함
        // console.log("imgUrl" + imgUrl);
        // console.log("uploadedUrls" + uploadedUrls);
        console.log(urls);
        // 모든 이미지 업로드 후 urls를 imgUrl에 누적
        // setImgUrl((prevImgUrl) => [...prevImgUrl, ...urls]);  // 누적해서 업데이트
        // setImgUrl([...urls])

        // console.log("imgUrl" + imgUrl);


        // 모든 이미지 업로드 후 상태 초기화
        setPostImg([]);
        setPreviewImg([]);
    }

    function removeImage(index) {
        setPreviewImg((prevUrls) => prevUrls.filter((_, i) => i !== index));
        setPostImg((prevImages) => prevImages.filter((_, i) => i !== index));
        setUploadedUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    }

    return (
        <>
            <h1>다중 파일 업로드 및 미리보기</h1>
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
                            {/* <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" /> */}
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
        </>
    );
}

export default ImageUpload;
