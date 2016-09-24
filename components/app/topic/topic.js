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
    RefreshControl
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
        paddingBottom: 65,
        backgroundColor: '#ffffff'
    },
    listViewContainer: {
        flex: 1
    },
    emptyContainer: {
        alignItems: 'center'
    },
    scrollableTabView: {
    },
    imageContainer: {
        width: 45,
        height: 75,
        marginRight: 10
    },
    title: {
        fontSize: 18,
        color: '#656565',
        fontWeight: 'bold',
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    descContainer: {
        flex: 1
    },
    thumb: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 5,
        backgroundColor: '#eee'
    },
    text: {
        fontSize: 18,
        color: '#656565'
    },
    contentContainer: {
        flex: 1,
        paddingTop: 10
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 5,
        marginBottom: 3,
        backgroundColor: '#ffffff'
    }
});

/**
 * min and max list number
 */
const MIN_LIST = 10;
const MAX_LIST = 100;

/**
 * topic types
 */
const topicTypes = ['all', 'good', 'share', 'job'];

export default class TopicComponent extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        fetchData: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            dataSource: [],
            hasTopic: false,
            isLoading: false,
            hasRenderList: false,
            /**
             * 上拉刷新(true)或下拉刷新(false)
             */
            isTopRefresh: null,
            currentTabName: 'all',
            currentStoreTabKey: 'topics',
            currentTabData: {},
            tabData: {},
            /**
             * tab page state
             */
            tabParams: {
                all: {
                    pageNum: 1
                },
                good: {
                    pageNum: 1
                },
                share: {
                    pageNum: 1
                },
                job: {
                    pageNum: 1
                }
            },
            //for testing
            count: 1
        }
    }

    /**
     * instance property
     * 组件当前已加载数据并渲染的数据
     */
    topicListData = {
        [topicTypes[0]]: {
            pageNum: 1,
            list: []
        },
        [topicTypes[1]]: {
            pageNum: 1,
            list: []
        },
        [topicTypes[2]]: {
            pageNum: 1,
            list: []
        },
        [topicTypes[3]]: {
            pageNum: 1,
            list: []
        }
    }

    dataSource = new ListView.DataSource({
            rowHasChanged : (r1, r2)=>r1.id != r2.id
        });

    /**
     * @private
     * data init
     */
    initRowData (data) {
        let dataSource = new ListView.DataSource(
            {rowHasChanged : (r1, r2)=>r1.id != r2.id}
            );
        let topicData, hasTopic = false;
        if (data.status === 'success') {

            topicData = data.data;  
            hasTopic = true;      
        }else {
            topicData = [];
        }
        this.setState({
            dataSource: dataSource.cloneWithRows(topicData),
            hasTopic,
            topicData,
            currentTabData: data,
            hasRenderList: true,
            isLoading: data.status === 'fetching' ? true : false
        });
        console.log('state: ', this.state);
    }

    componentDidMount () {
    }

    componentWillUnmount () {
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data) {
            let fetchData = nextProps.data;
            let currentStoreTabKey = this.state.currentStoreTabKey;

            let newData = [];
            if (this.state.isTopRefresh === true && fetchData[currentStoreTabKey][0] && this.state.currentTabData[0]) {
                let firstTopicId = fetchData[currentStoreTabKey][0].id;
                let currentFirstTopicId = this.state.currentTabData[0].id;

                if (firstTopicId&&currentFirstTopicId&&firstTopicId!=currentFirstTopicId) {
                    newData = newData.concat(fetchData[currentStoreTabKey].data, this.state.currentTabData.data);
                }

                fetchData[currentStoreTabKey].data = newData;
                console.log('----------------',this.state.currentTabName, newData);
            } else if (this.state.isTopRefresh === false && this.state.currentTabData.length >= MIN_LIST) {
                newData = newData.concat(this.state.currentTabData.data, fetchData[currentStoreTabKey].data);
                fetchData[currentStoreTabKey].data = newData;
                console.log('----------------',this.state.currentTabName, newData);
            }

            console.log('currentTabData: ', this.state.currentTabData, newData);
            console.log('nextProps: ',nextProps.data, this.state);
            this.setState({
                tabData: fetchData,
                isTopRefresh: null,
                count: this.state.count + 1
            })
            this.initRowData(fetchData[currentStoreTabKey]);
        }
    }

    /**
     * events method
     */
    onChangeTab = (tab) => {
        let type = 'all', tabData = 'topics';
        switch (tab.i) {
            case 1:
                type = 'good';
                tabData = 'goodTopics';
                break;
            case 2:
                type = 'share';
                tabData = 'shareTopics';
                break;
            case 3:
                type = 'job';
                tabData = 'jobTopics';
        }
        this.setState({
            currentTabName: type,
            currentTabData: this.state.tabData[tabData],
            currentStoreTabKey: tabData
        })
        this.initRowData(this.state.tabData[tabData]);
    }

    rowPress = (id, sid, row) => {
        let data = this.state.currentTabData.data[row];
        this.props.navigator.push({
            title: "文章",
            id: 'topic',
            detailData: data
        })
    }

    renderRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={()=>{
                    this.rowPress(rowData.id, sectionID, rowID)
                }}>
                <View>
                    <View style={styles.separator} />
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{uri:rowData.author.avatar_url}} />
                        <View style={styles.contentContainer}>
                            <Text numberOfLines={1} style={styles.title}>{rowData.title}</Text>
                            <Text numberOfLines={1} style={styles.author}>{rowData.author.loginname}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            )
    }

    /**
     * Loading animation
     */
    renderLoading () {
        return this.state.isLoading ? (<ActivityIndicator size='large'/>) : (<View/>);
    }

    /**
     * @private
     * top refreshing
     */
    
    _onRefresh = () => {
        this.props.fetchData(this.state.currentTabName);
    }

    /**
     * @private
     * bottom refreshing
     */
    _onEndReached = () => {
        /**
         * 大于100或小于20的情况不再请求数据
         */
        let listData = this.state.currentTabData.data;
        let length = listData.length;
        let type = this.state.currentTabName;

        let tabParams = this.state.tabParams;
        let pageNum = ++tabParams[type]['pageNum'];
        this.setState({
            tabParams: tabParams
        })
        
        this.setState({isTopRefresh: false}, ()=>{
            if (length >= MIN_LIST && length <= MAX_LIST) {
                this.props.fetchData(type, {tab: type, page: pageNum});
            } 
        });
    }

    render () {
        if (!this.state.hasTopic && !this.state.isLoading && !this.state.hasRenderList) {
            return (<View style={[styles.container,styles.emptyContainer]}>
                <Text style={styles.text}>暂无数据!</Text>
            </View>)
        } 
        return(
            <View style={styles.container}>
                <View style={styles.separator} />
                <ScrollableTabView
                    style={styles.scrollableTabView}
                    tabBarUnderlineStyle={{ backgroundColor: '#80bd01'}}
                    tabBarActiveTextColor='#80bd01'
                    tabBarInactiveTextColor='#999'
                    renderTabBar={() => <DefaultTabBar />}
                    onChangeTab={this.onChangeTab}>
                    <ListView
                        enableEmptySections={true}
                        tabLabel='全部'
                        style={styles.listViewContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow} 
                        refreshControl={
                              <RefreshControl
                                refreshing={this.state.isLoading}
                                onRefresh={this._onRefresh}
                                tintColor="#eee"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                              />
                        }
                        onEndReachedThreshold={100}
                        onEndReached={this._onEndReached}
                        />
                    <ListView
                        enableEmptySections={true}
                        tabLabel='精华'
                        style={styles.listViewContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow} />
                    <ListView
                        enableEmptySections={true}
                        tabLabel='分享'
                        style={styles.listViewContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow} />
                    <ListView
                        enableEmptySections={true}
                        tabLabel='招聘'
                        style={styles.listViewContainer}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow} />
                </ScrollableTabView>
                {
                    (()=>{
                        if (this.state.isLoading&&!this.state.hasRenderList) {
                            return (
                                <View style={styles.container}>
                                    { this.renderLoading() }
                                </View>
                            )
                        }
                    })()
                }
            </View>
            )
    }
}