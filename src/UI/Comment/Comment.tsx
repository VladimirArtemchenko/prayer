import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AddMember from '../../assets/icons/AddMember';
import {sagaActions} from '../../store/ducks/comments/types';
interface CommentProps {
  comment: string;
  name: number;
  id: number;
}
const Comment: FC<CommentProps> = ({comment, name, id}) => {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch({type: sagaActions.CHANGE_COMMENTS_SAGA, payload: id});
  };

  return (
    <View>
      <View style={styles.commentContainer}>
        <AddMember />
      </View>
      <TouchableOpacity onLongPress={handleChange}>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </TouchableOpacity>
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
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#514d47',
  },
  comment: {
    color: '#514d47',
    fontSize: 19,
  },
});
export default Comment;
