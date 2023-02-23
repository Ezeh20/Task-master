import React from 'react'
import Layout from '../../Layout/Layout'
import Container from '../../Component/Container/container'
import styles from './home.module.scss'

function Home() {
  return (
    <div className={`${styles.home} text bg`}>
      <Layout>
        <Container>
          <div className={styles.homeContent}>
            <h1>home</h1>
            <h1>home</h1>
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export default Home
