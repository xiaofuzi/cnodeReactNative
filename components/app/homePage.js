import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import Router from './routes.js';
import TopicComponent from './topic/topic.js';
import DetailTopicComponent from './topic/detailTopic.js';

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        padding: 15,
    },
    containView:{
        flex: 1,
        justifyContent: 'center',
    },
    blackText:{
        fontSize:20,
        textAlign:'center',
    },
    navBar: {
        backgroundColor: '#ffffff'
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 10
    },
    navBarTitleText: {
        color: '#373E4D',
        fontWeight: '500',
        marginVertical: 9,
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        color: '#5890FF',
    }
});


const NavigationBarRouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        if (index === 0) {
            return null;
        } 

        let previousRoute = navState.routeStack[index-1];
        return (
          <TouchableOpacity
            onPress={()=>navigator.pop()}
            style={styles.navBarLeftButton}>
            <Icon
              name='ios-arrow-back'
              size={30}
              style={{marginTop: 8}}
            />
          </TouchableOpacity>
        )
    },
    Title: function (route, navigator, index, navState) {
        return (
           <Text style={[styles.navBarText, styles.navBarTitleText]}>
             {route.title}
           </Text>
         );
    },
    RightButton: function (route, navigator, index, navState) {
        if (true) {
           return null;
         }
         return (
           <TouchableOpacity
             onPress={() => navigator.push({id:'detail',title:'Detail'})}
             style={styles.navBarRightButton}>
             <Text style={[styles.navBarText, styles.navBarButtonText]}>
               Next
             </Text>
           </TouchableOpacity>
         );
    }
};

class HomePage extends Component {
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

    renderIOS () {
        return (
            <Navigator 
                style={styles.navigator}
                initialRoute={{
                    id: 'home',
                    title: '首页'
                }}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navBar}
                    />
                }
            />
            )
    }

    renderScene = (route, navigator) => {
        let data = this.props.topicData || {};
        switch (route.id) {
            case 'home':
                return (<TopicComponent data={data} fetchData={this.fetchData} navigator={navigator} title="首页" />)
                break;
            case 'topic':
              return (<DetailTopicComponent detailData={route.detailData} />)
        }

        return null;
    }

    render () {
        return (
            <View style={styles.container}>
                {
                    (()=>{
                        if (isIOS()) {
                            return this.renderIOS();
                        }else {

                        }
                    })()
                }
            </View>
            )
    }
}

export default connect((state)=>{
    return {...state}
})(HomePage);