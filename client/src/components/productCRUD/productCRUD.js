import React, { useState, useEffect } from "react"; // useState 추가
import axios from "axios";

function ProductCRUD() {

    // 상품 객체 스테이트
    const [product, setProduct] = useState({
        productNo: "",
        category: "",
        name: "",
        brand: "",
        releasedDate: "",
        price: 0,
        photo: "",
        salesStatus: 0,
        stocks: 0,
        dateAdded: "",
        dateModified: "",
        userNo: 17,
        userId: "whatcpu",
    });


    // 상품 목록 스테이트
    const [productList, setProductList] = useState([]);

    // 반환되는 사진 url 
    const [postImg, setPostImg] = useState("http://localhost:3000/images/noImage.jpg");

    // 이미지 호스팅 키
    const imgbbApiKey = "d25985e1a346e08945ce7abfbd94f6c2"; // 여기에 본인의 imgbb API 키를 입력하세요.


    useEffect(() => {
        console.log("Updated postImg:", postImg);
    }, [postImg]);


    async function uploadfile(file) {
        // console.log("이벤트 감지됨");

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
                setPostImg(data.data.url);
                console.log("postImg", postImg);

                setProduct((pre) => { return { ...pre, photo: data.data.url } })

                console.log("productphoto", data.data.url);

            } else {
                console.error("Error uploading image:", data.error.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }



    // 상품 추가 이벤트 핸들러
    const addProduct = async () => {
        try {
            console.log("입력된 요소" + JSON.stringify(product));

            // axios로 POST 요청을 보냄
            const { data } = await axios.post('http://localhost:3001/product/', product, {
                headers: {
                    'Content-Type': 'application/json',  // 요청 헤더에 JSON 타입 명시
                }
            });

            // 응답 데이터 확인 및 상태 업데이트
            if (!data) {
                throw new Error("서버에서 데이터가 반환되지 않았습니다.");
            } else {
                console.log("가져온 데이터:", data);  // 서버로부터 반환된 데이터를 로그로 출력
                // setProductList(data);  // 리스트 업데이트가 필요하면 이 부분 활성화
            }
        } catch {
            console.log("에러남");

        }

        try {
            // axios로 POST 요청을 보냄
            const { data } = await axios.get('http://localhost:3001/product/', {
                headers: {
                    'Content-Type': 'application/json',  // 요청 헤더에 JSON 타입 명시
                }
            });

            // 응답 데이터 확인 및 상태 업데이트
            if (!data) {
                throw new Error("서버에서 데이터가 반환되지 않았습니다.");
            } else {
                console.log("가져온 데이터:", data);  // 서버로부터 반환된 데이터를 로그로 출력
                setProductList(data);  // 리스트 업데이트가 필요하면 이 부분 활성화
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {/* CRUD 섹션 */}
            <section className="0">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row mb-4">
                        <div className="col-md-12">
                            {/* <h2 className="mb-4">상품 추가/수정</h2> */}
                            <form id="product-form">
                                <div className="row">
                                    {/* 왼쪽: 사진 입력 및 미리보기 */}
                                    <div className="col-md-6">
                                        <h4 className="mb-xl-4 ">사진 입력</h4>
                                        <div className="mb-3">

                                            <div className="input-group">
                                                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => { uploadfile(e.target.files[0]) }}></input>
                                            </div>
                                            <div className="text-center py-md-3">
                                                <img className="rounded img-fluid " src={postImg} ></img>
                                            </div>
                                        </div>


                                    </div>
                                    {/* 오른쪽: 기타 항목 입력 */}
                                    <div className="col-md-6">
                                        <h4 className="mb-xl-4">상품 정보</h4>

                                        <div class="input-group mb-3">

                                            <label class="input-group-text" for="inputGroupSelect01">카테고리</label>
                                            <select class="form-select" id="inputGroupSelect01" onChange={e => { setProduct((pre) => { return { ...pre, category: e.target.value } }) }}>
                                                <option value="" selected disabled>카테고리 선택</option>
                                                <option value="스마트폰">스마트폰</option>
                                                <option value="태블릿">태블릿</option>
                                                <option value="스마트워치">스마트워치</option>
                                                <option value="노트북">노트북</option>
                                                <option value="헤드폰">헤드폰</option>
                                                <option value="블루투스 스피커">블루투스 스피커</option>
                                                <option value="전자책 리더기">전자책 리더기</option>
                                                <option value="디지털 카메라">디지털 카메라</option>
                                                <option value="게임 노트북">게임 노트북</option>
                                                <option value="게임 콘솔">게임 콘솔</option>
                                            </select>
                                        </div>


                                        <div class="input-group mb-3">

                                            <label class="input-group-text" for="inputGroupSelect02">브랜드</label>
                                            <select class="form-select" id="inputGroupSelect02" onChange={e => { setProduct((pre) => { return { ...pre, brand: e.target.value } }) }}>
                                                <option value="" selected disabled>브랜드 선택</option>
                                                <option value="Samsung">Samsung</option>
                                                <option value="Apple">Apple</option>
                                                <option value="Sony">Sony</option>
                                                <option value="Microsoft">Microsoft</option>
                                                <option value="Ultimate Ears">Ultimate Ears</option>
                                                <option value="Amazon">Amazon</option>
                                                <option value="Kobo">Kobo</option>
                                                <option value="Razer">Razer</option>
                                                <option value="ASUS">ASUS</option>
                                            </select>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor="brand" className="form-label">
                                                상품명
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                required=""
                                                onChange={e => { setProduct((pre) => { return { ...pre, name: e.target.value } }) }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="releasedDate" className="form-label">
                                                출시일
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="releasedDate"
                                                required=""
                                                onChange={e => { setProduct((pre) => { return { ...pre, releasedDate: e.target.value } }) }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">
                                                가격
                                            </label>

                                            <input type="number" class="form-control" list="datalistOptions" id="exampleDataList" placeholder="선택 혹은 입력"
                                                onChange={e => { setProduct((pre) => { return { ...pre, price: e.target.value } }) }}
                                            ></input>
                                            <datalist id="datalistOptions" >
                                                <option value="100000" />
                                                <option value="200000" />
                                                <option value="300000" />
                                                <option value="400000" />
                                                <option value="500000" />
                                            </datalist>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="salesStatus" className="form-label">
                                                판매 상태
                                            </label>
                                            <select class="form-select" aria-label="Default select example" onChange={e => { setProduct((pre) => { return { ...pre, salesStatus: Number(e.target.value) } }) }}>

                                                <option value="1">판매</option>
                                                <option value="0">미판매</option>

                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="stocks" className="form-label">
                                                재고
                                            </label>
                                            <input type="number" class="form-control" list="datalistOptions2" id="exampleDataList" placeholder="선택 혹은 입력" onChange={e => { setProduct((pre) => { return { ...pre, stocks: Number(e.target.value) } }) }}></input>
                                            <datalist id="datalistOptions2">
                                                <option value="1" />
                                                <option value="5" />
                                                <option value="10" />
                                                <option value="100" />
                                            </datalist>
                                        </div>
                                        <div className="d-md-flex justify-content-md-end">
                                            <button type="button" className="btn btn-dark" onClick={e => { addProduct() }}>
                                                상품 저장
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="mb-xl-4">상품 목록</h4>
                            <table className="table table-hover" style={{ tableLayout: 'fixed' }}>
                                <thead>
                                    <tr>
                                        <th>상품 번호</th>
                                        <th>사진</th>
                                        <th>카테고리</th>
                                        <th>상품명</th>
                                        <th>브랜드</th>
                                        <th>출시일</th>
                                        <th>가격</th>
                                        <th>판매 상태</th>
                                        <th>재고</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="productTableBody">
                                    {productList.map((product) => {
                                        return (
                                            <tr key={product.productNo}>
                                                <td class="align-middle">{product.productNo}</td>
                                                <td>
                                                    <img className="w-75" src={product.photo}></img>
                                                </td>
                                                <td class="align-middle">{product.category}</td>
                                                <td class="align-middle">{product.name}</td>
                                                <td class="align-middle">{product.brand}</td>
                                                <td class="align-middle">{product.releasedDate}</td>
                                                <td class="align-middle">{product.price}</td>
                                                <td class="align-middle">{product.salesStatus}</td>
                                                <td class="align-middle">{product.stocks}</td>
                                                <td class="align-middle">
                                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                        <button type="button" className="btn btn-secondary">수정</button>
                                                        <button type="button" className="btn btn-dark">삭제</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                        {/* 페이지네이션 추가 */}
                        <nav>
                            <ul id="pagination" className="pagination justify-content-center">
                                {/* 페이지 버튼들이 여기에 추가됩니다 */}
                            </ul>
                        </nav>
                    </div>
                </div >
            </section >

        </>
    )
}

export default ProductCRUD;