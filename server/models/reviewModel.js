/**
 * 2024_10_15_남윤호 review CRUD 완성
 * 
 * 디비를 조회해서 실질적인 CRUD작업을 처리하는 곳이다.
 */

//mysql 디비연동 커넷션풀
const db = require('../config/mysqlDB'); // DB 모듈 불러오기

//참고로 mysql은 대소문자 구별함 ...
const QUERY_SELECT_All = 'select * from reviews';
const QUERY_SELECT_ONE = 'select * from reviews where CommentNo=?';
const QUERY_UPDATE = 'update reviews set rate=?,commentText=? where CommentNo=?';
const QUERY_CREATE = 'insert into reviews (rate, commentText,userNo,userId,productId) values (?,?,?,?,?)';
const QUERY_DELETE = 'delete from reviews where CommentNo=?'



const reviewDAO = {
    findAll: async () => {
        try {
            const [results] = await db.execute(QUERY_SELECT_All);
            return results;
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err;
        }
    },
    findById: async (id) => {
        try {
            const [results] = await db.execute(QUERY_SELECT_ONE, [id]);
            return results;
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err;
        }
    },
    create: async (obj) => {

        try {
            const {
                rate,
                commentText,
                userNo,
                userId,
                productId
            } = obj;

            const [results] = await db.execute(QUERY_CREATE, [rate, commentText, userNo, userId, productId]);
            return results;
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err;
        }
    },
    update: async (obj) => {
        // console.log(obj.reviewNo);
        try {
            const {
                CommentNo,
                rate,
                commentText,
            } = obj;

            const [results] = await db.execute(QUERY_UPDATE, [rate, commentText, CommentNo]);
            return results;
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err;
        }
    },
    delete: async (id) => {
        console.log(id);
        try {
            const [results] = await db.execute(QUERY_DELETE, [id]);
            return results;
        } catch (err) {
            console.error('DB 쿼리 에러:', err);
            throw err;
        }
    }
}


module.exports = reviewDAO;