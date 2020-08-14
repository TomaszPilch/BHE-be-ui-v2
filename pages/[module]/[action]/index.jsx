// @flow
import React from 'react'

import EditContainer from '../../../src/containers/EditContainer'
import RootContainer from '../../../src/containers/RootContainer'

import token from '../../../src/initial/token'
import { serverUrl } from '../../../src/services/Api'
import tokenEffect from '../../../src/initial/tokenEffect'
import { withTranslation } from '../../../src/functions/i18nNext'

const Edit = (props) => {
  tokenEffect(props)
  return (
    <RootContainer {...props}>
      <EditContainer {...props} />
    </RootContainer>
  )
}

Edit.getInitialProps = async (ctx) => {
  const initialProps = await token(ctx, serverUrl)
  return {
    ...initialProps,
    namespacesRequired: ['general', 'modules'],
  }
}

export default withTranslation('modules')(Edit)
