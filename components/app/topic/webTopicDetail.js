import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    WebView,
    ActivityIndicator,
    ProgressBarAndroid,
    Platform
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    webView: {
        flex: 1,
        marginTop: 65,
        marginBottom: 48
    }
});

const URL_PRE = 'https://cnodejs.org/topic/';

const topicPageRenderJS = `
    ;(function topicRender(){
        try {
            [].slice.call(document.querySelectorAll('body > div')).forEach(function(el){
                el.style.display = 'none';
            });
            document.querySelector('#main').style.display = 'block';
            [].slice.call(document.querySelectorAll('#main > div')).forEach(function(el){
                el.style.display = 'none';
            });
            document.querySelector('#content').style.display = 'block';
            document.querySelector('#content').style.marginRight = '0px';
            document.querySelector('#main').style.display = 'block';
            [].slice.call(document.querySelectorAll('#content > div')).forEach(function(el, index){
                if (index) {
                    el.style.display = 'none';
                }
            });
        } catch (e) {
            alert(e)
        }
    })();
`;
export default class extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isAUrl: false,
            url: ''
        }
    }

    static propTypes = {
        detailData: PropTypes.object.isRequired
    }

    status = {
        isTopicAdress: false
    }

    /**
     * update url 
     */
    updateUrlParams (data) {
        console.log(data)
        if (data) {
            this.setState({
                url: URL_PRE + data.id,
                isAUrl: true
            });
        }
    }

    componentDidMount () {
        this.updateUrlParams(this.props.detailData);
    }

    componentWillReceiveProps (nextProps) {
        console.log('receiver prop')
        if (nextProps.detailData) {
            this.updateUrlParams(nextProps.detailData);
        }
    }

    renderLoading = () => {
        if (Platform.OS === 'android') {
          return (
            <View style={styles.container}>
              <ProgressBarAndroid styleAttr="Inverse" style='Large'/>
            </View>
          )
        } else if (Platform.OS === 'ios') {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="large" />
            </View>
          );
        }
      }
    
    renderError = () => {
        return (
            <View style={styles.container}>
                <Text>There are something wrong!</Text>
            </View>
          );
    }

    render () {
        if (!this.state.isAUrl) {
            return (<View></View>)
        }

        return (
            <View style={styles.container}>
                <WebView 
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    injectedJavaScript={topicPageRenderJS}
                    automaticallyAdjustContentInsets={false}
                    renderLoading={this.renderLoading}
                    renderError={this.renderError}
                    javaScriptEnabled={true}
                    startInLoadingState={true}
                    ></WebView>
            </View>
            )
    }
}