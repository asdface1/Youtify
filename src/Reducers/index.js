import { combineReducers } from 'redux';

import user from './UserReducer';
import video from './VideoReducer';

export default combineReducers({
  user,
  video
});
