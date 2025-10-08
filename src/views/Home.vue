<template>
  <v-container fluid fill-height>
    <div class="hop-waves">
      <bento-box></bento-box>
      <bbox-learn></bbox-learn>
      <network-board></network-board>
      <bbox-vision></bbox-vision>
      <bbox-features></bbox-features>
      <bbox-usecases></bbox-usecases>
      <Bbox-concept></Bbox-concept>
    </div>
  </v-container>
</template>

<script setup>
import BentoBox from '@/components/BentoBox'
import NetworkBoard from '@/components/networkBoards'
import BboxLearn from '@/components/BboxLearn'
import BboxVision from '@/components/BboxVision'
import BboxFeatures from '@/components/BboxFeatures'
import BboxUsecases from '@/components/BboxUsecases'
import BboxConcept from '@/components/BboxConcept'

</script>

<style>
.hop-waves {
  background-color: 'purple lighten-5';
  background-position: center center;
  background-repeat: repeat-y;
  width: 100%;
  height: 100%;
}
</style>
