cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node2
geth --networkid 9999 --datadir "./data" --bootnodes enode://b86bf4d38bdd55b858e0939d5777927089eca70babb2d7876c505c9b060bc5cfda1a254460810cd7363885c15a354b6e33281a7d5f6285b177a8e970340aaf8b@192.168.18.52:0?discport=30301 --port 30304 --ipcdisable --syncmode full --rpc  --allow-insecure-unlock  --rpccorsdomain "*" --rpcport 8546 --unlock 0xe1471447e9d908939d20Fe7b6d82Ff2717466f5e  --password password.txt --mine console
