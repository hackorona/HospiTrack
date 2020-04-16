import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch gps information
  fetchGpsLocation: null,
  // The operation has started and is loading
  fetchGpsLocationLoading: null,
  // Gps informations were successfully fetched
  fetchGpsLocationSuccess: ['gpsLocation'],
  // An error occurred
  fetchGpsLocationFailure: ['errorMessage'],
})

export const GpsTypes = Types
export default Creators
