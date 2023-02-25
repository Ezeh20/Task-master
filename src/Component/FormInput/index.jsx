import React from 'react'
import PropTypes from 'prop-types'
import styles from './form.module.scss'

function FormInput({ label, others }) {
  const { placeholder } = others
  return (
    <div>
      <label htmlFor="name">{label}</label>
      <input placeholder={placeholder} />
    </div>
  )
}

export default FormInput
FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  others: PropTypes.objectOf(PropTypes.any).isRequired,
}
