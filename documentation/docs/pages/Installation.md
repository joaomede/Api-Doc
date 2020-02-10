# Setup / Installation

## Configuration
For the application to work correctly, it is necessary to first configure the environment variables, in the project, there are 2 environment files, 1 for the frontend and one for the backend, the backend is located in the Root folder, the frontend is located in "view" folder

## The Environment

#### The .env file for backend

# Database Settings
**POSTGRES_USER**: User database, default is admin or postgres  
**POSTGRES_PASSWORD**: Database password  
**POSTGRES_DB**: Database name  

# MODE
**NODE_ENV**: Mode system: dev or prod  

# SMTP Settings
**EMAIL**: @gmail.com  
**PASSSWORDSMTP**: 123  

# Secrete KEY (API KEY)
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
first make a .env file, and...
```shell
$ sudo docker-compose up
```

## Build (needed only if you are not going to create a build docker)
```shell
$ sudo chmod 777 /scripts/build.sh
$ sudo ./scripts/build.sh
```

## Serve
```shell
$ cd .docker && sudo docker-compose up -d
```

## Migrate
when executing the development container the migrate command will be executed automatically, however, if you need to perform the migration for any other reason, follow the instruction:
```shell
$ sudo chmod 777 /scripts/migrate.sh
$ sudo ./scripts/migrate.sh
```