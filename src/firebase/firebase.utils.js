import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAlW66kCmwxUZd0TJDa4IgDUlLIq7Ig9nI",
    authDomain: "crwn-db-51d78.firebaseapp.com",
    databaseURL: "https://crwn-db-51d78.firebaseio.com",
    projectId: "crwn-db-51d78",
    storageBucket: "crwn-db-51d78.appspot.com",
    messagingSenderId: "632610648897",
    appId: "1:632610648897:web:00cbfdc8705fe6b412e7c0",
    measurementId: "G-D2MDHR0RTW"
  };


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return; 
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export  const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'}); 
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;