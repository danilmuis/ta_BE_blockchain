cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node3
geth --networkid 9999 --datadir "./data" --bootnodes ${BOOTNODE} --port 30305 --ipcdisable --syncmode full --rpc --allow-insecure-unlock --rpccorsdomain "*" --rpcport 8547 --unlock 0x23D05250e0cd0dBdEe9612BA16Babb6511AB8523  --password password.txt --mine console
