/**
 * ResonancePulse V3: Geometric Emulation
 * Uses Von Mises geometry to map circadian and life rhythms.
 */
export class ResonancePulse extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cues = JSON.parse(this.getAttribute('cues') || '[]');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const radiusMap = { metabolic: 12, environment: 22, ecological: 32, economic: 42 };
        const cuesMarkup = this.cues.map(cue => {
            const r = radiusMap[cue.orbit] || 10;
            const rad = (cue.angle - 90) * (Math.PI / 180);
            const x = r * Math.cos(rad);
            const y = r * Math.sin(rad);
            return `<circle class="cue-point ${cue.orbit}" cx="${x}" cy="${y}" r="1.5" />`;
        }).join('');

        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; width: 100%; aspect-ratio: 1; }
            svg { width: 100%; height: 100%; overflow: visible; }
            .orbit-ring { fill: none; stroke: rgba(255, 255, 255, 0.1); stroke-width: 0.5; }
            .metabolic-ring { stroke: #ff4d4d; opacity: 0.3; }
            .ecological-ring { stroke: #40e0ff; opacity: 0.3; }
            .economic-ring { stroke: #b6ff3b; opacity: 0.3; }
            
            .cue-point { filter: drop-shadow(0 0 3px currentColor); }
            .cue-point.metabolic { fill: #ff4d4d; }
            .cue-point.environment { fill: #ffffff; }
            .cue-point.ecological { fill: #40e0ff; }
            .cue-point.economic { fill: #b6ff3b; }

            .resonance-spoke {
                stroke: var(--color-resonance-glow, #00FFC2);
                stroke-width: 0.5;
                opacity: 0.5;
            }
        </style>
        <svg viewBox="-50 -50 100 100">
            <circle class="orbit-ring economic-ring" r="42" />
            <circle class="orbit-ring ecological-ring" r="32" />
            <circle class="orbit-ring environment-ring" r="22" />
            <circle class="orbit-ring metabolic-ring" r="12" />

            <g id="cues-layer">
                ${cuesMarkup}
            </g>
        </svg>
        `;
    }
}
customElements.define('resonance-pulse', ResonancePulse);
