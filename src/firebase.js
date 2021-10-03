import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnbUrrIiBmUh-YP35FN3AkfB2mOmlstsI",
    authDomain: "react-store-e3e73.firebaseapp.com",
    databaseURL: "https://react-store-e3e73-default-rtdb.firebaseio.com",
    projectId: "react-store-e3e73",
    storageBucket: "react-store-e3e73.appspot.com",
    messagingSenderId: "16630991578",
    appId: "1:16630991578:web:00061aa29c429be5fcf3e3",
    measurementId: "G-59ZZ49P52P"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// function to login with google
const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(googleProvider);
        const user = res.user;
        const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
        if (query.docs.length === 0) {
            await db.collection("users").add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
        });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// function to login with email and password
const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// function to register with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
    });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// function to send password reset to email address
const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout
};