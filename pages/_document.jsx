// @flow
import Document, { Head, Html, Main, NextScript, DocumentContext } from 'next/document'
import { InjectionMode, resetIds, Stylesheet } from '@fluentui/react'
import * as React from 'react'

/**
 * Modified from https://github.com/microsoft/fluentui/wiki/Server-side-rendering-and-browserless-testing#nextjs-setup
 * Borrowing render strategy from https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
 *
 * Known issue with Fluent UI:
 *
 * Warning: Prop `className` did not match. Server: "ms-Button-label server-label-6"
 * Client: "ms-Button-label label-46"
 */
export default class MyDocument extends Document<{ styleTags: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const stylesheet = Stylesheet.getInstance()
    stylesheet.setConfig({
      injectionMode: InjectionMode.none,
      namespace: 'server',
    })
    stylesheet.reset()
    resetIds()

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styleTags: stylesheet.getRules(true),
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* This is fastest. @font-face styles are not necessary. */}
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&display=swap" rel="stylesheet" />
          <style type="text/css" dangerouslySetInnerHTML={{ __html: this.props.styleTags }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
