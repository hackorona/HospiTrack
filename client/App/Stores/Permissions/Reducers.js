/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { PermissionsTypes } from './Actions'

export const permissionsUpdate = (state, {payload: {granted, blocked}}) => ({
  ...state,
  granted,
  blocked
});

export const reducer = createReducer(INITIAL_STATE, {
  [PermissionsTypes.PERMISSIONS_UPDATE]: permissionsUpdate,
})
