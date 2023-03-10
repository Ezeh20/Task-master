/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db, onAuthChangeListener, storeUser } from '../utils/firebase'
import { updateUser } from './userReducer'
import { getTodos } from './todoReducer'

export const UpdateUserContext = createContext({
  data: null,
  logged: [],
  setLogged: () => {},
  main: [],
  userId: null,
  userTodo: null,
  setUserTodo: () => {},
  deleteModal: false,
  setDeleteModal: () => {},
  editModal: false,
  setEditModal: () => {},
  completedTodos: null,
  setCompletedTodos: () => {},
  awards: null,
  setAwards: () => {},
  xp: null,
  setXP: () => {},
})

export function UpdateUser({ children }) {
  const cc = localStorage.getItem('todoCii')
    ? JSON.parse(localStorage.getItem('todoCii'))
    : null
  const dd = localStorage.getItem('unKnown')
    ? JSON.parse(localStorage.getItem('unKnown'))
    : null
  const currentUser = useSelector((state) => state.user.value)
  const fetchedTodos = useSelector((state) => state.todo.value)
  const [logged, setLogged] = useState(cc)
  const [userId, setId] = useState(dd)
  const [data, setData] = useState(null)
  const [userTodo, setUserTodo] = useState(null)
  const [completedTodos, setCompletedTodos] = useState(null)
  const [awards, setAwards] = useState(null)
  const [main, setMain] = useState([])
  const [xp, setXP] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const uid = currentUser && currentUser.uid
  const dispatch = useDispatch()
  const value = {
    data,
    logged,
    setLogged,
    main,
    userId,
    userTodo,
    setUserTodo,
    deleteModal,
    setDeleteModal,
    editModal,
    setEditModal,
    completedTodos,
    setCompletedTodos,
    awards,
    setAwards,
    xp,
    setXP,
  }

  /**
   * get the current user by matching userIds the store that user in a state
   *  to be used anywhere in the app
   */
  useEffect(() => {
    const user = data && data.filter((currentData) => currentData.uid === uid)
    setMain(user)
    user && user.map((itm) => setXP(itm.XP))
  }, [data, setMain, uid])

  // listen for any auth change then update the user object
  useEffect(() => {
    const unsubscribe = onAuthChangeListener((user) => {
      if (user) {
        // if the user object is true, store the user in fire store
        storeUser(user)
        // update the user
        dispatch(updateUser(user))
        setLogged({ active: true })
        setId(uid)
      }
    })
    return unsubscribe
  }, [dispatch, uid])

  // store the auth state of the user in localStorage
  useEffect(() => {
    localStorage.setItem('todoCii', JSON.stringify(logged))
  }, [logged])

  // store the current user's userId in localStorage
  useEffect(() => {
    localStorage.setItem('unKnown', JSON.stringify(userId))
  }, [userId])

  // get all users which will be used to filter out the current user using ther user's uid
  useEffect(() => {
    const sub = onSnapshot(collection(db, 'users'), (snaps) => {
      const list = []
      snaps.docs.forEach((doC) => {
        list.push({ id: doC.userId, ...doC.data() })
      })
      setData(list)
    })
    return () => sub()
  }, [])

  // fetching the user's task from firestore
  useEffect(() => {
    const q = query(collection(db, `users/${userId}/todos`))
    const unSub = onSnapshot(q, (qSnap) => {
      const list = []
      qSnap.forEach((docf) => {
        list.push({ ...docf.data() })
      })
      if (logged) {
        dispatch(getTodos(list))
      } else {
        dispatch(getTodos(null))
      }
    })
    return () => unSub()
  }, [userId, dispatch, logged])

  // get live completed todos update
  useEffect(() => {
    const q = query(collection(db, `users/${userId}/completedTodos`))

    const subscribe = onSnapshot(q, (liveUpdate) => {
      const list = []
      liveUpdate.forEach((completed) => {
        list.push({ ...completed.data() })
      })
      setCompletedTodos(list)
    })
    return () => subscribe()
  }, [userId])

  useEffect(() => {
    setUserTodo(fetchedTodos)
  }, [fetchedTodos])

  useEffect(() => {
    const q = query(collection(db, `users/${userId}/awards`))

    const subscribe = onSnapshot(q, (liveUpdate) => {
      const list = []
      liveUpdate.forEach((award) => {
        list.push({ ...award.data() })
      })
      setAwards(list)
    })
    return () => subscribe()
  }, [userId])

  /**
   * The state holds the fetched user todos which will be
   * used to render the user's todos instead of the  fetched state directly
   * this method was taken because of the need to filter todos based on All, Active and Completed
   * if i implement this filter feature using the fetched data from firebase, the main source will
   * be affected when you perform a filter method on it. To tackle this i created another state that stores
   * the data and can be manipulated without affecting the original data
   */
  return (
    <UpdateUserContext.Provider value={value}>
      {children}
    </UpdateUserContext.Provider>
  )
}
UpdateUser.propTypes = {
  children: PropTypes.node.isRequired,
}
