import React, { createContext, useState } from 'react';

// Context 생성
export const GlobalContext = createContext();

// Provider 컴포넌트
export const GlobalProvider = ({ children }) => {

    // 상품 목록 스테이트
    const [productList, setProductList] = useState([]);

    // 리뷰 목록 스테이트
    const [reviewList, setReviewList] = useState([]);

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
        userNo: 0,
        userId: ""
    });

    // 리뷰 객체 스테이트
    const [review, setReview] = useState({
        CommentNo: 0,
        rate: 0,
        commentText: "",
        dateAdded: "",
        dateModified: "",
        userNo: 0,
        userId: "",
        productId: 0
    });

    return (
        <GlobalContext.Provider value={{
            productList, setProductList,
            reviewList, setReviewList,
            product, setProduct,
            review, setReview
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
