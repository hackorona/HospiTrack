import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import { createLogger } from 'redux-logger';

/**
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 */
import AsyncStorage from '@react-native-community/async-storage';
import { IS_DEV } from '../Consts';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
    // 'auth',
    'wifi',
    'gps',
    'samples'
  ],
}

export default (rootReducer, rootSaga) => {
  const logger = createLogger({
    predicate: (getState, action) => {
      // Make logger sleep always.
      return action.type.includes('SUCCESS');
    },
    collapsed: () => true
  });
  const middlewares = []

  if (IS_DEV) {
    // Add redux-logger on dev only.
    middlewares.push(logger);
  }

  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middlewares.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middlewares))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = persistStore(store)

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
