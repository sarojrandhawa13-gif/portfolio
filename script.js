// Add your JavaScript here

document.addEventListener('DOMContentLoaded', function() {
    const subNavLinks = document.querySelectorAll('.dropdown-content a');
    const goToTopBtn = document.getElementById('goToTop');

    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Add animate class immediately for animation
                    targetElement.classList.add('animate');
                }
            }
        });
    });

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