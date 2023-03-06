/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react'
import { HiXMark } from 'react-icons/hi2'
import PropTypes from 'prop-types'
import { IoMdCheckmark } from 'react-icons/io'
import { TailSpin } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { Reorder } from 'framer-motion'
import styles from './home.module.scss'
import {
  clearFinishedTask,
  deleteTodos,
  updateTodos,
} from '../../utils/firebase'
import FilterTask from './filterTask'
import { UpdateUserContext } from '../../Redux/authListener'

function DisplayTodo({ uid }) {
  const [pendingTasks, setPendingTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])
  const fetchedTodos = useSelector((state) => state.todo.value)
  const { userTodo, setUserTodo } = useContext(UpdateUserContext)
  // count pending todos
  useEffect(() => {
    const as = fetchedTodos && fetchedTodos.filter((tsd) => !tsd.completed)
    setPendingTasks(as)
  }, [fetchedTodos])

  /**
   * filter then populate a state with todo
   * which has a completed value as true
   */
  useEffect(() => {
    const completedTasks =
      userTodo && userTodo.filter((completedTask) => completedTask.completed)
    setFinishedTasks(completedTasks)
  }, [userTodo])

  return (
    <div>
      {userTodo && (
        <Reorder.Group axis="y" onReorder={setUserTodo} values={userTodo}>
          {userTodo &&
            userTodo.map((todos) => {
              return (
                <Reorder.Item
                  value={todos}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  key={todos.id}
                  className={styles.tasks}
                >
                  <div className={styles.allTasks}>
                    <div className={styles.taskUpper}>
                      {todos.completed ? (
                        <div
                          className={styles.finishedTask}
                          onClick={() => updateTodos(todos, uid)}
                        >
                          <IoMdCheckmark className={styles.checkedColor} />
                        </div>
                      ) : (
                        <div
                          className={styles.pendingTask}
                          onClick={() => updateTodos(todos, uid)}
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
                      onClick={() => deleteTodos(todos, uid)}
                    />
                  </div>
                  <div className={styles.hr} />
                </Reorder.Item>
              )
            })}
          <div className={styles.overView}>
            {userTodo ? (
              userTodo.length > 0 ? (
                <p>{pendingTasks && pendingTasks.length} task(s) left</p>
              ) : (
                <p className={styles.taskCheck}>No task for now</p>
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
            <FilterTask />

            {finishedTasks && finishedTasks.length > 0 && (
              <p
                type="button"
                onClick={() => clearFinishedTask(userTodo, uid)}
                className="hover-action"
              >
                {' '}
                Clear Completed
              </p>
            )}
          </div>
        </Reorder.Group>
      )}
    </div>
  )
}
DisplayTodo.propTypes = {
  uid: PropTypes.string.isRequired,
}
export default DisplayTodo
