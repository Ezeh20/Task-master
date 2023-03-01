import React, { useContext } from 'react'
import { BsPen, BsFillDoorOpenFill } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import { AiFillLock } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Layout from '../../Layout/Layout'
import Container from '../../Component/Container/container'
import styles from './home.module.scss'
import Button from '../../Component/Button'
import { UpdateUserContext } from '../../Redux/authListener'

function Home() {
  const { logged } = useContext(UpdateUserContext)

  return (
    <div className={`${styles.home} text bg`}>
      <Layout>
        <Container>
          <div className={`${styles.homeContent} bg `}>
            <div className={`${styles.taskLocation} bg`}>
              <div className={styles.iconNinput}>
                <div type="button" className={styles.crl} />
                <input
                  type="text"
                  placeholder="Enter a task"
                  className={`${styles.taskInput} text`}
                  multiple
                />
              </div>
              {logged ? (
                <Button buttonType="task">
                  <BsPen />
                </Button>
              ) : (
                <Link to="/login" className="text">
                  <AiFillLock className={styles.locked} />
                </Link>
              )}
            </div>
          </div>
          {logged ? (
            <div className={`${styles.userTasks} bg`}>hiii</div>
          ) : (
            <Link
              to="/login"
              className={`${styles.userTasks} ${styles.userPrompt}`}
            >
              <BsFillDoorOpenFill className={styles.prompt} />{' '}
              <p className="text">login required</p>
            </Link>
          )}
        </Container>
      </Layout>
    </div>
  )
}

export default Home
