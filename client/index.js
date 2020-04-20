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


import ForegroundService from 'react-native-foreground-service';

let foregroundTask = async (data) => {
  console.log('in foregroundTask');
  console.log('data ?', data);
  return new Promise((res) => setTimeout(() => res(), 10 * 10 * 1000));
  // await myTask();
}

ForegroundService.registerForegroundTask("myTaskName", foregroundTask);

let notificationConfig = {
  id: 3,
  title: 'Service',
  message: `blah message`,
  visibility: 'public',
  importance: 'low',
  number: 55
};

const func = async () => {
  await ForegroundService.startService(notificationConfig);
  
  await ForegroundService.runTask({
    taskName: 'myTaskName',
    delay: 0
  });
}

func();