/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import './container.scss'

const ContainerType = {
  default: 'default',
  profile: 'profile',
}
function Container({ children, type }) {
  return <div className={`container ${ContainerType[type]}`}>{children}</div>
}

export default Container
Container.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
}
