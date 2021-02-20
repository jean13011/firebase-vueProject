import firebase from "firebase";
import 'firebase/firestore'
import firebaseConfig from "./firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()

//instancie la connection à la base de données