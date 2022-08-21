<template>
  <v-container fluid fill-height>
    <div class="hop-waves">
      <bento-box></bento-box>
      <Bbox-learn></Bbox-learn>
      <!-- <Bbox-toolkits></Bbox-toolkits> -->
      <Bbox-usecases></Bbox-usecases>
    </div>
  </v-container>
</template>

<script>
import BentoBox from '@/components/BentoBox'
import BboxLearn from '@/components/BboxLearn'
// import BboxToolkits from '@/components/BboxToolkits'
import BboxUsecases from '@/components/BboxUsecases'

export default {
  name: 'Bentobox-Content',
  components: {
    BentoBox,
    BboxLearn,
    // BboxToolkits,
    BboxUsecases
  }
}
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
