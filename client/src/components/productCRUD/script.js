document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let editIndex = -1;
    let currentPage = 1;  // 현재 페이지
    const itemsPerPage = 5;  // 한 페이지에 보여줄 항목 개수

    const productForm = document.getElementById('product-form');
    const productTableBody = document.getElementById('productTableBody');
    const pagination = document.getElementById('pagination');  // 페이지네이션 요소
    const submitButton = document.querySelector('button[type="submit"]');  // 제출 버튼

    // 사진 미리보기 관련 요소
    const photoInput = document.getElementById('photo');
    const otherPhotosInput = document.getElementById('otherPhotos');
    const mainPhotoPreview = document.getElementById('mainPhotoPreview');
    const otherPhotoPreviews = document.getElementById('otherPhotoPreviews');

    // 기타 입력 요소들
    const productNo = document.getElementById('productNo');
    const category = document.getElementById('category');
    const name = document.getElementById('name');
    const brand = document.getElementById('brand');
    const releasedDate = document.getElementById('releasedDate');
    const price = document.getElementById('price');
    const salesStatus = document.getElementById('salesStatus');
    const stocks = document.getElementById('stocks');

    // 사진 미리보기 기능
    const previewPhotos = () => {
        const mainPhotoURL = photoInput.value;
        const otherPhotosURLs = otherPhotosInput.value.split(',').map(url => url.trim());

        // 대표 사진 미리보기
        if (mainPhotoURL) {
            mainPhotoPreview.src = mainPhotoURL;
            mainPhotoPreview.style.display = 'block';
        } else {
            mainPhotoPreview.style.display = 'none';
        }

        // 기타 사진 미리보기
        renderOtherPhotoPreviews();  // 기타 사진 미리보기 갱신
    };

    // 기타 사진 리스트 갱신 함수
    const renderOtherPhotoPreviews = () => {
        const otherPhotosURLs = otherPhotosInput.value.split(',').map(url => url.trim());
        otherPhotoPreviews.innerHTML = '';  // 기존 기타 사진 초기화
        otherPhotosURLs.forEach((url, index) => {
            if (url) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = '기타 사진';
                img.className = 'img-thumbnail';
                img.style.width = '50px';
                img.style.height = '50px';
                img.addEventListener('click', () => swapPhotos(index));  // 클릭 시 사진 교체
                otherPhotoPreviews.appendChild(img);
            }
        });
    };

    // 사진 교체 함수 (대표 사진과 클릭된 기타 사진의 자리 교체)
    const swapPhotos = (clickedIndex) => {
        const otherPhotosURLs = otherPhotosInput.value.split(',').map(url => url.trim());

        // 현재 대표 사진과 클릭된 기타 사진의 자리 바꾸기
        const temp = mainPhotoPreview.src;
        mainPhotoPreview.src = otherPhotosURLs[clickedIndex];
        otherPhotosURLs[clickedIndex] = temp;

        // 교체된 기타 사진을 다시 적용
        otherPhotosInput.value = otherPhotosURLs.join(',');

        // 기타 사진 미리보기 갱신
        renderOtherPhotoPreviews();
        previewPhotos();  // 대표 사진과 기타 사진 미리보기 업데이트
    };

    // 상품 목록을 테이블에 렌더링하는 함수 (페이지네이션 적용)
    const renderProducts = () => {
        productTableBody.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);

        paginatedProducts.forEach((product, index) => {
            productTableBody.innerHTML += `
                <tr>
                    <td>${product.productNo}</td>
                    <td><img src="${product.photo}" alt="Product Image" class="img-thumbnail" width="50" onclick="loadProduct(${index})"></td>
                    <td>${product.category}</td>
                    <td>${product.name}</td>
                    <td>${product.brand}</td>
                    <td>${product.releasedDate}</td>
                    <td>$${product.price}</td>
                    <td>${product.salesStatus}</td>
                    <td>${product.stocks}</td>
                    <td>${product.dateAdded}</td>
                    <td>${product.dateModified}</td>
                    <td>${product.userNo}</td>
                    <td>${product.userId}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">삭제</button>
                    </td>
                </tr>
            `;
        });

        updatePagination();  // 페이지네이션 업데이트
    };

    // 상품 수정 시 입력란에 해당 데이터 불러오기
    window.loadProduct = (index) => {
        const product = products[index];
        productNo.value = product.productNo;
        category.value = product.category;
        name.value = product.name;
        brand.value = product.brand;
        releasedDate.value = product.releasedDate;
        price.value = product.price;
        photoInput.value = product.photo;
        otherPhotosInput.value = product.otherPhotos || '';  // 기타 사진이 없을 경우 빈 값 설정
        salesStatus.value = product.salesStatus;
        stocks.value = product.stocks;

        editIndex = index;
        previewPhotos();  // 사진 미리보기 갱신

        // 수정 버튼으로 변경
        submitButton.textContent = '수정 완료';
    };

    // 상품 추가 또는 수정 처리
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProduct = {
            productNo: productNo.value,
            category: category.value,
            name: name.value,
            brand: brand.value,
            releasedDate: releasedDate.value,
            price: price.value,
            photo: photoInput.value,
            otherPhotos: otherPhotosInput.value,
            salesStatus: salesStatus.value,
            stocks: stocks.value,
            dateAdded: new Date().toLocaleDateString(),
            dateModified: new Date().toLocaleDateString(),
            userNo: 1,  // 임시 값, 실제 값은 서버에서 받아오거나 설정 필요
            userId: 'admin'  // 임시 값
        };

        if (editIndex === -1) {
            products.push(newProduct);  // 새 상품 추가
        } else {
            products[editIndex] = newProduct;  // 기존 상품 수정
            editIndex = -1;

            // 제출 버튼을 다시 '상품 저장'으로 복구
            submitButton.textContent = '상품 저장';
        }

        productForm.reset();
        mainPhotoPreview.style.display = 'none';
        otherPhotoPreviews.innerHTML = '';
        renderProducts();
    });

    // 상품 삭제 처리
    window.deleteProduct = (index) => {
        products.splice(index, 1);  // 상품 배열에서 제거
        renderProducts();  // 테이블 업데이트
    };

    // 페이지네이션 업데이트 함수
    const updatePagination = () => {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        pagination.innerHTML = '';

        // 이전 페이지 버튼
        if (currentPage > 1) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo;</a></li>`;
        } else {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">&laquo;</span></li>`;
        }

        // 페이지 번호
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                pagination.innerHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
            } else {
                pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
            }
        }

        // 다음 페이지 버튼
        if (currentPage < totalPages) {
            pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&raquo;</a></li>`;
        } else {
            pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">&raquo;</span></li>`;
        }
    };

    // 페이지 변경 함수
    window.changePage = (page) => {
        currentPage = page;
        renderProducts();  // 페이지 변경 후 상품 목록 갱신
    };
});
