import {RootState} from '../store';

export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
export const selectUserName = (state: RootState) =>
  state.userInfo.userInfo.name;
export const selectUserToken = (state: RootState) =>
  state.userInfo.userInfo.token;
