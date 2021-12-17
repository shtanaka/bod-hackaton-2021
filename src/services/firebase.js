// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
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

export const collections = {
  users: collection(firestore, 'users'),
  tasks: collection(firestore, 'tasks'),
};

export async function createUser(email, password, displayName) {
  // create user account
  await createUserWithEmailAndPassword(auth, email, password);

  // create user profile
  const userProfileRef = doc(collections.users, auth.currentUser.uid);
  await setDoc(userProfileRef, {
    displayName,
    photoURL: `https://i.pravatar.cc/150?u=${auth.currentUser.uid}`,
  });

  return auth.currentUser;
}

export async function signInUser(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
  return auth.currentUser;
}

export async function signOutUser() {
  await signOut(auth);
}
