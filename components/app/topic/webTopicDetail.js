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
        marginTop: 64,
        marginBottom: 48
    }
});

const URL_PRE = 'https://cnodejs.org/topic/';
const WEB_VIEW = 'WEB_VIEW';

const topicPageRenderJS = `
    ;(function topicRender(){
        if (window.location.href.indexOf('https://cnodejs.org/topic/') == 0) {
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
                console.log(e)
            }
        }
    })();
`;
export default class extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isAUrl: false,
            url: '',
            backAble: false,
            forwardAble: false
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
        if (data) {
            this.setState({
                url: URL_PRE + data.id,
                isAUrl: true
            });
        }
    }

    onNavigationStateChange = (e) => {
        console.log('onNavigationStateChange', e)
        this.props.onWebNavChange(e, this);
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

    goBack = () => {
        this.refs[WEB_VIEW].goBack();
    }

    renderLoading = () => {
        if (Platform.OS === 'android') {
          return (
            <View style={styles.container}>
              <ProgressBarAndroid styleAttr="Inverse" style='small'/>
            </View>
          )
        } else if (Platform.OS === 'ios') {
          return (
            <View style={styles.container}>
              <ActivityIndicator size="small" />
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
                    ref={WEB_VIEW} 
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    injectedJavaScript={topicPageRenderJS}
                    automaticallyAdjustContentInsets={false}
                    renderLoading={this.renderLoading}
                    renderError={this.renderError}
                    onNavigationStateChange={this.onNavigationStateChange}
                    javaScriptEnabled={true}
                    startInLoadingState={true}
                    contentInset={{top:0, left:0, bottom: 0, right: 0}}
                    ></WebView>
            </View>
            )
    }
}