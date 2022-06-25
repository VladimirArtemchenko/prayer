import React from 'react';
import {StyleSheet, SafeAreaView, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {columnsSagaActions} from '../../../store/ducks/columnsList/types';
import {ProfileScreenNavigationProp} from '../Navigator';
import {route} from '../routes';
import PrimaryButton from '../../../UI/Button';
import Input from '../../../UI/Input';

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const AddColumnForm = ({navigation}: Props) => {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      title: '',
      description: '',
      prayerId: 0,
    },
  });

  const dispatch = useDispatch();
  const onSubmit = ({
    title,
    description,
    prayerId,
  }: {
    title: string;
    description: string;
    prayerId: number;
  }) => {
    dispatch({
      type: columnsSagaActions.SET_COLUMN_SAGA,
      title,
      description,
      prayerId,
    });
    navigation.navigate(route.DESK_ROUTE);
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
            placeholder="Column title"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <Input
            placeholder="Column description"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="description"
      />
      <TouchableHighlight onPress={handleSubmit(onSubmit)}>
        <PrimaryButton size={'small'} title={'Add'} />
      </TouchableHighlight>
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
  inputContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  input: {
    paddingTop: 15,
    paddingLeft: 76,
    width: '100%',
    height: 50,
    margin: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  plusButton: {
    position: 'absolute',
    top: 22,
    left: 28,
    width: 24,
    height: 24,
  },
});

export default AddColumnForm;
