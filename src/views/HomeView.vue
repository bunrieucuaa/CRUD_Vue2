<template>
  <post-page :headers-default="headers" :item-default="posts">
    <template #top> </template>
  </post-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostPage from "../components/PostPage";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomeView",

  components: {
    PostPage,
  },
  data() {
    return {
      headers: [
        {
          text: "STT",
          align: "start",
          filterable: false,
          value: "id",
        },
        { text: "Title", value: "title" },
        { text: "Body", value: "body" },
        { text: "Action", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
    }),
  },

  methods: {
    ...mapActions({
      getPosts: "post/getPosts",
    }),
  },
  created() {
    this.getPosts();
  },
};
</script>
