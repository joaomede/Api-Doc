// // import something here
// import firebase from 'firebase'
// import 'firebase/firestore'

// const versionfeedconfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   databaseURL: process.env.DATABASEURL,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MESSAGINGSENDERID,
//   appId: process.env.APPID
// }

// // Initialize Firebase
// firebase.initializeApp(versionfeedconfig)
// // incia banco

// export const db = firebase.firestore()
// export const timestamp = firebase.firestore.FieldValue.serverTimestamp()

// export default async ({ Vue }) => {
//   Vue.prototype.$firebase = firebase
//   Vue.prototype.$db = db
//   Vue.prototype.$timestamp = timestamp
// }

// firebase
//   .firestore()
//   .enablePersistence(false)
//   .then(function () {})
//   .catch(function (err) {
//     if (err.code === 'failed-precondition') {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code === 'unimplemented') {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   })
