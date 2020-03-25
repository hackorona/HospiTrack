import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  permissionsBlocked: null,
  permissionsEnabled: null,
})

export const PermissionsTypes = Types
export default Creators
