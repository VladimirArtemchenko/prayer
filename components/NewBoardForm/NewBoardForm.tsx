import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  View,
  TextInput,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../../store/user/saga-actions';

const NewBoardForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const onSubmit = (data: {email: string; password: string}) => {
    dispatch({type: sagaActions.FETCH_SIGNIN_SAGA, data});
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
            placeholder=""
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
            placeholder="Password"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      <Button
        color={'green'}
        onPress={handleSubmit(onSubmit)}
        title={'Login'}
      />
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

export default NewBoardForm;
