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
    cd /tmp
    wget https://golang.org/dl/go1.15.2.linux-amd64.tar.gz
    tar -xvf go1.15.2.linux-amd64.tar.gz 
    mv go /usr/local
    mkdir $HOME/gopath
    echo 'export GOROOT=/usr/local/go' >> /etc/profile
    GOROOT=/usr/local/go
    echo 'export GOPATH=$HOME/gopath' >> /etc/profile
    GOPATH=$HOME/gopath
    PATH=$PATH:$GOROOT/bin:$GOPATH/bin
    echo 'export PATH=$PATH:$GOROOT/bin:$GOPATH/bin' >> /etc/profile
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
    apt install git gcc apache2 make curl gconf-service libasound2 libgbm-dev libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget -y
    echo -e "${GREEN}"
    echo -e "[*] FINISH INSTALLING GIT GCC APACHE2 MAKE CURL"
}

installNodeJS(){
    cd /tmp
    echo -e ""
    echo -e "${YELLOW}"
    echo -e "[*] INSTALLING NODEJS VERSION 12.19.0"
    wget https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz
    mkdir -p /usr/local/lib/nodejs
    tar -xJvf node-v12.19.0-linux-x64.tar.xz -C /usr/local/lib/nodejs
    PATH=$PATH:/usr/local/lib/nodejs/node-v12.19.0-linux-x64/bin
    echo "export PATH=$PATH:/usr/local/lib/nodejs/node-v12.19.0-linux-x64/bin" >> /etc/profile
}
cd $HOME
installDependencies
installGo
installNodeJS
source /etc/profile
echo "source /etc/profile" >> $HOME/.bashrc
cd $HOME/TA_DAPP_IPFS_BLOCKCHAIN_IJAZAH
/bin/bash