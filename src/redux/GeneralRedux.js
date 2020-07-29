// external libs
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  testIncreaseNumber: null,
})

export const GeneralTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  testNumber: 0,
})

/* ------------- Reducers ------------- */

const testIncreaseNumberR = (state) => state.set('testNumber', state.testNumber + 1)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEST_INCREASE_NUMBER]: testIncreaseNumberR,
})
