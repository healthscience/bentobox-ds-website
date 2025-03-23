<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-row
        no-gutters
        id="learn"
      >
        <v-col
          align-self="center"
          xs="12"
          sm="12"
          md="12"
        >
          <v-sheet class="text-h6 pa-2" color="blue-darken-4">BentoBoxDS -- Sovereign Intelligences that shapes health</v-sheet>
        </v-col>
      </v-row>
      <v-row
        no-gutters
      >
        <v-col
          align-self="center"
          xs="12"
          sm="6"
          md="6"
        >
          <v-card class="open-left">
            <v-img src="../assets/bbtoolkit.png" max-width="500" class="left-perspective">
            </v-img>
          </v-card>
        </v-col>
        <v-col
          align-self="center"
          xs="12"
          sm="6"
          md="6"
        >
          <v-card color="indigo-lighten-5 ma-2">
            <v-card-title primary-title>
              <h3 class="pa-2 m-1">BETA experimental release</h3>      
            </v-card-title> 
          </v-card>
          <download-toolkit></download-toolkit>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import DownloadToolkit from '@/components/download/downloadToolkit'

export default {
  name: 'TaapgLearn',
  components: {
    DownloadToolkit
  },
  data: () => ({
    userAgent: '',
    userOs: '',
    absolute: false,
    overlay: false,
    oscodemiss: true
  }),
  mounted () {
    this.userAgent = navigator.userAgent || ''
    this.userOs = navigator.platform || ''
  },
  methods: {
  }
}
</script>

<style scoped>
.open-left {
  perspective: 1000px;
}

.left-perspective {
  transform: rotateY(14deg);
}

.open-right {
  perspective: 1000px;
}

.right-perspective {
  transform: rotateY(-14deg);
}

</style>
