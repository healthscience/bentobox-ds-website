<template>
  <div class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-resonance-glow selection:text-forest-deep transition-colors duration-300">
    <nav class="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-[var(--nav-bg)]">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="BentoBoxDS Logo" class="w-10 h-10 object-contain" />
        <span class="font-serif text-xl tracking-tight">BentoBoxDS</span>
      </div>
      <div class="flex items-center gap-8">
        <div class="hidden md:flex gap-8 font-mono text-xs text-[var(--nav-text)]">
          <a href="#hero" class="hover:text-resonance-glow transition-colors">ORACLE</a>
          <a href="#log" class="hover:text-resonance-glow transition-colors">beebee</a>
          <a href="#features" class="hover:text-resonance-glow transition-colors">PEER EXPERIENCE</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
    <HeroResonance id="hero" />
    <FeatureGrid id="features" />
    <PilotsLog id="log" />
    <SystemStatus />
    <div class="bento-grid">
      <heli-clock birth-orbital="45"></heli-clock>
    </div>
  </div>
</template>

<script setup>
// Components are auto-imported in Nuxt 3
</script>

<style>
@reference "@/assets/css/main.css";

/* Custom scrollbar for the Caledonian theme */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background-color: var(--color-forest-deep);
}
::-webkit-scrollbar-thumb {
  background-color: var(--color-slate-ghost);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-moss-light);
}

.bento-grid {
  position: absolute;
  right: 10px;
  top: 100px;
  display: grid;
  grid-template-columns: 1fr;
  width: 10vw;
  height: 10vh;
  z-index: 999999;
}
</style>
