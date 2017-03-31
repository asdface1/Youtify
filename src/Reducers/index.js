import { combineReducers } from 'redux';

import app from './AppReducer';
import user from './UserReducer';
import video from './VideoReducer';
import youtube from './YoutubeReducer';

export default combineReducers({
  app,
  user,
  video,
  youtube
});
