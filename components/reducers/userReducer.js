import {
    VALID_ACCESS_TOEKN,
    GET_USER_LOGIN_INFO,

    USER_STATE
} from '../constants/index.js';

export default function userReducer (state=USER_STATE, action) {
    switch (action.type) {
        case VALID_ACCESS_TOEKN: {
            return {
                ...state,
                accesstokenInfo: {
                    ...action.data
                }
            }
        }
        case GET_USER_LOGIN_INFO: {
            return {
                ...state,
                loginInfo: {
                    ...action.data
                }
            }
        }
        default:{
            return state;
        }
    }
}