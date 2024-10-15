/**
 * 2024_10_14_남윤호 product CRUD 작업중_ productDAO
 * 
 * 디비를 조회해서 실질적인 CRUD작업을 처리하는 곳이다.
 */

//mysql 디비연동 커넷션풀
const db = require('../config/mysqlDB'); // DB 모듈 불러오기

//참고로 mysql은 대소문자 구별함 ...
const QUERY_SELECT_All = 'select * from productsinfo';
const QUERY_SELECT_ONE = 'select * from productsinfo where productNo=?';
const QUERY_UPDATE = 'update productsinfo set category=?,name=?,brand=?,releasedDate=?,price=?,photo=?,salesStatus=?,stocks=? where productNo=?';
const QUERY_CREATE = 'insert into productsinfo (category, name,brand,releasedDate,price,photo,salesStatus,stocks,userNo,userId) values (?,?,?,?,?,?,?,?,?,?)';
const QUERY_DELETE = 'delete from productsinfo where productNo=?'


// 여기서 넘어온 객체가지고 각종 연산처리
const productDAO = {
    findAll: async () => {
        try {
            const [results] = await db.execute(QUERY_SELECT_All); // 풀에서 쿼리 실행
            return results; // 결과 반환
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err; // 에러 발생 시 throw
        }
    },
    findById: async (id) => {
        try {
            const [results] = await db.execute(QUERY_SELECT_ONE, [id]); // 풀에서 쿼리 실행
            return results; // 결과 반환
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err; // 에러 발생 시 throw
        }
    },
    create: async (obj) => {

        try {
            const {
                category,
                name,
                brand,
                releasedDate,  // undefined인 경우 null로 기본값 설정
                price,
                photo,  // 같은 처리
                salesStatus,
                stocks,
                // dateAdded,  // 같은 처리
                // dateModified,  // 같은 처리
                userNo,  // 같은 처리
                userId  // 같은 처리
            } = obj;

            const [results] = await db.execute(QUERY_CREATE, [category, name, brand, releasedDate, price, photo, salesStatus, stocks, userNo, userId]); // 풀에서 쿼리 실행
            return results; // 결과 반환
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err; // 에러 발생 시 throw
        }
    },
    update: async (obj) => {
        // console.log(obj.productNo);
        try {
            const {
                productNo,
                category,
                name,
                brand,
                releasedDate,  // undefined인 경우 null로 기본값 설정
                price,
                photo,  // 같은 처리
                salesStatus,
                stocks
            } = obj;

            const [results] = await db.execute(QUERY_UPDATE, [category, name, brand, releasedDate, price, photo, salesStatus, stocks, productNo]); // 풀에서 쿼리 실행
            return results; // 결과 반환
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err; // 에러 발생 시 throw
        }
    },
    delete: async (id) => {
        console.log(id);
        try {
            const [results] = await db.execute(QUERY_DELETE, [id]); // 풀에서 쿼리 실행
            return results; // 결과 반환
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err; // 에러 발생 시 throw
        }
    }
}


module.exports = productDAO;