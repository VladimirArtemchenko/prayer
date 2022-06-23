import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../../../store/user/types';
import PrimaryButton from '../../../assets/UI/Button';
import {ProfileScreenNavigationProp} from '../../GuestNavigator/Navigator';
import {SIGNIN_ROUTE} from '../routes';

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const SignUpForm = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
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
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Name"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Password"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      <View style={styles.buttonsContainer}>
        <TouchableHighlight onPress={handleSubmit(onSubmit)}>
          <PrimaryButton title="SIGNUP" size={'home'} />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate(SIGNIN_ROUTE)}>
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
