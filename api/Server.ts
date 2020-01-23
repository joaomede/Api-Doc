import App from './App'
const app = new App()

app.server().listen(app.apiPort(), () => {
  console.log(`Running Api in ${app.apiPort()}`)
})
