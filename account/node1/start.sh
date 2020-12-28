cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node1
/usr/local/bin/geth --networkid 9999 --datadir "./data" --bootnodes ${BOOTNODE} --port 30303 --ipcdisable --syncmode full --rpc --allow-insecure-unlock --rpccorsdomain "*" --rpcport 8545 --unlock 0x7379A74A69cEcc757EDb22911eb4E65872559499 --password password.txt --mine 
