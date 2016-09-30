import { combineReducers } from 'redux';

import topicReducer from './topicReducer';
import userReducer from './userReducer.js';

const App = combineReducers({
    topicData: topicReducer,
    userData: userReducer
})

export default App;