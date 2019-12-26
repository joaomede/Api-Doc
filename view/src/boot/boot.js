import Firebase from 'firebase'


export default ({ app, router, Vue, store }) => {

  // Register the Firebase authentication listener
  Firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Signed in. Let Vuex know.
      //store.commit('auth/SET_USER', user)
      //router.replace({ name: 'Inicial' })
      new Vue(app, store) /* eslint-disable-line no-new */
    } else {
      // Signed out. Let Vuex know.
      //const permissao = "";
      //store.commit('SetPermissao', permissao)
      //router.replace({ name: 'Login' })
      new Vue(app, store) /* eslint-disable-line no-new */
    }
  })
}