// external libs
import { combineEpics } from 'redux-observable'

// epics
import ActualUserEpics from '@bheui/components/lib/epics/ActualUserEpics'
import ListSettingsEpic from '@bheui/components/lib/epics/ListSettingsEpic'
import GetLocaleEpic from '@bheui/components/lib/epics/GetLocaleEpic'
import IsLoggedInEpic from '@bheui/components/lib/epics/IsLoggedInEpic'
import LoginEpic from '@bheui/components/lib/epics/LoginEpic'
import ListDataEpic from '@bheui/components/lib/epics/ListDataEpic'
import GetConfigEpic from '@bheui/components/lib/epics/GetConfigEpic'
import GetItemData from '@bheui/components/lib/epics/GetItemData'
import SaveDataEpic from '@bheui/components/lib/epics/SaveDataEpic'
import RemoveItemsEpic from '@bheui/components/lib/epics/RemoveItemsEpic'
import GetDailyPictureEpic from '@bheui/components/lib/epics/GetDailyPictureEpic'

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
