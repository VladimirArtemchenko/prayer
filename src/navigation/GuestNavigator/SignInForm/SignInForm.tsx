import React from 'react';
import {StyleSheet, SafeAreaView, TouchableHighlight} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../../../store/ducks/user/types';
import PrimaryButton from '../../../UI/Button';
import Input from '../../../UI/Input';

const SignInForm = () => {
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: {email: string; password: string}) => {
    dispatch({type: sagaActions.FETCH_SIGNIN_SAGA, data});
    reset();
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
          <Input
            placeholder={'Email'}
            onChangeText={onChange}
            value={value}
            invalid={invalid}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
          <Input
            placeholder={'Password'}
            onChangeText={onChange}
            value={value}
            invalid={invalid}
          />
        )}
        name="password"
      />
      <TouchableHighlight onPress={handleSubmit(onSubmit)}>
        <PrimaryButton size={'home'} title={'Login'} />
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    width: '80%',
    height: 40,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
});

export default SignInForm;
