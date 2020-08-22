import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCE6cVKslikxkzQapPMJvZpFY54EUnFosA",
    authDomain: "crow-db-50993.firebaseapp.com",
    databaseURL: "https://crow-db-50993.firebaseio.com",
    projectId: "crow-db-50993",
    storageBucket: "crow-db-50993.appspot.com",
    messagingSenderId: "716301551654",
    appId: "1:716301551654:web:4ef2c15aa261a82125bee7",
    measurementId: "G-GMR7KQ6Y0N" 
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;