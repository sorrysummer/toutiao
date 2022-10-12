import request from '@/utils/request'
export const newsRecommend = params => request({
    url: 'articles',
    method: 'GET',
    params
})
export const channelAllList = () => request({
    url: "channels",
    method: 'GET'
})
export const deleteChannel = (id) => request({
    url: `user/channels/${id}`,
    method: 'DELETE'
})
export const changeChannel = channel => request({
    url: 'user/channels',
    method: 'PATCH',
    data: {
        channels: [channel]
    }
})