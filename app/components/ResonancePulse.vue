<template>
  <div class="resonance-pulse-container">
    <svg viewBox="-50 -50 100 100" class="resonance-svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <circle class="orbit-ring economic-ring" r="42" />
      <circle class="orbit-ring ecological-ring" r="32" />
      <circle class="orbit-ring environment-ring" :class="activeEnvType" r="22" />
      <circle class="orbit-ring metabolic-ring" r="12" />

      <line 
        v-if="hasResonance"
        x1="0" y1="0" 
        :x2="resonanceLine.x" :y2="resonanceLine.y"
        class="resonance-spoke"
      />

      <circle 
        v-for="cue in activeCues" 
        :key="cue.id"
        :class="['cue-point', cue.orbit, { 'pulse': cue.active }]" 
        :cx="cue.x" 
        :cy="cue.y" 
        r="1.5"
      />
      
      <line x1="0" y1="0" :x2="solarHand.x" :y2="solarHand.y" class="solar-hand" />
    </svg>

    <div class="pulse-legend" :class="{ 'is-visible': showLegend }">
      <div v-if="showLegend" class="legend-content">
        <div v-for="ring in ringInfo" :key="ring.label" class="legend-item">
          <span class="dot" :style="{ backgroundColor: ring.color }"></span>
          <span class="label">{{ ring.label }}</span>
        </div>
      </div>
      <button @click="showLegend = !showLegend" class="toggle-legend-btn">?</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showLegend = ref(false);

const ringInfo = [
  { label: 'Economic', color: '#b6ff3b' },
  { label: 'Ecological', color: '#40e0ff' },
  { label: 'Environment', color: '#ffffff' },
  { label: 'Metabolic', color: '#ff4d4d' }
];

const props = defineProps({
  cues: { type: Array, default: () => [] },
  solarAngle: { type: Number, default: 0 },
  currentEnv: { type: String, default: 'indoor' }
});

// 1. Math: Map angles to X/Y coordinates
const activeCues = computed(() => {
  return props.cues.map(cue => {
    const radiusMap = { metabolic: 12, environment: 22, ecological: 32, economic: 42 };
    const r = radiusMap[cue.orbit] || 10;
    const rad = (cue.angle - 90) * (Math.PI / 180);
    return {
      ...cue,
      x: r * Math.cos(rad),
      y: r * Math.sin(rad)
    };
  });
});

// 2. Logic: Are the dots clustering?
const hasResonance = computed(() => {
  if (props.cues.length < 2) return false;
  const angles = props.cues.map(c => c.angle);
  return (Math.max(...angles) - Math.min(...angles)) < 20;
});

// 3. Logic: Draw the line toward the average of the cluster
const resonanceLine = computed(() => {
  if (!hasResonance.value) return { x: 0, y: 0 };
  const avgAngle = props.cues.reduce((acc, c) => acc + c.angle, 0) / props.cues.length;
  const rad = (avgAngle - 90) * (Math.PI / 180);
  return { x: 42 * Math.cos(rad), y: 42 * Math.sin(rad) };
});

const solarHand = computed(() => {
  const rad = (props.solarAngle - 90) * (Math.PI / 180);
  return { x: 45 * Math.cos(rad), y: 45 * Math.sin(rad) };
});

const activeEnvType = computed(() => props.currentEnv || 'indoor');
</script>

<style scoped>
.resonance-pulse-container {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;
  background: transparent;
}

.resonance-svg {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  overflow: visible; /* Ensure glows aren't clipped */
  z-index: 1;
}

.pulse-legend {
  grid-area: 1 / 1;
  z-index: 10;
  justify-self: end;
  align-self: end;
  display: grid;
  gap: 8px;
  padding: 12px;
  pointer-events: none;
}

.legend-content, .toggle-legend-btn {
  pointer-events: auto;
}

.legend-content {
  display: grid;
  gap: 4px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.legend-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  color: #fff;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.toggle-legend-btn {
  justify-self: end;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  display: grid;
  place-items: center;
}

.orbit-ring {
  fill: none;
  stroke: #ffffff; /* Solid white for maximum visibility */
  stroke-width: 1.5;
  opacity: 0.5; /* Use opacity for softness instead of rgba in stroke */
  transition: stroke 0.5s ease;
}

/* Specific ring accents to make them distinct */
.metabolic-ring { stroke: #ff4d4d; opacity: 0.8; }
.ecological-ring { stroke: #40e0ff; opacity: 0.8; }
.economic-ring { stroke: #b6ff3b; opacity: 0.8; }


/* Ensure these class names match the 'orbit' property in your data exactly */
.cue-point.metabolic  { fill: #ff4d4d !important; }
.cue-point.environment { fill: #ffffff !important; }
.cue-point.ecological { fill: #40e0ff !important; }
.cue-point.economic   { fill: #b6ff3b !important; }

/* The NEW Environment Layer accents */
.environment-ring.indoor { stroke: #00f2ff; stroke-width: 1.2; opacity: 0.8; stroke-dasharray: 2 2; }
.environment-ring.natural { stroke: #b6ff3b; stroke-width: 1.2; opacity: 0.8; }
.environment-ring.river { stroke: #4d94ff; stroke-width: 1.2; opacity: 0.8; }

.resonance-spoke { stroke: #fff; stroke-width: 0.8; filter: url(#glow); }
.solar-hand { stroke: #00f2ff; stroke-width: 0.4; stroke-dasharray: 1 1; }

/* Ensure dots are large enough to see */
.cue-point { r: 2; filter: drop-shadow(0 0 3px currentColor); }
</style>
