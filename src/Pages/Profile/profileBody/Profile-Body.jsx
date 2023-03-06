import React, { useContext } from 'react'
import { UpdateUserContext } from '../../../Redux/authListener'
import styles from './ProfileBody.module.scss'

function ProfileBody() {
  const { main } = useContext(UpdateUserContext)
  return (
    <div className={styles.userDetails}>
      {main.map((mainUser) => {
        const { displayName, id } = mainUser
        return (
          <div key={id}>
            <p>{displayName}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ProfileBody
