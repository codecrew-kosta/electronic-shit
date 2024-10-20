# electronic-shit

## npm 의존성 문제 해결

`client`와 `server` 디렉터리에 가서,
```bash
npm install
```

## html -> jsx 변환

https://transform.tools/html-to-jsx
여기로 가서 해결

## 10/11 (금) 할일
* `client/temp`경로에 있는 HTML들 전부 jsx로 변환하고 공통적으로 들어가는 컴포넌트 분리(예를 들어, `nav`, `header`,`footer` 등등...)

* <MySQL 목업 데이터 작성하기>
: 메인페이지에 제품을 몇 개 보여줄 것인가에 따라서 최소 목업데이터 개수가 바뀜. (예를 들어 10개 보여줄거면 최소 11개, 20개 보여줄 거면 최소 21개...)

* 각자 맡은 부분 그 뒤에 하는 걸로!

## 조영우 일정
1. 스키마 설계대로 DB 테이블 생성
2. 로그인 / 회원가입 뼈대 생성 (보안 1도 신경 안쓰고, 세션을 제대로 이용할 수 있는가가 목적임) 10/14(월) ~ 10/16(수)
3. Argon2 적용(비밀번호 암호화 경험 && Argon2 알고리즘 학습이 목적) 10/17(목) ~ 10/18(금)
4. 파일 입출력(Multer)관련

## 한채경 일정
10월 14일
1. 메인 페이지에 추천 상품 띄우기 (기본 4개, 추천 상품 설정 필요)
2. nav shop 설정: 모든 상품, 각 상품 카테고리(10개), 추천 상품, (인기 상품)

10월 15일
1. 나눠진 메뉴에 따라 상품 보여주기
2. 시간이 된다면 검색 기능 추가 밑작업

10월 16일
1. 자잘한 오류 수정
2. 검색 기능 구현 및 상품 누르면 서브페이지로 이동시키기

10월 17일
1. 검색 기능 (검색창 onchange로 수정 가능하게 변경, name/brand/category 별 검색 기능 추가(아마 select 사용할 것))
2. 상품 누르면 서브페이지로 이동 기능 추가

## 남윤호 일정
10월 14일 월
1. 디비생성 aws상의 mysql로 채경님이 생성한 디비 생성함
2. 상품 CRUD 백단 완성후 테스트 예정

10월 15일 화

1. 상품 CRUD_진행중
  * 상품 CRUD 백단(O)_테스트 완료
  * 상품 CRUD 프론트(X)
  * 상품 조회 프론트(진행중)
    * axios 요청 (O)_테스트 완료
    * 상품DB 상품 소개 컬럼추가, 추가적으로 필요한 컬럼들 재정의할것
    * 리뷰용 렌더링 화면작업 필요
    * 재 디자인 작업 필요

2. 댓글 CRUD_진행중
  * 댓글 CRUD 백단(O)_테스트 완료
  * 댓글 CRUD 프론트(x)

3. 채경님꺼 합치고 시작하기
4. 사진 multer 업로드 구현_미진행
5. server에 app.js 서브 모듈로 제어하는 작업 필요 충돌 나서 짜증남
6. 작업미완료 중이여서 충돌나는 파일은 push 하지 않기로 합의할 필요있음. pull받으면 정리하는데 한세월임
7. 상품DB 상품 소개 컬럼추가, 추가적으로 필요한 컬럼들 재정의할것

10월 16일 수

1. 상품 CRUD_진행중
  * 상품 CRUD 백단(O)_테스트 완료
  * 상품 CRUD 프론트(O)_테스트 완료
    * 재 디자인 필요 너무 구림
    * 이미지 넣어야됨
    * 상품설명 넣어야됨
      
  * 상품 조회 프론트_진행_<3순위>
    * axios 요청 (O)_테스트 완료
    * 상품DB 상품 소개 컬럼추가, 추가적으로 필요한 컬럼들 재정의할것
    * 리뷰용 렌더링 화면작업 필요
    * 재 디자인 작업 필요

2. 리뷰 CRUD_진행 <1순위>
  * 리뷰 CRUD 백단(O)_테스트 완료
  * 리뷰 CRUD 프론트(x)_진행중

3. 사진 multer 업로드 구현_<2순위>

10월 17일 목

