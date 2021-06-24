import {combineReducers, configureStore} from '@reduxjs/toolkit';

import auth from './auth';

export const reducer = combineReducers({
  auth,
});

export default configureStore({
  reducer,
});
