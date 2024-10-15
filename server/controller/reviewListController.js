/**
 * 2024_10_15_남윤호 review CRUD 완료
 * 
 * DAO에서 일련의 작업을 거친뒤 결과를 제이슨으로 반환해주는 코드이다.
 */


const reviewDAO = require('../models/reviewModel');

module.exports.getAllReviews = async (req, res) => {
    try {
        const reviewList = await reviewDAO.findAll();
        res.status(200).json(reviewList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports.getReviewById = async (req, res) => {

    const id = req.params.id

    try {
        const review = await reviewDAO.findById(id)
        res.status(200).json(review)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}


module.exports.createReview = async (req, res) => {

    const newReview = {
        rate: req.body.rate,
        commentText: req.body.commentText,
        userNo: req.body.userNo,
        userId: req.body.userId,
        productId: req.body.productId,
    }

    try {
        await reviewDAO.create(newReview);
        const reviewList = reviewDAO.findAll();
        res.status(200).json(reviewList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports.modifyReviewById = async (req, res) => {

    const id = req.params.id;
    const updateReview = {
        CommentNo: id,
        rate: req.body.rate,
        commentText: req.body.commentText,
    };

    try {
        await reviewDAO.update(updateReview);
        const reviewList = await reviewDAO.findAll();
        res.status(200).json(reviewList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports.deleteReviewById = async (req, res) => {

    const id = req.params.id;

    try {
        await reviewDAO.delete(id);
        const reviewList = await reviewDAO.findAll();
        res.status(200).json(reviewList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}