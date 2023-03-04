import React, { useContext } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import { UpdateUserContext } from '../../Redux/authListener'
import styles from './profile.module.scss'

function Profile() {
  const { main } = useContext(UpdateUserContext)

  return (
    <div className={`${styles.profile} bg`}>
      <Layout>
        <Container>
          {main ? (
            main.map((mainUser) => {
              const { displayName, id } = mainUser
              return (
                <div key={id}>
                  <p>{displayName}</p>
                </div>
              )
            })
          ) : (
            <div className={styles.loading}>
              <InfinitySpin radius="9" color="#999" ariaLabel="loading" />
            </div>
          )}
        </Container>
      </Layout>
    </div>
  )
}

export default Profile
