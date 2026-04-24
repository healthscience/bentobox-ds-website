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
                justify-content: center;
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
            }

            .phase-rail.collapsed {
                gap: 2rem;
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

        this.updateActivePhase();
        this.updateCollapsed();
    }
}
customElements.define('phase-header', PhaseHeader);
