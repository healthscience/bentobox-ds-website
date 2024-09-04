<template>
  <v-container grid-list-lg>
    <v-responsive class="d-flex align-top text-center fill-height">
      <v-row row>
        <v-col>
          <v-sheet class="text-h6 pa-2" color="blue-darken-4">The BentoBox Concept</v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
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
        </v-col>
        <v-col>
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
        </v-col>
      </v-row>
      <v-row>
        <v-col>
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
        </v-col>
        <v-col>
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
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: 'concept',
  data: () => ({

  }),
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
