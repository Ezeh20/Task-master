/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, onAuthChangeListener, storeUser } from '../utils/firebase'
import { updateUser } from './userReducer'

export const UpdateUserContext = createContext({
  data: null,
  logged: [],
  setLogged: () => {},
  main: [],
  id: null,
})

export function UpdateUser({ children }) {
  const cc = localStorage.getItem('todoCii')
    ? JSON.parse(localStorage.getItem('todoCii'))
    : null
  const dd = localStorage.getItem('unKnown')
    ? JSON.parse(localStorage.getItem('unKnown'))
    : null

  const [logged, setLogged] = useState(cc)
  const [id, setId] = useState(dd)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user.value)
  const [main, setMain] = useState([])
  const uid = currentUser && currentUser.uid
  const value = { data, logged, setLogged, main, id }

  useEffect(() => {
    const user = data && data.filter((currentData) => currentData.id === uid)
    setMain(user)
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

  useEffect(() => {
    localStorage.setItem('todoCii', JSON.stringify(logged))
  }, [logged])

  useEffect(() => {
    localStorage.setItem('unKnown', JSON.stringify(id))
  }, [id])

  // get all users which will be used to filter out the current user using ther user's uid

  useEffect(() => {
    const sub = onSnapshot(collection(db, 'users'), (snaps) => {
      const list = []
      snaps.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setData(list)
    })
    return () => sub()
  }, [])

  return (
    <UpdateUserContext.Provider value={value}>
      {children}
    </UpdateUserContext.Provider>
  )
}
UpdateUser.propTypes = {
  children: PropTypes.node.isRequired,
}
