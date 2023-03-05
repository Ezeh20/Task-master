/* eslint-disable no-unused-expressions */
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
  deleteDoc,
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
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
provider.setCustomParameters({
  prompt: 'select_account',
})
export const storeUser = async (user, additionalInfo = {}) => {
  if (!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email, uid } = user
    const created = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        created,
        uid,
        firstName: '',
        lastName: '',
        ...additionalInfo,
      })
    } catch (err) {
      return err
    }
  } else {
    return userDocRef
  }
}
/**
 * function to clear completed todos from the rendered todos
 * filter completed todos then populates a state
 * which will be used to clear completed todos
 */
export const clearFinishedTask = (userTodo, uid) => {
  userTodo &&
    userTodo
      .filter((finished) => finished.completed)
      .map(async (completedTodos) => {
        await deleteDoc(
          doc(db, `users/${uid}/todos/${completedTodos.updateId}`)
        )
      })
}
// function to delete todos
export const deleteTodos = async (tod) => {
  // delete a doc using it's id
  await deleteDoc(doc(db, `users/${uid}/todos/${tod.updateId}`))
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
