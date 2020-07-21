import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import user from './modules/user.js'
import production from './modules/production.js'
import product from './modules/product.js'
import sales from './modules/sales.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,user,production,product,sales
  }
})
