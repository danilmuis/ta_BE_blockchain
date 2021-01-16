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

  struct dataUser{
      bytes32 userEmail;
      bytes32 userPassword;
      address userEthAddr;
      uint userRole;
  } 
  mapping (bytes32 => dataUser) public userData;
  
  constructor() public{}
  function addUserData(bytes32 hash_email, bytes32 hash_pass, address hash_ethAddr, uint role) public {
    dataUser memory data_user = dataUser(hash_email, hash_pass, hash_ethAddr, role);
    userData[hash_email] = data_user;
  }
  function getData (bytes32 email) public view returns(bytes32, bytes32, address, uint) {
    return (userData[email].userEmail, userData[email].userPassword, userData[email].userEthAddr, userData[email].userRole);
	}
  
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
