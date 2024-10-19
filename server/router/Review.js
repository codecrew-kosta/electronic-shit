/**
 * 2024.10.15_남윤호_리뷰 CRUD_완료
 */
const express = require("express")
const router = express.Router();

//컨트롤러에서 정의된 메소드들 라우터로 가져와서 관리
const { getAllReviews, getReviewById, createReview, deleteReviewById, modifyReviewById } = require('../controller/reviewListController')

//라우터 메소드 체이닝
router.route('/')
    .get(getAllReviews)
    .post(createReview);

router.route('/:id')
    .get(getReviewById)
    .post(modifyReviewById)
    .delete(deleteReviewById);

module.exports = router;