import {createSlice} from '@reduxjs/toolkit';
import {userSession} from 'common/stacks';

const user = userSession?.isUserSignedIn?.() ? userSession?.loadUserData?.() : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    accountNames: null,
    loading: false,
  },
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },
    setAccountNames(state, action) {
      state.accountNames = action.payload;
    },
  },
});

export const {setAuthUser, setAuthLoading, setAccountNames} = authSlice.actions;

export const userSelector = state => state.auth.user;
export const authLoadingSelector = state => state.auth.loading;
export const accountNamesSelector = state => state.auth.accountNames;

export default authSlice.reducer;
