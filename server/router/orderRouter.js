const express = require("express");
const router = express.Router();

//http://localhost:3001/product/order?user_id=?
//READ
router.get("/", async (req, res) => {
    const { user_id } = req.query; // 클라이언트에서 보낸 쿼리,사용자 id 받기
    console.log("사용자 id:", user_id);

    try {
        // SQL 쿼리: order_summary: 유저의 주문 정보가 들어있는 테이블.
        // order_details: 주문의 상세 정보가 들어있는 테이블.
        //productsinfo: 주문된 상품의 정보가 들어있는 테이블. 전부다 조인해서 가져옴
        const Query = `
       SELECT
           os.order_summary_id, os.order_summary_userNo, os.order_at, os.total_amount, -- 필요한 컬럼들만 명시적으로 선택
            od.order_details_id, od.order_details_productNo, od.quantity,  -- 필요한 컬럼들만 명시적으로 선택
            p.productNo, p.category, p.name, p.price  -- 필요한 상품 정보만 명시적으로 선택
        FROM
            order_summary os
        JOIN
            order_details od ON os.order_summary_id = od.order_details_summary_id  -- 주문과 상세 주문 조인
        JOIN
            productsinfo p ON od.order_details_productNo = p.productNo  -- 상세 주문과 상품 정보 조인
        WHERE
            os.order_summary_userNo = ?;  -- 특정 유저 ID로 필터링
        `;



        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query, [user_id]);

        // 결과가 있는지 확인
        if (rows.length > 0) {
            res.status(200).json({
                status: 200,
                message: `결제 목록: 유저_${user_id}에 대한 검색 결과`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `결제 목록: 유저_${user_id}에 대한 결과가 없습니다.`,
            });
        }
    } catch (error) {
        console.error("결제 목록 생성 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/order
//CREATE
//사용자 포인트 차감은 따로 처리해야됨 트리거로 없음
router.post("/", async (req, res) => {
    const { user_id } = req.body; // 클라이언트에서 보낸 사용자 id 받기
    const { products } = req.body; // products: [{ product_id: 56, quantity: 2 }, { product_id: 57, quantity: 1 }] 이런식으로 
    console.log("사용자 id:", user_id);
    console.log("상품들:", products);

    try {
        await req.db.beginTransaction(); // 트랜잭션 시작

        // 유저 정보 가져오기
        const [userData] = await await req.db.execute(`
           select * from users where userNo = ?;
        `, [user_id]);

        // 유저의 잔액 조회
        let userPoints = userData[0].points;
        console.log("결제전 유저 잔액:", userPoints);

        //주문상품의 총액을 저장할 변수
        let totalAmount = 0;

        // 주문 요약 정보 추가 (order_summary에 삽입)
        const [orderSummaryResult] = await req.db.execute(`
            INSERT INTO order_summary (order_summary_userNo)
            VALUES (?);
        `, [user_id]);

        // 방금 삽입한 order_summary의 ID를 가져옴
        const orderSummaryId = orderSummaryResult.insertId;

        // 상품 정보 삽입을 위한 SQL 생성
        const orderDetailsQuery = `
            INSERT INTO order_details (order_details_summary_id, order_details_productNo, quantity)
            VALUES (?, ?, ?);
        `;

        // 각 상품에 대해 총합산출
        for (const product of products) {
            const { product_id, quantity } = product;

            // 상품 가격 조회
            const [productResult] = await req.db.execute(`
                SELECT price FROM productsinfo WHERE productNo = ?;
            `, [product_id]);

            const productPrice = productResult[0].price;
            const productTotal = productPrice * quantity;
            totalAmount += productTotal;

        }

        if (userPoints > totalAmount) {
            // 각 상품에 대해 order_details에 삽입
            for (const product of products) {
                const { product_id, quantity } = product;

                await req.db.execute(orderDetailsQuery, [orderSummaryId, product_id, quantity]);
            }

            // 잔액계산
            let result = userPoints - totalAmount;
            console.log('결제후 유저 잔액: ', result);

            // 유저 포인트 업데이트(차감)
            await req.db.execute(`update users set points = ? where userNo = ?;`, [result, user_id]);

            // 트랜잭션 커밋
            await req.db.commit();

            res.status(200).json({
                status: 200,
                message: `주문이 성공적으로 생성되었습니다.`,
            });

        } else {
            await req.db.rollback();

            console.error("잔액 부족");
            res.status(500).json({
                status: 500,
                message: "잔액이 부족합니다.",
            });
        }

    } catch (error) {
        // 오류 발생 시 트랜잭션 롤백
        await req.db.rollback();
        console.error("주문 생성 중 오류 발생:", error);

        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

//http://localhost:3001/product/order/delete?order_summary_id=?
//DELETE
//캐스케이딩이 걸려있어서 order_summary테이블에서 지우기만 해도 된다.

router.delete("/delete", async (req, res) => {
    const { user_id } = req.body; // 주문내역만 id만 받아서 지워도 될듯
    const { order_summary_id } = req.body; // 주문 내역 id

    console.log("사용자 id:", user_id);
    console.log("주문내역 id:", order_summary_id);


    try {

        // 유저 정보 가져오기
        const [userData] = await await req.db.execute(`select * from users where userNo = ?;`, [user_id]);
        // 유저의 잔액 조회
        let userPoints = userData[0].points;
        console.log("취소전 유저 잔액:", userPoints);

        //취소상품의 총액을 가져오기
        const Query = `select total_amount from order_summary where order_summary_id =?;`;
        const [order_summary_totalAmount] = await req.db.execute(Query, [order_summary_id]);

        let totalAmount = order_summary_totalAmount[0].total_amount;
        console.log("취소전 결제총합:", totalAmount);

        //계산 결과
        let result = userPoints + totalAmount;
        console.log("취소후 유저 잔액:", result);

        // SQL 쿼리: 
        const Query_delete = `delete from order_summary where order_summary_id =?;`;

        // DB에서 쿼리 실행
        const [rows] = await req.db.execute(Query_delete, [order_summary_id]);
        console.log("Affected Rows:", rows.affectedRows);

        // 결과가 있는지 확인
        if (rows.affectedRows > 0) {

            // 유저 포인트 업데이트(증가)
            await req.db.execute(`update users set points = ? where userNo = ?;`, [result, user_id]);

            res.status(200).json({
                status: 200,
                message: `주문 내역: ${user_id}의 ${order_summary_id} 주문 취소됨`,
                data: rows,
            });
        } else {
            res.status(404).json({
                status: 404,
                message: `주문 내역: ${user_id}의 ${order_summary_id} 주문 취소 실패`,
            });
        }
    } catch (error) {
        console.error("주문 내역 삭제 중 오류 발생:", error);
        res.status(500).json({
            status: 500,
            message: `MySQL Error: ${error}`,
        });
    } finally {
        req.db.release(); // 연결 해제
    }
});

module.exports = router;