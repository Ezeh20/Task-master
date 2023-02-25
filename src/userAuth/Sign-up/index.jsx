/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../Component/Button'
import Container from '../../Component/Container/container'
import FormInput from '../../Component/FormInput'
import Layout from '../../Layout/Layout'
import styles from '../Login/login.module.scss'

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm()

  const defaultValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const [formValue, setFormValue] = useState(defaultValue)
  const { email, password, firstName, lastName } = formValue

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValue({ ...formValue, [name]: value })
  }
  const navigate = useNavigate()

  const signUp = () => {
    navigate('/sign-up')
  }
  return (
    <div className={`${styles.login} bg alt-text`}>
      <Layout>
        <Container>
          <div className={styles.loginTitle}>
            <p className={styles.loginSub}>Sign up</p>
          </div>
          <section className={styles.loginInput}>
            <form className={`${styles.form} `}>
              <div className={styles.inputLocation}>
                <input
                  {...register('firstName', {
                    required: 'firstName can not be blank',
                  })}
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                  className={styles.Input}
                />
                <label
                  htmlFor="firstName"
                  className={`${
                    email
                      ? `${`${styles.label} ${styles.shrink}`}`
                      : `${styles.label} `
                  }`}
                >
                  First Name
                </label>
                {errors.firstName && <small>{errors.firstName.message}</small>}
              </div>

              <div className={`${styles.inputLocation}`}>
                <input
                  {...register('lastName', {
                    required: 'lastName can not be blank',
                  })}
                  type="password"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
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
                  Last Name
                </label>
                {errors.password && <small>{errors.password.message}</small>}
              </div>
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
              <Button action="submit">Submit</Button>
            </form>
          </section>
        </Container>
      </Layout>
    </div>
  )
}

export default SignUp
