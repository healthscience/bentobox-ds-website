/**
 * Heli-Clock: A Self-Contained Solar Anchor
 * Part of the HOP / BentoBoxDS Ecosystem (Local-First)
 */
class HeliClock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Default State: Aboyne, Scotland (approx)
    this.lat = parseFloat(this.getAttribute('lat')) || 56.62;
    this.lon = parseFloat(this.getAttribute('lon')) || -2.78;
    this.birthOrbital = parseFloat(this.getAttribute('birth-orbital')) || 0;
  }

  connectedCallback() {
    this.render();
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }

  // --- Core Solar Math (Extracted from your src) ---
  calculateSolarState() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now - startOfYear;
    const dayOfYear = diff / (1000 * 60 * 60 * 24);

    // The Offset: Spring Equinox is roughly day 80 (March 21)
    // We subtract 80 so that March 21 = 0 degrees (Top)
    const equinoxOffset = 79.25; 
    let yearlyDegree = ((dayOfYear - equinoxOffset) / 365.24) * 360;

    // Keep it within 0-360
    if (yearlyDegree < 0) yearlyDegree += 360;

    // Daily Degree (Midnight is 0, Noon is 180)
    const totalSeconds = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    const dailyDegree = (totalSeconds / 86400) * 360;

    return { yearlyDegree, dailyDegree };
  }

  tick() {
    const { yearlyDegree, dailyDegree } = this.calculateSolarState();
    const shadow = this.shadowRoot;

    // Update Sun Positions
    shadow.querySelector('#yearlySun').setAttribute('transform', `rotate(${yearlyDegree}, 50, 50)`);
    shadow.querySelector('#dailySun').setAttribute('transform', `rotate(${dailyDegree}, 50, 50)`);
    
    // Update Arcs (Passed segments)
    shadow.querySelector('#yearlyArc').setAttribute('d', this.describeArc(50, 50, 46, 0, yearlyDegree));
    shadow.querySelector('#dailyArc').setAttribute('d', this.describeArc(50, 50, 36, 0, dailyDegree));

    // Update Night Shadow (Rotate 180 from Sun)
    shadow.querySelector('#nightShadow').setAttribute('transform', `rotate(${dailyDegree + 180}, 50, 50)`);
  }

  describeArc(x, y, r, start, end) {
    const rad = (deg) => (deg - 90) * Math.PI / 180.0;
    const s = { x: x + r * Math.cos(rad(end)), y: y + r * Math.sin(rad(end)) };
    const e = { x: x + r * Math.cos(rad(start)), y: y + r * Math.sin(rad(start)) };
    const largeArc = (end - start + 360) % 360 <= 180 ? "0" : "1";
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 0 ${e.x} ${e.y}`;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      :host { display: block; width: 100%; max-width: 500px; aspect-ratio: 1; }
      svg { width: 100%; height: 100%; overflow: visible; }
      .track { fill: none; stroke: #e2e8f0; stroke-width: 1; opacity: 0.2; }
      .pillar { stroke: #94a3b8; stroke-width: 2; stroke-linecap: round; }
      .arc-year { fill: none; stroke: #3b82f6; stroke-width: 4; stroke-linecap: butt; }
      .arc-day { fill: none; stroke: #fbbf24; stroke-width: 6; stroke-linecap: butt; }
      .birth-marker { stroke: #f59e0b; stroke-width: 2; }
      .sun-blue { fill: #3b82f6; filter: blur(1px); }
      .sun-yellow { fill: #fbbf24; filter: drop-shadow(0 0 4px #fbbf24); }
    </style>
    <svg viewBox="0 0 100 100">
      <defs>
        <clipPath id="innerClip"><circle cx="50" cy="50" r="36" /></clipPath>
      </defs>

      <g clip-path="url(#innerClip)">
        <g id="nightShadow">
          <rect x="0" y="0" width="100" height="50" fill="#0f172a" fill-opacity="0.2" />
        </g>
      </g>

      <circle cx="50" cy="50" r="46" class="track" />
      <circle cx="50" cy="50" r="36" class="track" />

      <path id="yearlyArc" class="arc-year" />
      <path id="dailyArc" class="arc-day" />

      <g class="markers">
        <line x1="50" y1="0" x2="50" y2="6" class="pillar" />
        <line x1="94" y1="50" x2="100" y2="50" class="pillar" />
        <line x1="50" y1="94" x2="50" y2="100" class="pillar" />
        <line x1="0" y1="50" x2="6" y2="50" class="pillar" />
      </g>

      <g transform="rotate(${this.birthOrbital}, 50, 50)">
        <line x1="50" y1="2" x2="50" y2="8" class="birth-marker" />
      </g>

      <g id="yearlySun"><circle cx="50" cy="4" r="2.5" class="sun-blue" /></g>
      <g id="dailySun"><circle cx="50" cy="14" r="3.5" class="sun-yellow" /></g>
    </svg>
    `;
  }
}
customElements.define('heli-clock', HeliClock);