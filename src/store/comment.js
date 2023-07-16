import axios from "axios";
const commentModule = {
  state: {
    comments: [],
    comment: {
      id: null,
      name: null,
      email: null,
      body: null,
    },
  },
  getters: {},
  mutations: {
    GET_COMMENTS(state, data) {
      state.comments = [...data];
    },
    GET_COMMENT(state, data) {
      state.comment = { ...data };
    },
    RESET_COMMENT(state) {
      state.comment = {};
    },
  },
  actions: {
    async getCommentsByPostId({ commit }, id) {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      commit("GET_COMMENTS", response.data);
    },
    async createComment({ commit }, comment) {
      let response = await axios.post(
        `https://jsonplaceholder.typicode.com/comments`,
        comment
      );
      commit("GET_COMMENT", response.data);
      return response.status;
    },
    async editComment({ commit }, comment) {
      let response = await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${comment.id}`,
        comment
      );
      commit("RESET_COMMENT");
      return response.status;
    },
    async deleteComment({ commit }, id) {
      let response = await axios.delete(
        `https://jsonplaceholder.typicode.com/comments/${id}`
      );
      commit("GET_COMMENT", response.data);
      return response.status;
    },
  },
  namespaced: true,
};
export default commentModule;
