<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-col
        align-self="center"
      >
        <v-card class="back-transparent">
          <v-card-title primary-title>
            <v-col>
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
                        @click="downloadSelect()"
                      >
                        Get-BETA {{ userOs }}
                        <div id="nocodeavaiable" v-if="oscodemiss === true">
                          Code NOT available
                        </div>
                      </v-btn>
                      <p class="subtitle-1"></p>
                      <v-overlay
                        v-model="overlay"
                        class="align-center justify-center"
                        color="#29B6F6"
                      >
                        <v-btn
                          color="success"
                          @click="downloadLink()"
                          height="80px"
                        >
                          <div id="downloadsection" class="download-message">
                            Download-BETA--{{ userOs }}
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
                          color="black"
                          @click="overlay = false">
                          Close
                        </v-btn>
                      </v-overlay>
                    </v-row>
                  </v-card>
                </v-row>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: 'DowndloadToolkit',
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
      } else if (this.userOs === 'Win32') {
        this.oscodemiss = false
      }
    },
    downloadSelect () {
      this.overlay = !this.overlay
      console.log(this.overlay)
    },
    downloadLink () {
      // which os for download?
      if (this.userOs === 'Linux x86_64') {
        this.oscodemiss = true
        window.open('https://github.com/healthscience/bentoboxds/releases/download/v0.4.1/bentoboxds-0.4.1.AppImage', '_blank')
      } else if (this.userOs === 'IOS') {
        this.oscodemiss = true
        window.open('https://github.com/healthscience/bentoboxds/releases/download/v0.4.1/bentoboxds-0.4.1.dmg', '_blank')
      } else if (this.userOs === 'Win32') {
        window.open('https://github.com/healthscience/bentoboxds/releases/download/v0.4.1/bentoboxds-0.4.1-win-setup.exe', '_blank')
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
  background-color: lightblue;
  border: 1px solid red;
  padding-top: 1em;
  padding-left: .6em;
  height: 80px;
}

.download-message {
}

.downloadicon {
  transform: rotate(0.5turn);
  transform: scale(1.5, -1.4);
}
</style>
