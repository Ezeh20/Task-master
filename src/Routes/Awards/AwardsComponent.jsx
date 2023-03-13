/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './awardsComponent.module.scss'

function AwardsComponent({ awards }) {
  return (
    <div className={styles.awardContainer}>
      {awards &&
        awards
          .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
          .map((itms) => {
            const { id, img, unlockable } = itms
            return (
              <div key={id} className={`${styles.award} bg`}>
                <img src={img} alt="rank" className={styles.awardImg} />
                <p>{unlockable}</p>
              </div>
            )
          })}
      {awards && awards.length < 1 && (
        <p className={styles.awardme}>Complete tasks to unlock awards</p>
      )}
    </div>
  )
}
AwardsComponent.propTypes = {
  awards: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default AwardsComponent
