import Vue from 'vue'
import Router from 'vue-router'
import About from '@/views/About'
import Localweather from '@/views/Localweather'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Localweather',
      name: 'Localweather',
      component: Localweather
    }
  ]
})
