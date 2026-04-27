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
            return `<circle class="cue-point ${cue.orbit} pulse" cx="${x}" cy="${y}" r="1.5" />`;
        }).join('');

        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; width: 100%; aspect-ratio: 1; }
            svg { width: 100%; height: 100%; overflow: visible; }
            .orbit-ring { fill: none; stroke: var(--text-primary); stroke-width: 0.5; opacity: 0.1; }
            .metabolic-ring { stroke: var(--color-solar-amber); opacity: 0.3; }
            .environment-ring { stroke: var(--text-primary); opacity: 0.2; }
            .ecological-ring { stroke: var(--color-resonance-glow); opacity: 0.3; }
            .economic-ring { stroke: var(--color-cyber-lime); opacity: 0.3; }
            
            .cue-point { filter: url(#glow); }
            .cue-point.metabolic { fill: var(--color-solar-amber); }
            .cue-point.environment { fill: var(--text-primary); }
            .cue-point.ecological { fill: var(--color-resonance-glow); }
            .cue-point.economic { fill: var(--color-cyber-lime); }

            .resonance-spoke {
                stroke: var(--color-resonance-glow);
                stroke-width: 0.5;
                opacity: 0.5;
                filter: url(#glow);
            }

            .solar-hand {
                stroke: var(--text-primary);
                stroke-width: 1;
                opacity: 0.8;
                filter: url(#glow);
            }

            .pulse {
                animation: soft-glow 2s infinite ease-in-out;
            }

            @keyframes soft-glow {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
        </style>
        <svg viewBox="-50 -50 100 100">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="1.2" result="coloredBlur"></feGaussianBlur>
                    <feMerge>
                        <feMergeNode in="coloredBlur"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>

            <circle class="orbit-ring economic-ring" r="42" />
            <circle class="orbit-ring ecological-ring" r="32" />
            <circle class="orbit-ring environment-ring indoor" r="22" />
            <circle class="orbit-ring metabolic-ring" r="12" />

            <line x1="0" y1="0" x2="31.9" y2="-27.3" class="resonance-spoke"></line>
            <line x1="0" y1="0" x2="31.8" y2="-31.8" class="solar-hand"></line>

            <g id="cues-layer">
                ${cuesMarkup}
            </g>
        </svg>
        `;
    }
}
customElements.define('resonance-pulse', ResonancePulse);
