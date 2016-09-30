import { 
    VALID_ACCESS_TOEKN,
    FETCH_ACCESS_TOKEN,
    GET_USER_LOGIN_INFO
} from '../constants/index.js';

import {
    ajaxFetch
} from '../utils.js';

const ajaxUrl = 'https://cnodejs.org/api/v1/';

/**
 * login info
 */
export function loginStatus(loginStatus={}) {
    return {
        type: GET_USER_LOGIN_INFO,
        data: loginStatus
    }
}

export function validAccessToken (res={}) {
    return {
        type: VALID_ACCESS_TOEKN,
        data: res
    }
}


export function fetchAccessToken (params) {
    return async function (dispatch, getState) {
        try {
            let res = await ajaxFetch(ajaxUrl + 'accesstoken', params);
            dispatch(validAccessToken(res));
        }catch (e) {
            console.error(e);
        }
    }
}