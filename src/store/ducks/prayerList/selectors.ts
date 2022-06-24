import {RootState} from '../../index';

export const selectPrayerList = (state: RootState) =>
  state.prayerList.prayerList;
