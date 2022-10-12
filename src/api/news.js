import request from '../utils/request'
export const newsDetail = (id) => request({
    url: `articles/${id}`,
    method: 'GET'
})
export const followUser = (id) => request({
    url: 'user/followings',
    method: 'POST',
    data: {
        target: id
    }
})

export const cancelFollow = (target) => request({
    url: `user/followings/${target}`,
    method: 'DELETE'
})

export const newsCollect = (target) => request({
    url: 'article/collections',
    method: 'POST',
    data: {
        target
    }
})

export const cancelCollect = (target) => request({
    url: `article/collections/${target}`,
    method: 'DELETE'
})

export const goodJob = (target) => request({
    url: 'article/likings',
    method: 'POST',
    data: {
        target
    }
})
export const cancelGoodJob = (target) => request({
    url: `article/likings/${target}`,
    method: 'DELETE'
})


export const getComment = (params) => request({
    url: "comments",
    method: "GET",
    params
})