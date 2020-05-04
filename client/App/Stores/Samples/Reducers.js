/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SamplesTypes } from './Actions'

const setRoomId = (state, {id}) => ({
  ...state,
  roomId: id,
});

const clearRoomId = (state) => ({
  ...state,
  roomId: INITIAL_STATE.roomId,
});

const startSampling = (state) => ({
  ...state,
  isSampling: true,
});

const stopSamping = (state) => ({
  ...state,
  isSampling: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [SamplesTypes.SET_ROOM_ID]: setRoomId,
  [SamplesTypes.CLEAR_ROOM_ID]: clearRoomId,
  [SamplesTypes.START_SAMPLE]: startSampling,
  [SamplesTypes.STOP_SAMPLE]: stopSamping,
})
