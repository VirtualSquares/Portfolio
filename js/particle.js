const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1.7; // Smaller size
        this.speedX = Math.random() * 2 - 1.5; // Slightly slower
        this.speedY = Math.random() * 2 - 1.5; // Slightly slower
        this.opacity = 1;
        this.fadingSpeed = Math.random() * 0.01 + 0.002; // Random fading speed
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadingSpeed; // Use individual fading speed
        if (this.opacity <= 0) {
            this.opacity = 0;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 200; i++) { // Increased number of particles
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
            particles.splice(index, 1);
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height)); // Re-add a new particle
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
