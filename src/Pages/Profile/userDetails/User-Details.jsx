import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiArrowGoBackFill } from 'react-icons/ri'
import styles from './User-Details.module.scss'
import Button from '../../../Component/Button'
import { UpdateUserContext } from '../../../Redux/authListener'

function UserDetails() {
  const { id } = useContext(UpdateUserContext)

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={`${styles.headerContent} text`}>
      <div className={styles.topWidget}>
        <Button buttonType="back" onClick={goBack}>
          <RiArrowGoBackFill />
        </Button>
        <p>XP 10</p>
      </div>
      <div className={styles.userInformation}>
        <div className={styles.userData}>
          <div className={styles.person}>
            <div className={`${styles.userImage} bg text`} />
            <img
              src={`https://robohash.org/${id}`}
              alt="user img"
              className={styles.robo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
