import React from 'react'
import PropTypes from 'prop-types'
import styles from './Layout.module.scss'
import Footer from './Footer/Footer'

function Layout({ children }) {
  return (
    <div className={`${styles.main}`}>
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
