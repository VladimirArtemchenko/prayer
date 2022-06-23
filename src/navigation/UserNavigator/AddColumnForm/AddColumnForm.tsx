import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  TextInput,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../../../store/columnsList/types';
import {ProfileScreenNavigationProp} from '../Navigator';
import {DESK_ROUTE} from '../routes';
import PrimaryButton from '../../../assets/UI/Button';
import SvgAdd from '../../../assets/icons/Add';

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const AddColumnForm = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
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
      type: sagaActions.SET_COLUMN_SAGA,
      title,
      description,
      prayerId,
    });
    navigation.navigate(DESK_ROUTE);
    reset();
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Column title"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}
        <View style={styles.plusButton}>
          <SvgAdd />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="Column description"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && <Text>This is required.</Text>}
        <View style={styles.plusButton}>
          <SvgAdd />
        </View>
      </View>
      <TouchableHighlight onPress={handleSubmit(onSubmit)}>
        <PrimaryButton size={'small'} title={'Add'} />
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
