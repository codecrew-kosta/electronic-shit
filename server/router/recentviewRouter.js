const express = require("express");
const router = express.Router();


//http://localhost:3001/product/recentview?user_id=?
//READ
router.get("/", async (req, res) => {
    const { user_id } = req.query; // 클라이언트에서 보낸 쿼리,사용자 id 받기
    console.log("사용자 id:", user_id);

    try {
        // SQL 쿼리: recentview테이블에서 사용자 id로 된 product 데이터 join으로 가져옴
        const Query = `select p.* from recentview r
        join productsinfo p on r.recentview_productNo = p.productNo
        where r.recentview_userNo = ? order by r.viewedAt DESC
        ;`;

        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query, [user_id]);

        // 결과가 있는지 확인
        if (rows.length > 0) {
            res.status(200).json({
                status: 200,
                message: `최근 목록: ${user_id}의 최근 항목`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `최근 목록: ${user_id}의 최근 항목 없음.`,
            });
        }
    } catch (error) {
        console.error("최근 목록 읽기 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/recentview?user_id=?&product_id=?
//CREATE,UPDATE
router.post("/", async (req, res) => {
    const { user_id } = req.body; // 클라이언트에서 보낸 사용자 id 받기
    const { product_id } = req.body; //클라이언트에서 보낸 상품 id 받기
    console.log("사용자 id:", user_id);
    console.log("상품 id:", product_id);

    try {
        // 최근본 항목에 존재하는지 확인
        const checkQuery = `
            select * from recentview 
            where recentview_userNo = ? and recentview_productNo = ?
        `;
        let [rows] = await req.db.execute(checkQuery, [user_id, product_id]);

        if (rows.length > 0) {
            //최근본 항목에 존재하면 시간을 업데이트
            const updateQuery = `
             update recentview
             set viewedAt = current_timestamp   
             where recentview_userNo = ? and recentview_productNo = ?
            `;
            [rows] = await req.db.execute(updateQuery, [user_id, product_id]);

            // 결과가 있는지 확인
            if (rows.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    message: `최근 항목: ${user_id}의 ${product_id} 조회시간 최신화됨`,
                    data: rows,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `찜 목록:${user_id}의 ${product_id} 조회시간 최신화 실패.`,
                });
            }
        } else {
            //최근본 항목에 없을 경우 추가

            const Query = `insert into recentview
            (recentview_userNo,recentview_productNo,viewedAt)
            values (?,?,current_timestamp);`;

            // DB에서 쿼리 실행
            [rows] = await req.db.execute(Query, [user_id, product_id]);

            // 결과가 있는지 확인
            if (rows.affectedRows > 0) {
                res.status(200).json({
                    status: 200,
                    message: `최근 항목: ${user_id}의 ${product_id} 추가됨`,
                    data: rows,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: `최근 항목: ${user_id}의 ${product_id} 추가 실패`,
                });
            }
        }


    } catch (error) {
        console.error("최근 목록 생성/업데이트 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/recentview/delete?user_id=?&product_id=?
//DELETE
router.delete("/delete", async (req, res) => {
    const { user_id } = req.user_id; // 클라이언트에서 보낸 사용자 id 받기
    const { product_id } = req.product_id //클라이언트에서 보낸 상품 id 받기

    console.log("사용자 id:", user_id);
    console.log("상품 id:", product_id);

    try {
        // SQL 쿼리: 
        const Query = `delete from wishlist where user_id=? and product_id =?;`;

        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query, [user_id, product_id]);

        // 결과가 있는지 확인
        if (rows.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: `최근 항목: ${user_id}의 ${product_id} 제거됨`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `최근 항목: ${user_id}의 ${product_id} 제거 실패`,
            });
        }
    } catch (error) {
        console.error("최근 항목 삭제중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

module.exports = router;