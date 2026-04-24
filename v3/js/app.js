/**
 * BentoBoxDS V3: The Sovereign Vessel Interface
 * Pure JS / Local-First / Boreal Aesthetic
 */

class BentoApp {
    constructor() {
        this.hub = document.getElementById('app-hub');
        this.nucleus = document.getElementById('nucleus');
        this.quadrants = document.querySelectorAll('bento-quadrant');
        this.lensOverlay = document.getElementById('lens-overlay');
        this.lensContent = document.getElementById('lens-content');
        this.themeToggle = document.getElementById('theme-toggle');
        this.sunIcon = document.getElementById('sun-icon');
        this.moonIcon = document.getElementById('moon-icon');
        this.phaseHeader = document.getElementById('prime-directive');

        this.init();
    }

    init() {
        // Theme Toggle
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') this.toggleTheme(true);

        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Event Listeners for UI
        this.quadrants.forEach(q => {
            q.addEventListener('click', () => this.handleQuadrantClick(q.id));
        });

        this.nucleus.addEventListener('click', () => {
            this.toggleNucleus();
        });

        // Interplay Hover Resonance
        this.nucleus.addEventListener('mouseenter', () => this.phaseHeader.setAttribute('active-phase', 'interplay'));
        this.nucleus.addEventListener('mouseleave', () => this.route());

        // Phase Header Navigation
        this.phaseHeader.addEventListener('phase-select', (e) => {
            const phase = e.detail.phase;
            if (phase === 'story') window.location.hash = 'now-me';
            if (phase === 'interplay') window.location.hash = 'interplay';
            if (phase === 'emulation') window.location.hash = 'future-me';
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

    handleQuadrantClick(id) {
        window.location.hash = id;
    }

    toggleNucleus() {
        if (this.hub.classList.contains('nucleus-expanded')) {
            window.location.hash = '';
        } else {
            window.location.hash = 'interplay';
        }
    }

    route() {
        const hash = window.location.hash.replace('#', '');
        this.resetUI();

        if (!hash) {
            this.showHub();
            this.phaseHeader.removeAttribute('active-phase');
            return;
        }

        switch (hash) {
            case 'now-me':
                this.activateLens('tl', 'Story', 'now-me');
                this.phaseHeader.setAttribute('active-phase', 'story');
                break;
            case 'future-me':
                this.activateLens('tr', 'Emulation', 'future-me');
                this.phaseHeader.setAttribute('active-phase', 'emulation');
                break;
            case 'now-us':
                this.activateLens('bl', 'Network', 'now-us');
                this.phaseHeader.setAttribute('active-phase', 'story');
                break;
            case 'future-us':
                this.activateLens('br', 'Collective', 'future-us');
                this.phaseHeader.setAttribute('active-phase', 'emulation');
                break;
            case 'interplay':
                this.expandNucleus();
                this.phaseHeader.setAttribute('active-phase', 'interplay');
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
        document.body.classList.remove('lens-view');
        
        // Reset quadrant/nucleus attributes
        this.quadrants.forEach(q => {
            q.removeAttribute('collapsed');
            q.removeAttribute('active');
        });
        this.nucleus.removeAttribute('collapsed');
        this.nucleus.removeAttribute('active');
    }

    showHub() {
        // Standard hub state
        this.resetUI();
    }

    activateLens(position, title, activeId) {
        this.resetUI();
        this.hub.classList.add('collapsed');
        this.hub.classList.add(`lens-active-${position}`);
        
        // Set collapsed and active states
        this.quadrants.forEach(q => {
            q.setAttribute('collapsed', '');
            if (q.id === activeId) q.setAttribute('active', '');
        });
        this.nucleus.setAttribute('collapsed', '');

        document.body.classList.add('lens-view');
        
        // Show overlay immediately or with slight delay
        this.lensOverlay.classList.add('active');
        this.renderLens(title);
    }

    expandNucleus() {
        this.resetUI();
        this.hub.classList.add('collapsed');
        this.hub.classList.add('nucleus-expanded');
        
        this.quadrants.forEach(q => q.setAttribute('collapsed', ''));
        this.nucleus.setAttribute('collapsed', '');
        this.nucleus.setAttribute('active', '');

        document.body.classList.add('lens-view');

        this.lensOverlay.classList.add('active');
        this.renderLens('Interplay / Besearch');
    }

    renderLens(title) {
        let content = '';
        const hash = window.location.hash.replace('#', '');

        switch (hash) {
            case 'now-me':
                content = `
                    <div class="story-lens">
                        <p class="manifesto">The initialization of the Sovereign ID. Your witness begins here.</p>
                        <div class="strike-zone">
                            <button id="strike-key" class="strike-btn">Strike Key</button>
                            <p class="hint">Initiate baseline ledger entry</p>
                        </div>
                        <div class="pulse-visual">
                            <div class="soft-pulse"></div>
                        </div>
                    </div>
                `;
                break;
            case 'interplay':
                content = `
                    <div class="besearch-lens">
                        <div class="braids-container">
                            <svg id="besearch-braids" viewBox="0 0 400 200">
                                <!-- Strands will be animated here -->
                                <path class="braid-strand" d="M0,100 C100,0 300,200 400,100" />
                                <path class="braid-strand" d="M0,100 C100,200 300,0 400,100" />
                            </svg>
                        </div>
                        <div class="manual-feature">
                            <h3>Strands & Braids Guide</h3>
                            <p>Context → Research → Search → Emulation</p>
                            <p class="mono-text">Data is braided into a Coherence Ledger locally.</p>
                        </div>
                    </div>
                `;
                break;
            case 'future-me':
                content = `
                    <div class="emulation-lens">
                        <div class="clock-display">
                            <heli-clock></heli-clock>
                        </div>
                        <div class="emulation-controls">
                            <button class="control-btn" onclick="app.accelerateEmulation()">Me Tomorrow</button>
                            <p class="status">Projecting solar cycle health outcomes...</p>
                        </div>
                    </div>
                `;
                break;
            case 'now-us':
                content = `
                    <div class="network-lens">
                        <resonance-pulse cues='[
                            {"orbit": "metabolic", "angle": 45},
                            {"orbit": "environment", "angle": 120},
                            {"orbit": "ecological", "angle": 210},
                            {"orbit": "economic", "angle": 300}
                        ]'></resonance-pulse>
                        <div class="network-status">
                            <p>Peer Resilience: 84%</p>
                        </div>
                    </div>
                `;
                break;
            case 'about':
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

                        <section class="sanctuary-section">
                            <h3>Architecture of Participation</h3>
                            <p class="sanctuary-subtitle">The Path to the Boreal</p>
                            <div class="manifesto-text">
                                <p>The goal of BentoBoxDS is to generate a Peer experience on the fly. This is not a static dashboard; it is a Sovereign Skeleton that senses the Peer’s coordinates—biological, temporal, and spatial—and assembles a living world in real-time.</p>
                                <p>This is the PeerStack in motion: where the Algotecture of a home meets the Heli-Sync of the sun and the ResonAgents of the Peer's own cells.</p>
                            </div>
                        </section>

                        <section class="sanctuary-section">
                            <div class="manifesto-text">
                                <p>The Orrery is active. The map is breathing. The continent is for the Peer to trace. <strong>HOP (health oracle protocol) and the path to the Boreal.</strong></p>
                            </div>
                        </section>
                    </div>
                `;
                break;

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

        if (hash === 'now-me') {
            document.getElementById('strike-key')?.addEventListener('click', () => {
                alert('Baseline Ledger Initialized.');
            });
        }
    }

    accelerateEmulation() {
        alert('Time-shift projection initiated. Watching future solar cycles...');
    }

    showInstrument(name) {
        this.resetUI();
        this.hub.classList.add('collapsed');
        this.quadrants.forEach(q => q.setAttribute('collapsed', ''));
        this.nucleus.setAttribute('collapsed', '');
        document.body.classList.add('lens-view');

        this.lensOverlay.classList.add('active');
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
