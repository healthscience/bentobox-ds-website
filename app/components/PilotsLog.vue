<template>
  <div class="bg-[var(--bg-primary)] py-24 px-6 transition-colors duration-300">
    <div class="max-w-4xl mx-auto relative">
      <!-- Timeline Line -->
      <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-ghost -translate-x-1/2 hidden md:block"></div>

      <div v-for="(demo, index) in demos" :key="demo.title" 
           class="relative mb-24 flex flex-col md:flex-row items-center"
           :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''">
        
        <!-- Content -->
        <div class="w-full md:w-1/2 p-8" :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'">
          <h3 class="text-3xl font-serif text-resonance-glow mb-4">{{ demo.title }}</h3>
          <p class="text-lg font-mono text-[var(--text-secondary)] mb-6">{{ demo.description }}</p>
          <div class="p-4 border border-slate-ghost rounded bg-[var(--bg-primary)]/20 backdrop-blur-sm">
            <p class="text-sm text-[var(--text-primary)]/60 italic">{{ demo.feature }}</p>
          </div>
        </div>

        <!-- Dot -->
        <div class="absolute left-0 md:left-1/2 w-4 h-4 bg-resonance-glow rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_#00FFC2]"></div>

        <!-- Visual Placeholder -->
        <div class="w-full md:w-1/2 p-8 flex justify-center">
          <div class="w-64 h-64 border-2 border-dashed border-slate-ghost rounded-full flex items-center justify-center text-slate-ghost font-mono text-xs text-center p-4">
            <div class="image-bb" v-if="index === 0">
              <img :src="heliClockImage" alt="HeliClock" class="w-64 h-64 object-contain mt-4">
            </div>
            <div class="image-bb" v-if="index === 1">
              <img :src="energystrapImage" alt="beebeeChat" class="w-64 h-64 object-contain mt-4">
            </div>
            <div class="image-bb" v-if="index === 2">
              <img :src="resonanceImage" alt="beebeeChat" class="w-64 h-64 object-contain mt-4">
            </div>
            <div class="image-bb" v-if="index === 3">
              <img :src="besearchImage" alt="beebeeChat" class="w-64 h-64 object-contain mt-4">
            </div>
            <div class="image-bb" v-if="index === 4">
              <img :src="beebeechatImage" alt="beebeeChat" class="w-64 h-64 object-contain mt-4">
            </div>
            <div class="image-bb" v-if="index === 5">
              <img :src="privacyImage" alt="beebeeChat" class="w-64 h-64 object-contain mt-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import heliClockImage from '@/assets/heliclock-circle.png'
import energystrapImage from '@/assets/energystrap-circle.png'
import resonanceImage from '@/assets/respulse-1g.png'
import besearchImage from '@/assets/besearch-cycle-web.png'
import beebeechatImage from '@/assets/beebeechat-circle.png'
import privacyImage from '@/assets/secure-circle.png'

const demos = [
  {
    title: 'HeliClock',
    description: 'Biological Empathy / Solar Alignment / Scientific foundations for time.',
    feature: 'Aligns your internal rhythm with the solar cycle.'
  },
  {
    title: 'The life-strap scheduler',
    description: 'Extract capacity, context & coherence',
    feature: 'What energy is required? What data? How to model?'
  },
    {
    title: 'ResonancePulse',
    description: 'Geometric Emulation (Von Mises).',
    feature: 'Visualizing the density of your life-rhythms based on a consilience weave.'
  },
  {
    title: 'Besearch',
    description: 'A new scientific method for understanding the world.',
    feature: 'Set context data, ground in research, explore and search new ideas, warm emulations to visualize.'
  },
  {
    title: 'beebee Dialogue & TINY agents',
    description: 'Sovereign Wisdom Capture via BeeBee.',
    feature: 'Capture thoughts without friction, help & manage TINY agent.'
  },
  {
    title: 'HOP Privacy & Security',
    description: 'BentoBoxDS is a local first toolkit',
    feature: 'The HOP (health oracle protocol) establishes trust when working towards coherence with other peers and agents'
  }
]
</script>
