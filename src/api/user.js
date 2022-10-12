
import request from '@/utils/request'

export const userLogin = data => request({
    url: 'authorizations',
    method: 'POST',
    data
})
export const verification = mobile => request({
    url: `sms/codes/${mobile}`,
    method: 'GET',

})
export const getUserInfo = () => request({
    url: 'user',
    method: 'GET',
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
})
export const getUserList = () => request({
    url: 'user/channels',
    method: 'GET'
})

export const getUserData = () => request({
    url: 'user/profile',
    method: 'GET',

})
export const changeUserData = (data) => request({
    url: "user/profile",
    method: 'PATCH',
    data
})

export const changePhoto = (data) => request({
    url: 'user/photo',
    method: 'PATCH',
    data
})

