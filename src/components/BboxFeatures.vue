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
            The BentoBoxDS toolkit is a graphical interface to chart and visualise data without the need for coding.  Collaborate and coordinate N=1 experiment / machine learning peer to peer using the <a href="https://www.healthscience.network">health oracle protocol</a>
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
              <h3 class="pa-2 m-1">Chat charting</h3>      
            </v-card-title> 
            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
              The toolkit chatbot, BeeBee can be prompted with the "chart" keyword to chart data directly e.g. chart 1 2 3 or via the keyword upload to add e.g. csv file.  BeeBee will also collaborate with other AI's e.g a LLM or evolutionary algorithms.
            </div>
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
                <iframe width="500" height="315" src="https://www.youtube.com/embed/OZXilez2hK8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
  name: 'features'
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
