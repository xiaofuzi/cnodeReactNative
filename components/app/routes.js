import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

/**
 * app components
 */
import HomePageComponent from './homePage.js';
import MessagePageComponent from './homePage.js';
import PersonalPageComponent from './homePage.js';
import TopicComponent from './topic/topic.js';

const styles = StyleSheet.create({
   container: {
     flex: 1,
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
  backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
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
  },

 });

const NavigationBarRouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        console.log('left button');
        if (index === 0) {
            return null;
        } 

        // let previousRoute = navState.routeStack[index-1];
        // return (
        //   <TouchableOpacity
        //     onPress={()=>navigator.pop()}
        //     style={styles.navBarLeftButton}>
        //     <Text style={[styles.navBarText, styles.navBarButtonText]}>
        //       {previousRoute.title}
        //     </Text>
        //   </TouchableOpacity>
        // )
    },
    title: function (route, navigator, index, navState) {
        return (
           <Text style={[styles.navBarText, styles.navBarTitleText]}>
             {route.title}
           </Text>
         );
    },
    RightButton: function (route, navigator, index, navState) {
        if (route.id === 'detail') {
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


const routes = {
    navigator(initialRoute, param={}){
        return (
            <Navigator
                initialRoute={{id: initialRoute, param}}
                renderScene={routes.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navBar}
                    />
                }
            />
        )
    },
    _tabBarRoute (routeName) {
        let tab = {
            tabName: 'home',
            iconName: 'ios-home'
        };
        switch (routeName) {
            case 'home':
                tab = {
                    tabName: 'home',
                    iconName: 'ios-home'
                };
                break;
            case 'message':
                tab = {
                    tabName: 'message',
                    iconName: 'ios-home'
                };
                break;
            case 'me':
                tab = {
                    tabName: 'me',
                    iconName: 'ios-home'
                };
                break;
        }
        return tab;
    },
    renderScene (route, navigator) {
        switch (route.id) {
            case 'topic':
                return <TopicComponent data={route.param} navigator={navigator} />
        }

        return null;
    }
}

export default routes;