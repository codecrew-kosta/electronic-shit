/**
 * 2024_10_14_남윤호 product CRUD 작업중_ productDAO
 * 
 * 디비를 조회해서 실질저인 CRUD작업을 처리하는 곳이다.
 */

//mysql 디비연동 커넷션풀
const mysqlDBConnection = require('./config/mysqlDB'); // 20241014_남윤호 상품관련 디비 연동


const QUERY_CREATE = 'SELECT * FROM PRODUCTSINFO';
const QUERY = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
const QUERY_FINDALL = 'SELECT * FROM PRODUCTSINFO';
const QUERY_FINDBYID = 'SELECT * FROM PRODUCTSINFO BY ';
const QUERY_UPDATEBYID = 'SELECT * FROM PRODUCTSINFO';
const QUERY_DELETEBYID = 'SELECT * FROM PRODUCTSINFO';


const QUERY_SELECT = 'SELECT * FROM USERS ORDER BY ID DESC';
const QUERY_UPDATE = 'UPDATE USERS SET NAME=?, EMAIL=?, PASSWORD=? WHERE ID=?;';
const QUERY_INSERT = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
const QUERY_DELETE = 'DELETE FROM USERS WHERE ID=?'


// 여기서 넘어온 객체가지고 각종 연산처리
const productDAO = {
    findAll: async () => {
        try {
            return await Car.find()
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
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