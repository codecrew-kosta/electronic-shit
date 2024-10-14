/**
 * 2024_10_14_남윤호 product CRUD 작업중_controller
 * 
 * DAO에서 일련의 작업을 거친뒤 결과를 제이슨으로 반환해주는 코드이다.
 */


const productDAO = require('../models/productModel');

module.exports.getAllProduct = (req, res) => {
    try {
        const productList = productDAO.findAll();
        res
            .status(200)
            .json(productList);
    } catch (error) {
        res.status(500).json({ "message": "getAllProduct" });
    }
}

module.exports.getProductById = (req, res) => {
    //요청 url에 넘어가는 params데이터에서 뽑아낸다.
    const id = req.params.id
    console.log(id);

    try {
        const todo = productDAO.findById(id)
        res.status(200).json(todo)

    } catch (error) {
        res.status(500).json({ "message": "getProductById" });
    }
}

//post로 보내는건 req 바디에 넣어서 보내짐
//body에 보내지는 내용은 바디파서를 이용하면 쉽게 사용가능함
//미들웨어에서 app.use(express.json())을 했기때문에 바디파서 문법 사용가능함
module.exports.createProduct = (req, res) => {
    //생성될 객체를 미리 구성하고 넘기는게 후처리 작업이 편함
    //일단은 하나만 넘긴다고 처리하자
    //id는 생성될때 따로 dao부분에서 처리하니까 넣지 않는다.
    const newProduct = {
        category: req.body.cat,
        name: req.body.cat,
        brand: req.body.brand,
        releasedData: req.body.releasedData,
        price: req.body.price,
        photo: req.body.photo,
        salesStatus: req.body.salesStatus,
        stocks: req.body.stocks,
        dateAdded: req.body.dateAdded,
        dateModified: req.body.dateModified,
        userNo: req.body.userNo,
        userId: req.body.userId,
    }
    try {
        productDAO.create(newProduct);
        const productList = productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ "message": "createProduct 오류" });
    }
}

module.exports.modifyProductById = (req, res) => {
    //마찬가지로 수정될 객체를 미리 구성하고 넘긴다.
    //dao에서 id로 조회해야되니까 id도 같이 넘긴다.

    // URL 파라미터에서 ID를 가져오고 요청 본문에서 수정할 내용을 가져옴
    const id = req.params.id;
    const updateProduct = {
        category: req.body.cat,
        name: req.body.cat,
        brand: req.body.brand,
        releasedData: req.body.releasedData,
        price: req.body.price,
        photo: req.body.photo,
        salesStatus: req.body.salesStatus,
        stocks: req.body.stocks,
        dateAdded: req.body.dateAdded,
        dateModified: req.body.dateModified,
        userNo: id,
        userId: req.body.userId,
    };

    try {
        productDAO.update(updateProduct);
        const productList = productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ "message": "modifyProductById 오류" })
    }
}

module.exports.deleteProductById = (req, res) => {

    const id = req.params.id;

    try {
        productDAO.delete(id);
        const productList = productDAO.findAll();
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ "message": "deleteProductById 오류" })
    }
}