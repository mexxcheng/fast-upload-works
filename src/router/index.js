import Vue from 'vue'
import VueRouter from 'vue-router'

import UserMain from '@/pages/UserMain';
import UserCollect from '@/pages/UserCollect';
import UserResult from '@/pages/UserResult';
import UserSubmitList from '@/pages/UserSubmitList';
import UserError from '@/pages/UserError';


Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/inbox/:id',
            redirect:{name:'InboxCollect'},
            component:UserMain,
            children:[
                {
                    name:'InboxCollect',
                    path:'collect',
                    component:UserCollect
                },
                {
                    name:'CollectResult',
                    path:'result/:resultId',
                    component:UserResult
                },
                {
                    name:'SubmitList',
                    path:'submitList',
                    component:UserSubmitList
                }
            ]
        },
        {
            path:'/error',
            component:UserError,
            name:'UserError'
        }
    ]
});