document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    }

    // Initialize the icon based on current mode
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '🌙'; // Moon icon for dark mode
    } else {
        darkModeToggle.textContent = '☀️'; // Sun icon for light mode
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
            darkModeToggle.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'light-mode');
            darkModeToggle.textContent = '☀️';
        }
    });


    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger-icon');
    const navMenu = document.getElementById('mobile-nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Optional: toggle a class on hamburger to animate it to an 'X'
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // --- Basic Scroll-based Animations (for elements with .slide-up or .fade-in classes) ---
    // If you enable GSAP in index.html, you can comment out or remove this block
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply final animated state. Initial state is set in CSS/HTML (opacity:0, transform)
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Remove animation-delay if it was set for initial load, as it's now in view
                entry.target.style.animationDelay = '0s';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Ensure elements start hidden if JS is handling animations
        el.style.opacity = '0';
        if (el.classList.contains('slide-up')) {
            el.style.transform = 'translateY(50px)';
        } else if (el.classList.contains('fade-in')) {
            el.style.transform = 'translateY(20px)'; // Smaller initial offset for fade-in
        }
        observer.observe(el);
    });


    // --- Testimonial Carousel (Simplified Frontend Logic) ---
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        let currentIndex = 0;
        const items = testimonialCarousel.querySelectorAll('.testimonial-item');
        const totalItems = items.length;

        // Hide all but the first item initially
        items.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });

        // Function to show next testimonial
        const showNextTestimonial = () => {
            items[currentIndex].style.opacity = '0'; // Start fade out
            setTimeout(() => {
                items[currentIndex].style.display = 'none'; // Hide after fade out

                currentIndex = (currentIndex + 1) % totalItems;
                items[currentIndex].style.display = 'block'; // Show next
                setTimeout(() => {
                    items[currentIndex].style.opacity = '1'; // Fade in next
                }, 50); // Small delay to allow display change before fade in
            }, 500); // Match CSS opacity transition duration
        };

        // Auto-scroll every 7 seconds
        setInterval(showNextTestimonial, 7000);
    }


    // --- Sticky "Shop Now" CTA ---
    const stickyCta = document.querySelector('.sticky-shop-cta');
    const heroSection = document.querySelector('.hero-section');

    if (stickyCta && heroSection) {
        // Initial state is hidden by CSS, JS controls visibility
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            // Show CTA if user scrolls past hero section
            if (window.scrollY > heroBottom) {
                stickyCta.style.opacity = '1';
                stickyCta.style.transform = 'translateY(0)';
                stickyCta.style.display = 'block'; // Ensure it's block for transition
            } else {
                stickyCta.style.opacity = '0';
                stickyCta.style.transform = 'translateY(20px)';
                // Hide completely after transition if not visible
                setTimeout(() => {
                    if (stickyCta.style.opacity === '0') {
                        stickyCta.style.display = 'none';
                    }
                }, 300); // Match CSS transition duration
            }
        });
    }
});