<template>
  <comment-page :headers-default="headers" :item-default="comments">
    <template #top> </template>
  </comment-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentPage from "../components/CommentPage";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "PostCommentView",

  components: {
    CommentPage,
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
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Body", value: "body" },
        { text: "Action", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapState({
      comments: (state) => state.comment.comments,
    }),
  },

  methods: {
    ...mapActions({
      getComments: "comment/getCommentsByPostId",
    }),
  },
  async created() {
    const id = this.$route.params.id;
    await this.getComments(id);
  },
};
</script>
