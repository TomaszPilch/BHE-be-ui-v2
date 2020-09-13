// @flow
import React from 'react'

import token from '@bheui/components/lib/initial/token'
import { serverUrl } from '@bheui/components/lib/services/Api'
import tokenEffect from '@bheui/components/lib/initial/tokenEffect'

import EditContainer from '../../../src/containers/EditContainer'
import RootContainer from '../../../src/containers/RootContainer'
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
