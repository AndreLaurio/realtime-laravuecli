import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueEcho from 'vue-echo'
import Pusher from 'pusher-js'
import axios from 'axios'
import Echo from 'laravel-echo'

import Chat from './components/Chat.vue';
import Index from './components/Index.vue';

Vue.config.productionTip = false
Vue.use(VueRouter)
//Vue.use(VueEcho, {
  // broadcaster: 'pusher',
  // key: 'anyKey',
  // wsHost: 'localhost',
  // wsPort: 6001,
  // disableStats: true,
  // enabledTransports: ['ws', 'flash'],
  // forceTLS:false,
// })
window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'anyKey',
  id: 'anyID',
  secret: 'anySecret',
  cluster: 'mt1',
  wsHost: 'localhost',
  wsPort: 6001,
  disableStats: true,
  authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
  enabledTransports: ['ws', 'flash'],
  forceTLS:false,
  encrypted:false,
  auth:{
    headers:{
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
         'X-CSRF-Token': "CSRF_TOKEN"
        //  Accept: 'application/json'
    }
  }
})


// axios.interceptors.request.use(function (config){
//   if(config.url !== '/api/login'){
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//   }
//   return config
// })


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
