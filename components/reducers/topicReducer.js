/**
 * Action types and initail state
 */
import {
    FETCH_TOPIC,
    FETCH_GOOD_TOPIC,
    FETCH_SHARE_TOPIC,
    FETCH_JOB_TOPIC,
    TOPIC_STATE
} from '../constants';

import {
    fetchTopic,
    fetchShareTopic,
    fetchJobTopic,
    fetchGoodTopic
} from '../actions/topicAction.js';


function topics(state=TOPIC_STATE, action){
    switch (action.type) {
        case FETCH_TOPIC:
            {
                
                return {
                    ...state,
                    topics: { ...action }
                }
            }
        case FETCH_GOOD_TOPIC:
            {
                
                return {
                    ...state,
                    goodTopics: { ...action }
                }
            }
        case FETCH_SHARE_TOPIC:
            {
                
                return {
                    ...state,
                    shareTopics: { ...action }
                }
            }
        case FETCH_JOB_TOPIC:
            {
                
                return {
                    ...state,
                    jobTopics: { ...action }
                }
            }
        default:
            return state;
    }   
}

export default topics;