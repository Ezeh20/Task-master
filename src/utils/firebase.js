/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBSP9h-50ess9KnYG9nUUyUKsJe4f0X4fc',
  authDomain: 'hyper-todo-app.firebaseapp.com',
  projectId: 'hyper-todo-app',
  storageBucket: 'hyper-todo-app.appspot.com',
  messagingSenderId: '64481374271',
  appId: '1:64481374271:web:b404093f3cb8a684c4088a',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore()
provider.setCustomParameters({
  prompt: 'select_account',
})
export const storeUser = async (user, additionalInfo = {}) => {
  if (!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email } = user
    const created = new Date()
    const completed = []
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        created,
        completed,
        firstName: '',
        ...additionalInfo,
      })
    } catch (err) {
      return err
    }
  } else {
    return userDocRef
  }
}

export const onAuthChangeListener = (callback) =>
  onAuthStateChanged(auth, callback)

export const signInRedirect = () => signInWithPopup(auth, provider)

export const createUser = async (email, password) => {
  if (!email || !password) return
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWith = async (email, password) => {
  if (!email || !password) return
  return signInWithEmailAndPassword(auth, email, password)
}
export const LogOut = async () => signOut(auth)