1. 사진 multer 업로드 구현_<1순위>
  * 프론트 쪽에서 다중 파일 업로드와 미리보기 만듬, 이미지 호스팅 서버에 업로드후 json 파일을 반환받음_완료
  * 반환받은 json에 담긴 url로 업로드 서버에 있는 사진을 볼수 있음_완료
  * 해당 url혹은 json을 서버쪽으로 넘겨서 디비에 저장하는 과정 multer이용_ 진행중
2. 상품 CRUD
  * 상품 CRUD 페이지 프론트 작업 _진행예정
3. 리뷰 CRUD
  * 리뷰 CRUD 페이지 프론트 작업 _진행예정


10월 18일 금
1. 다중 파일 선택후 이미지 호스팅으로 url 반환 받아 상품 CRUD에 다른 값들과 같이 저장하는것에 적용함, 다만 아직 create만 되고 수정이 되지 않음

10월 19일 토
1. 상품 찜 CRUD 백단 테스트완료, 최근 본 상품 CRUD 백단 테스트 완료
2. 상품 찜, 최근 본 상품 테이블 생성
3. 유저 테이블에 points 컬럼 생성--> 상품 결제시 사용
   * 상품 결제시 자동 차감, 상품 취소시 자동 증가 트리거 생성함
4. 상품 테이블에 discount_apply 컬럼, discount_rate, original_price 컬럼 생성 
   * 상품 할인 여부와 상품할인 %비율 컬럼임
   * 상품 할인 여부가 1(true) 일시 상품 할인 비율에 따라 자동적으로 price값을 조절하는 sql의 트리거를 사용
   * UPDATE productsinfo SET discount_rate = 10 WHERE product_id = 1; (discount_apply=1 인경우) --> 할인율 10% 적용된 가격으로 price값 자동 조정됨, original_prices는 할인전 가격 기입됨
   * UPDATE productsinfo SET discount_apply=1, discount_rate = 10 WHERE productNo = 1; (discount_apply=0 인경우) --> 할인율 10% 적용된 가격으로 price값 자동 조정됨 ,original_prices는 할인전 가격 기입됨
   * UPDATE productsinfo SET discount_apply=0 WHERE productNo = 1; --> 할인여부를 해제 하는경우 다시 할인 이전 original_price로 자동 조정됨
  
5. 상품 결제 테이블 생성, 상품 결제 상세 테이블 생성
   * order_summary,order_details 테이블임
   * order_summary에서는 상품 결제 총합을 계산하는 트리거를 걸어놨음, order_details의 행이 추가 혹인 삭제 이후 자동으로 결제 총합이 업데이트됨
   * order_details에서는 상품의 가격과, 수량에 따른 총합을 계산하는 트리거를 걸어놨음, productsinfo에 기제된 price를 가져와서 총합을 자동으로 계산해줌
   * 테스트는 아래와 같음
     * INSERT INTO order_summay (order_summary_userNo) VALUES (1); --> 주문을 추가함 총액은 0 상태임
     * INSERT INTO order_details (order_details_summary_id, order_details_productNo,quantity) VALUES (1, 55, 2);  --> productNo = 55인 상품을 2개 추가 --> order_summay의 상품 총합 업데이트됨
     * DELETE FROM order_details WHERE order_details_summary_id = 1 AND order_details_productNo = 55; --> productNo = 55인 상품을 제거 --> order_summay의 상품 총합 업데이트됨

6. 상품결제 백단 작업중, 테스트 진행중임


10월 20일 일
1. 상품 결제 백단 장업완료, 테스트 완료
  * 결제 상품 조회, 상품 결제, 결제 상품 취소 기능
  * 상품 결제,결제 상품 취소에 따라 유저 포인트 증감후 디비 반영됨
2. 상품 할인쪽 관련 트리거도 있으니 백단 작업필요


   

10월 21일 월

10월 22일 화

10월 23일 수

## 문제: \<navbar\> 작업 누가할 것인가?
1. 검색창 작업 (검색창 일단 넣고, 필요 없는 곳에서는 hidden && disable)
2. 홈페이지 링크 가장 좌측에 있는 로고 누르면 홈페이지(메인페이지)로 가는 것
3. 카테고리
4. 상품 등록(로그인 중에만 활성화 하는 것으로)
5. 일반회원 -> 상품을 올리고 살 수 있는 2가지 기능 전부 다 할 수 있는 걸로(기업회원 x, 어드민 x)
