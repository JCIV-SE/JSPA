import { combineReducers } from 'redux';
import jobSearchReducer from './jobSearchReducer';

const reducers = combineReducers({
  jobSearch: jobSearchReducer
});

export default reducers;
