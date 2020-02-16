#!/bin/bash
# by João Medeiros

sudo docker run -it --rm -v $(pwd):/usr/src/app joaomede/nodejs12prod:1.0 yarn build:view
sudo docker run -it --rm -v $(pwd):/usr/src/app joaomede/nodejs12prod:1.0 yarn build