import {RootState} from '../store';

export const selectPrayerList = (state: RootState) =>
  state.prayerList.prayerList;
