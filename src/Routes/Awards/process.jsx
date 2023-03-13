/* eslint-disable react/require-default-props */
import { collection, doc, setDoc } from 'firebase/firestore'
import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { UpdateUserContext } from '../../Redux/authListener'
import { db } from '../../utils/firebase'
import AwardsComponent from './AwardsComponent'
import styles from './process.module.scss'

function Process({ xp }) {
  const { userId, awards } = useContext(UpdateUserContext)

  const newSet = new Set()
  const clean =
    awards &&
    awards.filter((itm) => {
      const final = newSet.has(itm.id)
      newSet.add(itm.id)
      return !final
    })

  useEffect(() => {
    // 1st unlockable
    const action = async (id, message, img) => {
      const unlock = doc(collection(db, `users/${userId}/awards`))
      const exist = awards && awards.find((itm) => itm.id === id)
      if (exist) return
      await setDoc(unlock, {
        id,
        unlockable: message,
        img,
      })
    }

    if (xp >= 10)
      action(
        0,
        'private',
        'https://i.ibb.co/sjSp8Tf/E2-private-second-class.png'
      )
    if (xp >= 20)
      action(
        1,
        'private-first-class',
        'https://i.ibb.co/7RgK5HS/E3-private-first-class.png'
      )

    if (xp >= 30)
      action(2, 'corporal', 'https://i.ibb.co/qkffvQD/E4-corporal.png')

    if (xp >= 40)
      action(3, 'sergent', 'https://i.ibb.co/xjPpkc5/E5-sergeant.png')

    if (xp >= 50)
      action(
        4,
        'staff-sergent',
        'https://i.ibb.co/51N5LqK/E6-staff-sergeant.png'
      )

    if (xp >= 60)
      action(
        5,
        'sergent-first-class',
        'https://i.ibb.co/ThGYT8T/E7-sergeant-first-class.png'
      )

    if (xp >= 70)
      action(
        6,
        'first-sergent',
        'https://i.ibb.co/2PvKLGq/E8-master-sergeant.png'
      )

    if (xp >= 80)
      action(
        7,
        'master-sergent',
        'https://i.ibb.co/2PvKLGq/E8-master-sergeant.png'
      )

    if (xp >= 90)
      action(
        8,
        'sergent-major',
        'https://i.ibb.co/THNXJmy/E9-sergeant-major.png'
      )

    if (xp >= 100)
      action(
        9,
        'command-sergent',
        'https://i.ibb.co/fYBYrxx/E9b-command-sergeant-major.png'
      )
  }, [xp, userId, awards])
  return (
    <div className={`${styles.process} alt-text`}>
      <AwardsComponent awards={clean} />
    </div>
  )
}
Process.propTypes = {
  xp: PropTypes.number,
}
export default Process
