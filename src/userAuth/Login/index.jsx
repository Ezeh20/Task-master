import React from 'react'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import styles from './login.module.scss'

function Login() {
  return (
    <div className={`${styles.login} bg text`}>
      <Layout>
        <Container>
          <div className={styles.loginTitle}>
            <p className={styles.loginSub}>Login</p>
          </div>
          <section className={styles.loginInput}>
            <input type="text" />
          </section>
        </Container>
      </Layout>
    </div>
  )
}

export default Login
