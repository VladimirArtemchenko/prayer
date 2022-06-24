import React from 'react';
import {StyleSheet, SafeAreaView, View, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../../../store/ducks/user/types';
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
    dispatch({type: sagaActions.FETCH_SIGNUP_SAGA, data});
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
            placeholder="Email"
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
            placeholder="Name"
            onChangeText={onChange}
            value={value}
            invalid={invalid}
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {invalid}}) => (
          <Input
            placeholder="Password"
            onChangeText={onChange}
            value={value}
            invalid={invalid}
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
