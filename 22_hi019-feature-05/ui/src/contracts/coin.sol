pragma solidity ^0.8.4;

contract Coin {

    address public Performer;//주체
    mapping (address => uint) public balances;

    event Sent(address from, address to, uint coin);

    //계약 처음 배포할 때 생성자 함수가 실행된다
    constructor() {
        Performer = msg.sender;
    }

    //새로운 코인을 만들고 특정 주소에 보낸다. 오직 owner만 이 코인을 보낼 수 있다.
    function mint(address receiver, uint coin) public {
        require(msg.sender == Performer);
        balances[receiver] += coin;
    }
  
    error InsufficientBalance(uint requested, uint available);


    //코인지급
    function sendCoin(address receiver, uint coin) public { 
        if (coin > balances[msg.sender])
            revert InsufficientBalance({ //revert는 이 트랜잭션이 발생하지 않게 해주고, 트랜잭션에 관한 정보를 제공함
                requested: coin,
                available: balances[msg.sender]
            });

        balances[msg.sender] -= coin; //코인 감소
        balances[receiver] += coin; //코인 증가
        emit Sent(msg.sender, receiver, coin);
    }

    function sendToCEO(address receiver, uint coin) public{//market이 ceo에게
        if (coin > balances[0xabca4sdf5w6e5r4654df])//market address = 0xabca4sdf5w6e5r4654df
            revert InsufficientBalance({ //revert는 이 트랜잭션이 발생하지 않게 해주고, 트랜잭션에 관한 정보를 제공함
                requested: coin,
                available: balances[msg.sender]
            });

        balances[market주소] -= coin; //코인 감소
        balances[receiver] += coin; //코인 증가
        emit Sent(msg.sender, receiver, coin);
    }

    function chargeCoin(address market) public{//코인충전   
        if (balances[msg.sender] < 500){ 
            sendToCEO(msg.sender, 100);           
        }
    }

    function checkCoin(address walletaddress) public{//코인조회-->프런트 상 쿠폰 갯수를
        return balances[walletaddress];
    }
                                            
   
}
