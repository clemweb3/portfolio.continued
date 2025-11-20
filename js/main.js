/**
 * main.js
 * Enhances the tech portfolio with smooth navigation, dynamic header behavior, and section tracking.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Select all navigation links that point to local sections (starting with #)
    const navLinks = document.querySelectorAll('.w3-bar a[href^="#"]');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Pixels scrolled before header change

    // 1. Smooth Scrolling for all internal anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use scrollIntoView with smooth behavior for a professional look
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Optional: Update URL hash without forcing a jump (modern SPA feel)
                history.pushState(null, null, targetId);
            }
        });
    });

    // 2. Dynamic Header Shrink/Color Change on Scroll (Interactivity)
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            // Apply the 'scrolled' class defined in CSS
            header.classList.add('scrolled');
        } else {
            // Remove the class when scrolled back to the top
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // 3. Highlight Active Navigation Link (Intersection Observer API for performance)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // When the section center crosses the viewport center
        threshold: 0 // Minimal threshold, focusing on the rootMargin offset
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active-nav'));
                
                // Add active class to the link corresponding to the current section
                const targetLink = document.querySelector(`.w3-bar a[href="#${entry.target.id}"]`);
                if (targetLink) {
                    targetLink.classList.add('active-nav');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Console Greeting (Techy Touch)
    console.log("%cSystem Initialized. Data Streams Active.", "color: #7AE2CF; font-size: 1.2em;");
});