cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node2
geth --networkid 9999 --datadir "./data" --bootnodes ${BOOTNODE} --port 30304 --ipcdisable --syncmode full --rpc  --allow-insecure-unlock  --rpccorsdomain "*" --rpcport 8546 --unlock 0xe1471447e9d908939d20Fe7b6d82Ff2717466f5e  --password password.txt --mine console
