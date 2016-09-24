/**
 * Action types
 */
import {
    FETCH_TOPIC,
    FETCH_GOOD_TOPIC,
    FETCH_SHARE_TOPIC,
    FETCH_JOB_TOPIC
} from '../constants';

import {
    ajaxFetch
} from '../utils.js';

const ajaxUrl = 'https://cnodejs.org/api/v1/';
/**
 * Action creator
 */
export function fetchTopic (topic=[], status='success') {
    return {
        type: FETCH_TOPIC,
        status: status,
        data: topic
    }
}

export function fetchGoodTopic (topic=[], status='success') {
    return {
        type: FETCH_GOOD_TOPIC,
        status: status,
        data: topic
    }
}

export function fetchShareTopic (topic=[], status='success') {
    return {
        type: FETCH_SHARE_TOPIC,
        status: status,
        data: topic
    }
}

export function fetchJobTopic (topic=[], status='success') {
    return {
        type: FETCH_JOB_TOPIC,
        status: status,
        data: topic
    }
}

/**
 * topic types: ['全部', '精华', '分享', '招聘']
 */
export function fetchTopics (params={}, type='') {
    return async function (dispatch, getState) {
        let fetchTopicMethod = null;
        switch (type) {
            case 'good':
                fetchTopicMethod = fetchGoodTopic;
                break;
            case 'share':
                fetchTopicMethod = fetchShareTopic;
                break;
            case 'job':
                fetchTopicMethod = fetchJobTopic;
                break;
            default:
                fetchTopicMethod = fetchTopic;
        }
        //start request
        dispatch(fetchTopicMethod({}, 'fetching'));
        try {
            let defaultParam = {
                page: 1,
                limit: 10,
                mdrender: true
            };

            let res = await ajaxFetch(ajaxUrl + 'topics', {
                data: {
                    ...defaultParam,
                    ...params
                }
            })
            console.log('actions');
            if (res&&res.success) {
                let _arr = [];
                let data = res.data;

                dispatch(fetchTopicMethod(data, 'success'));
            } else {
                dispatch(fetchTopicMethod({}, 'error'));
            }
        } catch (e) {
            console.error('fetchTopics error: ', e);
            dispatch(fetchTopicMethod({}, 'error'));
        }
    }
}