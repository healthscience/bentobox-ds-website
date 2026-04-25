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
    }

    static get observedAttributes() {
        return ['active-phase', 'collapsed'];
    }

    attributeChangedCallback(name) {
        if (name === 'active-phase') {
            this.updateActivePhase();
        } else if (name === 'collapsed') {
            this.updateCollapsed();
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
                margin-bottom: 3rem;
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
                transition: all 0.8s var(--transition-easing, ease);
                padding: 1.5rem 3rem;
                border: 1px solid transparent;
                cursor: pointer;
                position: relative;
            }

            .phase-rail.collapsed .phase-item {
                font-size: 0.8rem;
                letter-spacing: 4px;
                padding: 0.5rem 1rem;
            }

            .phase-item:hover {
                opacity: 0.6;
                color: var(--color-resonance-glow);
                letter-spacing: 10px;
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
                color: #e2ff3b !important; /* Cyber Lime / Yellow-Green */
                text-shadow: 0 0 30px rgba(226, 255, 59, 0.8),
                             0 0 60px rgba(226, 255, 59, 0.3);
                transform: scale(1.2);
                letter-spacing: 12px;
            }

            .phase-rail.collapsed .phase-item.active {
                transform: scale(1.1);
                letter-spacing: 6px;
                text-shadow: 0 0 15px rgba(226, 255, 59, 0.8);
            }

            .phase-item.active::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 10%;
                right: 10%;
                height: 3px;
                background: #e2ff3b;
                box-shadow: 0 0 20px #e2ff3b;
            }

            /* Dynamic braid resonance when active */
            .phase-item.active + .phase-braid .braid-line,
            .phase-braid:has(+ .phase-item.active) .braid-line {
                stroke: #e2ff3b;
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

            /* Attunement Section */
            .attunement-section {
                max-width: 1200px;
                width: 90%;
                display: flex;
                gap: 4rem;
                text-align: left;
                transition: all 0.5s ease;
                opacity: 1;
                transform: translateY(0);
            }

            .phase-rail.collapsed + .attunement-section {
                opacity: 0;
                pointer-events: none;
                transform: translateY(20px);
                height: 0;
                overflow: hidden;
            }

            .attunement-left {
                flex: 0 0 75%;
            }

            .attunement-right {
                flex: 1;
                border-left: 1px solid rgba(226, 255, 59, 0.2);
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
                color: var(--text-primary, #fff);
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
                color: #e2ff3b;
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
                color: #e2ff3b;
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
                background: linear-gradient(135deg, rgba(20, 25, 20, 0.95), rgba(10, 15, 10, 0.98));
                border: 1px solid rgba(226, 255, 59, 0.3);
                box-shadow: 0 0 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(226, 255, 59, 0.1);
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
                color: #e2ff3b;
            }

            .modal-title {
                font-family: var(--font-humanist);
                font-size: 1.5rem;
                letter-spacing: 4px;
                text-transform: uppercase;
                color: #e2ff3b;
                margin-bottom: 2rem;
                border-bottom: 1px solid rgba(226, 255, 59, 0.2);
                padding-bottom: 1rem;
            }

            .download-link-btn {
                display: inline-block;
                padding: 1rem 2rem;
                background: rgba(226, 255, 59, 0.1);
                border: 1px solid #e2ff3b;
                color: #e2ff3b;
                font-family: var(--font-humanist);
                text-decoration: none;
                letter-spacing: 2px;
                text-transform: uppercase;
                margin-bottom: 2rem;
                transition: all 0.3s ease;
            }

            .download-link-btn:hover {
                background: #e2ff3b;
                color: #000;
                box-shadow: 0 0 20px rgba(226, 255, 59, 0.4);
            }

            .verification-grid {
                display: grid;
                grid-template-columns: 100px 1fr;
                gap: 1rem;
                font-family: monospace;
                font-size: 0.85rem;
                color: var(--text-secondary);
                background: rgba(0, 0, 0, 0.3);
                padding: 1.5rem;
                border-radius: 4px;
            }

            .verify-label {
                color: #e2ff3b;
                opacity: 0.6;
                text-transform: uppercase;
                font-size: 0.7rem;
                align-self: center;
            }

            .verify-value {
                word-break: break-all;
                opacity: 0.8;
            }
        </style>
        <div class="phase-rail">
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
                    Life is not a rehearsal; it is the real-player game. Attunement is the sovereign inhabitation of health from the inside. This is the actualization of resonance—the movement beyond the passive practice of medicine into the active witness of the Resonance Pulse. By aligning with Gaia Intelligences, the role shifts from passenger to primary player. On this substrate, health is not a commodity to be obtained; it is the score written into the weave of the living way.
                </p>
            </div>
            <div class="attunement-right">
                <h3 class="download-heading">Select Substrate</h3>
                <div class="substrate-list">
                    <div class="substrate-item" data-os="linux">Linux</div>
                    <div class="substrate-item" data-os="macos">Mac</div>
                    <div class="substrate-item" data-os="windows">Windows</div>
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
                        <div class="verify-value" id="hash-sha256">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
                        <div class="verify-label">MD5</div>
                        <div class="verify-value" id="hash-md5">d41d8cd98f00b204e9800998ecf8427e</div>
                        <div class="verify-label">Signature</div>
                        <div class="verify-value">Verified by Gaia Root Authority</div>
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
            linux: { title: 'BentoBoxDS for Linux', hash: '8f2e...9a1b', link: '#linux-dl' },
            macos: { title: 'BentoBoxDS for macOS', hash: '3d5a...bc7e', link: '#macos-dl' },
            windows: { title: 'BentoBoxDS for Windows', hash: '11a9...ee42', link: '#windows-dl' }
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
