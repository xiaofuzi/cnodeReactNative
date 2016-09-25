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
    WebView
} from 'react-native';

import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 65,
        paddingBottom: 65,
        backgroundColor: '#ffffff'
    },
    headerContainer: {
        //height: 100
    },
    webViewStyle: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    separator: {
        height: 3,
        backgroundColor: '#eee'
    },
    topicCategory: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    bodyContainer: {
        flex: 1
    },
    typeButton: {
        backgroundColor: '#80bd01',
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    typeButtonText: {
        color: '#ffffff'
    },
    label: {
        padding: 5,
        borderRadius: 3
    }
});


export default class DetailTopic extends Component {
    constructor (props) {
        super(props);
    }

    static propTypes = {
        detailData: PropTypes.object.isRequired
    }

    renderHeader (topic) {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.separator}></View>
                <View>
                    <Text style={styles.title}>
                        {topic.title}
                    </Text>
                </View>
                <View style={styles.topicCategory}>
                    <TouchableHighlight style={styles.typeButton}
                        underlayColor='#eee'>
                        <Text style={[styles.typeButtonText, styles.label]}>{topic.tab}</Text>
                    </TouchableHighlight>
                    <Text style={styles.label}>
                        {
                            (()=>{
                               return topic.author.loginname + ' 发布于 ' + moment(topic.create_at).format('YYYY-MM-DD');
                            })()
                        }
                    </Text>
                    <Text style={styles.label}>浏览 {topic.visit_count} 次</Text>
                </View>
                 <View style={styles.separator}></View>
           </View>
            )
    }

    render () {
        let topic = this.props.detailData;
        if (!topic) {
            return (<View />)
        }
        return (
            <View style={styles.container}>
                { this.renderHeader(topic) }
                <WebView
                    style={styles.webViewStyle}
                    source={{html: topic.content}}></WebView>
            </View>
        )
    }
}