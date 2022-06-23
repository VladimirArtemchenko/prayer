import {RootState} from '../store';

export const selectColumnsList = (state: RootState) =>
  state.columnsList.columnsList;
