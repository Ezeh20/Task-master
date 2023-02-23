import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiShieldUserFill } from 'react-icons/ri'
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs'
import { darkMode, lightMode } from '../../Redux/themeReducer'
import styles from './Navigation.module.scss'
import Container from '../../Component/Container/container'

function Navigation() {
  const currentTheme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()

  return (
    <div className={styles.navigation}>
      <header className={`${styles.header} header`}>
        <Container>
          <nav className={styles.nav}>
            <p className={styles.logo}>TODO</p>
            <div className={styles.userIntra}>
              <RiShieldUserFill className={styles.userAccount} />
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
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Navigation
