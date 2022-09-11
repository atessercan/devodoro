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
  let data = {};
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const stats = new Array(7).fill({
      monthDay: null,
      month: null,
      time: null,
      dayName: null,
    });
    await updateProfile(auth.currentUser, {
      displayName: nickName,
    });
    await setDoc(doc(db, 'users', auth.currentUser.uid), { stats });
    data = user;
  } catch (error) {
    data = { ...error };
  }
  return data;
};

export const login = async (email, password) => {
  let data = {};
  try {
    await setPersistence(auth, browserLocalPersistence);
    data = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    data = { ...err };
  }
  return data;
};

export const logout = async () => {
  await signOut(auth);
};

export const addFirebaseDB = async (stats) => {
  await setDoc(doc(db, 'users', auth.currentUser.uid), { stats });
};

export const getFirebaseDB = async () => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const arr = await data.stats;
  return arr;
};

export default { app, db };
