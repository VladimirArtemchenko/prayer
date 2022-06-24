import {RootState} from '../../index';

export const selectCurrentBoardId = (state: RootState) =>
  state.currentBoardId.currentBoardId;
