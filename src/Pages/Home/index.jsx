/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react'
import { BsPen, BsFillDoorOpenFill } from 'react-icons/bs'
import { AiFillLock } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { collection, doc, setDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Layout from '../../Layout/Layout'
import Container from '../../Component/Container/container'
import styles from './home.module.scss'
import Button from '../../Component/Button'
import { UpdateUserContext } from '../../Redux/authListener'
import Navigation from '../../Layout/Nav-Bar/Navigation'
import { db } from '../../utils/firebase'
import DisplayTodo from './home'

function Home() {
  const { logged, userId } = useContext(UpdateUserContext)
  const fetched = useSelector((state) => state.todo.value)
  const defaultTask = {
    todo: '',
  }
  const [createTask, setCreateTask] = useState(defaultTask)
  const { todo } = createTask
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setCreateTask({ ...createTask, [name]: value })
  }
  /**
   * when the user submits a task, get  the input value,
   * use the setDoc method from firebase to write a document in firestore (user specific).
   * consuserIder error margins such as empty values, the same task in the todo collection
   * maybe length of todo if you want; then use conditionals to return the function if these
   * errors are true else run the function
   */
  const onCLickk = async () => {
    // check if the a new task already exist in the database
    const exist = fetched.find(
      (mapped) => mapped.Todo.toLowerCase() === todo.toLowerCase()
    )
    const char = userId.slice(0, 4)
    const taskId = Math.floor(Math.random() * 1000000)
    const assignId = `${char.toLowerCase()}${taskId}`
    const sortId = Date.now()
    const Time = new Date()

    if (todo.replaceAll(' ', '').length < 1) {
      toast.error("Can't be empty")
      return
    }
    if (exist) {
      toast.error('This task already exist')
      setCreateTask(defaultTask)
      return
    }
    if (todo.replaceAll(' ', '').length > 50) {
      toast.error('maximum length exceeded')
      setCreateTask(defaultTask)
      return
    }
    setCreateTask(defaultTask)
    // get the refrence to the user's todos collection
    const userTodos = doc(collection(db, `users/${userId}/todos`))
    // then set a todo document using the above refrence as the first agru (userTodos)
    // for future update of this todo document, we would need a doc userId which can be extracted
    // from the doc refrence
    await setDoc(userTodos, {
      id: assignId,
      updateId: userTodos.id,
      Todo: todo,
      completed: false,
      time: Time,
      sortId,
    })
  }

  return (
    <div className={`${styles.home} text bg`}>
      <Layout>
        <Navigation />
        <Container type="default">
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
                <p
                  className={
                    todo.length > 50
                      ? `${styles.todoLength} ${styles.todoLengthAlt}`
                      : `${styles.todoLength}`
                  }
                >
                  {todo.length}/50
                </p>
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
            <div className={`${styles.userTasks} content-bg box-shadow `}>
              <DisplayTodo uid={userId} />
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
          {fetched && logged
            ? fetched.length > 0 && (
                <p className={styles.dragText}>Drag and drop to reorder list</p>
              )
            : ''}
        </Container>
      </Layout>
      <ToastContainer />
    </div>
  )
}

export default Home
