import { deleteDoc, doc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import { UpdateUserContext } from '../../Redux/authListener'
import { auth, db, LogOut } from '../../utils/firebase'
import styles from './profile.module.scss'
import ProfileBody from './profileBody/Profile-Body'
import UserDetails from './userDetails/User-Details'

function Profile() {
  const { main, deleteModal, setDeleteModal, setLogged, setUserTodo } =
    useContext(UpdateUserContext)
  const [emailInput, setEmailInput] = useState('')

  const DeleteAccount = async (emailinput, email) => {
    if (emailinput !== email) {
      toast.error('email mismatch')
      return
    }
    const user = auth.currentUser
    if (user) {
      try {
        toast.success('accout deleted')
        await user.delete()
        await deleteDoc(doc(db, `users/${user.uid}`))
      } catch (error) {
        toast.error(error)
      }
    }
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
                    const { email, uid } = deleteAccount
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
