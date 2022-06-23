import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {sagaActions} from '../../../store/prayerList/types';
import {ProfileScreenNavigationProp} from '../../../navigation/UserNavigator/Navigator';
import SvgAdd from '../../../assets/icons/Add';
type Props = {
  currentBoardId: number;
  navigation: ProfileScreenNavigationProp;
};

const AddPrayerForm = ({currentBoardId}: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  const dispatch = useDispatch();
  const onSubmit = ({title}: {title: string}) => {
    dispatch({
      type: sagaActions.SET_PRAYERS_SAGA,
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
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Add a prayer..."
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text>This is required.</Text>}
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
    margin: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
  },
  plusButton: {
    position: 'absolute',
    top: 40,
    left: 43,
    width: 24,
    height: 24,
  },
});

export default AddPrayerForm;
