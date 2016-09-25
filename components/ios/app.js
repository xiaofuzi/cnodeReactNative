import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import HomePage from '../app/homePage.js';
//import MessagePage from '../app/messagePage.js';
import PersonalPage from '../app/personalPage.js';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const TabBarNames = ['首页', '消息', '个人'];

export default class App extends Component {
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
                    <HomePage style={styles.container} />
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
                    <HomePage />
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
                    <PersonalPage />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
            )
    }
}


