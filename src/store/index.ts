import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './ducks';
import {rootSagas} from './ducks/';
import {configureStore} from '@reduxjs/toolkit';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
