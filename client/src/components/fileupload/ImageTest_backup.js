import { useState } from "react";

function ImageUpload() {
    // 전송할 이미지 상태
    const [postImg, setPostImg] = useState([]);
    // 미리보기 이미지 상태
    const [previewImg, setPreviewImg] = useState([]);

    function uploadFile(event) {
        // 파일 배열은 이벤트로 넘어온 파일 객체
        let fileArr = event.target.files;

        // 기존 이미지를 가져오고 새로 선택한 파일을 추가하여 상태 업데이트
        setPostImg((prevImages) => [...prevImages, ...Array.from(fileArr)]);

        // FileReader 객체를 사용하여 선택한 파일의 URL을 생성
        Array.from(fileArr).forEach((file) => {
            let fileRead = new FileReader();
            fileRead.onload = function () {
                // 미리보기 배열에 URL 추가
                setPreviewImg((prevUrls) => [...prevUrls, fileRead.result]);
            };
            fileRead.readAsDataURL(file); // 파일 읽기 시작
        });
    }

    function removeImage(index) {
        // 선택된 이미지 삭제
        setPreviewImg((prevUrls) => prevUrls.filter((_, i) => i !== index));
        setPostImg((prevImages) => prevImages.filter((_, i) => i !== index)); // postImg에서도 제거
    }

    return (
        <>
            <h1>다중 파일 업로드 및 미리보기</h1>
            <input
                type="file"
                multiple
                onChange={uploadFile}
                style={{ display: "none" }} // 기본 인풋 숨기기
                id="file-input" // 인풋에 id 추가
            />
            <label htmlFor="file-input" style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", display: "inline-block" }}>
                파일 선택
            </label>

            {/* 파일 갯수와 파일명 표시 */}
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
        </>
    );
}

export default ImageUpload;
