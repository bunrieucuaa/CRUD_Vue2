<template>
  <div class="form-container">
    <v-card-title>
      <label for="name" class="text-capitalize">Name</label><br />
      <v-text-field
        id="name"
        class="text-field"
        v-model="comment.name"
        placeholder="Name"
        outlined
        dense
      />
    </v-card-title>
    <v-card-title>
      <label for="email" class="text-capitalize">Email</label><br />
      <v-text-field
        id="email"
        class="text-field"
        v-model="comment.email"
        placeholder="email"
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
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ThemComment",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      comment: (state) => state.comment.comment,
    }),
  },
};
</script>

<style lang="scss" scoped>
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
