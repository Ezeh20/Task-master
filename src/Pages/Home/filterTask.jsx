/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { UpdateUserContext } from '../../Redux/authListener'
import styles from './home.module.scss'

const filterActions = [
  {
    id: 0,
    action: 'All',
  },
  {
    id: 1,
    action: 'Active',
  },
  {
    id: 2,
    action: 'Completed',
  },
]

function FilterTask() {
  const fetchedTodo = useSelector((state) => state.todo.value)
  const { userTodo, setUserTodo } = useContext(UpdateUserContext)
  const [currentAction, setCurrentAction] = useState(0)

  const fil = (idx, action) => {
    const all =
      fetchedTodo &&
      fetchedTodo.filter(
        (filtered) => filtered.completed || !filtered.completed
      )
    const active =
      fetchedTodo && fetchedTodo.filter((filtered) => !filtered.completed)

    const completed =
      fetchedTodo && fetchedTodo.filter((filtered) => filtered.completed)

    switch (action) {
      case 'All':
        setUserTodo(all)
        break
      case 'Active':
        setUserTodo(active)
        break
      case 'Completed':
        setUserTodo(completed)
        break
      default:
        setUserTodo(all)
    }
    setCurrentAction(idx)
  }

  return (
    <div className={`${styles.filterAction} content-bg`}>
      {userTodo &&
        filterActions.map(({ action, id }) => {
          return (
            <p
              key={id}
              className={`${
                currentAction === id ? styles.activeAction : styles.inActive
              } hover-action`}
              onClick={() => fil(id, action)}
            >
              {action}
            </p>
          )
        })}
    </div>
  )
}
export default FilterTask
