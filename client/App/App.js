import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Containers/Root/RootScreen'
import ForegroundService from 'react-native-foreground-service';

let foregroundTask = async (data) => {
  // console.log('in foregroundTask');
  // console.log('data ?', data);
  // return new Promise((res) => setTimeout(() => res(), 3000));
  await myTask();
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

const { store, persistor } = createStore()

export default class App extends Component {
  render() {
    return (
      /**
       * @see https://github.com/reduxjs/react-redux/blob/master/docs/api/Provider.md
       */
      <Provider store={store}>
        {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    )
  }
}
