import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

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

export const register = async (email, password, nickName) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: nickName,
    });
    return user;
  } catch (err) {
    console.log(err.message);
  }
  return true;
};

export const login = async (email, password, setIsOpen) => {
  try {
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

export default app;
