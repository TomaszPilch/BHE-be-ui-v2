// @flow
import React from 'react'
import { connect } from 'react-redux'

// components
import { IStackProps, Stack, MessageBar, MessageBarType } from '@fluentui/react'
import FormComponent from '../components/form/FormComponent'

// redux
import LoginActions from '../redux/LoginRedux'
import { withTranslation } from '../functions/i18nNext'

type Props = {
  errorCode: string,
}

const FORM_CONFIG = [
  {
    name: 'email',
    column: 'email',
    type: 'text',
    validation: {
      isRequired: true,
      isEmail: true,
    },
  },
  {
    name: 'password',
    column: 'password',
    type: 'text',
    inputProps: {
      type: 'password',
    },
    validation: {
      isRequired: true,
      minLength: 5,
    },
  },
]

class LoginScreen extends React.Component<Props> {
  columnProps: IStackProps = {
    tokens: { childrenGap: 20, padding: 30 },
    styles: {},
  }

  componentDidMount() {
    this.props.getDailyPicture()
  }

  handleSubmit = (data: Object) => {
    this.props.onLogin({
      ...data,
      remember: true,
    })
  }

  render() {
    const { errorCode, dailyImages, t, copyright } = this.props
    let dailyImage = false
    if (dailyImages.length) {
      dailyImage = dailyImages[0]
    }
    return (
      <div
        className="ms-Grid"
        dir="ltr"
        id="login-container"
        style={{ backgroundImage: dailyImage ? `url(${dailyImage && dailyImage.url})` : 'none' }}
      >
        {dailyImage && <p id="login-container__wallpaperCopyright">{dailyImage.copyright}</p>}
        <div className="ms-Grid-row">
          <div
            className="ms-Grid-col ms-smOffset0 ms-sm12 ms-lgOffset2 ms-lg8 ms-xlOffset3 ms-xl6 ms-xxlOffset4 ms-xxl4"
            id="login-container__card"
          >
            <Stack className="card ms-depth-4" {...this.columnProps}>
              <h1>{t('loginScreen.signIn')}</h1>
              {errorCode === 'SOMETHING_WRONG' && (
                <MessageBar isMultiline={false} messageBarType={MessageBarType.error}>
                  {t('errorCodes.SOMETHING_WRONG')}
                </MessageBar>
              )}
              <FormComponent
                formConfig={FORM_CONFIG}
                labelPrefix="general."
                onSubmit={this.handleSubmit}
                showSubmitButton
                submitButtonText={t('loginScreen.submitButton')}
                t={t}
              />
            </Stack>
            <p id="login-container__copyright">
              {new Date().getFullYear()}&nbsp;©&nbsp;
              {copyright}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.login,
})

const mapDispatchToProps = {
  getDailyPicture: LoginActions.getDailyPicture,
  onLogin: LoginActions.onLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('login')(LoginScreen))
