import Vue from "vue";
import Vuex from "vuex";
import postModule from "./post";
import commentModule from "./comment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    post: postModule,
    comment: commentModule,
  },
});
