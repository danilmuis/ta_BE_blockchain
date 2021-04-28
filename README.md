<h1 align="center">Welcome to ta_ipfs_blockchain_muis 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Tugas Akhir - Pendeteksi Ijazah Palsu berbasis Blockchain dan IPFS

### ✨ [Demo](https://sivilchain.smartsupportku.com)

## Install

```bash
git clone https://github.com/danilmuis/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH.git
chmod +x ./setup.sh
./setup.sh
npm install
```
### Install as a Cluster Core

```bash
chmod +x ./install_IPFS_BLOCKCHAIN.sh
./install_IPFS_BLOCKCHAIN.sh 0
```


* Make sure variable BOOTNODE,IP exist after installation 
```bash
echo $BOOTNODE
echo $IP
```

### Install DWeb App - usually for cluster core

* Setup Blockchain Account
```bash
bash account/bnode/start.sh
bash account/node1/start.sh
```

* Creating new Contract
```bash
npm run create
```


*  Run Web App

```bash
npm start
```

* Run tests DWeb App

```bash
curl localhost:9000/dashboard
Output :
  CONTRACT BERHASIL DIBUATIN
```

### Install as a Cluster Peer

```bash
./install_IPFS_BLOCKCHAIN.sh 1 {IP Cluster Core}
```

### Connect to Blockchain as Cluster Peer
* Choose your account : node2-node5
```bash
bash account/node2/start.sh
```

## Author

👤 **MUHAMMAD DANIL MUIS**

* Github: [@danilmuis](https://github.com/danilmuis)
* LinkedIn: [@muhammad-danil-muis-000a5b109](https://linkedin.com/in/muhammad-danil-muis-000a5b109)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_