#!/bin/bash
## By João Medeiros - <symbol2studio@gmail.com>

PORT=$(grep -Po '(?<=^APIPORT=)\w*$' .env)
ENDPOINT='auth/register'
URL='http://127.0.0.1:'$PORT/$ENDPOINT

HEADER='"Content-type: application/json"'
read -p "Informe o nome: " name
read -p "Informe o email: " email
read -p "Informe a senha: " password

curl \
  -H "Content-Type: application/json" \
  --data '{"name": '\"$name\"', "email": '\"$email\"', "password": '\"$password\"', "caixa_atual": '\"$caixa_atual\"'}' \
  -X POST $URL
