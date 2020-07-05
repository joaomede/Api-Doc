import apiDoc from './api'

(async function migrate (): Promise<void> {
  try {
    await apiDoc.migrate()
    console.log('sucess')
  } catch (error) {
    console.log('error')
    console.log(error)
  }
})()
