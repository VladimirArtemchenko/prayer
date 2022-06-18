import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

sagaMiddleware.run(rootSagas);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
