import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const currentBoardId: number = 0;

const currentBoardIdSlice = createSlice({
  name: 'currentBoardId',
  initialState: {currentBoardId},
  reducers: {
    setCurrentBoardId(state, action: PayloadAction<number>) {
      state.currentBoardId = action.payload;
    },
  },
});

export const {setCurrentBoardId} = currentBoardIdSlice.actions;

export default currentBoardIdSlice.reducer;
