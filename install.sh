#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>
dockerRun='docker run -it --rm'
dockerImage='joaomede/nodejs12prod:1.0'
workDir='/usr/src/app'
install='yarn -i'
buildView='yarn build:view'
buildApi='yarn build:dev'
migrate='yarn migrate'

cp .env.example .env
$dockerRun -v $(pwd):$workDir $dockerImage $install
$dockerRun -v $(pwd):$workDir $dockerImage $buildApi
$dockerRun -v $(pwd):$workDir $dockerImage $migrate
cd view && cp .env.example .env
$dockerRun -v $(pwd):$workDir $dockerImage $install
cd ..
$dockerRun -v $(pwd):$workDir $dockerImage $buildView
