import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CommentType {
  id: number;
  body: string;
  created: string;
  prayerId: number;
  userId: number;
}
const comments: CommentType[] = [
  {id: 0, body: 'string', created: 'string', prayerId: 0, userId: 0},
];

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {comments},
  reducers: {
    getComments(state, action: PayloadAction<CommentType[]>) {
      state.comments = action.payload;
      console.log(state.comments);
    },
  },
});

export const {getComments} = commentsSlice.actions;

export default commentsSlice.reducer;
