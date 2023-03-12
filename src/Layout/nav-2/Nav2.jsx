import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { GoChecklist } from 'react-icons/go'
import { IoTrophySharp } from 'react-icons/io5'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import styles from './nav.module.scss'
import Button from '../../Component/Button'
import Container from '../../Component/Container/container'
import { UpdateUserContext } from '../../Redux/authListener'

function NavProfile({ header }) {
  const [icon, setIcon] = useState('')
  const { xp } = useContext(UpdateUserContext)
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }

  useEffect(() => {
    switch (header) {
      case 'Completed':
        setIcon(<GoChecklist />)
        break
      case 'Award':
        setIcon(<IoTrophySharp />)
        break
      default:
        setIcon(<GoChecklist />)
    }
  }, [header])
  return (
    <header className={`${styles.completed} bg text`}>
      <Container type="profile">
        <div className={`${styles.completedNav}`}>
          <div className={styles.navTop}>
            <Button buttonType="back" onClick={() => back()}>
              <RiArrowGoBackFill />
            </Button>
            <p className={styles.xp}>XP {xp}</p>
          </div>
          <div className={styles.content}>{icon}</div>
        </div>
      </Container>
    </header>
  )
}

NavProfile.propTypes = {
  header: PropTypes.string.isRequired,
}
export default NavProfile
