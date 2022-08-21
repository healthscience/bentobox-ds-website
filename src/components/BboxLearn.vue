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
          <v-img src="../assets/bbdds.png" max-width="500" class="right-perspective">
          </v-img>
        </v-flex>
        <v-spacer />
    </v-layout>
    <v-layout>
              <v-flex xs12 sm12 md12>
        <v-card class="back-transparent">
          <v-card-title primary-title>
            <v-flex xs12 sm12 md12>
                 <v-row
                  align="center"
                  justify="center"
                >
                  <v-card
                    height="100"
                    width="250"
                  >
                    <v-row justify="center">
                      <v-btn
                        color="success"
                        class="mt-12"
                        @click="overlay = !overlay"
                      >
                        Get-ALPHA--{{ userOs }}
                        <div id="nocodeavaiable" v-if="oscodemiss === true">
                          Code NOT available
                        </div>
                      </v-btn>
                      <p class="subtitle-1">Mobile AI Apps coming soon</p>
                      <v-overlay
                        :absolute="absolute"
                        :value="overlay"
                      >
                        <v-btn
                          color="success"
                          @click="downloadLink"
                        >
                          <div id="downloadsection">
                            BBHOP-Download-ALPHA--{{ userOs }}
                            <v-icon class="downloadicon"
                              large
                              color="orange darken-2"
                            >
                              mdi-arrow-up-bold-box-outline
                           </v-icon>
                          </div>
                        </v-btn>
                        <div id="checksumterms" class="downloadsection">
                          <router-link class="downspace" to="/checksum">Checksum</router-link>
                          <router-link class="downspace" to="/terms">Terms & Conditions</router-link>
                        </div>
                        <v-btn
                          color="grey"
                          @click="overlay = false">
                          Close
                        </v-btn>
                      </v-overlay>
                    </v-row>
                  </v-card>
                </v-row>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
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
    <v-layout row>
      <v-spacer />
      <v-flex xs12 sm12 md8>
        <v-card>
          <v-card-title primary-title>
            <div>
              <header>Features</header>
              <div style="word-break: break-word" class="spacing-playground pa-4">
                The BentoBox Toolkit is the graphical interface that uses  <a href="https://www.healthscience.network">health oracle protocol</a>.  Non-coding tools allow data to be added, computed and visualised.
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
              <iframe width="640" height="350" src="https://www.youtube.com/embed/JZkBNRx8vWE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-spacer />
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
