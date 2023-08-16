<template>
  <v-container grid-list-lg>
    <v-layout row>
      <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5 color blue lighten-5">The BentoBox Concept</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0 font-weight-bold">Now network</h3>
                <div style="word-break: break-word" class="spacing-playground pa-3">
                  Combine networks of historical data.
                </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0 font-weight-bold">Future Network</h3>
                <div style="word-break: break-word" class="spacing-playground pa-3">
                  Aggregate data to look forward in time.
                </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0 font-weight-bold">Now</h3>
                <div style="word-break: break-word" class="spacing-playground pa-6 ">
                  Use historical data to make observations.
                </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0 font-weight-bold">Future</h3>
                <div style="word-break: break-word" class="spacing-playground pa-6">
                  Look forward to future time periods.
                </div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'TaapgLearn',
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
    this.codeavailable()
  },
  methods: {
    codeavailable () {
      if (this.userOs === 'Linux x86_64') {
        this.oscodemiss = false
      } else if (this.userOs === 'IOS') {
        this.oscodemiss = true
      } else if (this.userOs === 'WIN32') {
        this.oscodemiss = true
      }
    },
    downloadLink () {
      console.log('go to webpage')
      console.log(this.userOs)
      // which os for download?
      if (this.userOs === 'Linux x86_64') {
        console.log('llinsu')
        this.oscodemiss = true
        window.open('https://www.healthscience.network/test/alpha/BentoBox-x86_64.AppImage', '_blank')
      } else if (this.userOs === 'IOS') {
        this.oscodemiss = true
        window.open('https://www.healthscience.network', '_blank')
      } else if (this.userOs === 'WIN32') {
        window.open('https://www.healthscience.network', '_blank')
        this.oscodemiss = true
      }
    }
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

.downloadsection {
  background-color: lightgrey;
  border: 1px solid red;
  padding-top: 1em;
  padding-left: .6em;
  height: 80px;
}
</style>
