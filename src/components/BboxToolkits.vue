<template>
  <v-container grid-list-lg>
    <v-layout row>
        <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5 color pink lighten-5">Toolkits</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-title primary-title>
            <v-flex xs12 sm12 md4>
                <v-img src="../assets/bb-ds-toolkit.png" width="300px">
                </v-img>
            </v-flex>
            <v-flex xs12 sm12 md8>
                <h3 class="headline mb-0 font-weight-bold">BentoBox DS</h3>
                <div style="word-break: break-word" class="spacing-playground pa-3 font-weight-regular">
                  A graphical interface to connect to the Health Oracle Network and manage visualisation. No coding skills are required.
                  <v-btn href="https://youtube.com/playlist?list=PLNaKqNNZpYPNBA9rN-E34CFWu_3rPdy9p" target="_blank">
                    <span class="mr-2">video demos</span>
                  </v-btn>
                </div>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-title primary-title>
            <v-flex xs12 sm12 md8>
                <h3 class="headline mb-0 font-weight-bold">Network Library</h3>
                <div style="word-break: break-word" class="spacing-playground pa-3 font-weight-regular">
                  A graphical interface to desribe new reference (smart) contracts entering the network.
                  <v-btn href="https://youtu.be/vHA9TExaKBA" target="_blank">
                    <span class="mr-2">demo</span> video.
                  </v-btn>
                  The Network Library is a
                  <v-btn href="https://github.com/DaMaHub/networklibrary" target="_blank">
                    <span class="mr-2">DaMaHub</span> project.
                  </v-btn>
                </div>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-img src="../assets/damahub-logo.png" width="150px">
              </v-img>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HopLearn'
}
</script>

<style scoped>
</style>
