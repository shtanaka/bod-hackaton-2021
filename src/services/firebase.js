// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBYvpaSxyI_yZtRjfBBD_HMhxmicFq3UeA',
  authDomain: 'bbhackaton2021.firebaseapp.com',
  projectId: 'bbhackaton2021',
  storageBucket: 'bbhackaton2021.appspot.com',
  messagingSenderId: '240052016192',
  appId: '1:240052016192:web:62eb928b10dbf507a83ba5',
  measurementId: 'G-49X6NZT9XK',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log({ userCredential });
  return userCredential.user;
}

export async function signInUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log({ userCredential });
  return userCredential.user;
}

export async function signOutUser(email, password) {
  await signOut(auth);
}

export const collections = {
  tasks: collection(firestore, 'tasks'),
};
