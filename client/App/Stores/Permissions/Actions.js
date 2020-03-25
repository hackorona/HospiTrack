import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  permissionsUpdate: ['payload'],
})

export const PermissionsTypes = Types
export default Creators
