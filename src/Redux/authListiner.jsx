import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { onAuthChangeListener, storeUser } from '../utils/firebase'
import { updateUser } from './userReducer'

function UpdateUser({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthChangeListener((user) => {
      if (user) {
        storeUser(user)
      }
      dispatch(updateUser(user))
    })
    return unsubscribe
  }, [dispatch])
  return <div>{children}</div>
}
UpdateUser.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UpdateUser
