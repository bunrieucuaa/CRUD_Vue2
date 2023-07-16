<template>
  <v-app>
    <v-app-bar app color="error" dark>
      <v-spacer></v-spacer>
      <nav class="navigation"><router-link to="/">Post</router-link></nav>
      <nav class="navigation">
        <router-link to="/ckeditor">CkEditor Test</router-link>
      </nav>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
.navigation {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.navigation a {
  color: #333;
  text-decoration: none;
  margin-right: 10px;
  font-weight: bold;
}

.navigation a:hover {
  color: #ff0000;
}
</style>
