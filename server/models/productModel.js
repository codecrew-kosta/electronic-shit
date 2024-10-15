/**
 * 2024_10_14_남윤호 product CRUD 작업중_ productDAO
 * 
 * 디비를 조회해서 실질저인 CRUD작업을 처리하는 곳이다.
 */

//mysql 디비연동 커넷션풀
const connection = require('../config/mysqlDB'); // 20241014_남윤호 상품관련 디비 연동
const express = require('express');
const router = express.Router();


const QUERY_SELECT = 'SELECT * FROM PRODUCTSINFO';
const QUERY_UPDATE = 'UPDATE PRODUCTSINFO SET category=?, name=?, brand=?, releasedDate=?, price=?,photo=?,salesStatus=?,stocks=?,dateAdded=?,dateModified=?,userNo=?,userId=? WHERE ID=?;';
const QUERY_INSERT = 'INSERT INTO PRODUCTSINFO (category, name,brand,releasedDate,price,photo,salesStatus,stocks,dateAdded,dateModified,userNo,userId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
const QUERY_DELETE = 'DELETE FROM PRODUCTSINFO WHERE ID=?'


// 여기서 넘어온 객체가지고 각종 연산처리
const productDAO = {
    findAll:
        // users 전체 목록 불러오기
        router.route('/').get((req, res) => {
            console.log("들어오니?");

            function callback(err, results) {
                if (err) return res.status(500).json({ error: err });
                res.send(results);
            };
            if (connection) {
                connection.query(QUERY_SELECT, callback);
            } else {
                console.log('DB 연결 안됨!');
            }
        })
    ,
    findById: async (id) => {
        try {
            return await Car.find({ _id: mongoose.Types.ObjectId(id) })
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    create: async (obj) => {
        try {
            // Mongoose 모델의 인스턴스 생성
            const newObj = new Car({ ...obj, num: autoId });
            await newObj.save();
            ++autoId;
            return "car 생성되었음";
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    update: async (obj) => {
        try {
            await Car.updateOne({ _id: mongoose.Types.ObjectId(obj.id) }, { $set: obj })
            return "car 수정되었음";
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            await Car.deleteOne({ _id: mongoose.Types.ObjectId(id) });
            return "car 삭제되었음"
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}


module.exports = productDAO;