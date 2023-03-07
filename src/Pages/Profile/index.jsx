import React, { useContext } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import { UpdateUserContext } from '../../Redux/authListener'
import styles from './profile.module.scss'
import ProfileBody from './profileBody/Profile-Body'
import UserDetails from './userDetails/User-Details'

function Profile() {
  const { main } = useContext(UpdateUserContext)

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
        </Layout>
      ) : (
        <div className={styles.loading}>
          <InfinitySpin radius="9" color="#999" ariaLabel="loading" />
        </div>
      )}
    </div>
  )
}

export default Profile
