<template>
  <v-app-bar
    app
    color="blue lighten-5"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="BentoBox-DS"
        class="shrink"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="42"
      />
    </div>
    <v-toolbar-title class="w-66">BentoBoxDS</v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn text ><a href="https://discord.gg/JhdkXX54Xk">community</a></v-btn>
      <v-btn text ><a href="https://diyhslab.medium.com/">blog</a></v-btn>
      <v-btn text ><a href="https://github.com/healthscience/diyhstoolkit">code</a></v-btn>
      <v-btn text ><a href="https://bentobox-ds.gitbook.io/bentobox-ds-hop/">docs</a></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'MenuNavigation',
  data: () => ({
  })
}
</script>

<style>
</style>