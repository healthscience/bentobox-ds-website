<template>
  <div class="pulse-container">
    <svg viewBox="0 0 200 200" class="ghost-svg w-full h-full">
      <defs>
        <filter id="ghost-blur">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
        <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0, 255, 194, 0.2)" />
          <stop offset="50%" stop-color="rgba(0, 255, 194, 0.8)" />
          <stop offset="100%" stop-color="rgba(0, 255, 194, 0.2)" />
        </linearGradient>
      </defs>
      <circle 
        cx="100" cy="100" r="70" 
        fill="rgba(0, 255, 194, 0.01)" 
        stroke="url(#pulse-grad)" 
        stroke-width="2"
        filter="url(#ghost-blur)"
        class="pulse-ring"
      />
    </svg>
  </div>
</template>

<script setup>
// Cleaned up for Caledonian Launch
</script>

<style scoped>
.pulse-container {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.pulse-ring {
  transform-origin: center;
  animation: breathe 4s infinite ease-in-out;
}
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
}
</style>
