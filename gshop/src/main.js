import Vue from 'vue'
import app from './app'
import router from './router/index'
import store from './store'
import {Button} from 'mint-ui'
import './mock/mockServer'

import './filters'

Vue.component(Button.name, Button);

new Vue({
  el:'#app',
  components:{app},
  template: '<app/>',
  router,
  store
});
