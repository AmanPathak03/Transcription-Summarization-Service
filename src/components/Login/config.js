import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAVx5u0uhvFpSLDTmD8Mg_xCkl15rx9ZLs",
  authDomain: "authentication-38502.firebaseapp.com",
  projectId: "authentication-38502",
  storageBucket: "authentication-38502.firebasestorage.app",
  messagingSenderId: "58511993892",
  appId: "1:58511993892:web:daac6674ecf9d884b57cb1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
export {auth, provider};


