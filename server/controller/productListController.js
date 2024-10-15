/**
 * 2024_10_15_남윤호 product CRUD 작업완료
 * 
 * DAO에서 일련의 작업을 거친뒤 결과를 제이슨으로 반환해주는 코드이다.
 */


const productDAO = require('../models/productModel');

module.exports.getAllProducts = async (req, res) => {
    try {
        const productList = await productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports.getProductById = async (req, res) => {

    const id = req.params.id

    try {
        const product = await productDAO.findById(id)
        res.status(200).json(product)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}


module.exports.createProduct = async (req, res) => {

    const newProduct = {
        category: req.body.category,
        name: req.body.name,
        brand: req.body.brand,
        releasedDate: req.body.releasedDate,
        price: req.body.price,
        photo: req.body.photo,
        salesStatus: req.body.salesStatus,
        stocks: req.body.stocks,
        // dateAdded: req.body.dateAdded,
        // dateModified: req.body.dateModified,
        userNo: req.body.userNo,
        userId: req.body.userId,
    }

    try {
        await productDAO.create(newProduct);
        const productList = productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports.modifyProductById = async (req, res) => {

    const id = req.params.id;
    const updateProduct = {
        productNo: id,
        category: req.body.category,
        name: req.body.name,
        brand: req.body.brand,
        releasedDate: req.body.releasedDate,
        price: req.body.price,
        photo: req.body.photo,  // 같은 처리
        salesStatus: req.body.salesStatus,
        stocks: req.body.stocks
    };

    try {
        await productDAO.update(updateProduct);
        const productList = await productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

module.exports.deleteProductById = async (req, res) => {

    const id = req.params.id;

    try {
        await productDAO.delete(id);
        const productList = await productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}