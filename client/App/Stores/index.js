import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as ExampleReducer } from './Example/Reducers'
import { reducer as WifiReducer } from './Wifi/Reducers'
import { reducer as PermissionsReducer } from './Permissions/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    example: ExampleReducer,
    wifi: WifiReducer,
    permissions: PermissionsReducer
  })

  return configureStore(rootReducer, rootSaga)
}
