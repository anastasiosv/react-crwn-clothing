import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =
{
    apiKey: "AIzaSyCotWY97reXDb3iMKHyUErg8lN8NMvTwN8",
        authDomain: "crwn-project-34e6e.firebaseapp.com",
    databaseURL: "https://crwn-project-34e6e.firebaseio.com",
    projectId: "crwn-project-34e6e",
    storageBucket: "crwn-project-34e6e.appspot.com",
    messagingSenderId: "914185424857",
    appId: "1:914185424857:web:111dae9daf4cc178cb13c8",
    measurementId: "G-KQ2YCKLD5M"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters(
    {
        prompt: 'select_account'
    }
);
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;