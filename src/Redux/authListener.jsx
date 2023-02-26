/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { onAuthChangeListener, storeUser } from '../utils/firebase'
import { updateUser } from './userReducer'

export const UpdateUserContext = createContext({
  userData: [],
  setUserData: () => {},
})

export function UpdateUser({ children }) {
  const [userData, setUserData] = useState([])
  console.log(userData)
  const dispatch = useDispatch()
  const value = { userData, setUserData }
  // listen for any auth change then update the user object
  useEffect(() => {
    const unsubscribe = onAuthChangeListener((user) => {
      if (user) {
        // if the user object is true, store the user in fire store
        storeUser(user)
        // extract basic data from the current user then update the userData state
        setUserData(() => [
          {
            name: user.displayName,
            email: user.email,
          },
        ])
      }
      // update the user
      dispatch(updateUser(user))
    })
    return unsubscribe
  }, [dispatch])
  return (
    <UpdateUserContext.Provider value={value}>
      {children}
    </UpdateUserContext.Provider>
  )
}
UpdateUser.propTypes = {
  children: PropTypes.node.isRequired,
}
