import { combineReducers } from 'redux';

import user from './UserReducer';
import app from './AppReducer';

export default combineReducers({
  user,
  app
});
