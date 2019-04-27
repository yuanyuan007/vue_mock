import Vue from 'vue';
import Vuex from 'vuex'
import { setSen, getSen } from '@/utils'
import { stat } from 'fs';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 22,
    fit: 'fill',
    val: require('@/assets/background1.jpeg')
  },
  getters: {
    getCount: state => state.fit,
    getVal: state => state.val,
  },
  mutations: {
    setNumber(state, a) {
      state.count = state.count + a;
    },
    setbround(state, data) {
      state.fit = data;
    },
    setVal(state, data) {
      state.val = data;
    }
  },
  actions: {
    getMutations({ commit }, a) {
      commit('setNumber', a)
    }
  }
})

export default store;