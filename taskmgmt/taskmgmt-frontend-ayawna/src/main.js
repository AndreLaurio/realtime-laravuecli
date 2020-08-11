import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueEcho from 'vue-echo'
import Echo from 'laravel-echo'
import axios from 'axios'

import Chat from './components/Chat.vue';
import Index from './components/Index.vue';
window.io = require('socket.io-client')

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: 'http://localhost:6001'
})

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

axios.interceptors.request.use(function (config){
  if(config.url !== '/api/login'){
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})


Vue.config.productionTip = false
Vue.use(VueRouter) 
Vue.use(axios)

const router = new VueRouter(
  {
    mode:'history',
    routes:[
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/chat',
        name: 'chat',
        component: Chat
      },
    ]
  }
)

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
