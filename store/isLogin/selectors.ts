import {RootState} from '../../store';

export const selectIsLogin = (state: RootState) => state.isLogin.isLogin;
