/**
 * PhaseHeader: The Prime Directive Logic Rail
 */
export class PhaseHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        // Set initial theme if attribute exists
        if (this.hasAttribute('theme')) {
            this.updateTheme(this.getAttribute('theme'));
        }
    }

    static get observedAttributes() {
        return ['active-phase', 'collapsed', 'theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-phase') {
            this.updateActivePhase();
        } else if (name === 'collapsed') {
            this.updateCollapsed();
        } else if (name === 'theme') {
            this.updateTheme(newValue);
        }
    }

    updateTheme(theme) {
        // We now use :host([theme="light"]) in CSS, but keeping this 
        // for manual class toggling if needed or for component state
        const link = this.shadowRoot.querySelector('.hop-link');
        if (link) {
            link.classList.toggle('light-mode', theme === 'light');
        }
        // Force a host attribute update if called manually
        if (this.getAttribute('theme') !== theme) {
            this.setAttribute('theme', theme);
        }
    }

    updateActivePhase() {
        const active = this.getAttribute('active-phase');
        const items = this.shadowRoot.querySelectorAll('.phase-item');
        items.forEach(item => {
            item.classList.toggle('active', item.dataset.phase === active);
        });
    }

    updateCollapsed() {
        const isCollapsed = this.hasAttribute('collapsed');
        this.shadowRoot.querySelector('.phase-rail').classList.toggle('collapsed', isCollapsed);
        this.shadowRoot.host.classList.toggle('collapsed', isCollapsed);
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                width: 100%;
                padding: 2rem 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: transparent;
                z-index: 100;
                transition: all 0.5s ease;
            }

            :host(.collapsed) {
                padding: 0;
                margin: 0;
            }

            .phase-rail {
                display: flex;
                align-items: center;
                gap: 4rem;
                transition: all 0.5s ease;
                margin-bottom: 2rem;
            }

            .phase-rail.collapsed {
                gap: 2rem;
                margin-bottom: 0;
            }

            .phase-item {
                font-family: var(--font-humanist);
                font-size: 2rem;
                text-transform: uppercase;
                letter-spacing: 8px;
                color: var(--text-secondary);
                opacity: 0.2;
                transition: all 0.5s var(--transition-easing, ease);
                padding: 1rem 2rem;
                border: 1px solid transparent;
                cursor: pointer;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
            }

            .phase-rail.collapsed .phase-item {
                font-size: 0.8rem;
                letter-spacing: 4px;
                padding: 0.5rem 1rem;
            }

            .phase-item:hover {
                opacity: 0.8;
                color: var(--color-cyber-lime);
                letter-spacing: 10px;
                background: var(--glass-bg);
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }

            .phase-item:active {
                transform: translateY(0) scale(0.98);
            }

            .directive-label {
                font-family: var(--font-mono);
                font-size: 0.7rem;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: var(--color-resonance-glow);
                opacity: 0.4;
                margin-right: 2rem;
                white-space: nowrap;
            }

            .phase-rail.collapsed .directive-label {
                margin-right: 1rem;
                font-size: 0.6rem;
            }

            .phase-braid {
                width: 150px;
                height: 40px;
                overflow: visible;
                transition: all 0.5s ease;
            }

            .phase-rail.collapsed .phase-braid {
                width: 60px;
                height: 20px;
            }

            .braid-line {
                fill: none;
                stroke: var(--text-secondary);
                stroke-width: 0.5;
                opacity: 0.1;
                transition: all 0.8s var(--transition-easing, ease);
            }

            /* Active State: Vibrant Yellow-Green Glow */
            .phase-item.active {
                opacity: 1 !important;
                color: var(--color-cyber-lime) !important;
                text-shadow: 0 0 30px var(--color-cyber-lime);
                transform: scale(1.2);
                letter-spacing: 12px;
            }

            .phase-rail.collapsed .phase-item.active {
                transform: scale(1.1);
                letter-spacing: 6px;
                text-shadow: 0 0 15px var(--color-cyber-lime);
            }

            .phase-item.active::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 10%;
                right: 10%;
                height: 3px;
                background: var(--color-cyber-lime);
                box-shadow: 0 0 20px var(--color-cyber-lime);
            }

            /* Dynamic braid resonance when active */
            .phase-item.active + .phase-braid .braid-line,
            .phase-braid:has(+ .phase-item.active) .braid-line {
                stroke: var(--color-cyber-lime);
                stroke-width: 2;
                opacity: 0.5;
            }

            @keyframes bio-pulse {
                0%, 100% { transform: scale(1.1); opacity: 0.9; }
                50% { transform: scale(1.15); opacity: 1; }
            }
            
            .phase-item.active[data-phase="story"] {
                animation: bio-pulse 4s infinite ease-in-out;
            }

            :host(.collapsed) .attunement-section,
            :host(.collapsed) .sequence-section {
                display: none;
            }

            .attunement-section {
                max-width: 1200px;
                width: 90%;
                display: flex;
                gap: 4rem;
                text-align: left;
                transition: all 0.5s ease;
                opacity: 1;
                transform: translateY(0);
                background: transparent;
                position: relative;
                z-index: 1;
                margin: 4rem auto;
            }

            .attunement-left {
                flex: 0 0 75%;
            }

            .hop-link {
                color: #FFFFFF;
                font-weight: bold;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            :host([theme="light"]) .hop-link {
                color: #00008B !important;
            }

            .hop-link:hover {
                text-decoration: underline;
                opacity: 0.8;
            }

            .attunement-right {
                flex: 1;
                border-left: 1px solid var(--border-color);
                padding-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .attunement-title {
                font-family: var(--font-humanist);
                font-size: 1.8rem;
                letter-spacing: 6px;
                text-transform: uppercase;
                color: var(--text-primary);
                margin-bottom: 2rem;
                opacity: 0.9;
            }

            .attunement-text {
                font-family: var(--font-humanist);
                font-size: 1.1rem;
                line-height: 1.8;
                letter-spacing: 1px;
                color: var(--text-secondary);
                opacity: 0.7;
            }

            /* Download Section Styles */
            .download-heading {
                font-family: var(--font-humanist);
                font-size: 0.9rem;
                letter-spacing: 3px;
                text-transform: uppercase;
                color: var(--color-cyber-lime);
                margin-bottom: 1.5rem;
                opacity: 0.8;
            }

            .substrate-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .substrate-item {
                font-family: var(--font-humanist);
                font-size: 1.2rem;
                letter-spacing: 2px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .substrate-item:hover {
                color: var(--color-cyber-lime);
                transform: translateX(5px);
            }

            .substrate-item::before {
                content: '→';
                font-size: 0.8rem;
                opacity: 0.5;
            }

            /* Modal Styles */
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.4s ease;
            }

            .modal-overlay.active {
                display: flex;
                opacity: 1;
            }

            .modal-content {
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
                padding: 3rem;
                max-width: 600px;
                width: 90%;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .modal-overlay.active .modal-content {
                transform: scale(1);
            }

            .close-modal {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                font-size: 1.5rem;
                color: var(--text-secondary);
                cursor: pointer;
                transition: color 0.3s ease;
            }

            .close-modal:hover {
                color: var(--color-cyber-lime);
            }

            .modal-title {
                font-family: var(--font-humanist);
                font-size: 1.5rem;
                letter-spacing: 4px;
                text-transform: uppercase;
                color: var(--color-cyber-lime);
                margin-bottom: 2rem;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 1rem;
            }

            .download-link-btn {
                display: inline-block;
                padding: 1rem 2rem;
                background: var(--glass-bg);
                border: 1px solid var(--color-cyber-lime);
                color: var(--color-cyber-lime);
                font-family: var(--font-humanist);
                text-decoration: none;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin-bottom: 2rem;
                transition: all 0.3s ease;
            }

            .download-link-btn:hover {
                background: var(--color-cyber-lime);
                color: var(--bg-primary);
                box-shadow: 0 0 20px var(--color-cyber-lime);
            }

            .verification-grid {
                display: grid;
                grid-template-columns: 100px 1fr;
                gap: 1rem;
                font-family: monospace;
                font-size: 0.85rem;
                color: var(--text-secondary);
                background: var(--glass-bg);
                padding: 1.5rem;
                border-radius: 4px;
            }

            .verify-label {
                color: var(--color-cyber-lime);
                opacity: 0.6;
                text-transform: uppercase;
                font-size: 0.7rem;
                align-self: center;
            }

            .verify-value {
                word-break: break-all;
                opacity: 0.8;
            }

            .sequence-section {
                max-width: 1200px;
                width: 90%;
                margin: 4rem auto;
                border-top: 1px solid var(--border-color);
                padding-top: 3rem;
                transition: all 0.5s ease;
                background: transparent;
                position: relative;
                z-index: 1;
            }

            .sequence-title {
                font-family: var(--font-humanist);
                font-size: 1.2rem;
                letter-spacing: 5px;
                text-transform: uppercase;
                color: var(--color-cyber-lime);
                margin-bottom: 2rem;
                opacity: 0.9;
            }

            .sequence-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 2.5rem;
            }

            .sequence-item {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .sequence-step {
                font-family: var(--font-humanist);
                font-size: 0.8rem;
                color: var(--color-cyber-lime);
                opacity: 0.6;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            .sequence-header {
                font-family: var(--font-humanist);
                font-size: 1.1rem;
                color: var(--text-primary);
                letter-spacing: 1px;
            }

            .sequence-body {
                font-size: 0.9rem;
                line-height: 1.6;
                color: var(--text-secondary);
                opacity: 0.8;
            }

            @media (max-width: 768px) {
                :host {
                    padding: 1rem 0;
                }
                .phase-rail {
                    gap: 1.5rem;
                }
                .phase-rail.collapsed {
                    gap: 1rem;
                }
                .phase-item {
                    font-size: 1.2rem;
                    letter-spacing: 4px;
                    padding: 0.5rem 1rem;
                }
                .phase-rail.collapsed .phase-item {
                    font-size: 0.7rem;
                    letter-spacing: 2px;
                }
                .directive-label {
                    display: none; /* Hide directive label on mobile to save space */
                }
                .phase-braid {
                    width: 50px;
                }
                .phase-rail.collapsed .phase-braid {
                    width: 30px;
                }
                .attunement-section {
                    flex-direction: column;
                    gap: 2rem;
                }
                .attunement-left, .attunement-right {
                    flex: none;
                    width: 100%;
                }
            .attunement-left p a {
                font-weight: bold;
                color: #FFFFFF;
                text-decoration: none;
                transition: color 0.3s ease;
            }

            :host-context(body.light-mode) .attunement-left p a {
                color: #003366;
            }

            .attunement-left p a:hover {
                text-decoration: underline;
                color: var(--color-cyber-lime);
            }

            .attunement-right {
                    border-left: none;
                    border-top: 1px solid var(--border-color);
                    padding-left: 0;
                    padding-top: 2rem;
                }
                .attunement-title {
                    font-size: 1.4rem;
                }
                .sequence-grid {
                    grid-template-columns: 1fr;
                }
                .modal-content {
                    padding: 1.5rem;
                }
                .modal-title {
                    font-size: 1.2rem;
                }
            }
        </style>
        <div class="phase-rail">
            <span class="directive-label">Prime Directive</span>
            <span class="phase-item" data-phase="story">Story</span>
            <svg class="phase-braid" viewBox="0 0 100 20">
                <path class="braid-line" d="M0,10 Q50,0 100,10" />
                <path class="braid-line" d="M0,10 Q50,20 100,10" />
            </svg>
            <span class="phase-item" data-phase="interplay">Interplay</span>
            <svg class="phase-braid" viewBox="0 0 100 20">
                <path class="braid-line" d="M0,10 Q50,0 100,10" />
                <path class="braid-line" d="M0,10 Q50,20 100,10" />
            </svg>
            <span class="phase-item" data-phase="emulation">Emulation</span>
        </div>
        <div class="attunement-section">
            <div class="attunement-left">
                <h2 class="attunement-title">Attune health with BentoBoxDS</h2>
                <p class="attunement-text">
                    To be alive is to dwell within a continuous, self-organizing pulse—where every cell, body, and community participates directly in the intelligence of the whole. BentoBoxDS brings this vitality into active presence through attunement, making the resonancePulse a lived, everyday experience. Grounded by conduction instruments that touch and feel the biological world, guided through dynamic besearch cycles, and rooted in the deep foundation of biopoiesis, health expresses as the natural score woven directly into the living way. As an open-source organ of the Health Oracle Protocol, BentoBoxDS unifies individual experience with Gaia Intelligences, embodying the mind everywhere across every peer and bioregion.
                </p>
                <p>
                    BentoBoxDS is part of the Health Oracle Protocol Open Source Project <a href="https://healthscience.network" target="_blank" rel="noopener noreferrer" class="hop-link">HOP</a>
                </p>
                <div>
                </div>
            </div>
            <div class="attunement-right">
                <h3 class="download-heading">Select Download Substrate</h3>
                <div class="substrate-list">
                    <div class="substrate-item" data-os="linux">Linux</div>
                    <div class="substrate-item" data-os="macos">Mac</div>
                    <div class="substrate-item" data-os="windows">Windows</div>
                </div>
            </div>
        </div>

        <div class="sequence-section">
            <h2 class="sequence-title">The Sequence of Attunement</h2>
            <div class="sequence-grid">
                <div class="sequence-item">
                    <span class="sequence-step">Step 01</span>
                    <h3 class="sequence-header">Story: The Lived Narrative</h3>
                    <p class="sequence-body">
                        Story is the life-strap narrative expressed by every peer—the qualitative zero-draft of health. It unfolds as peers listen to their own internal rhythms while touching and feeling the natural world through a harmony of conformable conduction instruments and tiny edge devices. This shared narrative provides the initial spark, orienting local intelligence toward biological vitality.
                    </p>
                </div>
                <div class="sequence-item">
                    <span class="sequence-step">Step 02</span>
                    <h3 class="sequence-header">Interplay: The Living Weaver</h3>
                    <p class="sequence-body">
                        Interplay is the active rhythm of besearch cycles, where individual life-strap stories and biological content weave into a shared ecosystem. Within this collaborative middle, the local resonancePulse sets the conductive weights of resonAgents, coupling peer intent with the solar daily rhythms of the HeliClock and the broader bioregion.
                    </p>
                </div>
                <div class="sequence-item">
                    <span class="sequence-step">Step 03</span>
                    <h3 class="sequence-header">Emulation: Living Realization</h3>
                    <p class="sequence-body">
                        Emulation is the live, active expression of health in motion, continuously sustained by resonAgents and guided by ambient exoCues. Through reasonanceLearning, these live emulations continuously refine across peer and peer-to-peer network connections, unifying individual attunement into collective intelligences that nourish the whole organon.
                    </p>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="download-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2 class="modal-title" id="modal-os-title">Download BentoBoxDS</h2>
                <div id="modal-body">
                    <a href="#" class="download-link-btn" id="main-download-link">Download Binary</a>
                    <div class="verification-grid">
                        <div class="verify-label">SHA-256</div>
                        <div class="verify-value" id="hash-sha256">sha256:7422ef1af8d9ffbf0d3b410fd5422c50cb07b695bd983a6b8457f0338f8fad8d</div>
                        <div class="verify-label">Signature</div>
                        <div class="verify-value">Verify download using hash</div>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.shadowRoot.querySelectorAll('.phase-item').forEach(item => {
            item.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('phase-select', {
                    detail: { phase: item.dataset.phase },
                    bubbles: true,
                    composed: true
                }));
            });
        });

        // Download Modal Logic
        const modal = this.shadowRoot.getElementById('download-modal');
        const closeBtn = this.shadowRoot.querySelector('.close-modal');
        const osTitle = this.shadowRoot.getElementById('modal-os-title');
        const downloadLink = this.shadowRoot.getElementById('main-download-link');
        const shaHash = this.shadowRoot.getElementById('hash-sha256');

        const osData = {
            linux: { title: 'BentoBoxDS for Linux', hash: 'sha256:b0490231d34253eb2d201faabde8f9e0d7dec8ebbed43e8654595108486b2c04', link: 'https://github.com/healthscience/bentoboxds-desktop/releases/download/v0.7.84/bentoboxds-0.7.84.AppImage' },
            macos: { title: 'BentoBoxDS for macOS', hash: 'testflight - ask for invite', link: '' },
            windows: { title: 'BentoBoxDS for Windows', hash: 'sha256:67faad8a1dce591b042f0c19f89c3e1d2b1b0e4e177c8baa5fa18cb2227299ad', link: 'https://github.com/healthscience/bentoboxds-desktop/releases/download/v0.7.85/bentoboxds-0.7.85-setup.exe' }
        };

        this.shadowRoot.querySelectorAll('.substrate-item').forEach(item => {
            item.addEventListener('click', () => {
                const data = osData[item.dataset.os];
                osTitle.textContent = data.title;
                shaHash.textContent = data.hash;
                downloadLink.href = data.link;
                modal.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        this.updateActivePhase();
        this.updateCollapsed();
    }
}
customElements.define('phase-header', PhaseHeader);
