import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  StyleSheet
} from 'react-native';

/**
 * redux
 */
import store from '../store/configureStore.js';

import AppComponent from './appTab.js';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class IndexApp extends Component {
    

    render () {
        return (
            <Provider store={store}>
                <AppComponent />
            </Provider>
            )
    }
}


