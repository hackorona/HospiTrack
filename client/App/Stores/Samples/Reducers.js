/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SamplesTypes } from './Actions'

export const setRoomId = (state, {id}) => ({
  ...state,
  roomId: id,
});

export const clearRoomId = (state) => ({
  ...state,
  roomId: INITIAL_STATE.roomId,
});

export const reducer = createReducer(INITIAL_STATE, {
  [SamplesTypes.SET_ROOM_ID]: setRoomId,
  [SamplesTypes.CLEAR_ROOM_ID]: clearRoomId,
})
