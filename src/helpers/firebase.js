import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const register = async (email, password, nickName) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const data = new Array(7).fill({
      monthDay: null,
      month: null,
      time: null,
      dayName: null,
    });
    await updateProfile(auth.currentUser, {
      displayName: nickName,
    });
    await setDoc(doc(db, 'users', auth.currentUser.uid), { data });
    return user;
  } catch (err) {
    console.log(err.message);
  }
  return true;
};

export const login = async (email, password, setIsOpen) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const user = await signInWithEmailAndPassword(auth, email, password);
    setIsOpen(false);
    return user;
  } catch (err) {
    console.log(err.message);
  }
  return true;
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    console.log(err.message);
  }
  return true;
};

export const addFirebaseDB = async (data) => {
  try {
    await setDoc(doc(db, 'users', auth.currentUser.uid), { data });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getFirebaseDB = async () => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const arr = await data.data;
  return arr;
};

export default { app, db };
