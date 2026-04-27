/**
 * HeliClock V3: Sovereign Solar Anchor
 * Part of the Boreal Design System
 */
export class HeliClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.lat = parseFloat(this.getAttribute('lat')) || 56.62;
        this.lon = parseFloat(this.getAttribute('lon')) || -2.78;
    }

    connectedCallback() {
        this.render();
        this.start();
    }

    disconnectedCallback() {
        cancelAnimationFrame(this.raf);
    }

    start() {
        const update = () => {
            this.tick();
            this.raf = requestAnimationFrame(update);
        };
        this.raf = requestAnimationFrame(update);
    }

    calculateSolarState() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now - startOfYear;
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        const yearlyDegree = (dayOfYear / 365) * 360;
        const totalSeconds = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
        const dailyDegree = (totalSeconds / 86400) * 360;

        return { yearlyDegree, dailyDegree };
    }

    tick() {
        const { yearlyDegree, dailyDegree } = this.calculateSolarState();
        const shadow = this.shadowRoot;

        const ySun = shadow.querySelector('#yearlySun');
        const dSun = shadow.querySelector('#dailySun');
        const yArc = shadow.querySelector('#yearlyArc');
        const dArc = shadow.querySelector('#dailyArc');

        if (ySun) ySun.setAttribute('transform', `rotate(${yearlyDegree}, 50, 50)`);
        if (dSun) dSun.setAttribute('transform', `rotate(${dailyDegree}, 50, 50)`);
        if (yArc) yArc.setAttribute('d', this.describeArc(50, 50, 46, 0, yearlyDegree));
        if (dArc) dArc.setAttribute('d', this.describeArc(50, 50, 36, 0, dailyDegree));
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
            :host { display: block; width: 100%; aspect-ratio: 1; }
            svg { width: 100%; height: 100%; overflow: visible; }
            .track { fill: none; stroke: var(--text-primary); stroke-width: 0.5; opacity: 0.1; }
            .arc-year { fill: none; stroke: var(--color-moss-light); stroke-width: 2; opacity: 0.6; }
            .arc-day { fill: none; stroke: var(--color-solar-amber); stroke-width: 3; }
            .sun-year { fill: var(--color-moss-light); filter: blur(1px); }
            .sun-day { fill: var(--color-solar-amber); filter: drop-shadow(0 0 5px var(--color-solar-amber)); }
            .center-point { fill: var(--text-primary); opacity: 0.3; }
        </style>
        <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" class="track" />
            <circle cx="50" cy="50" r="36" class="track" />
            
            <path id="yearlyArc" class="arc-year" />
            <path id="dailyArc" class="arc-day" />

            <circle cx="50" cy="50" r="1" class="center-point" />

            <g id="yearlySun"><circle cx="50" cy="4" r="2" class="sun-year" /></g>
            <g id="dailySun"><circle cx="50" cy="14" r="3" class="sun-day" /></g>
        </svg>
        `;
    }
}
customElements.define('heli-clock', HeliClock);
