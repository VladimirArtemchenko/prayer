import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const currentPrayerId: number = 0;

const currentPrayerIdSlice = createSlice({
  name: 'currentPrayerId',
  initialState: {currentPrayerId},
  reducers: {
    setCurrentPrayerId(state, action: PayloadAction<number>) {
      state.currentPrayerId = action.payload;
    },
  },
});

export const {setCurrentPrayerId} = currentPrayerIdSlice.actions;

export default currentPrayerIdSlice.reducer;
