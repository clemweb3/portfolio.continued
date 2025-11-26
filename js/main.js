/**
 * main.js
 * Section snapping, smooth scrolling, and mobile nav toggle
 */

document.addEventListener('DOMContentLoaded', () => {

    // ===== VARIABLES =====
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    let currentSection = 0;
    let isScrolling = false;

    // ===== 1. Hamburger Toggle =====
    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // ===== 2. Smooth Scroll for Nav Links =====
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                currentSection = Array.from(sections).indexOf(targetSection);

                // Close mobile menu
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // ===== 3. Dynamic Navbar Styling on Scroll =====
    const SCROLL_THRESHOLD = 50;
    function handleNavbarScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ===== 4. Highlight Active Nav Link =====
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active-nav'));
                const targetLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (targetLink) targetLink.classList.add('active-nav');
            }
        });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));

    // ===== 5. Full-section Scroll Function =====
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => isScrolling = false, 800);
    }

    // ===== 6. Wheel + Keyboard Scrolling =====
    window.addEventListener('wheel', e => {
        if (isScrolling) return;
        if (e.deltaY > 0) currentSection = Math.min(currentSection + 1, sections.length - 1);
        else if (e.deltaY < 0) currentSection = Math.max(currentSection - 1, 0);
        scrollToSection(currentSection);
    }, { passive: false });

    window.addEventListener('keydown', e => {
        if (isScrolling) return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            currentSection = Math.min(currentSection + 1, sections.length - 1);
            scrollToSection(currentSection);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            currentSection = Math.max(currentSection - 1, 0);
            scrollToSection(currentSection);
        }
    });

    // ===== 7. Touch Swipe for Mobile =====
    let touchStartY = 0;
    let touchEndY = 0;

    window.addEventListener('touchstart', e => { touchStartY = e.changedTouches[0].screenY; }, { passive: true });
    window.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        if (isScrolling) return;
        const deltaY = touchStartY - touchEndY;
        if (Math.abs(deltaY) < 50) return; // ignore small swipes
        if (deltaY > 0) currentSection = Math.min(currentSection + 1, sections.length - 1);
        else currentSection = Math.max(currentSection - 1, 0);
        scrollToSection(currentSection);
    }, { passive: true });

    // ===== 8. Console Greeting =====
    console.log("%cPortfolio JS Initialized ", "color: #7AE2CF; font-size: 1.2em;");
});
