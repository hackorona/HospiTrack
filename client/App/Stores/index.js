import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as WifiReducer } from './Wifi/Reducers';
import { reducer as PermissionsReducer } from './Permissions/Reducers';
import { reducer as GpsReducer } from './Gps/Reducers';
import { reducer as SamplesReducer } from './Samples/Reducers';

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    wifi: WifiReducer,
    permissions: PermissionsReducer,
    gps: GpsReducer,
    samples: SamplesReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
