const express = require("express");
const router = express.Router();

//http://localhost:3001/product/wishlist/all
//READ_ALL 관리자일 경우
router.get("/all", async (req, res) => {
    try {
        // SQL 쿼리: 사용자 id로 된 모든 찜테이블 데이터 가져오기
        const Query = `select p.* from wishlist w
        join productsinfo p on w.wishlist_productNo = p.productNo
        `;

        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query);

        // 결과가 있는지 확인
        if (rows.length > 0) {
            res.status(200).json({
                status: 200,
                message: `찜 목록: 검색 결과`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `찜 목록: 결과가 없습니다.`,
            });
        }
    } catch (error) {
        console.error("찜 목록 전체조회 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/wishlist?user_id=?
//READ
router.get("/", async (req, res) => {
    const { user_id } = req.query; // 클라이언트에서 보낸 쿼리,사용자 id 받기
    console.log("사용자 id:", user_id);

    try {
        // SQL 쿼리: wishlist테이블에서 사용자 id로 된 product 데이터 join으로 가져옴
        // 다른곳에서 사용위해 var로 선언
        const Query = `
        SELECT
            w.*, p.*
        FROM
            wishlist w
        JOIN
            productsinfo p
        ON
            w.wishlist_productNo = p.productNo
        WHERE
            w.wishlist_userNo = ?;

        ;`;

        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query, [user_id]);
        console.log("쿼리실행됨");
        console.log(rows);


        // 결과가 있는지 확인
        if (rows.length > 0) {
            res.status(200).json({
                status: 200,
                message: `찜 목록: ${user_id}에 대한 검색 결과`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `찜 목록: ${user_id}에 대한 결과가 없습니다.`,
            });
        }
    } catch (error) {
        console.error("찜 목록 생성 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/wishlist
//CREATE,DELETE --> 목록 조회 후 있으면 삭제, 없으면 추가
router.post("/", async (req, res) => {
    const { user_id } = req.body; // 클라이언트에서 보낸 사용자 id 받기
    const { product_id } = req.body; //클라이언트에서 보낸 상품 id 받기
    console.log("사용자 id:", user_id);
    console.log("상품 id:", product_id);


    try {
        //해당 찜 목록에 존재하는지 확인
        const checkQuery = `
            select * from wishlist 
            where wishlist_userNo = ? and wishlist_productNo = ?
        `;
        let [rows] = await req.db.execute(checkQuery, [user_id, product_id]);


        if (rows.length > 0) {
            //찜목록에 존재하면 삭제
            const Query_delete = `delete from wishlist where wishlist_userNo=? and wishlist_productNo =?;`;
            [rows] = await req.db.execute(Query_delete, [user_id, product_id]);

            // 결과가 있는지 확인
            // affectedRows 성공적으로 생성,수정,삭제된 행의 수를 나타낸다.
            if (rows.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    message: `찜 목록: ${user_id}의 ${product_id} 찜 삭제됨`,
                    data: rows,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `찜 목록:${user_id}의 ${product_id} 찜 삭제 실패.`,
                });
            }
        } else {
            //찜목록에 없으면 추가
            const Query = `insert into wishlist
            (wishlist_userNo,wishlist_productNo) 
            values (?,?);`;

            // DB에서 쿼리 실행
            [rows] = await req.db.execute(Query, [user_id, product_id]);

            if (rows.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    message: `찜 목록: ${user_id},${product_id}찜 추가됨`,
                    data: rows,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `찜 목록: ${user_id},${product_id} 찜 추가 실패.`,
                });
            }
        }


    } catch (error) {
        console.error("찜 목록 생성/삭제 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/wishlist/delete?user_id=?&product_id=?
//DELETE, 만들어 놓긴 했는데 쓰일일은 없을듯
router.delete("/delete", async (req, res) => {
    const { user_id } = req.body; // 클라이언트에서 보낸 사용자 id 받기
    const { product_id } = req.body; //클라이언트에서 보낸 상품 id 받기

    console.log("사용자 id:", user_id);
    console.log("상품 id:", product_id);

    try {
        // SQL 쿼리: 
        var Query_wish_delete = `delete from wishlist where wishlist_userNo=? and wishlist_productNo =?;`;

        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query_wish_delete, [user_id, product_id]);

        // 결과가 있는지 확인
        if (rows.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: `찜 목록: ${user_id}의 ${product_id} 찜 제거됨`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `찜 목록: ${user_id}의 ${product_id} 찜 제거 실패`,
            });
        }
    } catch (error) {
        console.error("찜 목록 삭제 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

module.exports = router;