/* eslint-disable react/require-default-props */
import { collection, doc, setDoc } from 'firebase/firestore'
import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { UpdateUserContext } from '../../Redux/authListener'
import { db } from '../../utils/firebase'
import styles from './process.module.scss'

function Process({ xp }) {
  const { userId, awards } = useContext(UpdateUserContext)
  // console.log(awards)

  const newSet = new Set()

  const clean =
    awards &&
    awards.filter((itm) => {
      const final = newSet.has(itm.id)
      newSet.add(itm.id)
      return !final
    })
  console.log(clean)

  useEffect(() => {
    // 1st unlockable
    const action = async (id, message) => {
      const unlock = doc(collection(db, `users/${userId}/awards`))
      const exist = awards && awards.find((itm) => itm.id === id)
      if (exist) return
      await setDoc(unlock, {
        id,
        unlockable: message,
      })
    }

    switch (xp) {
      case 10:
        action(0, 'fedora')
        break
      case 20:
        action(1, 'king')
        break
      case 30:
        action(2, 'olopa')
        break
      case 40:
        action(3, 'chief')
        break
      default:
    }
  }, [xp, userId, awards])
  return (
    <div className={`${styles.process} alt-text`}>
      <p>process</p>
    </div>
  )
}
Process.propTypes = {
  xp: PropTypes.number,
}
export default Process
