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
        status: 'toFetch'
    },
    goodTopics: {
        status: 'toFetch'
    },
    shareTopics: {
        status: 'toFetch'
    },
    jobTopics: {
        status: 'toFetch'
    }
};
