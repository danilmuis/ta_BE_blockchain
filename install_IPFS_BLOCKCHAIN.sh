#!/bin/bash

RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

usage(){
    echo -e ""
    echo -e "${RED}Usage: $0 <TYPE>"
    echo -e "${YELLOW}"
    echo -e "Types:"
    echo -e "\t0:	Update and install dependencies (~15 seconds)"
    echo -e "\t1:	Install Golang and IPFS (~5 minutes)"
    echo -e ""
    exit 1
}
checkPing(){
pingTest=$(ping -c 1 -W 3 "$IP" | grep ttl)
if [[ -z $pingTest ]]; then
	echo "IP IS INVALID"
    exit 1
else
	ttl=$(echo "${pingTest}" | cut -d " " -f 6 | cut -d "=" -f 2)
    echo "THE IP IS VALID"
fi
}
installGo(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] INSTALLING GOLANG VERSION 1.15.2"
    wget https://golang.org/dl/go1.15.2.linux-amd64.tar.gz
    tar -xvf go1.15.2.linux-amd64.tar.gz 
    mv go /usr/local
    mkdir $HOME/gopath
    echo 'export GOROOT=/usr/local/go' >> /etc/profile
    GOROOT=/usr/local/go
    echo 'export GOPATH=$HOME/gopath' >> /etc/profile
    GOPATH=$HOME/gopath
    echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin' >> /etc/profile
    /usr/local/go/bin/go version
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALLING GOLANG"
    echo -e ""
}
installIPFS(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] INSTALLING IPFS VERSION 0.7.0"
    cd /tmp
    wget https://dist.ipfs.io/go-ipfs/v0.7.0/go-ipfs_v0.7.0_linux-amd64.tar.gz
    tar -xvf go-ipfs_v0.7.0_linux-amd64.tar.gz
    mv go-ipfs/ipfs /usr/local/bin/ipfs
    /usr/local/bin/ipfs init
    /usr/local/bin/ipfs version
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALLING IPFS"
    echo -e ""
}
installDependencies(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] UPDATING"
    apt update
    echo -e "${GREEN}"
    echo -e "[*] FINISH UPDATING"
    echo -e "${YELLOW}"
    echo -e "[*] INSTALLING GIT GCC APACHE2 MAKE"
    apt install git gcc apache2 make -y
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALLING GIT GCC APACHE2 MAKE"
}
createPrivateNetwork(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] CREATE PRIVATE NETWORK"
    /usr/local/go/bin/go get -u github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen
    $GOPATH/bin/ipfs-swarm-key-gen > $HOME/.ipfs/swarm.key
    echo -e "${GREEN}"
    echo -e "[*] FINISH CREATE PRIVATE NETWORK"
}
bootstrapingIPFS(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] BOOTSTRAPING IPFS NODES"
    IPFS_ID=$(/usr/local/bin/ipfs id | grep ID | awk -F '"' '{print $4}')
    echo -e "ADD BOOTSTRAP"
    echo -e "YOUR IPFS ID : ${IPFS_ID}"
    echo -e "YOUR IP      : ${IP}"
    /usr/local/bin/ipfs bootstrap rm --all
    /usr/local/bin/ipfs bootstrap add /ip4/0.0.0.0/tcp/4001/ipfs/${IPFS_ID}
    LIBP2P_FORCE_PNET=1
    /bin/sed -i "s/127.0.0.1/0.0.0.0/g" $HOME/.ipfs/config
    echo "export LIBP2P_FORCE_PNET=1" >> /etc/profile
    echo -e "${GREEN}"
    echo -e "[*] FINISH BOOTSTRAPING IPFS NODES"
}
testIPFS(){
    echo -e "${YELLOW}"
    echo -e "[*] ALLOWING CORS AND TESTING IPFS"
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["POST"]'
    /usr/local/bin/ipfs daemon & 
    echo -e "WAITING 10 SEC TO LET IPFS START"
    sleep 10
    echo -e "[*] ADD FILE.txt"
    echo "TESTING FILE IPFS" > $HOME/file.txt
    HASH=$(/usr/local/bin/ipfs add $HOME/file.txt | awk '{print $2}')
    echo -e "[*] READ FILE.txt FROM IPFS"
    /usr/local/bin/ipfs cat ${HASH}
    echo -e "${GREEN}"
    echo -e "[*] FINISH ALLOWING CORS AND TESTING IPFS "
}
IPFSForever(){
    echo -e "${YELLOW}"
    echo -e "[*] SETTING IPFS AS A SERVICE"
    echo "
    [Unit]
	Description=IPFS Daemon
	After=syslog.target network.target remote-fs.target nss-lookup.target
	[Service]
	Type=simple
	ExecStart=/usr/local/bin/ipfs daemon
	User=root
	[Install]
	WantedBy=multi-user.target
    " > /etc/systemd/system/ipfs.service
    systemctl daemon-reload
	systemctl enable ipfs
	systemctl start ipfs
	systemctl status ipfs
    echo -e "${GREEN}"
    echo -e "[*] FINISH SETTING IPFS AS A SERVICE"
}
installIPFSCluster(){
    echo -e "${YELLOW}"
    echo -e "[*] INSTALL IPFS CLUSTER"
    cd /tmp
    git clone https://github.com/ipfs/ipfs-cluster.git $GOPATH/src/github.com/ipfs/ipfs-cluster
    cd $GOPATH/src/github.com/ipfs/ipfs-cluster
	make install
    $GOPATH/bin/ipfs-cluster-service --version
	$GOPATH/bin/ipfs-cluster-ctl --version
    CLUSTER_SECRET=$(od -vN 32 -An -tx1 /dev/urandom | tr -d ' \n')
    echo "YOUR CLUSTER SECRET : ${CLUSTER_SECRET}"
    echo "export CLUSTER_SECRET=${CLUSTER_SECRET}" >> /etc/profile
    echo "CLUSTER_SECRET=${CLUSTER_SECRET}" > /var/www/html/cluster_secret.txt
    echo "${CLUSTER_SECRET}" > /var/www/html/cluster_ipfs.txt
    
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALL IPFS CLUSTER"
}
installIPFSClusterPeer(){
    echo -e "${YELLOW}"
    echo -e "[*] INSTALL IPFS CLUSTER"
    cd /tmp
    git clone https://github.com/ipfs/ipfs-cluster.git $GOPATH/src/github.com/ipfs/ipfs-cluster
    cd $GOPATH/src/github.com/ipfs/ipfs-cluster
	make install
    $GOPATH/bin/ipfs-cluster-service --version
	$GOPATH/bin/ipfs-cluster-ctl --version
    CLUSTER_SECRET=$(curl ${IP}/cluster_secret.txt | awk -F '=' '{print $2}')
    echo "YOUR CLUSTER SECRET : ${CLUSTER_SECRET}"
    echo "export CLUSTER_SECRET=${CLUSTER_SECRET}" >> /etc/profile
    CLUSTER=$(curl ${IP}/cluster_ipfs.txt)
    echo "CONNECTING TO CLUSTER : $CLUSTER"
    echo "export CLUSTER=$CLUSTER" >> /etc/profile
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALL IPFS CLUSTER"
}
startIPFSCluster(){
    echo -e "${YELLOW}"
    echo -e "[*] STARTING IPFS CLUSTER"
    $GOPATH/bin/ipfs-cluster-service init
    $GOPATH/bin/ipfs-cluster-service daemon &
    echo "$GOPATH/bin/ipfs-cluster-service daemon &
sleep 10">> $HOME/.bashrc
    echo -e "WAITING 10 SEC TO LET IPFS CLUSTER START"
    sleep 10
    CLUSTER_IPFS_ID=$($GOPATH/bin/ipfs-cluster-ctl id | awk '{print $2}' | grep 9096 | grep -v 127.0.0.1)
    echo -e "YOUR CLUSTER IPFS ID : ${CLUSTER_IPFS_ID}"
    echo "export CLUSTER_IPFS_ID=${CLUSTER_IPFS_ID}"
    echo "${CLUSTER_IPFS_ID}" > /var/www/html/cluster_ipfs.txt
    echo -e "${GREEN}"
    echo -e "[*] FINISH IPFS CLUSTER"
}
startIPFSClusterPeer(){
    echo -e "${YELLOW}"
    echo -e "[*] STARTING IPFS CLUSTER"
    $GOPATH/bin/ipfs-cluster-service init
    $GOPATH/bin/ipfs-cluster-service daemon --bootstrap $CLUSTER &
    echo "$GOPATH/bin/ipfs-cluster-service daemon --bootstrap $(curl ${IP}/cluster_ipfs.txt) & 
sleep 10">> $HOME/.bashrc
    echo -e "WAITING 10 SEC TO LET IPFS CLUSTER START"
    sleep 10
    # echo "
    # [Unit]
	# Description=IPFS-Cluster Daemon
	# Requires=ipfs
	# After=syslog.target network.target remote-fs.target nss-lookup.target ipfs
	# [Service]
	# Type=simple
	# ExecStart=${GOPATH}/bin/ipfs-cluster-service daemon --bootstrap $(curl ${IP}/cluster_ipfs.txt)
	# User=root
	# [Install]
	# WantedBy=multi-user.target
    # " > /etc/systemd/system/ipfs-cluster.service
    # systemctl daemon-reload
	# systemctl enable ipfs-cluster
	# systemctl start ipfs-cluster &
	#systemctl status ipfs-cluster
    echo -e "${GREEN}"
    echo -e "[*] FINISH IPFS CLUSTER"
}
installGeth(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] INSTALLING GETH"
    cd $HOME
    git clone https://github.com/ethereum/go-ethereum
    cd go-ethereum
    make all
    cp build/bin/* /usr/local/bin/.
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALL GETH"
}
setupBlockchain(){
    cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH
    echo -e "${YELLOW}"
    echo -e "[*] SETUP AND DEPLOY SMART CONTRACT BLOCKCHAIN"
    
    bash $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/bnode/init.sh > /home/mdm.txt
    sleep 30
    cat /home/mdm.txt | grep enode > /var/www/html/bootnode.txt
    BOOTNODE=$(cat /var/www/html/bootnode.txt)
    echo "INI : BOOTNODE=${BOOTNODE}"
    chmod 777 $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/ijazah
    chmod 777 $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/transkrip
    echo "export BOOTNODE=$(cat /var/www/html/bootnode.txt)" >> /etc/profile
    # nohup bash $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/bnode/start.sh &
    # nohup bash $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node1/start.sh &
    npm config set user 0
    npm config set unsafe-perm true
    npm install
    npm run create
    echo -e "[*] FINISH SETUP AND DEPLOY SMART CONTRACT BLOCKCHAIN"
    # echo "Starting DWebApp"
    # npm start &
}
setupBlockchainPeer(){
    cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH
    echo -e "${YELLOW}"
    echo -e "[*] SETUP BLOCKCHAIN PEER"
    
    BOOTNODE=$(curl ${IP}/bootnode.txt)
    echo "INI : BOOTNODE=${BOOTNODE}"
    echo "export BOOTNODE=$(curl ${IP}/bootnode.txt)" >> /etc/profile
    # nohup bash $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH/account/node${3}/start.sh &  
    echo -e "[*] FINISH SETUP BLOCKCHAIN PEER"
}
checkRoot(){
    if [ $(whoami) == "root" ]
    then
        echo "YOU ARE ROOT"
    else
        echo "PLEASE RUN AS ROOT OR USE SUDO"
        exit 1
    fi
}
if [ "$#" = 0 ]
then
    usage
else
    source /etc/profile
    if ! command -v /usr/local/go/bin/go   &> /dev/null
    then
        echo "Dependencies not found please run setup.sh"
        exit 1
    fi

    if [ $1 -eq 0 ]
    then
        echo -e "${GREEN}"
        echo "TYPE 0"
        echo -e "${YELLOW}"
        checkRoot
        IP=$(hostname -I | awk '{print $1}')
        echo "export IP=$(hostname -I | awk '{print $1}')">> /etc/profile
        source /etc/profile
        echo "YOUR IP IS ${IP}"
        checkPing
        #IPFS
        cd $HOME
        installIPFS
        createPrivateNetwork
        bootstrapingIPFS
        testIPFS
        IPFSForever
        #IPFS CLUSTER
        installIPFSCluster
        startIPFSCluster
        installGeth
        setupBlockchain
        sleep 10
        echo -e "${RED} [*] FINISH INSTALLING"
        source /etc/profile
        #reboot
    elif [ $1 -eq 1 ]
    then
        echo -e "${GREEN}"
        echo "TYPE 1"
        echo -e "${YELLOW}"
        checkRoot
        IP=$2
        echo "CENTRAL IPFS IP IS ${IP}"
        checkPing
        cd $HOME
        installIPFS
        bootstrapingIPFS
        testIPFS
        IPFSForever
        installIPFSClusterPeer
        startIPFSClusterPeer
        installGeth
        setupBlockchainPeer
        sleep 10
        echo -e "${RED} [*] FINISH INSTALLING"
        source /etc/profile
        #reboot
    else
        usage
    fi
    
fi

