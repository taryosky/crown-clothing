import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAI5MePhzCdVpVuqRKMWD3a1Va_Q6SI1kk",
    authDomain: "crown-db-e6a37.firebaseapp.com",
    projectId: "crown-db-e6a37",
    storageBucket: "crown-db-e6a37.appspot.com",
    messagingSenderId: "141941831892",
    appId: "1:141941831892:web:ebc9626aad384dcb3e6341",
    measurementId: "G-BF9Z1GYN15"
  };

  export const createUser = async (userAuth, otherProps) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({displayName, email, createdAt, ...otherProps})
        }catch(err){
            console.log(err);
        }
    }

    return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;