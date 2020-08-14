// @flow
import React from 'react'

import ListContainer from '../../src/containers/ListContainer'
import RootContainer from '../../src/containers/RootContainer'

import token from '../../src/initial/token'
import { serverUrl } from '../../src/services/Api'
import tokenEffect from '../../src/initial/tokenEffect'
import { withTranslation } from '../../src/functions/i18nNext'

const List = (props) => {
  tokenEffect(props)

  return (
    <RootContainer {...props}>
      <ListContainer {...props} />
    </RootContainer>
  )
}

List.getInitialProps = async (ctx) => {
  const initialProps = await token(ctx, serverUrl)
  return {
    ...initialProps,
    namespacesRequired: ['general', 'modules'],
  }
}

export default withTranslation('modules')(List)
