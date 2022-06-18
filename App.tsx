import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import MainStack from './navigation/navigate';
import {Provider} from 'react-redux';
import store from './store';
import Desk from './components/Desk/Desk';
import SignUpForm from './components/SignUpForm/SignUpForm';

const App = () => {
  return (
    <Provider store={store}>
      {/*<Desk />*/}
      {/*<SignUpForm />*/}
      <MainStack />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 22,
    paddingHorizontal: 24,
  },
  desk: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    width: '98%',
    height: 59,
  },
  sectionTitle: {
    color: '#514D47',
    fontFamily: 'SF UI Text',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.024,
  },
  sectionButton: {
    position: 'absolute',
    left: 24,
    right: 15,
  },
});

export default App;
