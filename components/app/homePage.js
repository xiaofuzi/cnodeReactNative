import React, { Component } from 'react';
import Icon from'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  NavigatorIOS,
  TabBarIOS,
  Platform,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import TopicComponent from './topic/topic.js';

/**
 * actions
 */
import { fetchTopics } from '../actions/topicAction.js';

/**
 * helper method
 */
function isIOS () {
    return Platform.OS === 'ios';
}

export default class HomePage extends Component {
    constructor (props) {
        super(props);

        this.fetchData();
        this.fetchData('good');
        this.fetchData('share');
        this.fetchData('job');
    }

    /**
     * fetch datas
     */
    fetchData = (type, param={}) => {
        let tab = 'all';
        if (type === 'all' || !type) {
            tab = 'all';
        } else {
            tab = type;
        }
        param['tab'] = tab;
        let { dispatch } = this.props;
        dispatch(fetchTopics(param, type));
    }

    componentWillReceiveProps (nextProps) {
        console.log('nextProps: ', nextProps);
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <TopicComponent data={this.props.topicData} fetchData={this.fetchData} navigator={this.props.navigator}/>
            </View>
            )
    }
}
