import React from 'react'
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
    </div>
  )
}

export default AwardsComponent
