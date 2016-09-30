import React, { Component, PropTypes } from 'react';
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

import HomeComponent from './homePage.js';
import PersonalComponent from './personalPage.js';
import DetailTopicComponent from './topic/webTopicDetail.js';
import AppTabComponent from '../ios/appTab.js';

import { isIOS } from '../utils.js';
/**
 * actions
 */
import { fetchTopics } from '../actions/topicAction.js';


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
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
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
    navBarLeftView: {
        flexDirection: 'row'
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


function NavigationBarRouteMapper (ctx) {
    let routeParams = ctx.state.routeParams;
    return {
        LeftButton: function (route, navigator, index, navState) {
            if (index === 0) {
                return null;
            } 

            let previousRoute = navState.routeStack[index-1];
            if (route.id == 'topic') {
                let navBack = function () {
                    ctx.webView.goBack();
                }
                return (
                    <View style={styles.navBarLeftView}>
                        <TouchableOpacity
                            onPress={()=>{
                                if (routeParams.topicRouter.canGoBack) {
                                    navBack();
                                }else {
                                    navigator.pop()
                                }
                            }}
                            style={styles.navBarLeftButton}>
                            <Icon
                              name='ios-arrow-back'
                              size={30}
                              style={{marginTop: 2}}
                            />
                          </TouchableOpacity>
                        {
                            (()=>{
                                if (routeParams.topicRouter.canGoBack) {
                                    return (
                                        <TouchableOpacity
                                            onPress={()=>navigator.pop()}
                                            style={[styles.navBarLeftButton]}>
                                            <Text
                                              style={[styles.navBarText, styles.navBarTitleText,{marginTop: 8}]}>
                                              关闭
                                            </Text>
                                          </TouchableOpacity>
                                    )
                                }
                            })()
                        }
                    </View>
                    )
            }
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
}

class Router extends Component {
    static propTypes = {
        param: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            routeParams: {
                topicRouter: {}
            }
        }
    }

    /**
     * current webView
     */
    webView = {}

    /**
     * topic route callback
     */
    topicRouterCb = (param, webView) => {
        console.log('topicRouterCb param:', param);
        this.setState({
            routeParams: {
                topicRouter: param
            }
        })
        this.webView = webView;
    }

    render () {
        return (
            <View style={styles.container}>
                <Navigator 
                    style={styles.navigator}
                    initialRoute={this.props.param}
                    renderScene={this.renderScene}
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={NavigationBarRouteMapper(this)}
                            style={styles.navBar}
                        />
                    }
                    tabParam={this.tabRoute(this.props.param)}
                />
            </View>
            )
    }

    renderScene = (route, navigator) => {
        switch (route.id) {
            case 'home':
                return (<HomeComponent {...this.props} navigator={navigator}/>)
                break;
            case 'topic':
              return (<DetailTopicComponent onWebNavChange={(e, webView)=>{
                          this.topicRouterCb(e, webView)
                        }} detailData={route.detailData} />)
            case 'me':
                return (
                    <PersonalComponent {...this.props} navigator={navigator}/>
                )
        }

        return null;
    }

    tabRoute = (initialRoute) => {
        let tab = {tabName: 'home', iconName: 'ios-home'};
        switch (initialRoute.tabName) {
          case 'home':
            tab = {tabName: '首页', iconName: 'ios-home'};
            break;
          case 'me':
            tab = {tabName: '个人', iconName: 'ios-person'};
            break;
        }

        return tab;
    }
}

export default Router;

