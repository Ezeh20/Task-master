import React, { useContext, useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { UpdateUserContext } from '../../Redux/authListener'
import styles from './profile.module.scss'

function Profile() {
  const { data } = useContext(UpdateUserContext)
  const currentUser = useSelector((state) => state.user.value)
  const [main, setMain] = useState([])
  const uid = currentUser && currentUser.uid

  useEffect(() => {
    const user = data && data.filter((currentData) => currentData.id === uid)
    setMain(user)
  }, [data, setMain, uid])

  return (
    <div className={styles.profile}>
      {main ? (
        main.map((mainUser) => {
          const { displayName, id } = mainUser
          return (
            <div key={id}>
              <p>{displayName}</p>
            </div>
          )
        })
      ) : (
        <div className={styles.loading}>
          <InfinitySpin radius="9" color="#999" ariaLabel="loading" />
        </div>
      )}
    </div>
  )
}

export default Profile
