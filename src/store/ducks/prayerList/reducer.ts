import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface PrayersListType {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  columnId: number;
  commentsIds: [string];
}

const prayerList: PrayersListType[] = [];

const prayerListSlice = createSlice({
  name: 'prayerList',
  initialState: {prayerList},
  reducers: {
    setPrayerList(state, action: PayloadAction<PrayersListType[]>) {
      return {...state, prayerList: action.payload};
    },
  },
});

export const {setPrayerList} = prayerListSlice.actions;

export default prayerListSlice.reducer;
