<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-forest-deep">
    <div class="relative z-10 text-center mb-12 px-4">
      <h1 class="text-5xl md:text-7xl font-serif text-white mb-6">
        Gaia Intelligences shape health 
      </h1>
      
      <div class="max-w-3xl mx-auto space-y-8">
        <p class="text-resonance-glow font-mono tracking-widest uppercase text-sm md:text-base">
          The Opening Call
        </p>

        <div class="text-xl md:text-2xl font-mono text-moss-light space-y-6 leading-relaxed">
          <p>
            At the dawn of super-intelligence, we choose another way: a living map traced by the breath of each Peer, where Gaia intelligences guide every cell toward sovereign health.
          </p>

          <p>
            Entering BentoBoxDS is like stepping onto an uncharted continent. It is a Biological Navigation System that empowers sovereign health—letting every Peer tune into the planetary rhythm and turning personal, community, and bioregion health into a shared, measurable pulse of the Earth.
          </p>
        </div>
      </div>
    </div>

    <div class="relative w-96 h-96 flex items-center justify-center cursor-pointer" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
      <Transition
        mode="out-in"
        @enter="onEnter"
        @leave="onLeave"
      >
        <ResonancePulseghost v-if="!isHovered && !isScrolled" key="ghost" :x="50" :y="50" />
        <ResonancePulse v-else key="active" :cues="mockCues" :solar-angle="45" />
      </Transition>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-resonance-glow">
      <UIcon name="i-heroicons-chevron-double-down" class="w-8 h-8" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isHovered = ref(false)
const isScrolled = ref(false)

const mockCues = [
  { id: 1, orbit: 'metabolic', angle: 45, active: true },
  { id: 2, orbit: 'ecological', angle: 50, active: true },
  { id: 3, orbit: 'economic', angle: 55, active: true },
  { id: 4, orbit: 'environment', angle: 48, active: true }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const onEnter = (el, done) => {
  gsap.fromTo(el, 
    { opacity: 0, scale: 0.8 }, 
    { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', onComplete: done }
  )
}

const onLeave = (el, done) => {
  gsap.to(el, 
    { opacity: 0, scale: 1.2, duration: 0.5, ease: 'power3.in', onComplete: done }
  )
}
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>
