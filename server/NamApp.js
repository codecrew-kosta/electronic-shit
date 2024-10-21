
const express = require('express');
const productRouter = require('./router/Product');
const reviewRouter = require('./router/Review');
const recentviewRouter = require('./router/recentviewRouter');
const wishlistRouter = require('./router/wishlistRouter');
const orderRouter = require('./router/orderRouter');

const app = express();


// 하위 요청이 상위로 올라가 있어야 /product에 안걸림
app.use('/order', orderRouter); //http://localhost:3001/product/recentview
app.use('/recentview', recentviewRouter); //http://localhost:3001/product/recentview
app.use('/wishlist', wishlistRouter); //http://localhost:3001/product/wishlist
app.use('/review', reviewRouter); //http://localhost:3001/product/review
app.use('/', productRouter); // http://localhost:3001/product

module.exports = app;