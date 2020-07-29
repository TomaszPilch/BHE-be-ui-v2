// @flow
import React from 'react'
import Head from 'next/head'
import App from 'next/app'

import '../src/styles/style.scss'

import { wrapper } from '../src/store/createStore'

type AppTypes = {}

class MyApp extends App<AppTypes> {
  render() {
    const { Component, pageProps, router } = this.props

    return (
      <>
        <Head>
          <title>DevX NextJS starterpack</title>
        </Head>
        <Component {...pageProps} router={router} />
      </>
    )
  }
}

export default wrapper.withRedux(MyApp)
