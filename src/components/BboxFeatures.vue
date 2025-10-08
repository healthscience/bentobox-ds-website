<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-row
        no-gutters
      >
        <v-col
          align-self="center"
        >
          <v-sheet class="text-h6 pa-2" color="blue-darken-4">Features</v-sheet>
        </v-col>
        <v-card color="indigo-lighten-5 ma-2">
          <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
            The BentoBoxDS toolkit for interacting with HOP, the Health Oracle Protocol. Each peer has an autonomous agent beebee to support and create charting to simulations to machine learning with peers. beebee helps manage Besearch cycles of  N=1 experiment plus machine learning peer to peer using the <a href="https://www.healthscience.network">health oracle protocol</a> to attain health at human, bioregion or Earth scales.
          </div>
        </v-card>
      </v-row>
      <v-row
        no-gutters
        class="border-thin pa-md-16"
      >
        <v-col justify>
          <v-card color="indigo-lighten-5" class="ma-2">
            <v-card-title primary-title>
              <h3 class="pa-2 m-1">Cues</h3>      
            </v-card-title> 
            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
              As a toolkit gets populated with data, charts, network experiments etc. then the need for a way to filter what is most important, this is done using cues. BeeBee AI will support this via Cues wheels & interactive interfaces. Cues can also be shown on a diary.
            </div>
            <v-btn
                color="success"
                class="mt-12"
                @click="videBentoBoxDSvideo('cues')"
              >
                View video
              </v-btn>
            <v-overlay
                v-model="featureOverlay"
                class="align-center justify-center"
                color="#29B6F6"
              >
                <div>video player please {{ sourceVideo }} {{ featureOverlay }}</div>
                <iframe width="560" height="315" :src="sourceVideo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <v-btn
                  color="black"
                  @click="featureOverlay = false">
                  Close
                </v-btn>
              </v-overlay>
          </v-card>
        </v-col>
        <v-col
          align-self="center"
        >
          <v-card class="open-left">
            <v-img src="../assets/bentocues.png" max-width="500" class="right-perspective">
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="border-thin pa-md-16"
      >
      <v-col
          align-self="center"
        >
          <v-card class="open-left">
            <v-img src="../assets/bentochat.png" max-width="500" class="left-perspective">
            </v-img>
          </v-card>
        </v-col>
        <v-col justify>
          <v-card color="indigo-lighten-5" class="ma-2">
            <v-card-title primary-title>
              <h3 class="pa-2 m-1">a bentobox chart</h3>      
            </v-card-title> 
            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
              The toolkit chatbot, beebee can be prompted with the "chart" keyword to chart data directly e.g. chart 1 2 3 or via the keyword upload to add e.g. csv file.  BeeBee will also collaborate with other AI's e.g a LLM or evolutionary algorithms.
            </div>
            <v-btn
              color="success"
              class="mt-12"
              @click="videBentoBoxDSvideo('chart')"
            >
              View video
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="border-thin pa-md-16"
      >
        <v-col justify>
          <v-card color="indigo-lighten-5 ma-2">
            <v-card-title primary-title>
              <h3 class="pa-2 m-1">Spaces</h3>      
            </v-card-title> 
            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
              Spaces can be used to aggregate many charts or network experiments in a dashboard. For example, bring together wearable sleep data with room temperature and air quality data. 
            </div>
            <v-btn
              color="success"
              class="mt-12"
              @click="videBentoBoxDSvideo('spaces')"
            >
              View video
            </v-btn>
          </v-card>
        </v-col>
        <v-col
          align-self="center"
        >
          <v-card class="open-left">
            <v-img src="../assets/bentospaces.png" max-width="500" class="right-perspective">
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="border-thin pa-md-16"
      >
      <v-col
          align-self="center"
        >
          <v-card class="open-left">
            <v-img src="../assets/library.png" max-width="500" class="left-perspective">
            </v-img>
          </v-card>
        </v-col>
        <v-col justify>
          <v-card color="indigo-lighten-5 ma-2">
            <v-card-title primary-title>
              <h3 class="pa-2 m-1">Library</h3>      
            </v-card-title> 
            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
              <v-img src="../assets/damahub-logo.png" max-width="80" class="left-perspective">
              </v-img>
              Each toolkit has a library and this provides all the tools to contribute data, computations, visualisations and build new network experiment and share those with the network. The library acts like a 'block' explorer for HOP.
            </div>
            <v-btn
              color="success"
              class="mt-12"
              @click="videBentoBoxDSvideo('library')"
            >
              View video
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        class="border-thin pa-md-16"
      >
        <v-col
          align-self="center"
        >
          <v-card>
            <v-card-title primary-title>
              <div>Demo
                  <div v-html="rumbleEmbedCode"></div>
                <!--<iframe width="500" height="315" src="https://www.youtube.com/embed/OZXilez2hK8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
              </div>
            </v-card-title>
          </v-card>
        </v-col>
    </v-row>
    </v-responsive>
  </v-container>
</template>

<script>



export default {
  name: 'features',
  mounted() {
    // Set the cookie with the correct SameSite attribute
    document.cookie = "RNSC=value; SameSite=None; Secure";
  },
  data: () => ({
      featureOverlay: false,
      sourceVideo: 'https://www.youtube.com/embed/cXQcSB4hLfA?si=8JtliJWGxJpJ0HIN',
      rumbleEmbedCode: '<iframe src="https://rumble.com/v6zxnkm-body-composition-withings-scale-with-bentoboxds.html" width="640" height="360" frameborder="0" allowfullscreen></iframe>'
  }),
  methods: {
    videBentoBoxDSvideo (videoURL) {
      this.featureOverlay = !this.featureOverlay
      if (videoURL === 'cues') {
       this.sourceVideo = 'https://www.youtube.com/embed/cXQcSB4hLfA?si=8JtliJWGxJpJ0HIN'
      } else if (videoURL === 'chart') {
        this.sourceVideo = 'https://www.youtube.com/embed/gsftHkr6--g?si=rzZDUnM2Uj0k-yhK'
      } else if (videoURL === 'spaces') {
        this.sourceVideo = 'https://www.youtube.com/embed/gsftHkr6--g?si=rzZDUnM2Uj0k-yhK'
      } else if (videoURL === 'library') {
        this.sourceVideo = 'https://www.youtube.com/embed/6kosPBxo7bE?si=pBn_u_8X0C_DZmtC'
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

</style>
