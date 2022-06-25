import React from 'react';
import {StyleSheet, SafeAreaView, TouchableHighlight} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {sagaCommentActions} from '../../store/ducks/comments/types';
import Input from '../Input';
import Vector from '../../assets/icons/Vector';
import {selectCurrentPrayerId} from '../../store/ducks/currentPrayerId/selectors';

const AddCommentForm = () => {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      body: '',
    },
  });
  const prayerId = useSelector(selectCurrentPrayerId);
  const dispatch = useDispatch();
  const onSubmit = ({body}: {body: string}) => {
    const date = Date.now();
    const created = new Date(date);
    dispatch({
      type: sagaCommentActions.SET_COMMENTS_SAGA,
      body,
      created,
      prayerId,
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
            placeholder="Comment"
            onChangeText={onChange}
            value={value}
            error={error}
          />
        )}
        name="body"
      />
      <TouchableHighlight
        style={styles.commentButton}
        onPress={handleSubmit(onSubmit)}>
        <Vector />
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
  commentButton: {
    position: 'absolute',
    top: 18,
    left: 28,
    width: 24,
    height: 24,
  },
});

export default AddCommentForm;
