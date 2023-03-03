/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import { HiXMark } from 'react-icons/hi2'
import { GrFormCheckmark } from 'react-icons/gr'
import PropTypes from 'prop-types'
import { collection, doc, updateDoc } from 'firebase/firestore'
import styles from './home.module.scss'
import { db } from '../../utils/firebase'

function DisplayTodo({ userTodo, uid }) {
  console.log(uid)

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
                  <div className={styles.taskUpper}>
                    {todos.completed ? (
                      <div className={styles.finishedTask}>
                        <GrFormCheckmark />
                      </div>
                    ) : (
                      <div className={styles.pendingTask} />
                    )}
                    <div className={styles.containText}>
                      <p className={styles.todoText}>{todos.Todo}</p>
                    </div>
                  </div>
                  <HiXMark />
                </div>
                <div className={styles.hr} />
              </div>
            )
          })}
      <div className={styles.overView}>
        {userTodo.length > 0 ? (
          <p>{userTodo.length} task(s) left</p>
        ) : (
          <p>no tasks yet</p>
        )}
      </div>
    </>
  )
}
DisplayTodo.propTypes = {
  userTodo: PropTypes.arrayOf(PropTypes.object).isRequired,
  uid: PropTypes.string.isRequired,
}
export default DisplayTodo
