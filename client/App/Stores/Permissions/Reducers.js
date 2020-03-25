/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { PermissionsTypes } from './Actions'

export const permissionsEnabled = (state) => ({
  ...state,
  permissionsEnabled: true
});

export const permissionsBlocked = (state) => ({
  ...state,
  permissionsBlocked: true
});

export const reducer = createReducer(INITIAL_STATE, {
  [PermissionsTypes.PERMISSIONS_ENABLED]: permissionsEnabled,
  [PermissionsTypes.PERMISSIONS_BLOCKED]: permissionsBlocked,
})
