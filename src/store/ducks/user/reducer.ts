import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserInfoType {
  id: number;
  email: string;
  name: string;
  token: string;
}

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
    getUserInfo(state, action: PayloadAction<UserInfoType>) {
      return {
        ...state,
        userInfo: {
          email: action.payload.email,
          id: action.payload.id,
          name: action.payload.name,
          token: action.payload.token,
        },
      };
    },
  },
});

export const {getUserInfo} = userInfoSlice.actions;

export default userInfoSlice.reducer;
