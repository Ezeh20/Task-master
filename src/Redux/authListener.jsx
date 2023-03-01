/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, onAuthChangeListener, storeUser } from '../utils/firebase'
import { updateUser } from './userReducer'

export const UpdateUserContext = createContext({
  userData: [],
  setUserData: () => {},
  data: [],
})

export function UpdateUser({ children }) {
  const cc = localStorage.getItem('todoCii')
    ? JSON.parse(localStorage.getItem('todoCii'))
    : null

  const [userData, setUserData] = useState(cc)
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const value = { userData, setUserData, data }

  // listen for any auth change then update the user object
  useEffect(() => {
    const unsubscribe = onAuthChangeListener((user) => {
      if (user) {
        // if the user object is true, store the user in fire store
        storeUser(user)
        // extract basic data from the current user then update the userData state
        setUserData(user)
      }
      // update the user
      dispatch(updateUser(user))
    })
    return unsubscribe
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('todoCii', JSON.stringify(userData))
  }, [userData])

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
