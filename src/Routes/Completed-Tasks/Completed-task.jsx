import React, { useContext } from 'react'
import Container from '../../Component/Container/container'
import { UpdateUserContext } from '../../Redux/authListener'

function CompletedTask() {
  const { completedTodos } = useContext(UpdateUserContext)

  return (
    <div>
      <Container type="profile">
        {completedTodos &&
          completedTodos.map((itms) => {
            const { id, time, completedTime, Todo } = itms
            return (
              <div key={id}>
                <p>{id}</p>
                <p>{Todo}</p>
                <p>{time.toDate().toString()}</p>
                <p>{completedTime.toDate().toString()}</p>
              </div>
            )
          })}
      </Container>
    </div>
  )
}

export default CompletedTask
