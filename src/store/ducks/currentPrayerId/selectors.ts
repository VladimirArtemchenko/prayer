import {RootState} from '../../index';

export const selectCurrentPrayerId = (state: RootState) =>
  state.currentPrayerId.currentPrayerId;
