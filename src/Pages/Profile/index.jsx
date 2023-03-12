/* eslint-disable no-unused-expressions */
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import { UpdateUserContext } from '../../Redux/authListener'
import { auth, db } from '../../utils/firebase'
import styles from './profile.module.scss'
import ProfileBody from './profileBody/Profile-Body'
import UserDetails from './userDetails/User-Details'

function Profile() {
  const {
    main,
    deleteModal,
    setDeleteModal,
    setLogged,
    setUserTodo,
    editModal,
    setEditModal,
  } = useContext(UpdateUserContext)

  const navigate = useNavigate()
  const [edit, setEdit] = useState('')
  const [emailInput, setEmailInput] = useState('')

  useEffect(() => {
    main && main.map((mapped) => setEdit(mapped))
  }, [main])

  const { firstName, lastName } = edit

  const onChangeAction = (e) => {
    const { name, value } = e.target
    setEdit({ ...edit, [name]: value })
  }
  const editUser = async (id) => {
    if (firstName.length < 1 || lastName.length < 1) {
      toast.error('can`t be blank')
      return
    }
    try {
      await updateDoc(doc(db, `users/${id}`), {
        firstName,
        lastName,
      })
      setEditModal((curr) => !curr)
    } catch (err) {
      toast.error(err)
    }
    toast.success('updated successfully')
  }

  const DeleteAccount = async (emailinput, email) => {
    if (emailinput !== email) {
      toast.error('email mismatch')
      return
    }
    const user = auth.currentUser
    if (user) {
      try {
        await user.delete()
        await deleteDoc(doc(db, `users/${user.uid}`))
        toast.success('accout deleted')
      } catch (error) {
        toast.error(error)
      }
    }
    navigate('/')
    setLogged(null)
    setUserTodo(null)
    setDeleteModal((curr) => !curr)
  }

  return (
    <div className={`${styles.profile} bg-profile`}>
      {main ? (
        <Layout>
          <div className={`${styles.header} text bg`}>
            <Container type="profile">
              <UserDetails />
            </Container>
          </div>
          <section>
            <Container type="profile">
              <ProfileBody />
            </Container>
          </section>
          {deleteModal && (
            <div className={styles.deletePrompt}>
              <Container type="profile">
                {main &&
                  main.map((deleteAccount) => {
                    const { email } = deleteAccount
                    return (
                      <div key={email} className={styles.warning}>
                        <div className={styles.warningContent}>
                          <p className={styles.warningText}>
                            This action will delete your account and everything
                            it holds including your awards if any
                          </p>
                          <div>
                            <span>enter your email for confirmation</span>
                            <p>{email}</p>
                          </div>
                          <input
                            type="text"
                            placeholder="enter your registered email"
                            onChange={(e) =>
                              setEmailInput(() => e.target.value)
                            }
                            className={styles.emailInput}
                          />
                          <div className={styles.btnAction}>
                            <button
                              type="button"
                              className={styles.buttonAction}
                              onClick={() => DeleteAccount(emailInput, email)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className={`${styles.buttonAction} ${styles.btnalt}`}
                              onClick={() => setDeleteModal((curr) => !curr)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </Container>
            </div>
          )}
          {editModal && (
            <div className={styles.inputModal}>
              <Container type="profile">
                {main &&
                  main.map((editAccount) => {
                    const { email, uid } = editAccount
                    return (
                      <div key={email} className={styles.userEdit}>
                        <input
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={onChangeAction}
                          className={styles.editOption}
                          placeholder="FirstName"
                        />
                        <input
                          type="text"
                          value={lastName}
                          name="lastName"
                          onChange={onChangeAction}
                          className={styles.editOption}
                          placeholder="LastName"
                        />
                        <div className={styles.editButton}>
                          <button
                            type="button"
                            className={`${styles.editBtn} ${styles.editBtn2}`}
                            onClick={() => editUser(uid)}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className={styles.editBtn}
                            onClick={() => setEditModal((curr) => !curr)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </Container>
            </div>
          )}
        </Layout>
      ) : (
        <div className={styles.loading}>
          <InfinitySpin radius="9" color="#999" ariaLabel="loading" />
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default Profile
