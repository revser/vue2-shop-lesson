import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList1',
      component: GoodsList
    },
    {
      path: '/GoodsList',
      name: 'GoodsList3',
      component: GoodsList
    }
  ]
})
