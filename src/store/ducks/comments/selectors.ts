import {RootState} from '../../index';

export const selectComments = (state: RootState) => state.comments.comments;
