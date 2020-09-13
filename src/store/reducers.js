import { combineReducers } from 'redux'

const LoginRedux = require('@bheui/components/lib/redux/LoginRedux')
const NavigationRedux = require('@bheui/components/lib/redux/NavigationRedux')
const NotificationRedux = require('@bheui/components/lib/redux/NotificationRedux')
const UserRedux = require('@bheui/components/lib/redux/UserRedux')
const ListRedux = require('@bheui/components/lib/redux/ListRedux')
const EditRedux = require('@bheui/components/lib/redux/EditRedux')
const HelperRedux = require('@bheui/components/lib/redux/HelperRedux')

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

const combineReducersFunction = () =>
  combineReducers({
    login: reduxStore.login.redux.reducer,
    navigation: reduxStore.navigation.redux.reducer,
    notification: reduxStore.notification.redux.reducer,
    user: reduxStore.user.redux.reducer,
    list: reduxStore.list.redux.reducer,
    edit: reduxStore.edit.redux.reducer,
    helper: reduxStore.helper.redux.reducer,
  })

export default combineReducersFunction
