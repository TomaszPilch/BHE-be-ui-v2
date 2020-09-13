// @flow
import React from 'react'

import token from '@bheui/components/lib/initial/token'
import { serverUrl } from '@bheui/components/lib/services/Api'
import tokenEffect from '@bheui/components/lib/initial/tokenEffect'

import HomeContainer from '../src/containers/HomeContainer'
import RootContainer from '../src/containers/RootContainer'

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
