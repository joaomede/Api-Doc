# Setup / Installation

## Configuration
For the application to work correctly, it is necessary to first configure the environment variables, in the project, there are 2 environment files, 1 for the frontend and one for the backend, the backend is located in the Root folder, the frontend is located in "view" folder

## The Environment

#### The .env file for backend

**POSTGRES_USER**: User database, default is admin or postgres  
**POSTGRES_PASSWORD**: Database password  
**POSTGRES_DB**: Database name  
**NODE_ENV**: Mode system: dev or prod  
**HOSTSMTP**: smtp.gmail.com  
**PORTSMTP**: 587  
**EMAIL**: @gmail.com  
**PASSSWORDSMTP**: 123  
**SECRET**: The key for your api  

#### The .env file for frontend
**APIURL**: "FOR DEV", default http://localhost:8081  
**VERSION**: For Show Version in Footer and Header frontend

## How to Install
The use of the docker in production is highly recommended,
OBS: All scripts are in the "scripts" folder

## Install
It is highly recommended to use the docker image that already brings the environment ready for production

```shell
$ sudo chmod 777 scripts/install.sh
$ sudo ./scripts/install.sh
```

## Development
```shell
$ sudo docker-compose up
```

## Build (not necessary for production using offical docker image)
```shell
$ sudo chmod 777 /scripts/build.sh
$ sudo ./scripts/build.sh
```

## Serve
```shell
$ cd .docker && sudo docker-compose up -d
```

## Migrate
For the migration to work, it is necessary first, that the database is running, for that, it is possible to up the database with the command "sudo docker-compose up in dev or serve production", running directly from the project root
```shell
$ sudo chmod /scripts/migrate.sh
$ sudo ./scripts/migrate.sh
```