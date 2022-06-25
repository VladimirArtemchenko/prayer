import React from 'react';
import {StyleSheet, SafeAreaView, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaPrayerActions} from '../../store/ducks/prayerList/types';
import {ProfileScreenNavigationProp} from '../../navigation/UserNavigator/Navigator';
import SvgAdd from '../../assets/icons/Add';
import Input from '../Input';
type Props = {
  currentBoardId: number;
  navigation: ProfileScreenNavigationProp;
};

const AddPrayerForm = ({currentBoardId}: Props) => {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      title: '',
    },
  });

  const dispatch = useDispatch();
  const onSubmit = ({title}: {title: string}) => {
    dispatch({
      type: sagaPrayerActions.SET_PRAYERS_SAGA,
      title,
      description: '',
      checked: false,
      columnId: currentBoardId,
    });
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
            placeholder="Add a prayer..."
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="title"
      />
      <TouchableHighlight
        style={styles.plusButton}
        onPress={handleSubmit(onSubmit)}>
        <SvgAdd />
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
  },
  input: {
    paddingTop: 15,
    paddingLeft: 76,
    width: '100%',
    height: 50,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
  },
  plusButton: {
    position: 'absolute',
    top: 30,
    left: 35,
    width: 24,
    height: 24,
  },
});

export default AddPrayerForm;
