/**
 * topic constants
 */

//types
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const FETCH_GOOD_TOPIC = 'FETCH_GOOD_TOPIC';
export const FETCH_SHARE_TOPIC = 'FETCH_SHARE_TOPIC';
export const FETCH_JOB_TOPIC = 'FETCH_JOB_TOPIC';

//initial state
export const TOPIC_STATE = {
    topics: {
        status: 'toFetch',
        data: []
    },
    goodTopics: {
        status: 'toFetch',
        data: []
    },
    shareTopics: {
        status: 'toFetch',
        data: []
    },
    jobTopics: {
        status: 'toFetch',
        data: []
    }
};


/**
 * user action params
 */
export const USER_STATE = {
    accesstokenInfo: {
        success: false,
        loginname: '不存在'
    },
    loginInfo: {
        loginStatus: 'logout',
        username: '',
        accesstoken: ''
    }
}

export const GET_USER_LOGIN_INFO = 'GET_USER_LOGIN_INFO';
export const VALID_ACCESS_TOEKN = 'VALID_ACCESS_TOEKN';
export const FETCH_ACCESS_TOKEN = 'FETCH_ACCESS_TOKEN';