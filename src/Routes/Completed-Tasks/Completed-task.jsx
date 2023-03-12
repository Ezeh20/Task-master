import React, { useContext } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { motion } from 'framer-motion'
import Button from '../../Component/Button'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import NavProfile from '../../Layout/nav-2/Nav2'
import { UpdateUserContext } from '../../Redux/authListener'
import { deleteCompletedTodo } from '../../utils/firebase'
import styles from './completed.module.scss'

function CompletedTask() {
  const { completedTodos, userId } = useContext(UpdateUserContext)

  return (
    <div className={`${styles.content} bg-profile`}>
      <Layout>
        <NavProfile header="Completed" />
        <Container type="profile">
          <div className={styles.itms}>
            {completedTodos ? (
              completedTodos.map((itms) => {
                const { id, time, completedTime, Todo, completedId } = itms
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={id}
                    className={`${styles.completedTodo} content-bg alt-text`}
                  >
                    <p className={styles.top}>
                      {' '}
                      <span className={styles.span}>TaskId</span> {id}
                    </p>
                    <p className={`${styles.entry} ${styles.entryTodo}`}>
                      {' '}
                      <span className={styles.spans}>Todo</span>
                      {Todo}
                    </p>
                    <p className={styles.entry}>
                      {' '}
                      <span className={styles.spans}>Created</span>
                      {time.toDate().toString().slice(0, 24)}
                    </p>
                    <p className={styles.entry}>
                      {' '}
                      <span className={styles.spans}>Completed</span>
                      {completedTime.toDate().toString().slice(0, 25)}
                    </p>
                    <Button
                      onClick={() => deleteCompletedTodo(userId, completedId)}
                    >
                      Delete
                    </Button>
                  </motion.div>
                )
              })
            ) : (
              <div className={styles.loading}>
                <InfinitySpin radius="9" color="#999" ariaLabel="loading" />
              </div>
            )}
            {completedTodos && completedTodos.length < 1 && (
              <p className={`${styles.feedback} alt-text`}>No task completed</p>
            )}
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export default CompletedTask
