/**
 * 2024_10_14_남윤호 product CRUD 작업중_ ProductRouter
 * 
 * url 요청에 따른 get 요청과 post 요청, put 요청, delete 요청을 처리한다.
 */

const express = require("express")
const router = express.Router();

//컨트롤러에서 정의된 메소드들 라우터로 가져와서 관리
const { getAllProducts, getProductById, createProduct, deleteProductById, modifyProductById } = require('../controller/productListController')

//라우터 메소드 체이닝
router.route('/')
    .get(getAllProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .post(modifyProductById)
    .delete(deleteProductById);

module.exports = router;