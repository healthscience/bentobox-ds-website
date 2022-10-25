<template>
    <v-container grid-list-lg>
        <v-layout row>
            <v-flex xs12 class="text-xs-center display-1 font-weight-black my-5 color blue lighten-5">Usecases</v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm12 md4>
                <v-card>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline white--text color blue dark pa-2">CITIZEN SCIENCE</span>
                        </v-flex>
                    </v-layout>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">DIY air quality</h3>
                            <div style="word-break: break-word">
                              Chart and aggregate data from sensor data.
                            </div>
                        </div>
                    </v-card-title>
                    <v-img src="../assets/usecase-1.png" width="500px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <!-- <span class="headline white--text color blue dark pa-2">Air Quality</span> -->
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md4>
                <v-card>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline white--text color blue dark pa-2">HEALTH OPTIMIZATION</span>
                        </v-flex>
                    </v-layout>
                    <v-card-title primary-title>
                        <div>
                            <!--<h3 class="headline mb-0">Wearables</h3>-->
                            <div style="word-break: break-word">
                              Use Gadgetbridget to take wearable data ownership.  Visualise data & quantified self analysis.
                            </div>
                        </div>
                    </v-card-title>
                    <v-img src="../assets/usecase-3.png" width="500px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <!-- <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text color blue dark pa-2">Wearables</span>
                                </v-flex> -->
                            </v-layout>
                        </v-container>
                    </v-img>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md4>
                <v-card>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span class="headline white--text color blue dark pa-2">PtoP MACHINE LEARNING</span>
                        </v-flex>
                    </v-layout>
                    <v-card-title primary-title>
                        <div>
                            <!--<h3 class="headline mb-0">Water simulations</h3>-->
                            <div style="word-break: break-word">
                                E.g. use river flow and rainfall data to collaborate peer to peer to produce future simulations.
                            </div>
                        </div>
                    </v-card-title>
                    <v-img src="../assets/usecase-2.png" width="500px">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <!-- <span class="headline white--text color blue dark pa-2">Water</span> -->
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'HopUsecases'
}
</script>

<style scoped>
</style>
