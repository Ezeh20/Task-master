import React, { useContext, useEffect, useState } from 'react'
import { BsPen, BsFillDoorOpenFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import Layout from '../../Layout/Layout'
import Container from '../../Component/Container/container'
import styles from './home.module.scss'
import Button from '../../Component/Button'
import { UpdateUserContext } from '../../Redux/authListener'
import Navigation from '../../Layout/Nav-Bar/Navigation'
import { db } from '../../utils/firebase'
import DisplayTodo from './home'

function Home() {
  const { logged, id } = useContext(UpdateUserContext)

  const defaultTask = {
    todo: '',
  }
  const [createTask, setCreateTask] = useState(defaultTask)
  const [userTodo, setUserTodo] = useState(null)
  const { todo } = createTask
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setCreateTask({ ...createTask, [name]: value })
  }
  /**
   * when the user enter's a task, get the
   */
  const onCLickk = async () => {
    if (!todo) {
      alert('add')
      return
    }
    const taskId = Math.floor(Math.random() * 1000000)
    const assignId = `task${taskId}`
    const sortId = Date.now()
    // get the refrence to the user's todos collection
    const userTodos = doc(collection(db, `users/${id}/todos`))
    // then set a todo document using the above refrence as the first agru (userTodos)
    // for future update of this todo document, we would need a doc id which can be extracted
    // from the doc refrence
    await setDoc(userTodos, {
      id: assignId,
      updateId: userTodos.id,
      Todo: todo,
      completed: false,
      time: serverTimestamp(),
      sortId,
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
                <Button buttonType="task" onClick={onCLickk}>
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
            <div className={`${styles.userTasks} content-bg `}>
              <DisplayTodo userTodo={userTodo} uid={id} />
            </div>
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
