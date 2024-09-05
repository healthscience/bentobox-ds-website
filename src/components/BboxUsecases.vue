<template>
    <v-container grid-list-lg>
        <v-responsive class="d-flex align-top text-center fill-height">
        <v-row
         no-gutters
         id="usecases"
        >
            <v-col class="text-h6 pa-2" color="blue-darken-4">Usecases</v-col>
        </v-row>
        <v-row row wrap>
            <v-col
             xs="12"
             sm="12"
             md="4"
            >
                <v-row>
                    <v-col>
                        <v-sheet  class="text-h6 pa-2" color="blue-darken-4">CITIZEN SCIENCE</v-sheet>
                    </v-col>
                </v-row>
                <v-row>
                    <v-card>
                        <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
                        DIY air quality charts and aggregate data from sensors.
                        </div>
                    </v-card>
                </v-row>
                <v-row>
                    <v-img src="../assets/usecase-1.png" width="500px">
                    </v-img>
                </v-row>
            </v-col>
            <v-col
                xs="12"
                sm="12"
                md="4"
            >
                    <v-row>
                        <v-col>
                            <v-sheet  class="text-h6 pa-2" color="blue-darken-4">HEALTH OPTIMIZATION</v-sheet >
                        </v-col>
                    </v-row>
                    <v-card>
                        <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
                            Use Gadgetbridget to take wearable data ownership.  Visualise data & quantified self analysis.
                        </div>
                        </v-card>
                    <v-img src="../assets/usecase-3.png" width="500px">
                    </v-img>
            </v-col>
            <v-col
              xs="12"
              sm="12"
              md="4"
            >
                    <v-row>
                        <v-col>
                            <v-sheet class="text-h6 pa-2" color="blue-darken-4">PtoP MACHINE LEARNING</v-sheet >
                        </v-col>
                    </v-row>
                        <v-card>
                            <div style="word-break: break-word" class="spacing-playground pa-3 text-justify">
                                E.g. use river flow and rainfall data to collaborate peer to peer to produce future simulations.
                            </div>
                        </v-card>
                    <v-img src="../assets/usecase-2.png" width="500px">
                    </v-img>
            </v-col>
        </v-row>
      </v-responsive> 
    </v-container>
</template>

<script>
export default {
  name: 'HopUsecases'
}
</script>

<style scoped>
</style>
