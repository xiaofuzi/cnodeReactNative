import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Navigator,
  Alert,
  WebView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import LoginComponent from './user/loginComponent.js';

const ICON_SIZE = 24;
const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    backgroundColor: '#F0EFF5',
    flex: 1,
  },
  userTouch: {
    marginTop: 10,
  },
  user: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EDECF1',
  },
  avatar: {
    backgroundColor: '#eee',
    borderRadius: 2,
    width: 48,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  nameInfo: {
    flexDirection: 'column',
    marginLeft: 8,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 17,
  },
  arrow: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 10
  },
  settings: {
    height: 44,
  },
  loginState: {
    marginRight: 5,
  }
});

class PersonalPageComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {
          isLogined: false,
          loginInfo: {}
        }
    }

    componentWillReceiveProps (nextProps) {
        console.log('me', nextProps)
        if (nextProps.userData.loginInfo.success) {
            this.setState({
                isLogined: true,
                loginInfo: nextProps.userData.loginInfo
            })
        }
    }

    render () {
        let top = 64;
        let stateColor = 'green';

        if (!this.state.isLogined) {
            return (
                    <View
                    style={[styles.container, {marginTop: top}]}
                    >
                    <LoginComponent {...this.props} />
                    </View>)
        }
        return (
            <ScrollView
                style={[styles.container, {marginTop: top}]}
                >
                <TouchableHighlight
                  underlayColor={'gray'}
                  style={styles.userTouch}
                  onPress={() => this.props.navigator.push({id: 'user', obj: user})}>
                  <View style={styles.user}>
                    <Image
                      source={{uri: this.state.loginInfo.avatar_url}}
                      style={styles.avatar}
                      />
                    <View style={styles.nameInfo}>
                      <Text style={styles.name}>
                        {this.state.loginInfo.username}
                      </Text>
                    </View>
                    <Text
                      style={[styles.loginState, {color: stateColor}]}
                      onPress={this.pressLogin}>
                    </Text>
                    <Icon
                      name='ios-arrow-forward'
                      size={24}
                      />
                    </View>
                </TouchableHighlight>
              </ScrollView>
            )
    }
}

export default PersonalPageComponent;