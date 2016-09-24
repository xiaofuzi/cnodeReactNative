import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import rootReducer from '../reducers';

function configureStore (initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
                applyMiddleware(
                    thunk
                )
            )
        );
}

const store = configureStore();
//persistStore(store, {storage: AsyncStorage});

let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
if (isDebuggingInChrome) {
    window.store = store;
  }
export default store;