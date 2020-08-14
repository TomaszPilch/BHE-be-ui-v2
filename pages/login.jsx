// @flow
import React from 'react'
import getConfig from 'next/config'

import LoginContainer from '../src/containers/LoginContainer'
import RootContainer from '../src/containers/RootContainer'

import token from '../src/initial/token'
import { serverUrl } from '../src/services/Api'
import tokenEffect from '../src/initial/tokenEffect'

const { publicRuntimeConfig } = getConfig()

const Login = (props) => {
  tokenEffect(props)

  return (
    <RootContainer {...props}>
      <LoginContainer copyright={publicRuntimeConfig.copyright} {...props} />
    </RootContainer>
  )
}

Login.getInitialProps = async (ctx) => {
  const initialProps = await token(ctx, serverUrl, 'login')
  return {
    ...initialProps,
    namespacesRequired: ['login'],
  }
}

export default Login
