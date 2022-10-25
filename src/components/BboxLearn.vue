<template>
  <v-container grid-list-lg>
    <v-layout row>
        <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5 color blue lighten-5">Peer to Peer Data Science</v-flex>
    </v-layout>
    <v-layout row center>
        <v-spacer />
        <v-flex xs12 sm12 md5 class="open-left">
          <v-img src="../assets/bbtoolkit.png" max-width="500" class="left-perspective">
          </v-img>
        </v-flex>
        <v-flex xs12 sm12 md5 class="open-right">
          <!-- <v-img src="../assets/bbdds.png" max-width="500" class="right-perspective">
          </v-img> -->
          <download-toolkit></download-toolkit>
        </v-flex>
        <v-spacer />
    </v-layout>
    <v-layout row>
      <v-spacer />
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title primary-title>
            <div>
              <header>Features</header>
              <div style="word-break: break-word" class="spacing-playground pa-4">
                The BentoBox Data Science Toolkit is a graphical interface to chart and visualise data without the need for coding.  Collaborate peer to peer using the <a href="https://www.healthscience.network">health oracle protocol</a>.
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-spacer />
    </v-layout>
    <v-layout row>
      <v-spacer />
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title primary-title>
            <div>Demo
              <iframe width="500" height="315" src="https://www.youtube.com/embed/OZXilez2hK8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-spacer />
    </v-layout>
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
