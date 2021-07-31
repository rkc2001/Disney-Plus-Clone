import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyClLyETSrKNQTZUbxz0fiMh3CcRdULjkJ8",
  authDomain: "disney-plus-clone-48776.firebaseapp.com",
  projectId: "disney-plus-clone-48776",
  storageBucket: "disney-plus-clone-48776.appspot.com",
  messagingSenderId: "243037672542",
  appId: "1:243037672542:web:fa4f15078a7a73d3e850cf"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

// Useful for Login with Google popup
const provider = new firebase.auth.GoogleAuthProvider();

// Useful for storing videos/pictures and images 
const storage = firebase.storage();

export { auth, provider, storage };
export default db;