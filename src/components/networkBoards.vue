<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-row
        no-gutters
        id="boards"
      >
        <v-col
          align-self="center"
        >
          <v-sheet class="text-h6 pa-2" color="blue-darken-4">Network experiment boards</v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-card color="indigo-lighten-5 ma-2">
          <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
            Network Boards:
            Wearables
            Daisyworld
            COMING SOON
          </div>
        </v-card>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: 'network-boards'
}
</script>

<style scoped>
</style>