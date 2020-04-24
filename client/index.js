/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App/App'
import { name as appName } from './app.json'
import { IS_DEV } from './App/Consts'

// Disable logging on prod
if (!IS_DEV) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

AppRegistry.registerComponent(appName, () => App)