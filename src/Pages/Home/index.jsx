import React, { useContext, useEffect, useState } from 'react'
import { BsPen, BsFillDoorOpenFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import { GrFormCheckmark } from 'react-icons/gr'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore'
import Layout from '../../Layout/Layout'
import Container from '../../Component/Container/container'
import styles from './home.module.scss'
import Button from '../../Component/Button'
import { UpdateUserContext } from '../../Redux/authListener'
import Navigation from '../../Layout/Nav-Bar/Navigation'
import { db } from '../../utils/firebase'

function Home() {
  const { logged, data, id } = useContext(UpdateUserContext)

  const defaultTask = {
    todo: '',
  }
  const [createTask, setCreateTask] = useState(defaultTask)
  const [userTodo, setUserTodo] = useState([])
  const { todo } = createTask
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setCreateTask({ ...createTask, [name]: value })
  }
  /**
   * when the user enter's a task, get the
   */
  const onCLickk = async () => {
    const taskId = Math.floor(Math.random() * 1000000)
    const created = new Date()
    const assignId = `task${taskId}`
    const q = query(collection(db, 'users'))
    const qSnap = await getDocs(q)
    const qData = qSnap.docs.map((details) => ({
      ...details.data(),
    }))
    qData.map(async (task) => {
      await addDoc(collection(db, `users/${task.uid}/todos`), {
        id: assignId,
        Todo: todo,
        completed: false,
        created,
      })
    })
    setCreateTask(defaultTask)
  }
  useEffect(() => {
    const q = query(collection(db, `users/${id}/todos`))
    const unSub = onSnapshot(q, (qSnap) => {
      const list = []
      qSnap.forEach((docf) => {
        list.push({ ...docf.data() })
      })
      setUserTodo(list)
    })
    return () => unSub()
  }, [id])

  return (
    <div className={`${styles.home} text bg`}>
      <Layout>
        <Navigation />
        <Container>
          <div className={`${styles.homeContent} bg `}>
            <div className={`${styles.taskLocation} content-bg `}>
              <div className={styles.iconNinput}>
                <div type="button" className={styles.crl} />
                <input
                  type="text"
                  placeholder="Create a new todo.."
                  className={`${styles.taskInput} text`}
                  name="todo"
                  value={todo}
                  onChange={handleOnchange}
                />
              </div>
              {logged ? (
                <Button buttonType="task">
                  <BsPen onClick={onCLickk} />
                </Button>
              ) : (
                <Link to="/login" className="text">
                  <AiFillLock className={styles.locked} />
                </Link>
              )}
            </div>
          </div>
          {logged ? (
            <div className={`${styles.userTasks} content-bg `} />
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
