import React, {FC, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddMember from '../../assets/icons/AddMember';
import {sagaCommentActions} from '../../store/ducks/comments/types';
import EditInput from '../EditInput';
import {Controller, useForm} from 'react-hook-form';
import Vector from '../../assets/icons/Vector';
import {selectCurrentPrayerId} from '../../store/ducks/currentPrayerId/selectors';
interface CommentProps {
  comment: string;
  name: number;
  id: number;
  created: string;
}
const Comment: FC<CommentProps> = ({comment, name, id, created}) => {
  const dispatch = useDispatch();
  const currentPrayerId = useSelector(selectCurrentPrayerId);
  const [isEdit, setIsEdit] = useState(false);
  const {control, handleSubmit} = useForm({
    defaultValues: {
      body: comment,
    },
  });
  const handleDate = () => {
    const date = Date.now();
    const commentDate = date - Date.parse(created);
    const days = commentDate / 1000 / 3600 / 24;
    if (days < 1) {
      return 'Less then days ago';
    } else {
      return `${Math.round(days)} days ago`;
    }
  };
  const onSubmit = (data: {body: string}) => {
    setIsEdit(false);
    const body = {
      body: data.body,
      prayerId: currentPrayerId,
      created: created,
    };
    dispatch({
      type: sagaCommentActions.CHANGE_COMMENTS_SAGA,
      body,
      id,
    });
  };
  const handleDelete = () => {
    Alert.alert('Deleting', 'Deleting comment', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          dispatch({type: sagaCommentActions.DELETE_COMMENTS_SAGA, id}),
      },
    ]);
  };
  const handleTextClick = () => {
    setIsEdit(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <AddMember />
      </View>
      {isEdit ? (
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <EditInput
                placeholder={'Comment'}
                value={value}
                onChangeText={onChange}
                error={error}
              />
            )}
            name="body"
          />
          <TouchableHighlight
            style={styles.plusButton}
            onPress={handleSubmit(onSubmit)}>
            <Vector />
          </TouchableHighlight>
        </View>
      ) : (
        <TouchableOpacity onPress={handleTextClick} onLongPress={handleDelete}>
          <View>
            <View style={styles.headComment}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.time}>{handleDate()}</Text>
            </View>
            <Text style={styles.comment}>{comment}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 90,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    alignItems: 'center',
    padding: 15,
  },
  commentContainer: {
    marginTop: 20,
    width: 50,
  },
  headComment: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#514d47',
    marginRight: 10,
  },
  time: {
    fontSize: 13,
    lineHeight: 16,
    color: '#9C9C9C',
    marginRight: 10,
  },
  comment: {
    color: '#514d47',
    fontSize: 19,
  },
  plusButton: {
    position: 'absolute',
    top: 9,
    left: 10,
    width: 24,
    height: 24,
  },
});
export default Comment;
