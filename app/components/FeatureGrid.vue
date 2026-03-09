<template>
  <div class="bg-black py-24 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-serif text-white mb-16 text-center">The Life-Strap Gallery. Select an instrument. Clone it. Anchor it.</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="feature in features" :key="feature.title" 
             @click="selectedFeature = feature"
             class="p-8 border transition-all cursor-pointer group bg-forest-deep/50"
             :class="[
               selectedFeature?.title === feature.title 
               ? 'border-resonance-glow ring-1 ring-resonance-glow' 
               : 'border-slate-ghost hover:border-resonance-glow'
             ]">
          <UIcon :name="feature.icon" 
                 class="w-10 h-10 mb-6 transition-colors"
                 :class="[
                   selectedFeature?.title === feature.title 
                   ? 'text-resonance-glow' 
                   : 'text-moss-light group-hover:text-resonance-glow'
                 ]" />
          <h3 class="text-xl font-serif text-white mb-4">{{ feature.title }}</h3>
          <p class="text-sm font-mono text-moss-light leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- Detail Section -->
      <Transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-4 opacity-0"
      >
        <div v-if="selectedFeature" class="mt-16 p-8 border border-resonance-glow bg-forest-deep/30 backdrop-blur-sm">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 class="text-2xl font-serif text-white mb-6">{{ selectedFeature.title }} Details</h4>
              <div class="prose prose-invert prose-moss max-w-none">
                <p class="text-moss-light font-mono leading-relaxed mb-6">
                  {{ selectedFeature.longDescription }}
                </p>
                <ul class="space-y-3">
                  <li v-for="spec in selectedFeature.specs" :key="spec" class="flex items-center text-sm font-mono text-resonance-glow/80">
                    <UIcon name="i-heroicons-chevron-right" class="mr-2 w-4 h-4" />
                    {{ spec }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="relative aspect-video bg-black/50 border border-slate-ghost overflow-hidden group">
              <div v-if="selectedFeature.mediaType === 'image'" class="w-full h-full">
                <img :src="selectedFeature.mediaUrl" :alt="selectedFeature.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div v-else-if="selectedFeature.mediaType === 'video'" class="w-full h-full flex items-center justify-center">
                <!-- Placeholder for video -->
                <div class="text-moss-light font-mono text-xs flex flex-col items-center">
                  <UIcon name="i-heroicons-play-circle" class="w-16 h-16 mb-4 text-resonance-glow animate-pulse" />
                  [ VIDEO STREAM: {{ selectedFeature.mediaUrl }} ]
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const selectedFeature = ref(null)

const features = [
  {
    title: 'The Metabolism: Swim for Longevity',
    description: 'How to train your metabolism to swim 400IM goal and age well.',
    longDescription: 'Can you align your cellular engine with the solar arc? This Life-Strap is a blueprint for synchronizing your metabolic windows with the HeliClock. By mapping your swimming sessions and nutrient timing, you move from "burning calories to establishing a phase-locked biological rhythm.',
    action: 'Clone this to bridge your cellular energy to your bioregional light cycle.',
    extend: 'Easily add "Running" or "Cycling" modules to build a complete Triathlete Coherence Map.',
    icon: 'i-heroicons-heart',
    mediaType: 'video',
    mediaUrl: 'resonance_pulse_stream_01.mp4',
    specs: ['Real-time biometric sync', 'Bioregional data integration', 'Circadian rhythm optimization']
  },
  {
    title: 'The energy: Heart emulation',
    description: 'Start with basic geometry of the heart and allow peers and evolutionary learning to refine the model.',
    longDescription: 'Watch the network learn the geometry of your life-support. We start with humble geometric primitives—the Von Mises circle—to map the rhythm of your heart. This isn\'t a "tracker"; it is a state machine that emulates your cardiovascular resonance.',
    action: 'Clone this to see how SafeFlow-ECS turns raw pulse data into a predictive model of your internal state.',
    extend: 'Modify the logic to include HRV (Heart Rate Variability) as a primary "Coherence" trigger.',
    icon: 'i-heroicons-cpu-chip',
    mediaType: 'image',
    mediaUrl: '/logo.png',
    specs: ['Zero-knowledge processing', 'Local-only LLM execution', 'Context-aware automation']
  },
  {
    title: 'Nature: River Flows in a Bioregion',
    description: 'Trace the path from source to sea.',
    longDescription: 'A river is a Gaia intelligence. This Life-Strap allows you to author data on waterflow, rainfall, and quality directly from your local sensors to your sovereign datastore. It connects your personal health to the hydrological health of your home.',
    action: 'Clone this to begin mapping the external "ResonancePulse" of your bioregion.',
    extend: 'Connect soil moisture sensors or local air quality Legos to expand the environmental weave.',
    icon: 'i-heroicons-cube',
    mediaType: 'video',
    mediaUrl: 'emulation_world_render.mp4',
    specs: ['Physics-based modeling', 'Scenario stress testing', 'Resource flow visualization']
  },
  {
    title: 'he Hypothesis: DaisyWorld P2P',
    description: 'Experience the Earth and Sun in resonance.',
    longDescription: 'Based on Lovelock’s original hypothesis, this is a peer-to-peer emulation of a self-regulating world. It demonstrates how simple interactions create global stability.',
    action: 'Clone this to experiment with the math of the Consilience Weave. See how your "Pulse" contributes to a stable, shared planetary temperature.',
    extend: 'Integrate local weather station data to test how real-world shifts impact the DaisyWorld model.',
    icon: 'i-heroicons-shield-check',
    mediaType: 'image',
    mediaUrl: '/logo.png',
    specs: ['End-to-end encryption', 'Decentralized identity', 'Peer-to-peer trust networks']
  }
]

/*

const features = [
  {
    title: 'ResonancePulse',
    description: 'Cell-to-bioregion alignment. A visual heartbeat for your sovereign existence.',
    longDescription: 'The ResonancePulse system synchronizes individual biological rhythms with local ecological cycles. By monitoring environmental data and personal biometrics, it creates a feedback loop that fosters deep connection to your immediate surroundings.',
    icon: 'i-heroicons-heart',
    mediaType: 'video',
    mediaUrl: 'resonance_pulse_stream_01.mp4',
    specs: ['Real-time biometric sync', 'Bioregional data integration', 'Circadian rhythm optimization']
  },
  {
    title: 'BeeBee',
    description: 'Your Tether Management Agent (TINY). Small, local, and fiercely protective of your context.',
    longDescription: 'BeeBee is a localized AI agent designed to operate entirely within your private network. It manages your digital tethers, ensuring that your personal context never leaves your physical control while providing powerful automation.',
    icon: 'i-heroicons-cpu-chip',
    mediaType: 'image',
    mediaUrl: '/logo.png',
    specs: ['Zero-knowledge processing', 'Local-only LLM execution', 'Context-aware automation']
  },
  {
    title: 'Emulation worlds',
    description: 'Ground scientific emulations with practical tools and models.',
    longDescription: 'Create high-fidelity digital twins of complex systems. Whether you are modeling a permaculture garden or a local microgrid, our emulation tools provide the predictive power needed to make informed sovereign decisions.',
    icon: 'i-heroicons-cube',
    mediaType: 'video',
    mediaUrl: 'emulation_world_render.mp4',
    specs: ['Physics-based modeling', 'Scenario stress testing', 'Resource flow visualization']
  },
  {
    title: 'Sovereign Security',
    description: 'Local first use of cryptography to design in data privacy.  Establish trust with peers to build together.',
    longDescription: 'Security built from the ground up using peer-to-peer cryptographic protocols. Establish verifiable trust without central authorities, enabling secure collaboration and resource sharing within your community.',
    icon: 'i-heroicons-shield-check',
    mediaType: 'image',
    mediaUrl: '/logo.png',
    specs: ['End-to-end encryption', 'Decentralized identity', 'Peer-to-peer trust networks']
  }
]


*/

</script>
