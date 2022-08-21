<template>
  <v-app-bar
    app
    color="blue lighten-5"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="BentoBox -DS"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="24"
      />
    <v-toolbar-title class="purple--text darken-6--text">BentoBox - DS</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
      <v-btn text><a href="https://diyhslab.medium.com/">blog</a></v-btn>
      <v-btn text><a href="https://github.com/healthscience/diyhstoolkit">code</a></v-btn>
      <!-- <v-btn color="brown lighten-3">JOIN</v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  name: 'MenuNavigation',
  data: () => ({
  })
}
</script>
