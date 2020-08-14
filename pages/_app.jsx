// @flow
import React from 'react'
import Head from 'next/head'
import App from 'next/app'
import { Provider } from 'react-redux'
import { initializeIcons } from '@uifabric/icons'

import { appWithTranslation } from '../src/functions/i18nNext'
import withReduxAndAxios from '../src/components/WithReduxAndAxios'

import '../src/styles/base.scss'

import createStore from '../src/store/createStore'
import createApis from '../src/store/createApis'

type AppTypes = {}

initializeIcons()
class MyApp extends App<AppTypes> {
  componentDidCatch(error, info) {
    console.error(error)
    console.error(info)
  }

  render() {
    const { Component, pageProps, router, store, t, setToken } = this.props

    return (
      <>
        <Head>
          <title>DevX NextJS starterpack</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} router={router} setToken={setToken} t={t} />
        </Provider>
      </>
    )
  }
}

export default withReduxAndAxios(createStore, createApis)(appWithTranslation(MyApp))
