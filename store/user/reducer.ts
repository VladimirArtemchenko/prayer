import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserInfoType} from './types';
import {GetUserInfo} from './action-types';

const userInfo: UserInfoType = {
  email: '',
  id: 0,
  name: '',
  token: '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {userInfo},
  reducers: {
    getUserInfo(state, action: PayloadAction<GetUserInfo>) {
      state.userInfo = {
        email: action.payload.email,
        id: action.payload.id,
        name: action.payload.name,
        token: action.payload.token,
      };
      console.log(state.userInfo);
    },
  },
});

export const {getUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
