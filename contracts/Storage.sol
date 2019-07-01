pragma solidity >=0.4.21 <0.6.0;

contract Storage {
    uint number;
    string str;

    function getString() public view returns(string memory) {
      return str;
    }

    function setString(string memory x) public {
      str = x;
    }

    function getNumber() public view returns (uint) {
        return number;
    }

    function setNumber(uint x) public {
        number = x;
    }
}