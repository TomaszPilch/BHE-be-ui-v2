import { combineReducers } from 'redux'

const LoginRedux = require('../redux/LoginRedux')
const NavigationRedux = require('../redux/NavigationRedux')
const NotificationRedux = require('../redux/NotificationRedux')
const UserRedux = require('../redux/UserRedux')
const ListRedux = require('../redux/ListRedux')
const EditRedux = require('../redux/EditRedux')
const HelperRedux = require('../redux/HelperRedux')

const reduxStore = {
  login: {
    redux: LoginRedux,
  },
  navigation: {
    redux: NavigationRedux,
  },
  notification: {
    redux: NotificationRedux,
  },
  user: {
    redux: UserRedux,
  },
  list: {
    redux: ListRedux,
  },
  edit: {
    redux: EditRedux,
  },
  helper: {
    redux: HelperRedux,
  },
}

export default () =>
  combineReducers({
    login: reduxStore.login.redux.reducer,
    navigation: reduxStore.navigation.redux.reducer,
    notification: reduxStore.notification.redux.reducer,
    user: reduxStore.user.redux.reducer,
    list: reduxStore.list.redux.reducer,
    edit: reduxStore.edit.redux.reducer,
    helper: reduxStore.helper.redux.reducer,
  })
