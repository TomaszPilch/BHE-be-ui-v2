import { combineEpics } from 'redux-observable'

export const epics = []

const rootEpic = () => combineEpics(...epics)

export default rootEpic
