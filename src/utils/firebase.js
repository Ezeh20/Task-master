/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
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
  updateDoc,
  collection,
  serverTimestamp,
  increment,
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
const auth = getAuth()
const provider = new GoogleAuthProvider()
const db = getFirestore(app)
provider.setCustomParameters({
  prompt: 'select_account',
})
const storeUser = async (user, additionalInfo = {}) => {
  if (!user) return
  const userDocRef = doc(db, 'users', user.uid)
  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email, uid } = user
    const created = new Date()
    try {
      await setDoc(userDocRef, {
        XP: 0,
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
const clearFinishedTask = (userTodo, uid) => {
  userTodo &&
    userTodo
      .filter((finished) => finished.completed)
      .map(async (completedTodos) => {
        await deleteDoc(
          doc(db, `users/${uid}/todos/${completedTodos.updateId}`)
        )
      })
}
// function to update user's todo to true then add to the completed list
const updateTodos = async (toUpdate, uid) => {
  // get the needed todo document path to update
  await updateDoc(doc(db, `users/${uid}/todos/${toUpdate.updateId}`), {
    completed: true,
  })
  await updateDoc(doc(db, `users/${uid}`), {
    XP: increment(10),
  })

  const userTodos = doc(collection(db, `users/${uid}/completedTodos`))

  await setDoc(userTodos, {
    ...toUpdate,
    completedTime: serverTimestamp(),
    completedId: userTodos.id,
  })
}

// function to delete todos
const deleteTodos = async (toDelete, uid) => {
  // delete a doc using it's id
  await deleteDoc(doc(db, `users/${uid}/todos/${toDelete.updateId}`))
}

const deleteCompletedTodo = async (uid, id) => {
  await deleteDoc(doc(db, `users/${uid}/completedTodos/${id}`))
}

const onAuthChangeListener = (callback) => onAuthStateChanged(auth, callback)

const signInRedirect = () => signInWithPopup(auth, provider)

const createUser = async (email, password) => {
  if (!email || !password) return
  return createUserWithEmailAndPassword(auth, email, password)
}

const signInUserWith = async (email, password) => {
  if (!email || !password) return
  return signInWithEmailAndPassword(auth, email, password)
}
const LogOut = async () => signOut(auth)

export {
  LogOut,
  signInUserWith,
  createUser,
  signInRedirect,
  onAuthChangeListener,
  deleteTodos,
  updateTodos,
  clearFinishedTask,
  storeUser,
  db,
  auth,
  deleteCompletedTodo,
}
