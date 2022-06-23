import React from 'react';
import MainStack from './navigation/Navigator';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
};
export default App;
