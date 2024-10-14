const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'electronic-shit.cvmgomkwany6.ap-northeast-2.rds.amazonaws.com',
    user: 'root',
    password: 'codecrew285',
    database: 'electronicshit'
});

connection.connect((err, handshake) => {
    if (err) {
        console.log('DB 접속 Error: ', err);
        return;
    }
    console.log('DB Connect 성공!', handshake);
});

module.exports = connection;