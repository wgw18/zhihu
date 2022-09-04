import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import User from '@/pages/User.vue'
import NewsDetail from '@/pages/NewsDetail'
import Comment from '@/pages/Comment'
import WriteComment from '@/pages/WriteComment'
Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/user',
            name: 'user',
            component: User,
        },
        {
            path: '/newsdetail',
            name: 'newsdetail',
            component: NewsDetail
        },
        {
            path: '/comment',
            name: 'comment',
            component: Comment
        },
        {
            path: '/writecomment',
            name: 'writecomment',
            component: WriteComment
        }
    ]
})