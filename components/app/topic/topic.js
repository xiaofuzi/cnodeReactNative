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

import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
        paddingBottom: 48,
        backgroundColor: '#ffffff'
    },
    listViewContainer: {
        flex: 1
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center'
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
const topicKeys = ['topics', 'goodTopics', 'shareTopics', 'jobTopics'];

export default class TopicComponent extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        fetchData: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            isLoading: false,
            hasTopic: false,
            currentTabName: 'all',                      //当前tab分类名
            currentStoreTabKey: 'topics'                //当前tab在store中对应的key
        }
    }

    /**
     * instance property
     * 组件当前已加载数据并渲染的数据
     */
    topicListData = {}
    topicListDataParam = {
        [topicTypes[0]]: {
            pageNum: 1
        },
        [topicTypes[1]]: {
            pageNum: 1
        },
        [topicTypes[2]]: {
            pageNum: 1
        },
        [topicTypes[3]]: {
            pageNum: 1
        }
    }

    /**
     * 状态控制变量
     */
    status = {
        hasRenderList: false,                       //首次接收到列表数据
        isTopRefresh: null
    }

    dataSource = new ListView.DataSource({
            rowHasChanged : (r1, r2)=>r1.id != r2.id
        });

    /**
     * @private
     * data init
     */
    initListData (props) {
        let topicData, hasTopic = false;

        topicData = this.topicListData[this.state.currentStoreTabKey].data;
        if (topicData[0]) {
            hasTopic = true;
        }
        this.setState({
            dataSource: this.dataSource.cloneWithRows(topicData),
            hasTopic
        });
    }

    /**
     * 更新列表数据
     * @param {boolean} top or bottom 
     * @param {object} topic store
     */
    updateListData (bool, listData) {
        let tabKey = this.state.currentStoreTabKey;
        let tabData = [];

        console.log('listData', listData, tabKey);
        if (!listData[tabKey].data.length) return ;

        /**
         * prepend data
         */
        if (bool) {
            tabData = listData[tabKey].data;
            this.topicListData[tabKey] = listData[tabKey];
            console.log('prependData: ', tabData);
        }else {
            /**
             * append data
             */
            tabData = this.topicListData[tabKey].data.concat(listData[tabKey].data);
            this.topicListData[tabKey].data = tabData;
            console.log('append data: ', this.topicListDataParam, tabData);
        }
        this.status.isTopRefresh = null;
        this.setState({
            dataSource: this.dataSource.cloneWithRows(tabData)
        });
    }

    /**
     * 下拉刷新数据
     */
    prependData () {
        let type = this.state.currentTabName;
        this.props.fetchData(type, {tab: type, page: 1});
    }

    /**
     * 滚动加载数据
     */
    appendData () {
        let type = this.state.currentTabName;
        let pageNum = this.topicListDataParam[this.state.currentTabName].pageNum + 1;
        this.topicListDataParam[this.state.currentTabName].pageNum = pageNum;
        this.props.fetchData(type, {tab: type, page: pageNum});
    }

    clearData () {

    }

    /**
     * 是否在请求当前列表数据
     */
    isFetchingData (data) {
        let isLoading = false;
        if (data&&data[this.state.currentStoreTabKey].status === 'fetching') {
            isLoading = true;
        }
        this.setState({isLoading: isLoading});
    }

    /**
     * @private
     * top refreshing
     */
    
    _onRefresh = () => {
        this.status.isTopRefresh = true;
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
        if (this.state.isLoading) {
            return ;
        }

        let listData = this.topicListData[this.state.currentStoreTabKey].data;
        let length = listData.length;
        let type = this.state.currentTabName;
        if (length < MIN_LIST || length > MAX_LIST) {
            console.warn('the list length is ' + length + '!');
            return ;
        }
        this.status.isTopRefresh = false;
        this.appendData();
    }

    componentDidMount () {
    }

    componentWillReceiveProps (nextProps) {
        /**
         * 成功加载topics数据
         */
        if (!this.status.hasRenderList&&nextProps.data[topicKeys[0]].data.length) {
            this.topicListData = nextProps.data;
            this.initListData(nextProps);
        }
        /**
         * 首次加载完所有类型的数据数据
         */
        if (!this.status.hasRenderList
            &&nextProps.data[topicKeys[0]].data.length
            &&nextProps.data[topicKeys[1]].data.length
            &&nextProps.data[topicKeys[2]].data.length
            &&nextProps.data[topicKeys[3]].data.length) {
            this.status.hasRenderList = true;
            this.topicListData = nextProps.data;
        }  

        this.isFetchingData(nextProps.data); 
        if (nextProps.data) {
            if (this.status.isTopRefresh === true) {
                this.updateListData(true, nextProps.data);
            } else if(this.status.isTopRefresh === false&&this.state.hasTopic&&this.status.hasRenderList) {
                this.updateListData(false, nextProps.data);                
            }
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
            currentStoreTabKey: tabData,
            dataSource: this.dataSource.cloneWithRows(this.topicListData[tabData].data)
        })
    }

    rowPress = (id, sid, row) => {
        let data = this.topicListData[this.state.currentStoreTabKey].data[row];
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
                            <Text numberOfLines={1} style={styles.author}>{rowData.author.loginname + ' 浏览' + rowData.visit_count + '次'}</Text>
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
        return this.state.isLoading ? (<ActivityIndicator style={{height: 60}} size='small'/>) : (<View/>);
    }

    render () {
        console.log(this.state.isLoading, this.status.hasRenderList)
        if (!this.state.hasTopic&&!this.state.isLoading) {
            return (<View style={[styles.container,styles.emptyContainer]}>
                <Text style={styles.text}>暂无数据!</Text>
            </View>)
        } 

        if (this.state.isLoading&&this.status.isTopRefresh==null) {
            return (
                <View style={styles.container}>
                    {this.renderLoading()}
                </View>
                )
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
                        onEndReachedThreshold={50}
                        onEndReached={this._onEndReached}
                        />
                    <ListView
                        enableEmptySections={true}
                        tabLabel='精华'
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
                        onEndReachedThreshold={50}
                        onEndReached={this._onEndReached}
                        />
                    <ListView
                        enableEmptySections={true}
                        tabLabel='分享'
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
                        onEndReachedThreshold={50}
                        onEndReached={this._onEndReached}
                        />
                    <ListView
                        enableEmptySections={true}
                        tabLabel='招聘'
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
                        onEndReachedThreshold={50}
                        onEndReached={this._onEndReached}
                        />
                </ScrollableTabView>
                {
                    (()=>{
                        if (this.state.isLoading) {
                            return this.renderLoading();
                        }
                    })()
                }
            </View>
            )
    }
}