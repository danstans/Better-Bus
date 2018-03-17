// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import { createStore } from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const store = createStore()
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCFtfMalN3FUzqduYHZWjgOiI7POAAF-n4'
  }
})
Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
