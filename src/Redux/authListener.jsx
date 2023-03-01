/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, onAuthChangeListener, storeUser } from '../utils/firebase'
import { updateUser } from './userReducer'

export const UpdateUserContext = createContext({
  data: null,
  logged: [],
  setLogged: () => {},
})

export function UpdateUser({ children }) {
  const cc = localStorage.getItem('todoCii')
    ? JSON.parse(localStorage.getItem('todoCii'))
    : null

  const [logged, setLogged] = useState(cc)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const value = { data, logged, setLogged }

  // listen for any auth change then update the user object
  useEffect(() => {
    const unsubscribe = onAuthChangeListener((user) => {
      if (user) {
        // if the user object is true, store the user in fire store
        storeUser(user)
        // update the user
        dispatch(updateUser(user))
        setLogged({ active: true })
      }
    })
    return unsubscribe
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('todoCii', JSON.stringify(logged))
  }, [logged])

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
