import React from 'react';
import {StyleSheet, SafeAreaView, View, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaUserActions} from '../../../store/ducks/user/types';
import PrimaryButton from '../../../UI/Button';
import {ProfileScreenNavigationProp} from '../Navigator';
import {route} from '../routes';
import Input from '../../../UI/Input';

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const SignUpForm = ({navigation}: Props) => {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const onSubmit = (data: {email: string; name: string; password: string}) => {
    dispatch({type: sagaUserActions.FETCH_SIGNUP_SAGA, data});
    reset();
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Input
            placeholder="Email"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Input
            placeholder="Name"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Input
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="password"
      />
      <View style={styles.buttonsContainer}>
        <TouchableHighlight onPress={handleSubmit(onSubmit)}>
          <PrimaryButton title="SIGNUP" size={'home'} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.navigate(route.SIGNIN_ROUTE)}>
          <PrimaryButton size={'home'} title="IF REGISTERED" />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'white',
    height: '100%',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: '#BFB393',
    shadowColor: 'rgba(66, 78, 117, 0.1)',
    borderRadius: 15,
  },
  input: {
    margin: 10,
    width: '80%',
    height: 40,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
});

export default SignUpForm;
