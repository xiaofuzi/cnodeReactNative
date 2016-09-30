import { Platform } from 'react-native';

/**
 * fetch data
 */
export function ajaxFetch(url, option={}){
    option.method = option.method || 'GET';
    if (option.method == 'GET' || option.method == 'get') {
        let data = option.data || {};
        let querystring = Object.keys(data)
            .map(key=>{
                return key + '=' + encodeURIComponent((data[key]));
            })
            .join('&');
        let ajaxUrl = url + '?' + querystring;
        return fetch(ajaxUrl).then(res=>res.json());
    } else {
        return fetch(url, {
            method: option.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(option.data)
        }).then(res=>res.json());
    }
}

export function isIOS () {
    return Platform.OS === 'ios';
}