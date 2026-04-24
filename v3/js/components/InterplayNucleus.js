/**
 * InterplayNucleus: The Central Metabolic Bridge
 */
export class InterplayNucleus extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['collapsed', 'active'];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const collapsed = this.hasAttribute('collapsed');
        const active = this.hasAttribute('active');
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: ${collapsed ? 'relative' : 'absolute'};
                top: ${collapsed ? 'auto' : '50%'};
                left: ${collapsed ? 'auto' : '50%'};
                transform: ${collapsed ? 'none' : 'translate(-50%, -50%)'};
                width: ${collapsed ? '100%' : '120px'};
                height: ${collapsed ? '100%' : '120px'};
                z-index: 50;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all var(--transition-speed, 0.6s) var(--transition-easing, ease);
                background-color: ${active ? 'rgba(255, 255, 255, 0.05)' : 'var(--bg-primary)'};
                border: ${collapsed ? '1px solid var(--border-color, rgba(255, 255, 255, 0.05))' : 'none'};
            }

            .nucleus-dashed {
                width: 100%;
                height: 100%;
                border: 2px dashed ${active ? 'var(--color-resonance-glow)' : 'rgba(255, 255, 255, 0.3)'};
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                color: ${active ? 'var(--color-resonance-glow)' : 'var(--text-primary)'};
                font-family: var(--font-mono);
                font-size: 0.7rem;
                letter-spacing: 2px;
                transition: all 0.3s ease;
            }

            :host(:hover) .nucleus-dashed {
                border-color: var(--color-resonance-glow);
                color: var(--color-resonance-glow);
                box-shadow: 0 0 20px rgba(0, 255, 194, 0.2);
            }

            /* Responsive */
            @media (max-width: 768px) {
                :host {
                    width: ${collapsed ? '80px' : '80px'};
                    height: ${collapsed ? '60px' : '80px'};
                }
            }
        </style>
        <div class="nucleus-dashed">
            <span>INTERPLAY</span>
        </div>
        `;
    }
}
customElements.define('interplay-nucleus', InterplayNucleus);
