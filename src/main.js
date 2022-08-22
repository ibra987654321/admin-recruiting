import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import DatetimePicker from 'vuetify-datetime-picker'
import Vuelidate from "vuelidate";

// filters -----------------
import dateFilter from "@/filters/dateFilter";

Vue.config.productionTip = false
Vue.filter("date", dateFilter)
Vue.use(DatetimePicker)
Vue.use(Vuelidate)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
