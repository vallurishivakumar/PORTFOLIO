

// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});


// TYPING ANIMATION

const words = [
    "VLSI DESIGN.",
    "EMBEDDED SYSTEMS.",
    "SEMICONDUCTORS.",
    "ENGINEERING SOLUTIONS."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typing.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1400;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// FLOATING PARTICLES

const particles = document.getElementById("particles");

for (let i = 0; i < 65; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (5 + Math.random() * 12) + "s";
    particle.style.animationDelay = (Math.random() * 10) + "s";

    const size = 2 + Math.random() * 4;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particles.appendChild(particle);
}


// SCROLL REVEAL ANIMATION

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


// ANIMATED STATISTICS

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(now) {

            const progress = Math.min((now - startTime) / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);

            counter.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);

    });

}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// PROJECT SLIDER

const track = document.getElementById("projectTrack");
const nextBtn = document.getElementById("nextProject");
const prevBtn = document.getElementById("prevProject");

let projectIndex = 0;

function getVisibleCards() {

    if (window.innerWidth <= 550) return 1;
    if (window.innerWidth <= 850) return 2;

    return 3;
}

function updateSlider() {

    const cards = document.querySelectorAll(".project-card");

    const visibleCards = getVisibleCards();

    const maxIndex = Math.max(0, cards.length - visibleCards);

    projectIndex = Math.max(0, Math.min(projectIndex, maxIndex));

    const cardWidth = cards[0].getBoundingClientRect().width;

    const gap = 22;

    track.style.transform =
        `translateX(-${projectIndex * (cardWidth + gap)}px)`;
}

nextBtn.addEventListener("click", () => {

    const cards = document.querySelectorAll(".project-card");

    const maxIndex = Math.max(0, cards.length - getVisibleCards());

    projectIndex = projectIndex >= maxIndex ? 0 : projectIndex + 1;

    updateSlider();
});

prevBtn.addEventListener("click", () => {

    const cards = document.querySelectorAll(".project-card");

    const maxIndex = Math.max(0, cards.length - getVisibleCards());

    projectIndex = projectIndex <= 0 ? maxIndex : projectIndex - 1;

    updateSlider();
});

window.addEventListener("resize", updateSlider);


// 3D MOUSE TILT FOR PROJECT CARDS

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 18;
        const rotateY = (x - centerX) / 18;

        card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";

    });

});


// 3D PROFILE MOUSE EFFECT

const heroImage = document.querySelector(".hero-image");
const imageFrame = document.querySelector(".image-frame");

heroImage.addEventListener("mousemove", event => {

    if (window.innerWidth <= 850) return;

    const rect = heroImage.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = (0.5 - (y / rect.height)) * 15;

    imageFrame.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

});

heroImage.addEventListener("mouseleave", () => {

    imageFrame.style.transform = "";

});


// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your message is ready to be connected to an email service.";

    contactForm.reset();

});
