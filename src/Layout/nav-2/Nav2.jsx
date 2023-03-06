import React from 'react'
import PropTypes from 'prop-types'

function NavProfile({ header }) {
  console.log(header)
  return (
    <div className="">
      <p>{header}</p>
    </div>
  )
}

NavProfile.propTypes = {
  header: PropTypes.string.isRequired,
}
export default NavProfile
