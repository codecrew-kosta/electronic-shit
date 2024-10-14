/**
 * 2024_10_14_남윤호 product CRUD 작업중_ Product 라우터추가
 * productRouter
 * mysqlDBConnection
 */

const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const productRouter = require("./router/Product"); //20241014_남윤호 상품관련 라우터


const server = http.createServer(app);

app.set('port', 3001);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // 모든 서버의 통신은 json 으로 한다. res.send 쓰지 말 것.

app.use('/product', productRouter);
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            message: 'hello world',
        });
        console.log('200 ok');
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `${error}`,
        });
        console.error('500 error: ', error);
    }

})



server.listen(app.get(`port`), () => {
    console.log(`http://localhost:${app.get('port')}`);
})