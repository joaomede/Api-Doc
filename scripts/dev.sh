#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>

sleep 5s
cd api
yarn migrate:dev
yarn dev