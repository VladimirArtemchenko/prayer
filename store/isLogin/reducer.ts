import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const isLogin: boolean = false;

const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState: {isLogin},
  reducers: {
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export const {setIsLogin} = isLoginSlice.actions;

export default isLoginSlice.reducer;
