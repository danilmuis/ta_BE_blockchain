var request = new XMLHttpRequest();
request.open('GET', '/public/file/address.txt', false); // `false` => synchronous request
request.send(null);

if (request.status === 200) {
  console.log(request.responseText);
  var address = request.responseText;
}



var contract = undefined;
var customProvider = undefined;




var abi = undefined;

function notary_init() {



  // TODO: Step 2: Setup Developer API Key

  // const fm = new Fortmatic('pk_test_C0E8AA1D15504637', 'ropsten');
  // // End Step 2
  // window.web3 = new Web3(fm.getProvider());


  // const customNodeOptions = {
  //   rpcUrl: 'http://127.0.0.1:8545', // your own node url
  //   chainID: 4
  // }

  // // Setting network to localhost blockchain
  // const fm = new Fortmatic('pk_live_3736E465E08178B0', customNodeOptions);
  // window.web3 = new Web3(fm.getProvider());

  //Check if Web3 has been injected by the browser (Mist/MetaMask) and formatic
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  web3.eth.defaultAccount = web3.eth.accounts[0]

  // window.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/310e817fedd341c3980bd1007eb9475a'))
  abi = [{
      "constant": false,
      "inputs": [{
        "name": "hash",
        "type": "bytes32"
      }],
      "name": "addDocHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "hash",
        "type": "bytes32"
      }],
      "name": "findDocHash",
      "outputs": [{
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ];

  // NOTE: Older syntax --> contract = web3.eth.contract(abi, address);

  contract = new web3.eth.Contract(abi, address);

};



//sends a hash to the blockchain
function notary_send(hash, callback) {

  contract.methods.addDocHash(hash).send({
    from: '0xC3eadd991fb3712a29226F1D06E35B5259DE4Aaa',
    gas: 100000
  }, function (error, tx) {
    if (error) callback(error, null);
    else callback(null, tx);
  });

};


//looks up a hash on the blockchain
function notary_find(hash, callback) {
  contract.methods.findDocHash(hash).call(function (error, result) {
    if (error) callback(error, null);
    else {
      let resultObj = {
        mineTime: new Date(result[0] * 1000),
        blockNumber: result[1]
      }
      callback(null, resultObj);
    }
  });

  // let contract = web3.eth.contract(abi).at(address);
  // contract.verify(hash, function (err, result) {
  //   if (err)
  //     return showError("Smart contract call failed: "+ e);
  //   let contractPublishDate = result.toNumber();
  //
  //   if (contractPublishDate > 0) {
  //     let displayDate = new Date(contractPublishDate * toLocaleString());
  //     showInfo(`Document ${hash} is <b>valid</b>`);
  //   } else
  //     return showError(`Document ${documentHash}`);
  // })
};