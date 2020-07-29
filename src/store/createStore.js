import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
// import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import Immutable from 'seamless-immutable'

import rootEpic from '../epics/index'
import makeRootReducer from './reducers'

const initStore = (context, initialState = {}) => {
  const epicMiddleware = createEpicMiddleware()

  const middleware = [thunk, epicMiddleware]
  const enhancers = []

  const store = createStore(
    makeRootReducer(),
    new Immutable(initialState),
    compose(applyMiddleware(...middleware), ...enhancers),
  )

  store.asyncReducers = {}

  epicMiddleware.run(rootEpic())

  return store
}

export const wrapper = createWrapper(initStore)
export default initStore
