#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>
dockerRun='docker run -it --rm'
dockerImage='joaomede/nodejs12prod:1.0'
workDir='/usr/src/app'
install='yarn -i'

sudo $dockerRun -v $(pwd)/api:$workDir -v $(pwd)/api-doc-js-sdk:/usr/src/api-doc-js-sdk $dockerImage $install
sudo $dockerRun -v $(pwd)/view:$workDir $dockerImage $install
