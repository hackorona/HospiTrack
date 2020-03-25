import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  permissionsUpdate: ['payload'],
  permissionsRequest: null
})

export const PermissionsTypes = Types
export default Creators
