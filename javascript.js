// ─── Custom Cursor ───────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 5 + 'px';
    cursor.style.top = my - 5 + 'px';
});

function animFollower() {
    fx += (mx - fx - 18) * 0.12;
    fy += (my - fy - 18) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animFollower);
}
animFollower();

document.querySelectorAll('a, button, .pcard-wrap, .skill-card, .interest-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

// ─── Navbar scroll ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // scroll indicator fade
    const si = document.getElementById('scrollIndicator');
    if (si) si.style.opacity = Math.max(0, 1 - window.scrollY / 300);
});

// ─── Mobile menu ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ─── Hero entrance animation ─────────────────────────────
function heroEntrance() {
    const tl = anime.timeline({ easing: 'easeOutExpo' });
    tl
    .add({
        targets: '#heroEyebrow',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 900,
        delay: 200
    })
    .add({
        targets: '.hero-name-inner',
        translateY: ['110%', '0%'],
        duration: 1100,
        delay: anime.stagger(120),
        easing: 'cubicBezier(0.16, 1, 0.3, 1)'
    }, '-=600')
    .add({
        targets: '#heroTagline',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800
    }, '-=400')
    .add({
        targets: '#heroCta',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700
    }, '-=500')
    .add({
        targets: '#scrollIndicator',
        opacity: [0, 1],
        duration: 600
    }, '-=400');
}
heroEntrance();

// ─── Scroll reveal ────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
            const idx = siblings.indexOf(el);
            anime({
                targets: el,
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 900,
                delay: idx * 100,
                easing: 'easeOutCubic'
            });
            revealObserver.unobserve(el);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Parallax hero ────────────────────────────────────────
const heroContent = document.getElementById('heroContent');
window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy < window.innerHeight) {
        heroContent.style.transform = `translateY(${sy * 0.18}px)`;
    }
}, { passive: true });

// ─── Smooth anchor scroll ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {

        const href = a.getAttribute('href');

        // Abaikan link eksternal seperti WhatsApp, Email, LinkedIn, dan GitHub
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }

        // Hanya proses navigasi internal
        if (href.startsWith('#')) {
            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});


// ─── Stagger skill cards ──────────────────────────────────
const skillsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target.querySelectorAll('.skill-card'),
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.96, 1],
                duration: 700,
                delay: anime.stagger(80),
                easing: 'easeOutCubic'
            });
            skillsObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
const hardSkillsEl = document.getElementById('hardSkills');
if (hardSkillsEl) skillsObs.observe(hardSkillsEl);

lucide.createIcons();

// Soft skills special handling (pills by index)
const softPillKeys = ['soft.adaptability','soft.analytical','soft.alm','soft.bpm','soft.br','soft.comm','soft.ps','soft.pm','soft.sm','soft.team','soft.time'];  

// =========================================
// WHATSAPP & EMAIL CONTACT INITIALIZATION
// =========================================


const whatsappNumber = "6285746322220";
const emailAddress = "mmmdwahyudi@gmail.com";

// Template WhatsApp
const recruitmentMessage = 
`Halo Muhammad Wahyudi,

Perkenalkan, saya [Nama Recruiter] dari Tim Rekrutmen *[Nama Perusahaan]*.

Setelah meninjau profil dan portofolio Anda, kami tertarik dengan latar belakang serta kompetensi Anda di bidang *[Posisi]*. Saat ini, kami sedang membuka kesempatan untuk posisi *[Nama Posisi]* dan melihat adanya kesesuaian antara kualifikasi Anda dengan kebutuhan perusahaan kami. Apakah Anda bersedia untuk berdiskusi lebih lanjut melalui sesi perkenalan atau wawancara awal? Jika berkenan, kami dapat menyesuaikan jadwal berdasarkan ketersediaan waktu Anda.

Terima kasih atas perhatian Anda. Kami menantikan respons dan kesempatan untuk berdiskusi lebih lanjut.

Salam hormat,

*[Nama Recruiter]*
HR Department
*[Nama Perusahaan]*`;

// Template Email (teks biasa)
const emailMessage =
`Halo Muhammad Wahyudi,

Perkenalkan, saya [Nama Recruiter] dari Tim Rekrutmen [Nama Perusahaan].

Setelah meninjau profil dan portofolio Anda, kami tertarik dengan latar belakang serta kompetensi Anda di bidang [Posisi]. Saat ini, kami sedang membuka kesempatan untuk posisi [Nama Posisi] dan melihat adanya kesesuaian antara kualifikasi Anda dengan kebutuhan perusahaan kami. Apakah Anda bersedia untuk berdiskusi lebih lanjut melalui sesi perkenalan atau wawancara awal? Jika berkenan, kami dapat menyesuaikan jadwal berdasarkan ketersediaan waktu Anda.

Terima kasih atas perhatian Anda. Kami menantikan respons dan kesempatan untuk berdiskusi lebih lanjut.

Salam hormat,

[Nama Recruiter]
HR Department
[Nama Perusahaan]`;

// Encode pesan
const encodedWhatsApp = encodeURIComponent(recruitmentMessage);
const encodedEmail = encodeURIComponent(emailMessage);

const emailSubject = encodeURIComponent(
    "Undangan Wawancara - [Nama Posisi] - [Nama Perusahaan]"
);

// Inisialisasi WhatsApp
document.querySelectorAll(
    '#whatsapp-link, .whatsapp-link'
).forEach(link => {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodedWhatsApp}`;
});

// Inisialisasi Email
document.querySelectorAll(
    '#email-link, .email-link'
).forEach(link => {
    link.href = `mailto:${emailAddress}?subject=${emailSubject}&body=${encodedEmail}`;
});
