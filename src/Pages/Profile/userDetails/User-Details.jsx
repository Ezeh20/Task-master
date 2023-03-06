import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { BsPen } from 'react-icons/bs'
import styles from './User-Details.module.scss'
import Button from '../../../Component/Button'
import { UpdateUserContext } from '../../../Redux/authListener'

function UserDetails() {
  const { main } = useContext(UpdateUserContext)
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className={styles.headerContent}>
      <div className={styles.topWidget}>
        <Button buttonType="back" onClick={goBack}>
          <RiArrowGoBackFill />
        </Button>
        <p>XP 10</p>
      </div>
      <div className={styles.userInformation}>
        <div className={styles.userImage} />
        <div className={styles.userData}>
          {main &&
            main.map((allData) => {
              const { firstName, lastName, email, displayName } = allData
              return (
                <div key={email}>
                  {firstName.length < 1 ? (
                    <p>{displayName}</p>
                  ) : (
                    <p>{`${firstName} ${lastName}`}</p>
                  )}
                  <p>{email}</p>
                  <Button buttonType="back">
                    Edit <BsPen />
                  </Button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default UserDetails
