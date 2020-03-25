import { put, call, select } from 'redux-saga/effects'
import ExampleActions from 'App/Stores/Example/Actions'
import PermissionsActions from '../Stores/Permissions/Actions'
import NavigationService from 'App/Services/NavigationService'
import { permissionsService } from '../Services/PermissionsService';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.fetchUser())

  // Add more operations you need to do at startup here
  // ...

  // We check for location permissions granted.
  const permissionsStatus = yield call(permissionsService.askPermissions);

  // let store know permissions status
  yield put(PermissionsActions.permissionsUpdate(permissionsStatus));

  // w/o location permissions, app is useless. go to NoPermissionsScreen
  // and beg user to grant permissions.
  if (!permissionsStatus.granted)
    return NavigationService.navigateAndReset('NoPermissionsScreen')

  // App moves to main screen on permissions granted.
}

export function* permissionsUpdate() {
  const isGranted = yield select(state => state.permissions.granted);

  if (isGranted) {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigateAndReset('MainScreen')
  }
}
