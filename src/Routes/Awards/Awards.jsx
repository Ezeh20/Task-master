import React, { useContext } from 'react'
import Container from '../../Component/Container/container'
import Layout from '../../Layout/Layout'
import NavProfile from '../../Layout/nav-2/Nav2'
import { UpdateUserContext } from '../../Redux/authListener'
import Process from './process'

function Awards() {
  const { xp } = useContext(UpdateUserContext)
  return (
    <div className="bg-profile">
      <Layout>
        <NavProfile header="Award" />
        <Container type="profile">
          <Process xp={xp} />
        </Container>
      </Layout>
    </div>
  )
}

export default Awards
