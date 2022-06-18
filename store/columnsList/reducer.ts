import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColumnListType} from './types';
import {GetColumnList} from './action-types';

const columnsList: ColumnListType[] = [];

const columnsListSlice = createSlice({
  name: 'columnsList',
  initialState: {columnsList},
  reducers: {
    getColumnsList(state, action: PayloadAction<GetColumnList>) {
      state.columnsList = action.payload;
      console.log(state.columnsList);
    },
  },
});

export const {getColumnsList} = columnsListSlice.actions;

export default columnsListSlice.reducer;
