const cake = document.getElementById('cake');
const celebration = document.getElementById('celebration');
const greeting = document.getElementById('greeting');
const music = document.getElementById('birthdayMusic');
const toggleMusic = document.getElementById('toggleMusic');

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ['#9333ea', '#60a5fa', '#d8b4fe'] },
        shape: { type: 'circle', stroke: { width: 0 } },
        opacity: { value: 0.6, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#9333ea', opacity: 0.3 },
        move: { enable: true, speed: 3, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 200 }, push: { particles_nb: 5 } }
    }
});

// Star rain effect
const starRain = document.querySelector('.star-rain');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = '#fff';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
    starRain.appendChild(star);
}
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% { transform: translateY(-100vh); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Play music with fade-in
music.volume = 0;
music.play();
gsap.to(music, { volume: 0.5, duration: 2 });

// Toggle music
toggleMusic.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleMusic.textContent = 'توقف موزیک';
    } else {
        music.pause();
        toggleMusic.textContent = 'پخش موزیک';
    }
});

// Cake click animation
cake.addEventListener('click', () => {
    gsap.to(cake, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
            cake.classList.add('hidden');
            celebration.classList.remove('hidden');
            // Type animation for greeting
            const text = 'نرگس عزیز، تولدت مبارک! 🎉';
            let i = 0;
            function type() {
                if (i < text.length) {
                    greeting.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 80);
                }
            }
            type();
            // Confetti and hearts
            confetti();
            hearts();
        }
    });
});

// Parallax effect for balloons
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.balloon').forEach(balloon => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        balloon.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Confetti effect
function confetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettiCount = 100;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * confettiCount,
            color: ['#9333ea', '#60a5fa', '#d8b4fe', '#f9a8d4'][Math.floor(Math.random() * 4)],
            tilt: Math.random() * 10 - 10,
            tiltAngle: 0
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            c.tiltAngle += 0.05;
            c.y += (Math.cos(c.d) + 2 + c.r / 2) / 3;
            c.tilt = Math.sin(c.tiltAngle) * 10;
            if (c.y > canvas.height) c.y = -10;

            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
        });
        requestAnimationFrame(drawConfetti);
    }
    drawConfetti();
}

// Hearts effect
function hearts() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    const heartsCount = 20;
    const hearts = [];

    for (let i = 0; i < heartsCount; i++) {
        hearts.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 3 + 2,
            size: Math.random() * 20 + 10,
            opacity: 1
        });
    }

    function drawHearts() {
        hearts.forEach(h => {
            h.x += Math.cos(h.angle) * h.speed;
            h.y += Math.sin(h.angle) * h.speed;
            h.opacity -= 0.005;
            if (h.opacity <= 0) return;

            ctx.beginPath();
            ctx.fillStyle = `rgba(147, 51, 234, ${h.opacity})`;
            ctx.moveTo(h.x, h.y);
            ctx.bezierCurveTo(h.x - h.size / 2, h.y - h.size / 2, h.x - h.size, h.y + h.size / 2, h.x, h.y + h.size);
            ctx.bezierCurveTo(h.x + h.size, h.y + h.size / 2, h.x + h.size / 2, h.y - h.size / 2, h.x, h.y);
            ctx.fill();
        });
        if (hearts.some(h => h.opacity > 0)) requestAnimationFrame(drawHearts);
    }
    drawHearts();
}
