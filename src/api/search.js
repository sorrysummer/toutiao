import request from '../utils/request'
export const getSuggestion = (q) => request({
    url: 'suggestion',
    method: 'GET',
    params: {
        q
    }
})
export const searchResult = (params) => request({
    url: 'search',
    method: 'GET',
    params
})