/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { IoMdCheckmark } from 'react-icons/io'
import { TailSpin } from 'react-loader-spinner'
import styles from './home.module.scss'
import { db } from '../../utils/firebase'
import FilterTask from './filterTask'

function DisplayTodo({ userTodo, uid }) {
  const [pendingTasks, setPendingTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])
  // function to update user's todo
  const updateTodos = async (tod) => {
    // get the needed todo document path to update
    await updateDoc(doc(db, `users/${uid}/todos/${tod.updateId}`), {
      completed: !tod.completed,
    })
  }

  // function to delete todos
  const deleteTodos = async (tod) => {
    // delete a doc using it's id
    await deleteDoc(doc(db, `users/${uid}/todos/${tod.updateId}`))
  }

  // count pending todos
  useEffect(() => {
    const as = userTodo && userTodo.filter((tsd) => !tsd.completed)
    setPendingTasks(as)
  }, [userTodo])

  /**
   * filter then populate a state with todo
   * which has a completed value as true
   */
  useEffect(() => {
    const completedTasks =
      userTodo && userTodo.filter((completedTask) => completedTask.completed)
    setFinishedTasks(completedTasks)
  }, [userTodo])

  /**
   * function to clear completed todos from the rendered todos
   * filter completed todos then populates a state
   * which will be used to clear completed todos
   */

  const clearFinishedTask = () => {
    userTodo &&
      userTodo
        .filter((finished) => finished.completed)
        .map(async (completedTodos) => {
          await deleteDoc(
            doc(db, `users/${uid}/todos/${completedTodos.updateId}`)
          )
        })
  }
  return (
    <>
      {userTodo &&
        userTodo
          .sort((a, b) =>
            a.sortId < b.sortId ? -1 : a.sortId > b.sortId ? 1 : 0
          )
          .map((todos) => {
            return (
              <div key={todos.id} className={styles.tasks}>
                <div className={styles.allTasks}>
                  <div
                    className={styles.taskUpper}
                    onClick={() => updateTodos(todos)}
                  >
                    {todos.completed ? (
                      <div className={styles.finishedTask}>
                        <IoMdCheckmark className={styles.checkedColor} />
                      </div>
                    ) : (
                      <div
                        className={styles.pendingTask}
                        onClick={() => updateTodos(todos)}
                      >
                        <IoMdCheckmark className={styles.checkedColor} />
                      </div>
                    )}
                    <div className={styles.containText}>
                      <p
                        className={`${
                          todos.completed
                            ? `${`${styles.todoText} ${styles.crossOff}`} cross`
                            : styles.todoText
                        }`}
                      >
                        {todos.Todo}
                      </p>
                    </div>
                  </div>
                  <HiXMark
                    className={styles.todoDelete}
                    onClick={() => deleteTodos(todos)}
                  />
                </div>
                <div className={styles.hr} />
              </div>
            )
          })}
      <div className={styles.overView}>
        {userTodo ? (
          userTodo.length > 0 ? (
            <p>{pendingTasks && pendingTasks.length} task(s) left</p>
          ) : (
            <p className={styles.taskCheck}>you don`t have any task</p>
          )
        ) : (
          <TailSpin
            height="40"
            width="40"
            color="#999"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass={styles.loadingTasks}
            visible
          />
        )}
        <FilterTask userTodo={userTodo} />
        {finishedTasks && finishedTasks.length > 0 && (
          <p type="button" onClick={clearFinishedTask}>
            {' '}
            Clear Completed
          </p>
        )}
      </div>
    </>
  )
}
DisplayTodo.propTypes = {
  userTodo: PropTypes.arrayOf(PropTypes.object),
  uid: PropTypes.string.isRequired,
}
export default DisplayTodo
