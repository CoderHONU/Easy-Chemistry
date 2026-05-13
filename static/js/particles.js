// Particle Background System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.resize();
        this.init();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Physics
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse attraction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                particle.vx += dx * 0.01;
                particle.vy += dy * 0.01;
            }
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            // Connect nearby particles
            this.particles.forEach(other => {
                const otherDist = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
                if (otherDist < 80) {
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${1 - otherDist / 80})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
const canvas = document.getElementById('particle-canvas');
const particleSystem = new ParticleSystem(canvas);

// Mouse tracking
document.addEventListener('mousemove', (e) => {
    particleSystem.mouse.x = e.clientX;
    particleSystem.mouse.y = e.clientY;
});

// Responsive canvas
window.addEventListener('resize', () => {
    particleSystem.resize();
});