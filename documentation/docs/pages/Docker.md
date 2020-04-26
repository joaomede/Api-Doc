# Docker

Want to start fast? use the official image of the docker

## Docker Compose
```yml
version: "3.3"

services:
  pg:
    image: postgres:11.5-alpine
    container_name: pg-database
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: databaseName
    volumes:
      - ./postgres:/var/lib/postgresql/data
      - "/etc/localtime:/etc/localtime:ro"
    networks:
      - apidoc-network

  server:
    image: joaomede/apidoc:v1.4.1
    container_name: "server-api-doc"
    depends_on:
      - pg
    links:
      - pg
    environment:
      HOSTDB: pg
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: databaseName
      NODE_ENV: dev
      EMAIL: a@gmail.com
      PASSWORDSMTP: 123
      SECRET: teste
    ports:
      - 8080:80
    volumes:
      - "/etc/localtime:/etc/localtime:ro"
    networks:
      - apidoc-network

networks:
  apidoc-network:
    driver: bridge
```

Check the repository for the latest version of the docker image and replace it in the "image" field


## Start!
To start, just type the standard command **`docker-compose up -d`**, and the service will start in the background, along with it, a folder called "postgres" will be generated, it will contain the database data, be careful with this folder.