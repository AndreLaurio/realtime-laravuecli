import Vue from 'vue'
import App from './App.vue'

import Echo from 'laravel-echo'
window.io = require('socket.io-client')
window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: 'http://localhost:6001'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
