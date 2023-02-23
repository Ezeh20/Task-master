import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiShieldUserFill } from 'react-icons/ri'
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs'
import { BiDoorOpen } from 'react-icons/bi'
import { darkMode, lightMode } from '../../Redux/themeReducer'
import styles from './Navigation.module.scss'
import Container from '../../Component/Container/container'
import Login from '../../userAuth/Login'
import SignUp from '../../userAuth/Sign-up'

function Navigation() {
  const [active, setActive] = useState(false)
  const currentTheme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()
  const toggleActive = () => setActive((curr) => !curr)

  return (
    <div className={styles.navigation}>
      <header className={`${styles.header} header`}>
        <Container>
          <nav className={styles.nav}>
            <p className={styles.logo}>TODO</p>
            <div className={styles.userIntra}>
              <div className={styles.themeToggle}>
                {currentTheme === 'light' ? (
                  <BsMoonFill
                    className={styles.userAccount}
                    onClick={() => dispatch(darkMode())}
                  />
                ) : (
                  <BsFillSunFill
                    className={styles.userAccount}
                    onClick={() => dispatch(lightMode())}
                  />
                )}
              </div>
              <RiShieldUserFill
                className={styles.userAccount}
                onClick={toggleActive}
              />
            </div>
            <div
              className={`${
                active === true
                  ? `${`${styles.auth} ${styles.authActive}`}`
                  : `${styles.auth}`
              }`}
            >
              <BiDoorOpen />
              <Login />
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Navigation
