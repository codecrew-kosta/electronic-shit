
const express = require('express');
const productRouter = require('./router/Product');
const reviewRouter = require('./router/Review');
const app = express();


// 해당 /review 요청이 먼저 올라가 있어야 product에 안걸림
app.use('/review', reviewRouter); //http://localhost:3001/product/review
app.use('/', productRouter); // http://localhost:3001/product

module.exports = app;