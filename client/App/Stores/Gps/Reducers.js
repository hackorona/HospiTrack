import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { GpsTypes } from './Actions'

export const fetchGpsLocationLoading = (state) => ({
  ...state,
  gpsLocationIsLoading: true,
  gpsLocationErrorMessage: null,
})

export const fetchGpsLocationSuccess = (state, { gpsLocation }) => ({
  ...state,
  gpsLocation,
  gpsLocationIsLoading: false,
  gpsLocationErrorMessage: null,
})

export const fetchGpsLocationFailure = (state, { errorMessage }) => ({
  ...state,
  gpsLocation: {},
  gpsLocationIsLoading: false,
  gpsLocationErrorMessage: errorMessage,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [GpsTypes.FETCH_GPS_LOCATION_LOADING]: fetchGpsLocationLoading,
  [GpsTypes.FETCH_GPS_LOCATION_SUCCESS]: fetchGpsLocationSuccess,
  [GpsTypes.FETCH_GPS_LOCATION_FAILURE]: fetchGpsLocationFailure,
})
