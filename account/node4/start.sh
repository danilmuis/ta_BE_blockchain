cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node4
geth --networkid 9999 --datadir "./data" --bootnodes ${BOOTNODE} --port 30306 --ipcdisable --syncmode full --rpc --allow-insecure-unlock --rpccorsdomain "*" --rpcport 8548 --unlock 0xcd483d723fcb7cdbd3C85fa07D3868EC8e689336 --password password.txt --mine console &
