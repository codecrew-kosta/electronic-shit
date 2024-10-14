/**
 * 2024_10_14_남윤호 product CRUD 작업중_ productDAO
 * 
 * 디비를 조회해서 실질저인 CRUD작업을 처리하는 곳이다.
 */

//테스트 위해서 임시로 설정 디비로 바꿔서 작업해야됨
let productList = [
    { id: 1, title: "밥먹기" },
    { id: 2, title: "간식먹기" },
]

let autoId = 3;


// 여기서 넘어온 객체가지고 각종 연산처리
const productDAO = {
    findAll: () => {
        return [...productList];
    },
    findById: (id) => {
        return productList.filter((todo) => {
            return Number(todo.id) === Number(id)
        })
    },
    create: (obj) => {
        const newObj = { ...obj, id: autoId }; // 새 객체 생성
        productList.push(newObj);
        ++autoId;
        return "todo 생성되었음";
    },
    update: (obj) => {
        //map은 각 요소를 순회하며 새로운 배열을 반환한다. 조건에 따라 업데이트할 객체를 반환하고,
        //그렇지 않다면 원본객체를 그래로 반환한다
        //구조분해할당을 아래와 같이 쓰면 item의 속성을 유지하면서 덮어쓸수 있다고한다.
        productList = productList.map((item) => {
            return Number(item.id) === Number(obj.id) ? { ...item, ...obj } : item
        })
        return "todo 수정되었음"
    },
    delete: (id) => {
        //특정 요소를 삭제하는 거니까 map이 아닌 filter가 좋다.
        productList = productList.filter((item) => {
            return Number(item.id) !== Number(id);
        });
        return "todo 삭제되었음"
    }

}


module.exports = productDAO;