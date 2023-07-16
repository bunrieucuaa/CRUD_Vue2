<template>
  <v-card>
    <h1>Bảng thông tin comment của các bài post</h1>
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
                <v-toolbar-title>Thêm Comment </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <them-comment></them-comment>
              <v-row no-gutters align="center" justify="center">
                <v-btn
                  color="primary"
                  class="ma-2 mx-md-4"
                  @click="createCommentForTheFirstTime"
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
                <v-toolbar-title>Update Comment </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <div class="form-container">
                <v-card-title>
                  <label for="Name" class="text-capitalize">Name</label><br />
                  <v-text-field
                    id="Name"
                    class="text-field"
                    v-model="comment.name"
                    placeholder="Name"
                    outlined
                    dense
                  />
                </v-card-title>
                <v-card-title>
                  <label for="Email" class="text-capitalize">Email</label><br />
                  <v-text-field
                    id="Email"
                    class="text-field"
                    v-model="comment.email"
                    placeholder="Email"
                    outlined
                    dense
                  />
                </v-card-title>
                <v-card-title>
                  <label for="body" class="text-capitalize">Body</label>
                  <v-text-field
                    id="body"
                    class="text-field"
                    v-model="comment.body"
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
                  @click="editCommentForTheTenTimes"
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
              <h5>Bạn có muốn xóa bài viết: {{ comment.name }}</h5>
              <v-row no-gutters align="center" justify="center">
                <v-btn
                  color="primary"
                  class="ma-2 mx-md-4"
                  @click="deleteCommentForNothing(comment)"
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
import ThemComment from "../components/ThemComment";
import { mapActions, mapState } from "vuex";

export default {
  name: "CommentPage",
  components: {
    ThemComment,
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
      comment: (state) => state.comment.comment,
    }),
  },
  methods: {
    showDialogCreate() {
      this.dialogCreate = true;
    },
    closeDialogCreate() {
      this.dialogCreate = false;
      this.$store.commit("comment/RESET_COMMENT");
    },
    showDialogEdit(item) {
      this.dialogEdit = true;
      this.$store.commit("comment/GET_COMMENT", item);
    },
    closeDialogEdit() {
      this.dialogEdit = false;
      this.$store.commit("comment/RESET_COMMENT");
    },
    showDialogDelete(item) {
      this.dialogDelete = true;
      this.$store.commit("comment/GET_COMMENT", item);
    },
    closeDialogDelete() {
      this.dialogDelete = false;
    },
    ...mapActions({
      createComment: "comment/createComment",
      getComments: "comment/getCommentsByPostId",
      editComment: "comment/editComment",
      deletetComment: "comment/deleteComment",
    }),
    async createCommentForTheFirstTime() {
      const id = this.$route.params.id;
      const status = await this.createComment(this.comment);
      if (status === 201) {
        alert("Thêm comment thành công");
        this.closeDialogCreate();
        this.getComments(id);
      } else {
        alert("Thêm comment thất bại");
        this.closeDialogCreate;
      }
    },
    async editCommentForTheTenTimes() {
      const id = this.$route.params.id;
      const status = await this.editComment(this.comment);
      if (status === 204 || status === 200) {
        alert("Sửa comment thành công");
        this.closeDialogEdit();
        this.getComments(id);
      } else {
        alert("Sửa comment thất bại");
        this.closeDialogEdit();
      }
    },
    async deleteCommentForNothing(comment) {
      const id = this.$route.params.id;
      const status = await this.deletetComment(comment.id);
      if (status === 200) {
        alert("Xóa comment thành công");
        this.closeDialogDelete();
        this.getComments(id);
      } else {
        alert("Xóa comment thất bại");
        this.closeDialogDelete();
      }
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
