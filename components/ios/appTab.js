import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS
} from 'react-native';

import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Router from '../app/routes.js';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const TabBarNames = ['首页', '消息', '个人'];

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * 1.home 2.message 3.personal
             */
            selectedTab: TabBarNames[0]
        }
    }

    render () {
        let {
            selectedTab
        } = this.state;
        return (
            <TabBarIOS selectedTab={selectedTab}>
                <Icon.TabBarItemIOS
                    title={TabBarNames[0]}
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    selected={selectedTab === TabBarNames[0]}
                    onPress={()=>{
                        this.setState({
                            selectedTab: TabBarNames[0]
                        })
                    }}>
                    <Router param={{id: 'home', title: '首页'}} {...this.props}/>
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title={TabBarNames[1]}
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    selected={selectedTab === TabBarNames[1]}
                    onPress={()=>{
                        this.setState({
                            selectedTab: TabBarNames[1]
                        })
                    }}>
                    <Router param={{id: 'home', title: '首页'}} {...this.props}/>
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    title={TabBarNames[2]}
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    selected={selectedTab === TabBarNames[2]}
                    onPress={()=>{
                        this.setState({
                            selectedTab: TabBarNames[2]
                        })
                    }}>
                    <Router param={{id: 'me', title: '个人'}} {...this.props}/>
                </Icon.TabBarItemIOS>
            </TabBarIOS>
            )
    }
}

export default connect((state)=>{
    return {...state};
})(App)

