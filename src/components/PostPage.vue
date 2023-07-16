<template>
  <v-card>
    <h1>BẢNG THÔNG TIN CÁC BÀI POST</h1>
    <v-data-table
      :headers="headersDefault"
      :items="itemDefault"
      :search="search"
    >
      <template #top>
        <slot name="top-default">
          <v-toolbar flat class="p-1">
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-spacer></v-spacer>
            <slot name="btn-create">
              <v-btn
                depressed
                text
                class="green--text tex--lighten-1"
                @click="showDialogCreate()"
              >
                <v-icon> mdi-plus</v-icon> Create
              </v-btn>
            </slot>
          </v-toolbar>
        </slot></template
      >
      <template #[`item.actions`]="{ item }">
        <span class="d-flex">
          <v-icon
            small
            color="blue darken-4"
            class="mr-2"
            @click="showDialogEdit(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="red darken-1"
            class="mr-2"
            @click="showDialogDelete(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon small color="red darken-1" @click="moveToComment(item.id)">
            mdi-format-list-bulleted
          </v-icon>
        </span>
      </template>
    </v-data-table>
    <template>
      <div class="text-center">
        <v-dialog
          v-model="dialogCreate"
          width="50%"
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-form ref="form">
              <v-toolbar color="blue">
                <v-btn icon dark @click="closeDialogCreate()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Thêm Bài Viết </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <them-post></them-post>
              <v-row no-gutters align="center" justify="center">
                <v-btn
                  color="primary"
                  class="ma-2 mx-md-4"
                  @click="createPostForTheFirstTime"
                >
                  <v-icon dark left> mdi-sync </v-icon> Lưu
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <template>
      <div class="text-center">
        <v-dialog
          v-model="dialogEdit"
          width="50%"
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-form ref="form">
              <v-toolbar color="blue">
                <v-btn icon dark @click="closeDialogEdit()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Update Bài Viết </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="form-container">
                <v-card-title>
                  <label for="title" class="text-capitalize">Title</label><br />
                  <v-text-field
                    id="title"
                    class="text-field"
                    v-model="post.title"
                    placeholder="Title"
                    outlined
                    dense
                  />
                </v-card-title>
                <v-card-title>
                  <label for="body" class="text-capitalize">Body</label>
                  <v-text-field
                    id="body"
                    class="text-field"
                    v-model="post.body"
                    placeholder="Body"
                    outlined
                    dense
                  />
                </v-card-title>
              </div>
              <v-row no-gutters align="center" justify="center">
                <v-btn
                  color="primary"
                  class="ma-2 mx-md-4"
                  @click="editPostForTheTenTimes"
                >
                  <v-icon dark left> mdi-sync </v-icon> Lưu
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <template>
      <div class="text-center">
        <v-dialog
          v-model="dialogDelete"
          width="50%"
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-form ref="form">
              <v-toolbar color="blue">
                <v-btn icon dark @click="closeDialogDelete()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Xóa Bài Viết </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <h5>Bạn có muốn xóa bài viết: {{ post.title }}</h5>
              <v-row no-gutters align="center" justify="center">
                <v-btn
                  color="primary"
                  class="ma-2 mx-md-4"
                  @click="deletePostForNothing(post)"
                >
                  <v-icon dark left> mdi-sync </v-icon> Xóa
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-card>
</template>

<script>
import ThemPost from "../components/ThemPost";
import { mapActions, mapState } from "vuex";

export default {
  name: "PostPage",
  components: {
    ThemPost,
  },
  props: {
    headersDefault: {
      type: Array,
      required: true,
    },
    itemDefault: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: "",
      dialogCreate: false,
      dialogEdit: false,
      dialogDelete: false,
    };
  },
  computed: {
    ...mapState({
      post: (state) => state.post.post,
    }),
  },
  methods: {
    showDialogCreate() {
      this.dialogCreate = true;
    },
    closeDialogCreate() {
      this.dialogCreate = false;
      this.$store.commit("post/RESET_POST");
    },
    showDialogEdit(item) {
      this.dialogEdit = true;
      this.$store.commit("post/GET_POST", item);
    },
    closeDialogEdit() {
      this.dialogEdit = false;
      this.$store.commit("post/RESET_POST");
    },
    showDialogDelete(item) {
      this.dialogDelete = true;
      this.$store.commit("post/GET_POST", item);
    },
    closeDialogDelete() {
      this.dialogDelete = false;
    },
    ...mapActions({
      createPost: "post/createPost",
      getPosts: "post/getPosts",
      editPost: "post/editPost",
      deletePost: "post/deletePost",
    }),
    async createPostForTheFirstTime() {
      const status = await this.createPost(this.post);
      if (status === 201) {
        alert("Thêm post thành công");
        this.closeDialogCreate();
        this.getPosts();
      } else {
        alert("Thêm post thất bại");
        this.closeDialogCreate;
      }
    },
    async editPostForTheTenTimes() {
      const status = await this.editPost(this.post);
      if (status === 204 || status === 200) {
        alert("Sửa post thành công");
        this.closeDialogEdit();
        this.getPosts();
      } else {
        alert("Sửa post thất bại");
        this.closeDialogEdit();
      }
    },
    async deletePostForNothing(post) {
      const status = await this.deletePost(post.id);
      if (status === 200) {
        alert("Xóa post thành công");
        this.closeDialogDelete();
        this.getPosts();
      } else {
        alert("Xóa post thất bại");
        this.closeDialogDelete();
      }
    },
    moveToComment(item) {
      this.$router.push(`/postcomments/${item}`);
    },
  },
};
</script>
<style lang="scss" scoped>
/* Styles for the form container */
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Styles for the form labels */
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

/* Styles for the text fields */
.text-field {
  width: 100%;
  margin-bottom: 15px;
}
</style>
