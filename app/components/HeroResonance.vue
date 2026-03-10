<template>
  <div class="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-forest-deep">
    <div class="relative z-10 text-center mb-12">
      <h1 class="text-5xl md:text-7xl font-serif text-white mb-4">
        Gaia Inintelligences shape health 
      </h1>
      <p class="text-xl md:text-2xl font-mono text-moss-light max-w-2xl mx-auto">
        BentoBoxDS: The Peer Specification
A Biological Navigation System for Sovereign Health.

Pulsing starts with an individual resonance. Energy syncs to the solar cycle. Peer-to-peer coherence builds—from the cell to the bioregion.
      </p>
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
