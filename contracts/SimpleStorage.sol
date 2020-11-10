// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
//pragma solidity ^0.4.24;
contract SimpleStorage {
  string[] public data; 
  struct Ijazah{
    string data;
    bool kaprodi;
    bool dekan;
    bool rektor;
  }
  Ijazah[] public list_ijazah;
  
  constructor() public{}
  
  function setIjazah(string memory data) public{
    Ijazah memory ijazah; 
    ijazah = Ijazah(data,false,false,false);
    list_ijazah.push(ijazah);
  }
  function getIjazah() public view returns(Ijazah[] memory){
    return list_ijazah;
  }
  
  function saveHash(string memory hash) public{
    data.push(hash);
  }function loadHash() public view returns (string[] memory){
    return data;
  }
  
}
