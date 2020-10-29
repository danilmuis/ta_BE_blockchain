// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
//pragma solidity ^0.4.24;
contract SimpleStorage {
  string storedData;
  string[] public data; 

  // constructor(string memory x) public{
  //   storedData = x;
  // }
  constructor() public{}
  function set(string memory x) public {
    storedData = x;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
  function saveHash(string memory hash) public{
    data.push(hash);
  }function loadHash() public view returns (string[] memory){
    return data;
  }
}
