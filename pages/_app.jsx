// @flow
import React from 'react'
import Head from 'next/head'
import App from 'next/app'
import { Provider } from 'react-redux'
import { initializeIcons } from '@uifabric/icons'
import getConfig from 'next/config'

import withReduxAndAxios from '@bheui/components/lib/components/WithReduxAndAxios'

import '../src/styles/main.scss'

import { appWithTranslation } from '../src/functions/i18nNext'

import createStore from '../src/store/createStore'
import createApis from '../src/store/createApis'

type AppTypes = {}

initializeIcons()

const { publicRuntimeConfig } = getConfig()
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
          <title>{publicRuntimeConfig.appTitle}</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} router={router} setToken={setToken} t={t} />
        </Provider>
      </>
    )
  }
}

export default withReduxAndAxios(createStore, createApis)(appWithTranslation(MyApp))
