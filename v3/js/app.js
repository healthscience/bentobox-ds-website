/**
 * BentoBoxDS V3: The Sovereign Vessel Interface
 * Pure JS / Local-First / Boreal Aesthetic
 */

class BentoApp {
    constructor() {
        console.log('BentoApp constructor');
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
        this.emulationLayer = document.getElementById('emulation-layer');
        this.emulationTitle = document.getElementById('emulation-title');
        this.guidebook = document.getElementById('guidebook-story');
        this.lensInstruments = document.getElementById('lens-instruments');
        this.logo = document.getElementById('vessel-logo');
        this.nucleus = document.getElementById('nucleus');
        
        this.currentContext = 'swimming';

        // Wait for Custom Elements to be ready
        Promise.all([
            customElements.whenDefined('bento-quadrant'),
            customElements.whenDefined('phase-header'),
            customElements.whenDefined('interplay-nucleus')
        ]).then(() => {
            console.log('Custom Elements defined, initializing app');
            this.init();
        });
    }

    init() {
        console.log('BentoApp init triggered');
        
        // Router
        window.addEventListener('hashchange', () => {
            console.log('Hash changed:', window.location.hash);
            this.route();
        });

        // Theme Toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', (e) => {
                console.log('Theme toggle clicked');
                this.toggleTheme();
            });
        }

        // Logo click
        if (this.logo) {
            this.logo.addEventListener('click', (e) => {
                console.log('Logo clicked');
                window.location.hash = '';
            });
        }

        // Context Switching
        this.contextBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('Context btn clicked:', btn.dataset.context);
                this.setContext(btn.dataset.context);
            });
        });

        // Event Listeners for UI
        this.quadrants.forEach(q => {
            console.log('Attaching listener to quadrant:', q.id);
            q.addEventListener('click', (e) => {
                console.log('Quadrant clicked:', q.id);
                this.handleQuadrantClick(q.id);
            });
        });

        // Nucleus click
        if (this.nucleus) {
            this.nucleus.addEventListener('click', (e) => {
                console.log('Nucleus clicked');
                window.location.hash = 'interplay';
            });
        }

        // Instrument Nav Toggling
        const attachInstrumentListeners = (container) => {
            if (!container) return;
            container.querySelectorAll('.instrument-trigger').forEach(trigger => {
                const targetHash = trigger.getAttribute('data-hash');
                if (targetHash) {
                    trigger.addEventListener('click', (e) => {
                        console.log('Instrument footer clicked:', targetHash);
                        const currentHash = window.location.hash.replace('#', '');
                        if (currentHash === targetHash) {
                            window.location.hash = ''; 
                        } else {
                            window.location.hash = targetHash;
                        }
                    });
                }
            });
        };

        attachInstrumentListeners(document.querySelector('.vessel-footer'));

        // Phase Header Navigation
        if (this.phaseHeader) {
            this.phaseHeader.addEventListener('phase-select', (e) => {
                const phase = e.detail.phase;
                console.log('Phase select event:', phase);
                this.phaseHeader.setAttribute('active-phase', phase);
                
                if (window.location.hash) {
                    this.route();
                } else {
                    if (phase === 'story') window.location.hash = 'now-me';
                    if (phase === 'interplay') window.location.hash = 'interplay';
                    if (phase === 'emulation') window.location.hash = 'future-me';
                }
            });
        }

        this.route(); // Initial load
    }

    toggleTheme(init = false) {
        const body = document.body;
        const isLight = body.classList.toggle('light-mode', init ? (localStorage.getItem('theme') === 'light') : !body.classList.contains('light-mode'));
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        if (isLight) {
            if (this.sunIcon) this.sunIcon.classList.remove('hidden');
            if (this.moonIcon) this.moonIcon.classList.add('hidden');
        } else {
            if (this.sunIcon) this.sunIcon.classList.add('hidden');
            if (this.moonIcon) this.moonIcon.classList.remove('hidden');
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

        if (!this.phaseHeader.hasAttribute('active-phase') && hash !== 'about' && hash !== 'sanctuary' && !hash.startsWith('instruments/')) {
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
            case 'sanctuary':
                console.log('Sanctuary mode triggered');
                this.phaseHeader.removeAttribute('active-phase');
                this.activateLens('full', 'Philosophical Sanctuary', null);
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
        
        this.beebeeLayer.classList.remove('active');
        this.interplayLayer.classList.remove('active');
        this.emulationLayer.classList.remove('active');
        this.beebeeLayer.style.display = 'none';
        this.interplayLayer.style.display = 'none';
        this.emulationLayer.style.display = 'none';

        this.quadrants.forEach(q => {
            q.removeAttribute('collapsed');
            q.removeAttribute('active');
        });

        if (this.nucleus) {
            this.nucleus.removeAttribute('collapsed');
            this.nucleus.removeAttribute('active');
        }
    }

    showHub() {
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

        this.quadrants.forEach(q => {
            q.setAttribute('collapsed', '');
            if (q.id === activeId) q.setAttribute('active', '');
        });

        if (this.nucleus) {
            this.nucleus.setAttribute('collapsed', '');
        }

        document.body.classList.add('lens-view');
        this.lensOverlay.classList.add('active');
        this.renderLens(title);
    }

    expandNucleus() {
        this.activateLens('full', 'Interplay / Besearch', null);
    }

    renderLens(title) {
        let content = '';
        const hash = window.location.hash.replace('#', '');
        const phase = this.phaseHeader.getAttribute('active-phase') || 'emulation';

        document.querySelectorAll('.instrument-trigger').forEach(trigger => {
            const triggerHash = trigger.getAttribute('data-hash') || `instruments/${trigger.querySelector('.inst-label')?.textContent.toLowerCase().replace(' ', '-')}` || '';
            trigger.classList.toggle('active', hash === triggerHash);
        });

        const isInstrument = hash.startsWith('instruments/');
        const isSanctuary = hash === 'about' || hash === 'sanctuary';
        const isQuadrant = ['now-me', 'future-me', 'now-us', 'future-us'].includes(hash);

        if (this.lensInstruments) this.lensInstruments.style.display = isSanctuary ? 'none' : 'flex';
        if (this.guidebook) this.guidebook.style.display = isSanctuary ? 'none' : 'block';
        
        this.beebeeLayer.classList.toggle('active', phase === 'story' && isQuadrant && !isSanctuary);
        this.interplayLayer.classList.toggle('active', phase === 'interplay' && isQuadrant && !isSanctuary);
        this.emulationLayer.classList.toggle('active', phase === 'emulation' && isQuadrant && !isSanctuary);

        this.beebeeLayer.style.display = this.beebeeLayer.classList.contains('active') ? 'block' : 'none';
        this.interplayLayer.style.display = this.interplayLayer.classList.contains('active') ? 'block' : 'none';
        this.emulationLayer.style.display = this.emulationLayer.classList.contains('active') ? 'flex' : 'none';

        if (this.emulationLayer.classList.contains('active')) {
            this.emulationTitle.textContent = `Now ${this.currentContext.charAt(0).toUpperCase() + this.currentContext.slice(1)}`;
        }

        const pulseMode = phase === 'story' ? 'ghost' : 'full';

        if (hash === 'about' || hash === 'sanctuary') {
            content = `
                <div class="sanctuary-lens">
                    <section class="sanctuary-section">
                        <h2>Gaia Intelligences Shape Health</h2>
                        <p class="opening-call-subtitle">The Opening Call</p>
                        <div class="manifesto-text">
                            <p>At the dawn of super-intelligence, we align with science's living roots: a besearch method—our living cycle of inquiry—where each Peer's breath naturally redraws the map of truth. Here, Gaia intelligences guide every cell toward sovereign health, anchoring the individual pulse into the measurable rhythm of the community and the bioregion.</p>
                            <p>This is the Attunement of health. Entering BentoBoxDS is like stepping onto an uncharted continent: It is a Biological Navigation System designed to inhabit this living way.</p>
                        </div>
                    </section>

                    <section class="sanctuary-section">
                        <h2>Architecture of Participation</h2>
                        <p class="opening-call-subtitle">The Path to the Boreal V2</p>
                        <div class="manifesto-text">
                            <p>The goal of BentoBoxDS is to generate a Peer experience on the fly. This is not a static dashboard; it is a Sovereign Skeleton that senses the Peer’s coordinates—biological, temporal, and spatial—and assembles a living world in real-time.</p>
                            <p>Life is not a rehearsal; it is a real-player game where Attunement replaces the passive interventions of the old world. This is the PeerStack in motion: where the Algotecture of a home meets the Heli-Sync of the sun and the ResonAgents of the Peer's own cells. The Orrery is active. The map is breathing. The continent is for the Peer to trace.</p>
                            <p>BentoBoxDS is a primary implementation of the Health Oracle Protocol (HOP), an open-source substrate designed for local-first, peer-to-peer life. This is an architecture of participation; peers can couple new experiences directly into the environment by utilizing the Skeleton Documentation and testing metabolic logic within the HOP Playground.</p>
                            <p>Beyond the desktop, the vision involves shrinking the HOP-shim to inhabit mobile apps and tiny devices. Through this Melding process, hardware like vagus-straps or sensing-skin will feed live data into the local SafeFlow-ECS, transforming the BentoBox into a portable, biological compass that keeps the pulse in phase with the Heli-Sync wherever the Peer travels.</p>
                        </div>
                    </section>
                </div>
            `;
        } else if (hash === 'now-me' && phase === 'story') {
            content = `
                <div class="now-me-story">
                    <div class="column-left">
                        <h1 class="now-title">Now</h1>
                        <div class="color-space-indicator"></div>
                        <p class="context-word">${this.currentContext}</p>
                    </div>
                    <div class="column-center">
                        <resonance-pulse mode="${pulseMode}" cues='[{"orbit": "metabolic", "angle": 45}, {"orbit": "ecological", "angle": 135}]'></resonance-pulse>
                    </div>
                    <div class="column-right">
                        <heli-clock></heli-clock>
                    </div>
                </div>
            `;
        } else if (phase === 'emulation') {
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

        const hideHeader = (hash === 'now-me' && phase === 'story');

        this.lensContent.innerHTML = `
            <div class="lens-header" style="${hideHeader ? 'display:none' : ''}">
                <div class="lens-title-row">
                    <h1 class="lens-title">${title}</h1>
                    ${!isSanctuary ? `<span class="phase-badge">${phase.toUpperCase()} MODE</span>` : ''}
                </div>
                <div class="lens-divider"></div>
            </div>
            <div class="lens-body">
                ${content}
            </div>
        `;

        // Guidebook Text
        let guideText = '';
        if (isSanctuary) {
            if (this.guidebook) this.guidebook.style.display = 'none';
            if (this.lensInstruments) this.lensInstruments.style.display = 'none';
        } else {
            if (this.guidebook) this.guidebook.style.display = 'block';
            if (this.lensInstruments) this.lensInstruments.style.display = 'flex';
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
            <div class="instrument-trigger" data-hash="instruments/heliclock" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <span class="inst-icon">H</span>
            </div>
            <div class="instrument-trigger" data-hash="instruments/life-strap" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <span class="inst-icon">L</span>
            </div>
            <div class="instrument-trigger" data-hash="instruments/resonance-pulse" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <span class="inst-icon">R</span>
            </div>
            <div class="instrument-trigger" data-hash="instruments/besearch" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <span class="inst-icon">B</span>
            </div>
        `;

        // Re-attach listeners for the new triggers
        if (this.lensInstruments) {
            this.lensInstruments.querySelectorAll('.instrument-trigger').forEach(trigger => {
                const targetHash = trigger.getAttribute('data-hash');
                trigger.addEventListener('click', (e) => {
                    console.log('Lens instrument clicked:', targetHash);
                    const currentHash = window.location.hash.replace('#', '');
                    if (currentHash === targetHash) {
                        window.location.hash = ''; 
                    } else {
                        window.location.hash = targetHash;
                    }
                });
            });
        }
    }

    accelerateEmulation() {
        console.log('Time-shift projection initiated. Watching future solar cycles...');
    }

    showInstrument(name) {
        this.resetUI();
        this.hub.classList.add('collapsed');
        this.phaseHeader.setAttribute('collapsed', '');
        this.quadrants.forEach(q => q.setAttribute('collapsed', ''));
        document.body.classList.add('lens-view');

        this.lensOverlay.classList.add('active');
        this.lensOverlay.classList.add('instrument-view');
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
                            <button class="graft-btn" onclick="console.log('Grafting to BentoBox V2...')">${inst.graft}</button>
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
