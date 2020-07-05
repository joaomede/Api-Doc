#!/bin/bash
# by João Medeiros

sudo docker run -it --rm -v $(pwd)/view:/usr/src/app joaomede/nodejs12prod:1.0 yarn build:pwa
sudo docker run -it --rm -v $(pwd)/api:/usr/src/app joaomede/nodejs12prod:1.0 yarn build