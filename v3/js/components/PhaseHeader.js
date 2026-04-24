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
        return ['active-phase'];
    }

    attributeChangedCallback() {
        this.updateActivePhase();
    }

    updateActivePhase() {
        const active = this.getAttribute('active-phase');
        const items = this.shadowRoot.querySelectorAll('.phase-item');
        items.forEach(item => {
            item.classList.toggle('active', item.dataset.phase === active);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                width: 100%;
                padding: 1.5rem 0;
                display: flex;
                justify-content: center;
                background: transparent;
                z-index: 100;
            }

            .phase-rail {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .phase-item {
                font-family: var(--font-humanist);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: var(--text-secondary);
                opacity: 0.4;
                transition: all 0.5s var(--transition-easing, ease);
                padding: 0.5rem 1rem;
                border: 1px solid transparent;
                cursor: pointer;
            }

            .phase-item:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.05);
            }

            .phase-braid {
                width: 60px;
                height: 20px;
                overflow: visible;
            }

            .braid-line {
                fill: none;
                stroke: var(--text-secondary);
                stroke-width: 0.5;
                opacity: 0.2;
                transition: all 0.5s var(--transition-easing, ease);
            }

            /* Dynamic Resonance States */
            .phase-item[data-phase="story"].active {
                color: var(--color-resonance-glow);
                opacity: 1;
                text-shadow: 0 0 10px rgba(0, 255, 194, 0.4);
                animation: bio-pulse 3s infinite ease-in-out;
            }

            .phase-item[data-phase="interplay"].active {
                color: white;
                opacity: 1;
                text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
            }

            .phase-item[data-phase="interplay"].active + .phase-braid .braid-line,
            .phase-braid:has(+ .phase-item[data-phase="interplay"].active) .braid-line {
                stroke: white;
                stroke-width: 1.5;
                opacity: 0.6;
            }

            .phase-item[data-phase="emulation"].active {
                color: var(--color-solar-amber);
                opacity: 1;
                text-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
            }

            @keyframes bio-pulse {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.05); opacity: 1; }
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
    }
}
customElements.define('phase-header', PhaseHeader);
