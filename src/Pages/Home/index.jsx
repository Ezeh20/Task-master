import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsPen } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import Layout from '../../Layout/Layout'
import Container from '../../Component/Container/container'
import styles from './home.module.scss'
import { user } from '../../Redux/themeReducer'
import Button from '../../Component/Button'

function Home() {
  const currentUser = useSelector((state) => state.user.value)

  return (
    <div className={`${styles.home} text bg`}>
      <Layout>
        <Container>
          <div className={`${styles.homeContent} bg `}>
            <div className={styles.iconNinput}>
              <div type="button" className={styles.crl} />
              <input
                type="text"
                placeholder="Enter a task"
                className={`${styles.taskInput} text`}
                multiple
              />
            </div>
            {
              currentUser && <Button buttonType="task">
              <BsPen />
            </Button>
            }
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export default Home
