import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getItem, setItem } from "@/utils/localstorge";
export default new Vuex.Store({
    state: {
        user: getItem('token_key')
    },
    mutations: {
        setUser(state, data) {
            state.user = data
            //存入本地存储，刷新时候自动取出
            setItem('token_key', state.user)
        }
    },
    actions: {

    },
    getters: {

    }
})