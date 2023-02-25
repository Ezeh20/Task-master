/* eslint-disable react/button-has-type */
import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const buttonOptions = {
  default: 'default',
  google: 'google',
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
  onClick: PropTypes.func.isRequired,
  buttonType: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
}
