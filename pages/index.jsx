// @flow
import React from 'react'

import HomeContainer from '../src/containers/HomeContainer'
import RootContainer from '../src/containers/RootContainer'

import token from '../src/initial/token'
import { serverUrl } from '../src/services/Api'
import tokenEffect from '../src/initial/tokenEffect'

const Home = (props) => {
  tokenEffect(props)

  return (
    <RootContainer {...props}>
      <HomeContainer {...props} />
    </RootContainer>
  )
}

Home.getInitialProps = async (ctx) => {
  const initialProps = await token(ctx, serverUrl)
  return {
    ...initialProps,
    namespacesRequired: ['modules', 'dashboard'],
  }
}

export default Home
