tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                surface: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                }
            }
        }
    }
}



    // Initialize Lucide Icons
    lucide.createIcons();

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ===== HERO NAME ANIMATION =====
    // anime({
    //     targets: '#heroName',
    //     opacity: [0, 1],
    //     translateY: [40, 0],
    //     easing: 'easeOutExpo',
    //     duration: 1400,
    //     delay: 300
    // });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealItems = document.querySelectorAll('.reveal-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Determine delay based on sibling position
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.querySelectorAll('.reveal-item'));
                const index = siblings.indexOf(entry.target);

                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [60, 0],
                    easing: 'easeOutCubic',
                    duration: 1000,
                    delay: index * 120,
                    begin: function() {
                        entry.target.style.visibility = 'visible';
                    }
                });

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        item.style.visibility = 'hidden';
        revealObserver.observe(item);
    });

    // ===== STAGGERED SKILL CARDS ANIMATION =====
    const hardSkillsContainer = document.getElementById('hardSkills');
    const softSkillsContainer = document.getElementById('softSkills');
    const interestsGrid = document.getElementById('interestsGrid');

    function setupStaggerAnimation(container, staggerDelay) {
        const items = container.querySelectorAll('.skill-card, .interest-pill');
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: items,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        scale: [0.95, 1],
                        easing: 'easeOutCubic',
                        duration: 800,
                        delay: anime.stagger(staggerDelay)
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        if (items.length > 0) {
            // Set initial state
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(40px) scale(0.95)';
            });
            staggerObserver.observe(container);
        }
    }

    setupStaggerAnimation(hardSkillsContainer, 100);
    setupStaggerAnimation(softSkillsContainer, 120);
    setupStaggerAnimation(interestsGrid, 120);

    // ===== SCROLL INDICATOR FADE =====
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const opacity = Math.max(0, 1 - scrollY / 300);
            scrollIndicator.style.opacity = opacity;
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT ON HERO =====
    const heroSection = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (scrollY < window.innerHeight) {
            const translateY = scrollY * 0.3;
            const opacity = 1 - scrollY / (window.innerHeight * 0.8);
            heroSection.style.transform = `translateY(${translateY}px)`;
            heroSection.style.opacity = Math.max(0, opacity);
        }
    });