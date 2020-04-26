# Introduction

Api Doc is an OpenSource application developed to help in the documentation of API Rest, the application uses ORM Knex to play with the database. In Api Doc it is possible to generate public, private documentation and even grant access in teams, it is also possible to embed some public documentation in private systems.


## Features
Here are some of the functions that the software has to offer

- [x] Dockerized? Yes!
- [x] Login and Register, Change Password
- [x] Team System
- [x] Api Documentation "private and public"
- [x] Client Electron for Windows, Mac And Linux Dist
- [x] PWA/SPA Works
- [ ] SSR Builder
- [x] Cordova Android
- [ ] Cordova iOS
- [x] Test Request
- [x] Register Responses and Codes Definitions
- [x] Methods Accept: Post, Get, Delete, Put
- [x] Accept: Headers, Params Path and Body
- [x] Accept: Query Params
- [ ] Accept: DataForm, in Dev

## The Database

In development, the database used was postgres, however, knex supports sqlite3 and mysql as well, probably mysql will work well in production, as sqlite3 is not advisable to use it in development or production, as knex's "returning" function doesn't work. it works on it and it is in this project.

## About NPM Libs

Some dependencies I would like to leave the reference and thanks :smiley: :tada:

[Express](https://github.com/expressjs/express),
[Knex](https://github.com/knex/knex),
[Knex](https://github.com/knex/knex),
[Axios](https://github.com/axios/axios),
[Quasar Framework](https://github.com/quasarframework/quasar),
[vue-json-edit](https://github.com/jinkin1995/vue-json-edit),
[vue-json-pretty](https://leezng.github.io/vue-json-pretty),

## License

  [MIT](LICENSE)