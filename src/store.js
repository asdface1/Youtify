import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './Reducers';

const middleware = [promise(), thunk];
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
   middleware = [ ...middleware, logger() ];
}

export default createStore(
  reducer,
  {},
  applyMiddleware(...middleware)
);
