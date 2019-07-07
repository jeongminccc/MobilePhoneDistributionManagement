pragma solidity >=0.4.22 <0.7.0;

contract ProductContract {
    uint8 numberOfProducts; // 총 제품의 수입니다.

    struct myStruct {
        uint   assist;
        string productName;
        uint   manpower;
        uint   part;
        uint   circulation;
        uint timestamp;
    }

    event product (
        uint   assist,
        string productName,
        uint   manpower,
        uint   part,
        uint   circulation,
        uint timestamp
    );

    myStruct[] public productes;

    function addProStru (uint _initNumber, string memory _firstString, uint _initMan, uint _initPart, uint _initCir) public { // 공산품 생산관리 이력을 출력 (몇개생산? 1.이름, 2.위치)
        productes.push(myStruct(_initNumber, _firstString, _initMan, _initPart, _initCir, block.timestamp)) -1; // 트랜잭션이 날라와서 블럭이 생성된 시간을 기록
        numberOfProducts++;
        emit product(_initNumber, _firstString, _initMan, _initPart, _initCir, block.timestamp); // 어떻게 공산품이 생성됬는지 정보를 저장(이벤트를 발생)
    }

    //제품 등록의 수를 리턴합니다.
    function getNumOfProducts() public view returns(uint8) {
        return numberOfProducts;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getProductStruct(uint _index) public view returns (uint, string memory, uint, uint, uint, uint) {
        return (productes[_index].assist, productes[_index].productName, productes[_index].manpower, productes[_index].part, productes[_index].circulation, productes[_index].timestamp); // struct에 저장된것을 그대로 가져오는 것
    }
} // parameter 너무많이 넣으면 stackt to dib이라는 error 발생