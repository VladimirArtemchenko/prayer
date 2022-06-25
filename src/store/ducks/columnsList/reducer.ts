import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ColumnListType {
  id: number;
  title: string;
  description: string;
  userId: number;
}

const columnsList: ColumnListType[] = [];

const columnsListSlice = createSlice({
  name: 'columnsList',
  initialState: {columnsList},
  reducers: {
    getColumnsList(state, action: PayloadAction<ColumnListType[]>) {
      return {...state, columnsList: action.payload};
    },
  },
});

export const {getColumnsList} = columnsListSlice.actions;

export default columnsListSlice.reducer;
