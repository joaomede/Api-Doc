# Setup / Installation

## Configuration
For the application to work correctly, it is necessary to first configure the environment variables, in the project, there are 2 environment files, 1 for the frontend and one for the backend, the backend is located in the Root folder, the frontend is located in "view" folder

## The Environment

#### The .env file for backend

**HTTPSERVERPORT**: HTTP server port; ex.: 80  
**APIPORT**: API port; ex.:8080  
**PORTDB**: Database port; ex.:5432  
**HOSTDB**: Ip for host database "external" ex.: 168.168.168.16  
**POSTGRES_USER**: User database, default is admin or postgres  
**POSTGRES_PASSWORD**: Database password  
**POSTGRES_DB**: Database name  
**NODE_ENV**: Mode system: dev or prod  
**DOMAIN**: The name your domain, ex.: example.com  
**HOSTSMTP**: smtp.gmail.com  
**PORTSMTP**: 587  
**EMAIL**: @gmail.com  
**PASSSWORDSMTP**: 123  
**SECRET**: The key for your api  

#### The .env file for frontend
**APIURL**: Path to api, ex.: https://example.com:8080  
**VERSION**: For Show Version in Footer and Header frontend

## How to Install
The use of the docker in production is highly recommended

#### Production
```shell
$ chmod 777 install.sh
$ ./install.sh
```
#### Development
```shell
$ yarn install
$ cd view && yarn install
# or
$ npm run install
$ cd view && npm run install
```

## How to Build
#### Production
```shell
$ chmod 777 build.sh
$ ./build.sh
```

#### Development
```shell
$ yarn build
$ yarn build:view
# or
$ npm run build
$ npm run build:view
```

## How to Serve

#### Production
```shell
$ docker-compose up -d
```

#### Development
```shell
$ yarn dev
$ cd view && yarn dev
# or
$ npm run dev
$ cd view && npm run dev
```

## How to Migrate
For the migration to work, it is necessary first, that the database is running, for that, it is possible to up the database with the command "sudo docker-compose up -d", running directly from the project root

#### Production
```shell
$ chmod 777 migrate.sh
$ ./migrate.sh
```

#### Development
##### Migration Up
```shell
$ yarn migrate
# or
$ npm run migrate
```
##### Migration Down
```shell
$ yarn migratedown
# or
$ npm run migratedown
```