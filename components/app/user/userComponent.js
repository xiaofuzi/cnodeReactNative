import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    NavigatorIOS,
    ListView,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import moment from 'moment';

export default UserComponent extends Component {
    constructor (props) {
        super(props);
    }

    renderHeader () {
        return (
            <View style={styles.userHeader}>
                <Image source={{uri: this.state.userInfo.avatar_url}}/>
                <View style={styles.userInfo}>
                    <Text>用户名</Text>
                    <Text>积分</Text>
                </View>
            </View>
            )
    }

    render () {
        return ()
    }
}