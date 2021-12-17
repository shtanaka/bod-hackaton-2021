// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";

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

export const references = {
  users: collection(firestore, 'users'),
  user: (userId) => doc(references.users, userId || 'null'),
  challenges: collection(firestore, 'challenge'),
  challenge: (challengeId) => doc(references.challenges, challengeId || 'null'),
  challengeLikes: (challengeId) =>
    collection(firestore, `challenge/${challengeId}/likes`),
  shots: (challengeId) =>
    collection(firestore, `challenge/${challengeId}/shots`),
  shotLikes: (challengeId, shotId) =>
    collection(firestore, `challenge/${challengeId}/shots/${shotId}/likes`),
};

export async function createUser(email, password, displayName) {
  // create user account
  await createUserWithEmailAndPassword(auth, email, password);

  // create user profile
  const userProfileRef = doc(references.users, auth.currentUser.uid);
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

export async function uploadFile(blob, filename) {
  console.log({ blob, filename })
  const storage = getStorage();
  const videoReference = ref(storage, filename);

  const snapshot = await uploadBytes(videoReference, blob);
  return [videoReference, snapshot];
}

export async function createChallenge({ title, challenger }, blob) {
  const [videoReference] = await uploadFile(blob, `${challenger?.userId}-${new Date().getTime()}.webm`);
  const mediaURL = await getDownloadURL(videoReference);

  const data = {
    title,
    mediaURL,
    createdAt: new Date().toISOString(),
    ended: false,
    challenger: {
      userId: challenger?.userId || 'N/A',
      displayName: challenger?.displayName || 'N/A',
      photoURL: challenger?.photoURL || 'N/A',
    },
  };

  return await addDoc(references.challenges, data);
}

export async function createShot(challengeId, { title, contender }, blob) {
  const [videoReference] = await uploadFile(blob, `${contender?.userId}-${challengeId}-${new Date().getTime()}.webm`);
  const mediaURL = await getDownloadURL(videoReference);

  const data = {
    title,
    mediaURL,
    createdAt: new Date().toISOString(),
    contender: {
      userId: contender?.userId || 'N/A',
      displayName: contender?.displayName || 'N/A',
      photoURL: contender?.photoURL || 'N/A',
    },
  };

  return await addDoc(references.shots(challengeId), data);
}

export async function likeChallenge(challengeId) {
  const likeRef = doc(references.challengeLikes(challengeId), auth.currentUser.uid);
  await setDoc(likeRef, true);

  return null;
}

export async function likeShot(shotId) {
  const likeRef = doc(references.shotLikes(shotId), auth.currentUser.uid);
  await setDoc(likeRef, true);

  return null;
}