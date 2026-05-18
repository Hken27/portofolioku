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
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
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


    // Map each data-i18n key to its DOM element(s)
    const i18nMap = {
        'nav.about':       { sel: '.nav-link[href="#about"], .mobile-nav-link[href="#about"]', prop: 'textContent' },
        'nav.experience':  { sel: '.nav-link[href="#experience"], .mobile-nav-link[href="#experience"]', prop: 'textContent' },
        'nav.skills':      { sel: '.nav-link[href="#skills"], .mobile-nav-link[href="#skills"]', prop: 'textContent' },
        'nav.projects':    { sel: '.nav-link[href="#projects"], .mobile-nav-link[href="#projects"]', prop: 'textContent' },
        'nav.interests':   { sel: '.nav-link[href="#interests"], .mobile-nav-link[href="#interests"]', prop: 'textContent' },
        'hero.eyebrow':    { sel: '#heroEyebrow', prop: 'textContent' },
        'hero.tagline':    { sel: '.hero-tagline-text', prop: 'textContent' },
        'hero.cta1':       { sel: '#heroCta .btn-primary span', prop: 'textContent' },
        'hero.cta2':       { sel: '#heroCta .btn-ghost', prop: 'textContent' },
        'hero.year':       { sel: '.hero-year', prop: 'textContent' },
        'about.num':       { sel: '#about .section-num', prop: 'textContent' },
        'about.title1':    { sel: '#about .section-title', prop: 'line1' },
        'about.title2':    { sel: '#about .section-title', prop: 'line2' },
        'about.p1':        { sel: '#about .about-text-large', prop: 'innerHTML' },
        'about.p2':        { sel: '#about .about-text-body', prop: 'innerHTML' },
        'about.tag1':      { sel: '#about .about-tag:nth-child(1)', prop: 'textContent' },
        'about.tag2':      { sel: '#about .about-tag:nth-child(2)', prop: 'textContent' },
        'about.tag3':      { sel: '#about .about-tag:nth-child(3)', prop: 'textContent' },
        'about.tag4':      { sel: '#about .about-tag:nth-child(4)', prop: 'textContent' },
        'exp.num':         { sel: '#experience .section-num', prop: 'textContent' },
        'exp.title1':      { sel: '#experience .section-title', prop: 'line1' },
        'exp.title2':      { sel: '#experience .section-title', prop: 'line2' },
        'exp1.date':       { sel: '#experience .exp-item:nth-child(1) .exp-date', prop: 'textContent' },
        'exp1.role':       { sel: '#experience .exp-item:nth-child(1) .exp-title', prop: 'textContent' },
        'exp1.company':    { sel: '#experience .exp-item:nth-child(1) .exp-company', prop: 'textContent' },
        'exp1.b1.label':   { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(1) .exp-bullet-label', prop: 'textContent' },
        'exp1.b1.text':    { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(1) .exp-bullet-text', prop: 'textContent' },
        'exp1.b2.label':   { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(2) .exp-bullet-label', prop: 'textContent' },
        'exp1.b2.text':    { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(2) .exp-bullet-text', prop: 'textContent' },
        'exp1.b3.label':   { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(3) .exp-bullet-label', prop: 'textContent' },
        'exp1.b3.text':    { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(3) .exp-bullet-text', prop: 'textContent' },
        'exp1.b4.label':   { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(4) .exp-bullet-label', prop: 'textContent' },
        'exp1.b4.text':    { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(4) .exp-bullet-text', prop: 'textContent' },
        'exp1.b5.label':   { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(5) .exp-bullet-label', prop: 'textContent' },
        'exp1.b5.text':    { sel: '#experience .exp-item:nth-child(1) .exp-bullet:nth-child(5) .exp-bullet-text', prop: 'textContent' },
        'exp2.date':       { sel: '#experience .exp-item:nth-child(2) .exp-date', prop: 'textContent' },
        'exp2.role':       { sel: '#experience .exp-item:nth-child(2) .exp-title', prop: 'textContent' },
        'exp2.company':    { sel: '#experience .exp-item:nth-child(2) .exp-company', prop: 'textContent' },
        'exp2.b1.label':   { sel: '#experience .exp-item:nth-child(2) .exp-bullet:nth-child(1) .exp-bullet-label', prop: 'textContent' },
        'exp2.b1.text':    { sel: '#experience .exp-item:nth-child(2) .exp-bullet:nth-child(1) .exp-bullet-text', prop: 'textContent' },
        'exp2.b2.label':   { sel: '#experience .exp-item:nth-child(2) .exp-bullet:nth-child(2) .exp-bullet-label', prop: 'textContent' },
        'exp2.b2.text':    { sel: '#experience .exp-item:nth-child(2) .exp-bullet:nth-child(2) .exp-bullet-text', prop: 'textContent' },
        'exp2.b3.label':   { sel: '#experience .exp-item:nth-child(2) .exp-bullet:nth-child(3) .exp-bullet-label', prop: 'textContent' },
        'exp2.b3.text':    { sel: '#experience .exp-item:nth-child(2) .exp-bullet:nth-child(3) .exp-bullet-text', prop: 'textContent' },
        'skills.num':      { sel: '#skills .section-num', prop: 'textContent' },
        'skills.title1':   { sel: '#skills .section-title', prop: 'line1' },
        'skills.title2':   { sel: '#skills .section-title', prop: 'line2' },
        'skills.hard':     { sel: '#skills .skills-subsection-label:nth-of-type(1)', prop: 'textContent' },
        'skills.soft':     { sel: '#skills .skills-subsection-label:nth-of-type(2)', prop: 'textContent' },
        's1.type':         { sel: '#hardSkills .skill-card:nth-child(1) .skill-type', prop: 'textContent' },
        's2.type':         { sel: '#hardSkills .skill-card:nth-child(2) .skill-type', prop: 'textContent' },
        's3.type':         { sel: '#hardSkills .skill-card:nth-child(3) .skill-type', prop: 'textContent' },
        's4.type':         { sel: '#hardSkills .skill-card:nth-child(4) .skill-type', prop: 'textContent' },
        's5.type':         { sel: '#hardSkills .skill-card:nth-child(5) .skill-type', prop: 'textContent' },
        's6.type':         { sel: '#hardSkills .skill-card:nth-child(6) .skill-type', prop: 'textContent' },
        's7.type':         { sel: '#hardSkills .skill-card:nth-child(7) .skill-type', prop: 'textContent' },
        'proj.num':        { sel: '#projects .section-num', prop: 'textContent' },
        'proj.title1':     { sel: '#projects .section-title', prop: 'line1' },
        'proj.title2':     { sel: '#projects .section-title', prop: 'line2' },
        'int.num':         { sel: '#interests .section-num', prop: 'textContent' },
        'int.title1':      { sel: '#interests .section-title', prop: 'line1' },
        'int.title2':      { sel: '#interests .section-title', prop: 'line2' },
        'int.sub':         { sel: '#interests .section-header > div:nth-child(2) p', prop: 'textContent' },
        'int1.name':       { sel: '#interests .interest-card:nth-child(1) .interest-name', prop: 'textContent' },
        'int1.sub':        { sel: '#interests .interest-card:nth-child(1) .interest-sub', prop: 'textContent' },
        'int2.name':       { sel: '#interests .interest-card:nth-child(2) .interest-name', prop: 'textContent' },
        'int2.sub':        { sel: '#interests .interest-card:nth-child(2) .interest-sub', prop: 'textContent' },
        'int3.name':       { sel: '#interests .interest-card:nth-child(3) .interest-name', prop: 'textContent' },
        'int3.sub':        { sel: '#interests .interest-card:nth-child(3) .interest-sub', prop: 'textContent' },
        'int4.name':       { sel: '#interests .interest-card:nth-child(4) .interest-name', prop: 'textContent' },
        'int4.sub':        { sel: '#interests .interest-card:nth-child(4) .interest-sub', prop: 'textContent' },
    };

    // Soft skills special handling (pills by index)
    const softPillKeys = ['soft.adaptability','soft.analytical','soft.alm','soft.bpm','soft.br','soft.comm','soft.ps','soft.pm','soft.sm','soft.team','soft.time'];

    function applyLang(lang) {
        // const t = translations[lang];
        Object.entries(i18nMap).forEach(([key, config]) => {
            const val = t[key];
            if (!val) return;
            const els = document.querySelectorAll(config.sel);
            els.forEach(el => {
                if (config.prop === 'line1') {
                    const lines = el.innerHTML.split('<br>');
                    lines[0] = val;
                    el.innerHTML = lines.join('<br>');
                } else if (config.prop === 'line2') {
                    const lines = el.innerHTML.split('<br>');
                    lines[1] = val;
                    el.innerHTML = lines.join('<br>');
                } else if (config.prop === 'innerHTML') {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            });
        });

        // Soft pills
        const pills = document.querySelectorAll('#softSkills .soft-pill');
        softPillKeys.forEach((key, i) => {
            if (pills[i]) {
                const icon = pills[i].querySelector('i');
                pills[i].innerHTML = '';
                if (icon) pills[i].appendChild(icon);
                pills[i].appendChild(document.createTextNode(' ' + t[key]));
            }
        });

        // Toggle button active state
        document.getElementById('langIND').classList.toggle('active', lang === 'id');
        document.getElementById('langENG').classList.toggle('active', lang === 'en');
        document.documentElement.lang = lang === 'id' ? 'id' : 'en';
    }

    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        anime({
            targets: 'section, nav .nav-link, nav .nav-logo',
            opacity: [1, 0.5, 1],
            duration: 350,
            easing: 'easeInOutSine'
        });
        applyLang(currentLang);
    });

    // Init with English
    applyLang('en');
