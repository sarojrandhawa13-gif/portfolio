// Add your JavaScript here

document.addEventListener('DOMContentLoaded', function() {
    const subNavLinks = document.querySelectorAll('.dropdown-content a');
    const pageNavLinks = document.querySelectorAll('.section-nav a');
    const footerLinks = document.querySelectorAll('.footer-links a');
    const goToTopBtn = document.getElementById('goToTop');

    const bindSmoothScroll = function(link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.classList.add('animate');
                }
            });
        }
    };

    subNavLinks.forEach(bindSmoothScroll);
    pageNavLinks.forEach(bindSmoothScroll);
    footerLinks.forEach(bindSmoothScroll);

    // Go to top button
    if (goToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                goToTopBtn.style.display = 'block';
            } else {
                goToTopBtn.style.display = 'none';
            }
        });

        goToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Optional: Still use intersection for manual scrolling
    const animateElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => {
        observer.observe(el);
    });
});