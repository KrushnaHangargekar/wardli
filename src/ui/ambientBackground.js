/**
 * Wardli Ambient Living Background Engine
 * Creates dynamic, responsive ambient lighting, floating radiant orbs,
 * and mouse-reactive particle depth (Antigravity & Linear visual aesthetic).
 */

export class AmbientBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pointer = {
      x: this.width / 2,
      y: this.height / 2,
      targetX: this.width / 2,
      targetY: this.height / 2
    };
    this.orbs = [];
    this.particles = [];
    this.animationFrame = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  mount(container = document.body) {
    if (document.getElementById('wardli-ambient-canvas')) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'wardli-ambient-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 1;
      transition: opacity 0.5s ease;
    `;

    container.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    this.initOrbs();
    this.initParticles();
    this.attachEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.canvas) {
      this.canvas.width = this.width * (window.devicePixelRatio || 1);
      this.canvas.height = this.height * (window.devicePixelRatio || 1);
      this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
  }

  initOrbs() {
    // Glowing ambient aurora orbs: Electric Violet, Neon Azure, Emerald Glow, Rose Luster
    this.orbs = [
      {
        x: this.width * 0.2,
        y: this.height * 0.25,
        radius: Math.min(this.width, this.height) * 0.5,
        baseColor: [124, 58, 237], // Violet
        vx: 0.35,
        vy: 0.25,
        phase: 0
      },
      {
        x: this.width * 0.8,
        y: this.height * 0.35,
        radius: Math.min(this.width, this.height) * 0.45,
        baseColor: [37, 99, 235], // Azure Blue
        vx: -0.3,
        vy: 0.35,
        phase: Math.PI / 2
      },
      {
        x: this.width * 0.5,
        y: this.height * 0.8,
        radius: Math.min(this.width, this.height) * 0.55,
        baseColor: [16, 185, 129], // Emerald
        vx: 0.25,
        vy: -0.3,
        phase: Math.PI
      },
      {
        x: this.width * 0.85,
        y: this.height * 0.85,
        radius: Math.min(this.width, this.height) * 0.4,
        baseColor: [244, 63, 94], // Rose Glow
        vx: -0.2,
        vy: -0.25,
        phase: Math.PI * 1.5
      }
    ];
  }

  initParticles() {
    this.particles = [];
    const count = Math.min(55, Math.floor(this.width / 25));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        baseAlpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  attachEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.initOrbs();
    });

    window.addEventListener('pointermove', (e) => {
      this.pointer.targetX = e.clientX;
      this.pointer.targetY = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        this.pointer.targetX = e.touches[0].clientX;
        this.pointer.targetY = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  animate() {
    // Smooth pointer damping
    this.pointer.x += (this.pointer.targetX - this.pointer.x) * 0.06;
    this.pointer.y += (this.pointer.targetY - this.pointer.y) * 0.06;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw glowing radiant orbs with soft radial gradients
    for (const orb of this.orbs) {
      if (!this.isReducedMotion) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.phase += 0.008;

        if (orb.x < -orb.radius) orb.x = this.width + orb.radius;
        if (orb.x > this.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = this.height + orb.radius;
        if (orb.y > this.height + orb.radius) orb.y = -orb.radius;
      }

      // Gravitational responsiveness toward pointer
      const dx = this.pointer.x - orb.x;
      const dy = this.pointer.y - orb.y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.min(50, (1 - dist / (this.width || 1)) * 40);
      const renderX = orb.x + (dx / (dist || 1)) * pull;
      const renderY = orb.y + (dy / (dist || 1)) * pull;

      const grad = this.ctx.createRadialGradient(
        renderX, renderY, 0,
        renderX, renderY, orb.radius
      );

      const [r, g, b] = orb.baseColor;
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.18)`);
      grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.08)`);
      grad.addColorStop(0.8, `rgba(${r}, ${g}, ${b}, 0.02)`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(renderX, renderY, orb.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // 2. Cursor follow spotlight glow
    const pointerGrad = this.ctx.createRadialGradient(
      this.pointer.x, this.pointer.y, 0,
      this.pointer.x, this.pointer.y, 280
    );
    pointerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
    pointerGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.06)');
    pointerGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.02)');
    pointerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = pointerGrad;
    this.ctx.beginPath();
    this.ctx.arc(this.pointer.x, this.pointer.y, 280, 0, Math.PI * 2);
    this.ctx.fill();

    // 3. Render subtle ambient floating stardust
    for (const p of this.particles) {
      if (!this.isReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;
      }

      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.6})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export const ambientBackground = new AmbientBackground();
