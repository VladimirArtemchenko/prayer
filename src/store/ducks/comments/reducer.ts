import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CommentType {
  id: number;
  body: string;
  created: string;
  prayerId: number;
  userId: number;
}
const comments: CommentType[] = [];

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {comments},
  reducers: {
    getComments(state, action: PayloadAction<CommentType[]>) {
      state.comments = action.payload.map(item => {
        console.log(item);
        return item;
      });
      console.log(state.comments);
    },
  },
});

export const {getComments} = commentsSlice.actions;

export default commentsSlice.reducer;
