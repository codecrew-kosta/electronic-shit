const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.set('port', 3001);

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json()); // 모든 서버의 통신은 json 으로 한다. res.send 쓰지 말 것.

app.get('/', (req, res) => {
    try{
        res.status(200).json({
            status: 200,
            message: 'hello world',
        });
        console.log('200 ok');
    } catch(error) {
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