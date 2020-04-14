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

// if no foreground service, this only runs when app has the focus\
(function() {
  console.log('1');
  let index = Math.floor(Math.random() * 100);
  while (index !== 42) {
    console.info('still in loop');
    index = Math.floor(Math.random() * 100);
  }
  
  console.info('out of loop')
  
  console.log('Heyyyy');
})()
AppRegistry.registerComponent(appName, () => App)
