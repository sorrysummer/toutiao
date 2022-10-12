import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/login',
        // component: Login
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: "/layout",
        redirect: '/layout/home',
        component: () => import('@/views/layout'),
        children: [{
            // 默认子路由，只能有一个
            path: 'home',
            name: "home",
            component: () => import('@/views/home')
        },
        {
            path: 'question',
            component: () => import('@/views/question')
        },
        {
            path: 'video',
            component: () => import('@/views/video')
        },
        {
            path: 'my',
            component: () => import('@/views/my'),

        }]
    },
    {
        path: '/search',
        component: () => import('@/views/search')
    },
    {
        path: '/article/:articleId',
        component: () => import('@/views/article'),
        props: true
    },
    {
        path: '/user/data',
        component: () => import('@/views/my/components/data.vue')

    }
]
const router = new VueRouter({
    routes
})
export default router