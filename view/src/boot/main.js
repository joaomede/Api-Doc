// import something here
import firebase from "firebase";
import "firebase/firestore";

//import VueQrcode from '@chenfengyuan/vue-qrcode';

// incialização gerador de QR
//Vue.component(VueQrcode.name, VueQrcode);
var versionfeedconfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(versionfeedconfig);

// incia banco
export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export default firebase;
