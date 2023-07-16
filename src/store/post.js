import axios from "axios";
const postModule = {
  state: {
    posts: [],
    post: {
      id: null,
      title: null,
      body: null,
    },
  },
  getters: {},
  mutations: {
    GET_POSTS(state, data) {
      state.posts = [...data];
    },
    GET_POST(state, data) {
      state.post = { ...data };
    },
    RESET_POST(state) {
      state.post = {};
    },
  },
  actions: {
    async getPosts({ commit }) {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      commit("GET_POSTS", response.data);
    },
    async createPost({ commit }, post) {
      let response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        post
      );
      commit("GET_POST", response.data);
      return response.status;
    },
    async editPost({ commit }, post) {
      let response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        post
      );
      commit("RESET_POST");
      return response.status;
    },
    async deletePost({ commit }, id) {
      let response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      commit("GET_POST", response.data);
      return response.status;
    },
  },
  namespaced: true,
};
export default postModule;
