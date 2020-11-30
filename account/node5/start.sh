cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node5
geth --networkid 9999 --datadir "./data" --bootnodes ${BOOTNODE} --port 30307 --ipcdisable --syncmode full --rpc --allow-insecure-unlock --rpccorsdomain "*" --rpcport 8549 --unlock 0x6E9C70270cd324e357c1098ea8a957999F09Cf31 --password password.txt --mine 
