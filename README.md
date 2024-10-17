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

10월 18일 금
1. 파일 합치기 하루 종일 작업하게 될듯???

10월 19일 토

10월 20일 일

10월 21일 월

10월 22일 화

10월 23일 수

## 문제: \<navbar\> 작업 누가할 것인가?
1. 검색창 작업 (검색창 일단 넣고, 필요 없는 곳에서는 hidden && disable)
2. 홈페이지 링크 가장 좌측에 있는 로고 누르면 홈페이지(메인페이지)로 가는 것
3. 카테고리
4. 상품 등록(로그인 중에만 활성화 하는 것으로)
5. 일반회원 -> 상품을 올리고 살 수 있는 2가지 기능 전부 다 할 수 있는 걸로(기업회원 x, 어드민 x)
