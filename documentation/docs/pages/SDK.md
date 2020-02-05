# SDK
From the 2x version of the project, the code was divided between Api Rest and SDK, all the rules, migrations and querys were moved to the sdk, this page was dedicated for a brief explanation of how to use it

#### Api Doc - JS SDK [Official Repository](https://joaomede.github.io/api-doc-js-sdk)



## Setting
first it is necessary to create a new instance, and pass the configuration following the pattern of the Knex library, which is contained within our SDK

```javascript
import ApiDoc from 'api-doc-js-doc'

const config = {
  dev: {
    client: 'pg',
    connection: {
      port: process.env.PORTDB,
      host: process.env.HOSTDB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 500 }
  }
}

export default new ApiDoc(config.dev, 'TheApiSecretKey')
```

## Import the Instance and Use It

```javascript
import apiDoc from '../config/api'

const name = 'name'
const email = 'email@teste.com'
const password = 'passwordTest'

async function newUserAsyncAwait () {
  try {
    const user = await apiDoc.userRegister(name, email, password)
    console.log(user) // return new user
  } catch (error) {
    console.log(error.message) // return an eventual error 
  }
}

async function newUserThenCatch () {
  apiDoc.userRegister(name, email, password).then((newUser) => {
    console.log(newUser) // return new user
  }).catch((err) => {
    console.log(err) // return an eventual error 
  })
}
```