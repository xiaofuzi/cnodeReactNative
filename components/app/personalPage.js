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

const ICON_SIZE = 24;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFF5',
    flex: 1,
  },
  userTouch: {
    marginTop: 20,
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
    }

    render () {
        let top = 65;
        let stateColor = 'green';
        return (
            <ScrollView
                style={[styles.container, {marginTop: top}]}
                automaticallyAdjustContentInsets={false}
                contentInset={{top: 64, left: 0, bottom: 49, right: 0}}
                contentOffset={{x:0, y:-64}}
                >
                <TouchableHighlight
                  underlayColor={'gray'}
                  style={styles.userTouch}
                  onPress={() => this.props.navigator.push({id: 'user', obj: user})}>
                  <View style={styles.user}>
                    <Image
                      source={{uri: 'https://avatars.githubusercontent.com/u/1147375?v=3&s=120'}}
                      style={styles.avatar}
                      />
                    <View style={styles.nameInfo}>
                      <Text style={styles.name}>
                        username
                      </Text>
                    </View>
                    <Text
                      style={[styles.loginState, {color: stateColor}]}
                      onPress={this.pressLogin}>
                      stateText
                    </Text>
                    <Icon
                      name='ios-arrow-forward'
                      size={24}
                      />
                    </View>
                </TouchableHighlight>
                <WebView style={{height: 500}} source={{uri: 'https://cnodejs.org/topic/57e38981c1760d1f0e4d698e'}}/>
              </ScrollView>
            )
    }
}

export default PersonalPageComponent;