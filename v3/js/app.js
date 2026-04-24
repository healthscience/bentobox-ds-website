/**
 * BentoBoxDS V3: The Sovereign Vessel Interface
 * Pure JS / Local-First / Boreal Aesthetic
 */

class BentoApp {
    constructor() {
        this.hub = document.getElementById('app-hub');
        this.quadrants = document.querySelectorAll('bento-quadrant');
        this.lensOverlay = document.getElementById('lens-overlay');
        this.lensContent = document.getElementById('lens-content');
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = document.getElementById('sun-icon');
        this.moonIcon = document.getElementById('moon-icon');
        this.phaseHeader = document.getElementById('prime-directive');
        this.contextBtns = document.querySelectorAll('.context-btn');
        this.beebeeLayer = document.getElementById('beebee-layer');
        this.interplayLayer = document.getElementById('interplay-layer');
        this.guidebook = document.getElementById('guidebook-story');
        this.lensInstruments = document.getElementById('lens-instruments');
        
        this.currentContext = 'swimming';

        this.init();
    }

    init() {
        // Theme Toggle
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') this.toggleTheme(true);

        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Context Switching
        this.contextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setContext(btn.dataset.context);
            });
        });

        // Event Listeners for UI
        this.quadrants.forEach(q => {
            q.addEventListener('click', () => this.handleQuadrantClick(q.id));
        });

        // Instrument Nav Toggling
        document.querySelectorAll('.instrument-trigger').forEach(trigger => {
            // Get the hash from either data-hash or the legacy onclick string
            const rawOnclick = trigger.getAttribute('onclick');
            const hashMatch = rawOnclick?.match(/'([^']+)'/);
            const targetHash = trigger.getAttribute('data-hash') || (hashMatch ? hashMatch[1] : null);
            
            if (targetHash) {
                trigger.setAttribute('data-hash', targetHash);
                trigger.removeAttribute('onclick');
                
                trigger.addEventListener('click', (e) => {
                    const currentHash = window.location.hash.replace('#', '');
                    if (currentHash === targetHash) {
                        window.location.hash = ''; // Toggle off
                    } else {
                        window.location.hash = targetHash;
                    }
                });
            }
        });

        // Phase Header Navigation
        this.phaseHeader.addEventListener('phase-select', (e) => {
            const phase = e.detail.phase;
            this.phaseHeader.setAttribute('active-phase', phase);
            
            // If we are already in a lens view, just re-route to update content
            if (window.location.hash) {
                this.route();
            } else {
                // If in hub, navigate to representative quadrant
                if (phase === 'story') window.location.hash = 'now-me';
                if (phase === 'interplay') window.location.hash = 'interplay';
                if (phase === 'emulation') window.location.hash = 'future-me';
            }
        });

        // Router
        window.addEventListener('hashchange', () => this.route());
        this.route(); // Initial load
    }

    toggleTheme(init = false) {
        const isLight = document.body.classList.toggle('light-mode', init ? undefined : !document.body.classList.contains('light-mode'));
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (isLight) {
            this.sunIcon.classList.remove('hidden');
            this.moonIcon.classList.add('hidden');
        } else {
            this.sunIcon.classList.add('hidden');
            this.moonIcon.classList.remove('hidden');
        }
    }

    setContext(context) {
        this.currentContext = context;
        this.contextBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.context === context);
        });
        this.route(); // Refresh current view
    }

    handleQuadrantClick(id) {
        window.location.hash = id;
    }

    route() {
        const hash = window.location.hash.replace('#', '');
        
        if (!hash) {
            this.showHub();
            this.phaseHeader.removeAttribute('active-phase');
            return;
        }

        // Default to emulation if no phase is active and we are in a quadrant
        if (!this.phaseHeader.hasAttribute('active-phase') && hash !== 'about' && !hash.startsWith('instruments/')) {
            this.phaseHeader.setAttribute('active-phase', 'emulation');
        }

        const phase = this.phaseHeader.getAttribute('active-phase');

        switch (hash) {
            case 'now-me':
                this.activateLens('tl', 'Now', 'now-me');
                break;
            case 'future-me':
                this.activateLens('tr', 'Projection', 'future-me');
                break;
            case 'now-us':
                this.activateLens('bl', 'Network now', 'now-us');
                break;
            case 'future-us':
                this.activateLens('br', 'Coherence', 'future-us');
                break;
            case 'interplay':
                this.expandNucleus();
                break;
            case 'about':
                this.activateLens('full', 'Philosophical Sanctuary', null);
                this.phaseHeader.removeAttribute('active-phase');
                break;
            default:
                if (hash.startsWith('instruments/')) {
                    this.showInstrument(hash.split('/')[1]);
                }
                break;
        }
    }

    resetUI() {
        this.hub.className = 'quadrant-matrix';
        this.lensOverlay.classList.remove('active');
        this.lensOverlay.classList.remove('instrument-view');
        this.lensOverlay.classList.remove('sanctuary-view');
        this.phaseHeader.removeAttribute('collapsed');
        document.body.classList.remove('lens-view');
        // Removed forcing overflow hidden to allow natural scrolling if designed
        
        // Reset layers immediately to prevent ghosting
        this.beebeeLayer.classList.remove('active');
        this.interplayLayer.classList.remove('active');
        this.beebeeLayer.style.display = 'none';
        this.interplayLayer.style.display = 'none';

        // Reset quadrant attributes
        this.quadrants.forEach(q => {
            q.removeAttribute('collapsed');
            q.removeAttribute('active');
        });
    }

    showHub() {
        // Standard hub state
        this.resetUI();
    }

    activateLens(position, title, activeId) {
        this.resetUI();
        this.hub.classList.add('collapsed');
        this.hub.classList.add(`lens-active-${position}`);
        this.phaseHeader.setAttribute('collapsed', '');
        
        if (activeId === null) {
            this.lensOverlay.classList.add('sanctuary-view');
        }

        // Set collapsed and active states
        this.quadrants.forEach(q => {
            q.setAttribute('collapsed', '');
            if (q.id === activeId) q.setAttribute('active', '');
        });

        document.body.classList.add('lens-view');
        
        // Show overlay immediately
        this.lensOverlay.classList.add('active');
        this.renderLens(title);
    }

    expandNucleus() {
        // Re-routing to a default quadrant or handling specifically if needed
        // For now, let's treat 'interplay' hash as a mode of a quadrant or global
        this.activateLens('full', 'Interplay / Besearch', null);
    }

    renderLens(title) {
        let content = '';
        const hash = window.location.hash.replace('#', '');
        const phase = this.phaseHeader.getAttribute('active-phase') || 'emulation';

        // Update instrument highlights
        document.querySelectorAll('.instrument-trigger').forEach(trigger => {
            const triggerHash = trigger.getAttribute('data-hash') || `instruments/${trigger.querySelector('.inst-label')?.textContent.toLowerCase().replace(' ', '-')}` || '';
            trigger.classList.toggle('active', hash === triggerHash);
        });

        // Slide-out Layers Logic: ONLY active in Story/Interplay mode within a quadrant
        const isInstrument = hash.startsWith('instruments/');
        const isSanctuary = hash === 'about';
        const isQuadrant = ['now-me', 'future-me', 'now-us', 'future-us'].includes(hash);
        
        this.beebeeLayer.classList.toggle('active', phase === 'story' && isQuadrant && !isSanctuary);
        this.interplayLayer.classList.toggle('active', phase === 'interplay' && isQuadrant && !isSanctuary);

        this.beebeeLayer.style.display = this.beebeeLayer.classList.contains('active') ? 'block' : 'none';
        this.interplayLayer.style.display = this.interplayLayer.classList.contains('active') ? 'block' : 'none';

        const pulseMode = phase === 'story' ? 'ghost' : 'full';

        if (phase === 'emulation') {
            content = `
                <div class="emulation-grid">
                    <div class="color-space-placeholder">
                        <p>[ Color Space: ${this.currentContext} ]</p>
                    </div>
                    <div class="clock-display">
                        <heli-clock></heli-clock>
                    </div>
                </div>
            `;
        } else if (phase === 'story') {
            content = `
                <div class="story-lens">
                    <resonance-pulse mode="${pulseMode}" cues='[{"orbit": "metabolic", "angle": 45}]'></resonance-pulse>
                    <p class="manifesto" style="margin-top: 2rem;">Initiating the Sovereign Witness for <strong>${this.currentContext}</strong>.</p>
                </div>
            `;
        } else if (phase === 'interplay') {
            content = `
                <div class="besearch-lens">
                    <resonance-pulse mode="${pulseMode}" cues='[{"orbit": "metabolic", "angle": 45}]'></resonance-pulse>
                </div>
            `;
        }

        if (hash === 'about') {
            content = `
                <div class="sanctuary-lens">
                    <section class="sanctuary-section">
                        <h2>Gaia Intelligences shape health</h2>
                        <p class="opening-call-subtitle">The Opening Call</p>
                        <div class="manifesto-text">
                            <p>At the dawn of super-intelligence, we align with science's living roots: a besearch method — our living cycle of inquiry — where each Peer's breath naturally redraws the map of truth. Here, Gaia intelligences guide every cell toward sovereign health, anchoring the individual pulse into the measurable rhythm of the community and the bioregion.</p>
                            <p>Entering BentoBoxDS is like stepping onto an uncharted continent: It is a Biological Navigation System for the living way.</p>
                        </div>
                    </section>
                </div>
                <div class="manifesto-text">
                <p>
                    Architecture of Participation

                    The Path to the Boreal

                    The goal of BentoBoxDS is to generate a Peer experience on the fly. This is not a static dashboard; it is a Sovereign Skeleton that senses the Peer’s coordinates—biological, temporal, and spatial—and assembles a living world in real-time.

                    This is the PeerStack in motion: where the Algotecture of a home meets the Heli-Sync of the sun and the ResonAgents of the Peer's own cells.

                    The Orrery is active. The map is breathing. The continent is for the Peer to trace.
                    HOP (health oracle protocol) and the path to the Boreal
                </p>
                </div>
            `;
        }

        this.lensContent.innerHTML = `
            <div class="lens-header">
                <h1 class="lens-title">${title}</h1>
                <div class="lens-divider"></div>
            </div>
            <div class="lens-body">
                ${content}
            </div>
        `;

        // Guidebook Text
        let guideText = '';
        if (isSanctuary) {
            this.guidebook.style.display = 'none';
        } else {
            this.guidebook.style.display = 'block';
            if (phase === 'story') {
                guideText = 'Start with a lifestrap story and dialgoue with beebee to build context.';
            } else if (phase === 'interplay') {
                guideText = 'Teach beebee the capacity, context, heli projections and attunement. Attunement means ....';
            } else {
                guideText = `You are currently exploring the <strong>${this.currentContext}</strong> experience through the lens of <strong>${phase}</strong>. The Sovereign Vessel maps biological resonance against the bioregional coherence ledger.`;
            }

            this.guidebook.innerHTML = `
                <h4>Guidebook: ${phase.toUpperCase()} Mode</h4>
                <p>${guideText}</p>
            `;
        }

        // Replicate Instruments triggers
        this.lensInstruments.innerHTML = `
            <div class="instrument-trigger" onclick="location.hash='instruments/heliclock'">
                <span class="inst-icon">H</span>
            </div>
            <div class="instrument-trigger" onclick="location.hash='instruments/life-strap'">
                <span class="inst-icon">L</span>
            </div>
            <div class="instrument-trigger" onclick="location.hash='instruments/resonance-pulse'">
                <span class="inst-icon">R</span>
            </div>
            <div class="instrument-trigger" onclick="location.hash='instruments/besearch'">
                <span class="inst-icon">B</span>
            </div>
        `;
    }


    accelerateEmulation() {
        alert('Time-shift projection initiated. Watching future solar cycles...');
    }

    showInstrument(name) {
        this.resetUI();
        this.hub.classList.add('collapsed');
        this.phaseHeader.setAttribute('collapsed', '');
        this.quadrants.forEach(q => q.setAttribute('collapsed', ''));
        document.body.classList.add('lens-view');

        this.lensOverlay.classList.add('active');
        this.lensOverlay.classList.add('instrument-view'); // Specific class for blur/background
        this.renderLens(`Instrument: ${name}`);
        
        const instruments = {
            'heliclock': {
                title: 'HeliClock',
                purpose: 'Biological Empathy / Solar Alignment / Scientific foundations for time.',
                math: 'Aligns your internal rhythm with the solar cycle using Von Mises geometry to map circadian phase.',
                graft: 'INITIALIZE THIS EXPERIENCE IN BENTOBOX V2'
            },
            'life-strap': {
                title: 'The life-strap scheduler',
                purpose: 'Extract capacity, context & coherence.',
                math: 'Calculates energy requirements, data contexts, and modeling parameters for the Sovereign ID.',
                graft: 'INITIALIZE THIS EXPERIENCE IN BENTOBOX V2'
            },
            'resonance-pulse': {
                title: 'ResonancePulse',
                purpose: 'Geometric Emulation (Von Mises).',
                math: 'Visualizes the density of your life-rhythms based on a consilience weave of metabolic, environment, ecological, and economic orbits.',
                graft: 'INITIALIZE THIS EXPERIENCE IN BENTOBOX V2'
            },
            'besearch': {
                title: 'Besearch',
                purpose: 'A new scientific method for understanding the world.',
                math: 'Sets context data, grounds in research, explores and searches new ideas, warming emulations to understand resonance.',
                graft: 'INITIALIZE THIS EXPERIENCE IN BENTOBOX V2'
            },
            'beebee': {
                title: 'beebee Dialogue & TINY agents',
                purpose: 'Sovereign Wisdom Capture via BeeBee.',
                math: 'Captures thoughts without friction and manages TINY agents to facilitate Wisdom Capture.',
                graft: 'INITIALIZE THIS EXPERIENCE IN BENTOBOX V2'
            },
            'hop-security': {
                title: 'HOP Privacy & Security',
                purpose: 'BentoBoxDS is a local first toolkit.',
                math: 'The HOP (health oracle protocol) establishes trust when working towards coherence with other peers and agents.',
                graft: 'INITIALIZE THIS EXPERIENCE IN BENTOBOX V2'
            }
        };

        const inst = instruments[name];
        if (inst) {
            this.lensContent.innerHTML = `
                <div class="instrument-rollout">
                    <div class="rollout-left">
                        <div class="inst-large-icon">${inst.title[0]}</div>
                    </div>
                    <div class="rollout-right">
                        <div class="inst-section">
                            <h4>Instrument</h4>
                            <p class="inst-name">${inst.title}</p>
                        </div>
                        <div class="inst-section">
                            <h4>Purpose</h4>
                            <p>${inst.purpose}</p>
                        </div>
                        <div class="inst-section">
                            <h4>How it Works</h4>
                            <p class="mono-text">${inst.math}</p>
                        </div>
                        <div class="graft-action">
                            <button class="graft-btn" onclick="alert('Grafting to BentoBox V2...')">${inst.graft}</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize the App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BentoApp();
});
