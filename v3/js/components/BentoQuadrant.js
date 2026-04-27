/**
 * BentoQuadrant: A Sovereign Modular Quadrant
 * Part of the Boreal Design System
 */
export class BentoQuadrant extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'subtitle', 'type', 'collapsed', 'active'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const collapsed = this.hasAttribute('collapsed');
        const active = this.hasAttribute('active');
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid var(--border-color);
                transition: all var(--transition-speed, 0.6s) var(--transition-easing, ease);
                cursor: pointer;
                overflow: hidden;
                position: relative;
                background: transparent;
            }

            :host(:hover) {
                background: var(--glass-bg);
            }

            :host([active]) {
                background: var(--glass-bg);
                border-color: var(--active-color, var(--color-resonance-glow));
            }

            .content {
                text-align: center;
                transition: all 0.3s ease;
                z-index: 2;
                padding: ${collapsed ? '0.5rem' : '1rem'};
            }

            h2 {
                font-family: var(--font-humanist, sans-serif);
                font-size: ${collapsed ? '0.8rem' : '1.5rem'};
                margin-bottom: ${collapsed ? '0' : '0.5rem'};
                font-weight: 300;
                color: var(--text-primary);
                text-transform: ${collapsed ? 'uppercase' : 'none'};
                letter-spacing: ${collapsed ? '1px' : 'normal'};
            }

            .subtitle {
                display: ${collapsed ? 'none' : 'block'};
                font-family: var(--font-mono, monospace);
                font-size: 0.8rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .texture {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: ${active ? '0.3' : '0.1'};
                z-index: 1;
                transition: opacity 0.3s ease;
            }

            /* Type specific colors */
            :host([type="tl"]) { --active-color: var(--color-moss-light); }
            :host([type="tr"]) { --active-color: var(--color-solar-amber); }
            :host([type="bl"]) { --active-color: var(--color-resonance-glow); }
            :host([type="br"]) { --active-color: var(--color-slate-ghost); }

            /* Type specific gradients */
            :host([type="tl"]) .texture { background: radial-gradient(circle at top left, var(--color-moss-light), transparent 70%); }
            :host([type="tr"]) .texture { background: radial-gradient(circle at top right, var(--color-solar-amber), transparent 70%); }
            :host([type="bl"]) .texture { background: radial-gradient(circle at bottom left, var(--color-resonance-glow), transparent 70%); }
            :host([type="br"]) .texture { background: radial-gradient(circle at bottom right, var(--color-slate-ghost), transparent 70%); }
        </style>
        <div class="texture"></div>
        <div class="content">
            <h2>${title}</h2>
            <p class="subtitle">${subtitle}</p>
        </div>
        `;
    }
}
customElements.define('bento-quadrant', BentoQuadrant);
