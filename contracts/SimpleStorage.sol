pragma experimental ABIEncoderV2;
contract SimpleStorage {
  string[] public data; 
  struct Ijazah{
    string data;
    string nik;
    string nama;
    bool berkas;
    bool kaprodi;
    bool dekan;
    bool rektor;
  }
  Ijazah[] public list_ijazah;
  
  constructor() public{}
  
  function setIjazah(string memory data, string memory nik, string memory nama, bool berkas) public{
    Ijazah memory ijazah; 
    ijazah = Ijazah(data,nik,nama,berkas,false,false,false);
    list_ijazah.push(ijazah);
  }
  function getIjazah() public view returns(Ijazah[] memory){
    return list_ijazah;
  }
  
  function saveHash(string memory hash) public{
    data.push(hash);
  }
  function loadHash() public view returns (string[] memory){
    return data;
  }
  
}
