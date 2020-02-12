#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>
dockerRun='docker run -it --rm'
dockerImage='joaomede/nodejs12prod:1.0'
workDir='/usr/src/app'
install='yarn -i'

$dockerRun -v $(pwd):$workDir $dockerImage $install
$dockerRun -v $(pwd)/view:$workDir $dockerImage $install
