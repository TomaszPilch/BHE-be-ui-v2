import { combineReducers } from 'redux'

const GeneralRedux = require('../redux/GeneralRedux')

const reduxStore = {
  general: {
    redux: GeneralRedux,
  },
}

export default () =>
  combineReducers({
    general: reduxStore.general.redux.reducer,
  })
