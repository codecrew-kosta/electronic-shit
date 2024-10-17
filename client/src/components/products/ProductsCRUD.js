/**
 * 2024.10.16_남윤호 
 * 상품 CRUD 페이지_컴포넌트들 가져와서 합쳐줌
 * 상품수정은 모달창에서 이루어짐
 */
import './App.css';

import Input from './Input';
import Output from './Output';
import ProductDetailModal from './ProductDetailModal';
import ProductModifyModal from './ProductModifyModal';

const ProductsCRUD = () => {
    //  상위에서 전역 스테이트 설정을 해줘서 여기서는 따로 해줄필요없을듯?
    return (
        <>
            <Input />
            <Output />
            <ProductDetailModal />
            <ProductModifyModal />
        </>
    );
}

export default ProductsCRUD;