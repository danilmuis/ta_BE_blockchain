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
installGo(){
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] INSTALLING GOLANG VERSION 1.15.2"
    wget https://golang.org/dl/go1.15.2.linux-amd64.tar.gz
    tar -xvf go1.15.2.linux-amd64.tar.gz 
    mv go /usr/local
    mkdir $HOME/gopath
    echo 'export GOROOT=/usr/local/go' >> $HOME/.bashrc
    GOROOT=/usr/local/go
    echo 'export GOPATH=$HOME/gopath' >> $HOME/.bashrc
    GOPATH=$HOME/gopath
    echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin' >> $HOME/.bashrc
    /usr/local/go/bin/go version
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALLING GOLANG"
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
    echo -e "[*] INSTALLING GIT GCC APACHE2 MAKE CURL"
    apt install git gcc apache2 make curl -y
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALLING GIT GCC APACHE2 MAKE CURL"
}
installGeth(){
    cd $HOME
    git clone https://github.com/ethereum/go-ethereum
    cd go-ethereum
    make all
    cp build/bin/* /usr/local/bin/.
}
installNodeJS(){
    cd $HOME
    wget https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz
    mkdir -p /usr/local/lib/nodejs
    tar -xJvf node-v12.19.0-linux-x64.tar.xz -C /usr/local/lib/nodejs
    export PATH=/usr/local/lib/nodejs/node-v12.19.0-linux-x64/bin:$PATH
}
cd $HOME
installDependencies
installGo
installGeth
installNodeJS
/bin/bash