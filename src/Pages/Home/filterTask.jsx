/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './home.module.scss'

const filterActions = ['All', 'Active', 'Completed']
function FilterTask({ userTodo }) {
  return (
    <div
      className={`${styles.filterAction} ${
        userTodo && userTodo.length > 0 ? 'content-bg' : ''
      }`}
    >
      {userTodo &&
        userTodo.length > 0 &&
        filterActions.map((actions, idx) => {
          return <p key={idx}>{actions}</p>
        })}
    </div>
  )
}
FilterTask.propTypes = {
  userTodo: PropTypes.arrayOf(PropTypes.object),
}
export default FilterTask
