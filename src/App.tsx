import React from 'react';
import MainStack from './navigation/Navigator';
import {Provider} from 'react-redux';
import {persistor, index} from './store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={index}>
      <PersistGate persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
};
export default App;
