/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { WifiTypes } from './Actions'
import { SamplesTypes } from '../Samples/Actions'

export const fetchWifiListLoading = (state) => ({
  ...state,
  wifiListIsLoading: true,
  wifiListErrorMessage: null,
  sampleSent: false
})

export const fetchWifiListSuccess = (state, payload) => ({
  ...state,
  wifiList: payload.wifiArr,
  wifiListIsLoading: false,
  wifiListErrorMessage: null,
})

export const fetchWifiListFailure = (state, { errorMessage }) => ({
  ...state,
  wifiList: {},
  wifiListIsLoading: false,
  wifiListErrorMessage: errorMessage,
})

export const sampleSent = (state) => ({
  ...state,
  sampleSent: true
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [WifiTypes.FETCH_WIFI_LIST_LOADING]: fetchWifiListLoading,
  [WifiTypes.FETCH_WIFI_LIST_SUCCESS]: fetchWifiListSuccess,
  [WifiTypes.FETCH_WIFI_LIST_FAILURE]: fetchWifiListFailure,
  [SamplesTypes.SAMPLE_SENT]: sampleSent
})
