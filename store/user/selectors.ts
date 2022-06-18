import {RootState} from '../../store';

export const selectUserInfo = (state: RootState) => state.userInfo.userInfo;
export const selectUserToken = (state: RootState) => state.userInfo.userInfo;
