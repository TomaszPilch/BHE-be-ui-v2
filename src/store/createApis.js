// @flow
import mainEndpoints, { createApi, createSelfApi, loginEndpoints } from '@bheui/components/lib/services/Api'

import RootEpic from '../epics'

const createApis = () => {
  const apis = {
    main: mainEndpoints(createApi()),
    login: loginEndpoints(createSelfApi()),
  }

  apis.setToken = (name: string, token: string) => {
    apis.main.setHeader(name, token)
  }

  const rootEpic = RootEpic(apis)
  return [apis, rootEpic]
}

export default createApis
