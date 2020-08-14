// external libs
import { combineEpics } from 'redux-observable'

// epics
import ActualUserEpics from './ActualUserEpics'
import ListSettingsEpic from './ListSettingsEpic'
import GetLocaleEpic from './GetLocaleEpic'
import IsLoggedInEpic from './IsLoggedInEpic'
import LoginEpic from './LoginEpic'
import ListDataEpic from './ListDataEpic'
import GetConfigEpic from './GetConfigEpic'
import GetItemData from './GetItemData'
import SaveDataEpic from './SaveDataEpic'
import RemoveItemsEpic from './RemoveItemsEpic'
import GetDailyPictureEpic from './GetDailyPictureEpic'

const epics = (apis) => [
  ...ActualUserEpics(apis.main),
  ...ListDataEpic(apis.main),
  ...ListSettingsEpic(apis.main),
  ...SaveDataEpic(apis.main),
  GetConfigEpic(apis.main),
  GetItemData(apis.main),
  GetLocaleEpic(apis.main),
  IsLoggedInEpic(apis.main),
  LoginEpic(apis.login, apis.main, apis.setToken),
  RemoveItemsEpic(apis.main),
  GetDailyPictureEpic(apis.main),
]

const rootEpic = (apis) => combineEpics(...epics(apis))

export default rootEpic
