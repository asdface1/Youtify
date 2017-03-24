import { combineReducers } from 'redux';

import user from './UserReducer';
import video from './VideoReducer';
import youtube from './YoutubeReducer';

export default combineReducers({
  user,
  video,
  youtube
});
