/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const buttonOptions = {
  default: 'default',
  google: 'google',
  task: 'task',
  back: 'back',
  Profile: 'Profile',
  Delete: 'Delete',
}

function Button({ children, onClick, buttonType, action }) {
  return (
    <button
      type={action}
      className={`customButton ${buttonOptions[buttonType]}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
  action: PropTypes.string,
}
