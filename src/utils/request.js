import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://toutiao.itheima.net/v1_0/'


// 请求拦截器
axios.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // 务必返回config
    return config
}, function (error) {
    // 请求出错会进入这里
    return Promise.reject(error)
});

export default axios