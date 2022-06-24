import {RootState} from '../../index';

export const selectColumnsList = (state: RootState) =>
  state.columnsList.columnsList;
