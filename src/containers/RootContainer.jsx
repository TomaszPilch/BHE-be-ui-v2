// @flow
import React from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastr'
import Router, { withRouter } from 'next/router'

// redux
import UserActions from '@bheui/components/lib/redux/UserRedux'
import NotificationActions from '@bheui/components/lib/redux/NotificationRedux'
import NavigationActions from '@bheui/components/lib/redux/NavigationRedux'
import ListActions from '@bheui/components/lib/redux/ListRedux'

// types
import type { NotificationType } from '@bheui/components/lib/redux/NotificationRedux'
import type { UserGroup } from '@bheui/components/lib/types/UserTypes'

// routes
import Api from '@bheui/components/lib/services/Api'
import { withTranslation } from '../functions/i18nNext'

// components
import Header from '../components/HeaderWithTranslations'

type Props = {
  clearNotifications: () => void,
  notificationToShow: Array<NotificationType>,
  onChangePresentationId: (number) => void,
  onChangeUserGroupRequest: (number) => void,
  onRedirectSuccess: () => void,
  presentationId: UserGroup,
  presentationIds: UserGroup[],
  redirectTo: string,
  selectedGroup: UserGroup,
  userGroups: Array<UserGroup>,
}

class RootScreen extends React.Component<Props, null> {
  toastrContainer = React.createRef()
  settingsRequestSent = false

  componentDidMount() {
    const { token } = this.props
    this.settingsRequestSent = false

    if (token) {
      this.getInitialData()
    }
  }

  componentDidUpdate() {
    const { token, onRedirectSuccess, redirectTo, router, shouldReloadToken, redirectToAs } = this.props
    let redirectPath = null
    let redirectPathAs = null
    if ((!token || shouldReloadToken) && router.pathname !== '/login') {
      redirectPath = 'login'
      redirectPathAs = `/login?redirectTo=${window.location.pathname}`
    } else if (token && router.pathname === '/login') {
      const urlParams = new URLSearchParams(window.location.search)
      const redirect = urlParams.get('redirectTo')
      if (!redirect || redirect.includes('dashboard')) {
        redirectPath = '/'
      } else {
        redirectPath = redirect
      }
    }
    if (redirectTo) {
      onRedirectSuccess()
      redirectPath = redirectTo
      redirectPathAs = redirectToAs
    }
    if (redirectPath) {
      Router.push(redirectPath, redirectPathAs)
    }
    this.checkNotificationsToShow()
  }

  getInitialData = () => {
    const { onGetActualUserRequest, onLoadListSettings } = this.props
    onGetActualUserRequest()
    onLoadListSettings()
  }

  handleChangeRedirectUrl = (link: string, linkAs: string) => {
    this.props.onRequestRedirectTo(link, linkAs)
  }

  checkNotificationsToShow = () => {
    const { notificationToShow, clearNotifications, t } = this.props
    if (notificationToShow.length > 0 && this.toastrContainer && this.toastrContainer.current) {
      const notifications = [...notificationToShow]
      clearNotifications()
      notifications.map((notification: NotificationType) => {
        if (typeof this.toastrContainer.current[notification.type] === 'function') {
          this.toastrContainer.current[notification.type](
            notification.translate ? t(`notifications.${notification.message}`) : notification.message,
            notification.translate ? t(`notifications.${notification.title}`) : notification.title,
            { closeButton: true },
          )
        } else {
          console.error(notification)
        }
        return true
      })
    }
  }

  onChangePresentationId = (presentationId: number) => {
    this.props.onChangePresentationId(presentationId)
    Api.setHeader('Accept-Language', presentationId)
  }

  onChangeUserGroup = (userGroupId: number) => {
    this.props.onChangeUserGroupRequest(userGroupId)
  }

  render() {
    const { children, navigation, presentationId, presentationIds, router, selectedGroup, t, userGroups } = this.props
    console.log(this.props)
    return (
      <div className="app-body">
        <ToastContainer ref={this.toastrContainer} className="toast-top-right" />
        {router.pathname !== '/login' && (
          <Header
            navigation={navigation.asMutable({ deep: true })}
            onChangePresentationId={this.onChangePresentationId}
            onChangeRedirectUrl={this.handleChangeRedirectUrl}
            onChangeUserGroup={this.onChangeUserGroup}
            presentationId={presentationId}
            presentationIds={presentationIds}
            selectedGroup={selectedGroup}
            t={t}
            userGroups={userGroups}
          />
        )}
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { changeRedirectUrl: this.handleChangeRedirectUrl }),
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  fetching: state.login.fetching,
  navigation: state.navigation.navigation,
  notificationToShow: state.notification.notificationToShow,
  presentationId: state.user.presentationId,
  presentationIds: state.user.presentationIds,
  redirectTo: state.navigation.redirectTo,
  redirectToAs: state.navigation.redirectToAs,
  selectedGroup: state.user.selectedGroup,
  userGroups: state.user.userGroups,
})
const mapDispatchToProps = {
  clearNotifications: NotificationActions.clearNotifications,
  onChangePresentationId: UserActions.onChangePresentationId,
  onChangeUserGroupRequest: UserActions.onChangeUserGroupRequest,
  onGetActualUserRequest: UserActions.onGetActualUserRequest,
  onLoadListSettings: ListActions.onLoadListSettings,
  onRedirectSuccess: NavigationActions.onRedirectSuccess,
  onRequestRedirectTo: NavigationActions.onRequestRedirectTo,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(RootScreen)))
