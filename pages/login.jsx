// @flow
import React from 'react'
import getConfig from 'next/config'

import token from '@bheui/components/lib/initial/token'
import { serverUrl } from '@bheui/components/lib/services/Api'
import tokenEffect from '@bheui/components/lib/initial/tokenEffect'

import LoginContainer from '../src/containers/LoginContainer'
import RootContainer from '../src/containers/RootContainer'

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
