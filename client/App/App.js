import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from './Stores'
import RootScreen from './Containers/Root/RootScreen'
import ForegroundService from 'react-native-foreground-service';
import { Button } from 'react-native'

const { store, persistor } = createStore();

let resolveFunc;

const foregroundTask = async (data) => {
  return new Promise((resolve) => {
    resolveFunc = () => {
      console.warn('resolveFunc()');
      resolve();
    };
  });
}

ForegroundService.registerForegroundTask("myTaskName", foregroundTask);

const notificationConfig = {
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
          <Button title="Stop working" onPress={() => {
            console.log('clicked');
            console.log('resolveFunc ?', resolveFunc);
            resolveFunc();
          }}></Button>
        </PersistGate>
      </Provider>
    )
  }
}
