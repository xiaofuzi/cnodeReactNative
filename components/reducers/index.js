import { combineReducers } from 'redux';

import topicReducer from './topicReducer';

const App = combineReducers({
    topicData: topicReducer
})

export default App;