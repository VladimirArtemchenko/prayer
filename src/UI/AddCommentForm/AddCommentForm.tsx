import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

const AddCommentForm = () => {
  const dispatch = useDispatch();
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
  // const onSubmit = data => {
  //   dispatch({type: ADD_COMMENT_SAGA, data});
  // };

  return (
    <View>
      <View>
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
      </View>
    </View>
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

export default AddCommentForm;
