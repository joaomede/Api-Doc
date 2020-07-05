#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>
dockerRun='docker run -it --rm'
dockerImage='joaomede/nodejs12prod:1.0'
workDir='/usr/src/app'
install='yarn -i'
installProd='yarn -i --production'

read -p "New Tag Version: " version

# Clear Dists and Old modules
sudo rm -r api/node_modules yarn.lock view/dist

# Install modules
sudo $dockerRun -v $(pwd)/api:$workDir $dockerImage $install
sudo $dockerRun -v $(pwd)/view:$workDir $dockerImage $install

# Build view and api
sudo $dockerRun -v $(pwd)/view:$workDir $dockerImage yarn build:pwa
sudo $dockerRun -v $(pwd)/api:$workDir $dockerImage yarn build


# Clear api modules
sudo rm -r ./api/node_modules ./api/yarn.lock

# Install api productions
sudo $dockerRun -v $(pwd):$workDir $dockerImage $installProd

# Build docker image
sudo docker build -t joaomede/apidoc:${version} .

# Clear Modules again to install dev
sudo rm -r ./api/node_modules ./api/yarn.lock

# install dev
sudo $dockerRun -v $(pwd)/api:$workDir $dockerImage $install

# Tag latest image
sudo docker tag joaomede/apidoc:${version} joaomede/apidoc:latest