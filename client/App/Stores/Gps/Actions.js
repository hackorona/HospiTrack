import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch user informations
  fetchGpsLocation: null,
  // The operation has started and is loading
  fetchGpsLocationLoading: null,
  // User informations were successfully fetched
  fetchGpsLocationSuccess: ['gpsLocation'],
  // An error occurred
  fetchGpsLocationFailure: ['errorMessage'],
})

export const GpsTypes = Types
export default Creators
