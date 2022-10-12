import request from '../utils/request'
export const commentLike = (target) => request({
    url: 'comment/likings',
    method: 'POST',
    data: {
        target
    }
})
export const cancelCommentLike = (target) => request({
    url: `comment/likings/${target}`,
    method: "DELETE"
})
export const comments = (data) => request({
    url: "comments",
    method: 'POST',
    data
})