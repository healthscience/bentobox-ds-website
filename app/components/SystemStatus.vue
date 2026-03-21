<template>
  <footer class="bg-forest-deep border-t border-slate-ghost py-12 px-6 font-mono">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        <div>
          <div class="text-resonance-glow mb-4 flex items-center gap-2">
            <span class="animate-pulse">●</span> SYSTEM STATUS: EXPERIMENTAL
          </div>
          <div class="text-xs text-moss-light space-y-1 opacity-70">
            <p>> BENTOBOXDS_CORE_V0.6.0_CALEDONIAN</p>
            <p>> LOCAL_NODE: Download</p>
            <p>> RESONANCE_SYNC: -</p>
            <p>> TETHER_AGENT: BEEBEE_V0.5</p>
          </div>
        </div>
        
        <div class="md:text-right space-y-6">
          <div class="flex flex-col md:flex-row gap-4 justify-end">
            <UButton 
              to="https://github.com/healthscience/bentoboxds" 
              target="_blank"
              color="gray" 
              variant="ghost"
              icon="i-simple-icons-github"
            >
              Architecture of Participation
            </UButton>
            <UButton 
              color="primary" 
              class="bg-resonance-glow text-forest-deep hover:bg-white transition-colors"
            >
              Download BentoBoxDS
            </UButton>
          </div>
          
          <div class="pt-4 text-left md:text-right">
            <div class="text-xs text-moss-light space-y-4 mb-4 opacity-80 leading-relaxed">
              <p class="text-resonance-glow font-bold uppercase tracking-wider">The Path to the Boreal</p>

              <p>The goal of BentoBoxDS is to generate a Peer experience on the fly. This is not a static dashboard; it is a Sovereign Skeleton that senses the Peer’s coordinates—biological, temporal, and spatial—and assembles a living world in real-time.</p>

              <p>This is the PeerStack in motion: where the Algotecture of a home meets the Heli-Sync of the sun and the ResonAgents of the Peer's own cells.</p>

              <p>The Orrery is active. The map is breathing. The continent is for the Peer to trace.</p>
            </div>
            <NuxtLink 
              to="https://healthscience.network" 
              target="_blank"
              class="text-moss-light hover:text-resonance-glow transition-colors flex items-center md:justify-end gap-2"
            >
              HOP (health oracle protocol) and the path to the Boreal<UIcon name="i-heroicons-arrow-right" />
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="mt-12 pt-8 border-t border-slate-ghost/30 text-[10px] text-slate-ghost flex justify-between">
        <span>© 2026 BENTOBOXDS.ORG</span>
        <span>ENCRYPTED VIA SOVEREIGN_SAFEFLOW</span>
      </div>
    </div>
  </footer>
</template>
