import {RootState} from '../store';

export const selectCurrentBoardId = (state: RootState) =>
  state.currentBoardId.currentBoardId;
