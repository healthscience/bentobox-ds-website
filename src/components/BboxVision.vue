<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-row
        no-gutters
      >
        <v-col
          align-self="center"
        >
          <v-sheet class="text-h6 pa-2" color="blue-darken-4">Vision</v-sheet>
          <v-card color="indigo-lighten-5 ma-2">
            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
              Our vision is to create a BentoBoxDS app on the fly for each peers needs.  Beta BentoBoxDS provides the understanding and foundations to make this a reality over time while keeping data compatible with HOP.
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>



export default {
  name: 'features',
  data: () => ({
      featureOverlay: false,
      sourceVideo: 'https://www.youtube.com/embed/cXQcSB4hLfA?si=8JtliJWGxJpJ0HIN'
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
