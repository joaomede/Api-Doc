#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>

version='v1.4.1'

cd ..
yarn build
yarn build:view
docker build -t joaomede/apidoc:${version} . 