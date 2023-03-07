import React, { useContext } from 'react'
import { BsPen, BsFillSunFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { AiOutlineSetting, AiTwotoneDelete } from 'react-icons/ai'
import { GiExitDoor } from 'react-icons/gi'
import { FaMoon } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateUserContext } from '../../../Redux/authListener'
import styles from './ProfileBody.module.scss'
import Button from '../../../Component/Button'
import { darkMode, lightMode } from '../../../Redux/themeReducer'

function ProfileBody() {
  const { main } = useContext(UpdateUserContext)
  const theme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()

  console.log(lightMode)

  return (
    <div className={`${styles.userDetails} alt-text`}>
      {main &&
        main.map((allData) => {
          const { firstName, lastName, email, displayName, uid } = allData
          return (
            <div key={email} className={`${styles.allData} content-bg`}>
              <div className={styles.userMain}>
                {firstName.length < 1 ? (
                  <p>{displayName}</p>
                ) : (
                  <div className={styles.userName}>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                  </div>
                )}
                <div className={styles.emailId}>
                  <p>{email}</p>
                  <p>id: {uid}</p>
                </div>
              </div>
            </div>
          )
        })}
      <div className={styles.profileRoute}>
        <Link to="completed">
          <Button buttonType="Profile">
            Awards <IoIosArrowForward />
          </Button>
        </Link>
        <div className={styles.actionArena}>
          <Link to="completed">
            <Button buttonType="Profile">
              Completed tasks <IoIosArrowForward />
            </Button>
          </Link>
          <div className={styles.actionBottom}>
            <p className={styles.spanAction}>
              Settings <AiOutlineSetting />
            </p>
            {theme === 'light' ? (
              <Button buttonType="Profile" onClick={() => dispatch(darkMode())}>
                <p>Light mode</p> <BsFillSunFill className={styles.actionBtn} />
              </Button>
            ) : (
              <Button
                buttonType="Profile"
                onClick={() => dispatch(lightMode())}
              >
                <p>Dark mode</p> <FaMoon className={styles.actionBtn} />
              </Button>
            )}
            <Button buttonType="Profile">
              Edit profile <BsPen className={styles.actionBtn} />
            </Button>
            <Button buttonType="Profile">
              Log Out <GiExitDoor className={styles.actionBtn} />
            </Button>
            <Button buttonType="Delete">
              Delete account <AiTwotoneDelete className={styles.actionBtn} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBody

/**
 *  <Button buttonType="back" className={styles.pen}>
                <BsPen />
              </Button>
 */
