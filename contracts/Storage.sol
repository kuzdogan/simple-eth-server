pragma solidity ^0.5.0;

contract Storage {
    uint number;
    string str;

    function getString() public view returns(string) [
      return str;
    ]

    function setString(string x) public {
      str = x;
    }

    function getNumber() public view returns (uint) {
        return number;
    }

    function setNumber(uint x) public {
        number = x;
    }
}