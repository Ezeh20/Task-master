/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../Component/Button'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import styles from './login.module.scss'
import { signInRedirect } from '../../utils/firebase'

function Login() {
  const navigate = useNavigate()

  // login with google
  const loginGoogle = async () => {
    await signInRedirect()
    navigate('/')
  }

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm()

  const defaultValue = {
    email: '',
    password: '',
  }
  const [formValue, setFormValue] = useState(defaultValue)
  const { email, password } = formValue

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValue({ ...formValue, [name]: value })
  }

  const onSubmit = () => {}
  const signUp = () => {
    navigate('/sign-up')
  }
  return (
    <div className={`${styles.login} bg alt-text`}>
      <Layout>
        <Container>
          <div className={styles.loginTitle}>
            <p className={styles.loginSub}>Login</p>
          </div>
          <section className={styles.loginInput}>
            <form
              className={`${styles.form} `}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.inputLocation}>
                <input
                  {...register('email', {
                    required: 'enter a vaild email address',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email',
                    },
                  })}
                  onKeyUp={() => {
                    trigger('email')
                  }}
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  className={styles.Input}
                />
                <label
                  htmlFor="email"
                  className={`${
                    email
                      ? `${`${styles.label} ${styles.shrink}`}`
                      : `${styles.label} `
                  }`}
                >
                  Email
                </label>
                {errors.email && <small>{errors.email.message}</small>}
              </div>

              <div className={`${styles.inputLocation}`}>
                <input
                  {...register('password', {
                    required: 'You must specify a password',
                    minLength: {
                      value: 8,
                      message: 'password must have at least 8 characters',
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={password}
                  className={styles.Input}
                />
                <label
                  htmlFor="password"
                  className={`${
                    password
                      ? `${`${styles.label} ${styles.shrink}`}`
                      : `${styles.label} `
                  }`}
                >
                  Password
                </label>
                {errors.password && <small>{errors.password.message}</small>}
              </div>
              <Button action="submit" buttonType="">
                Submit
              </Button>
              <div className={styles.nullAccount}>
                <p className={styles.nullText}>don`t have an account ?</p>
                <Button action="button" buttonType="" onClick={signUp}>
                  Sign up
                </Button>
              </div>
            </form>

            <div className={styles.googleAuth}>
              <p className={styles.OR}>OR</p>
              <Button buttonType="google" action="button" onClick={loginGoogle}>
                Sign in with Google
              </Button>
            </div>
          </section>
        </Container>
      </Layout>
    </div>
  )
}

export default Login
