// Add your JavaScript here

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    
    const goToTopBtn = document.getElementById('goToTop');

    // Check if we're on the context page
    const contextSections = document.querySelectorAll('.context-section');
    console.log('Found context sections:', contextSections.length);
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
    console.log('Page indicator:', pageIndicator);
    
    if (contextSections.length > 0 && prevBtn && nextBtn) {
        console.log('Setting up pagination...');
        
        // Context page with pagination
        let currentPage = 0;
        
        const showPage = function(pageIndex) {
            console.log('showPage called with index:', pageIndex);
            
            // Hide all sections
            contextSections.forEach((section, index) => {
                section.classList.remove('active');
                console.log('Removed active from section', index);
            });
            
            // Show selected section
            if (contextSections[pageIndex]) {
                contextSections[pageIndex].classList.add('active');
                console.log('Added active to section', pageIndex);
                
                // Scroll to the specific section
                const headerOffset = 80;
                const elementPosition = contextSections[pageIndex].getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            currentPage = pageIndex;
            if (pageIndicator) {
                pageIndicator.textContent = (currentPage + 1) + ' / ' + contextSections.length;
                console.log('Updated page indicator to:', pageIndicator.textContent);
            }
            
            // Update button states
            if (prevBtn) prevBtn.disabled = currentPage === 0;
            if (nextBtn) nextBtn.disabled = currentPage === contextSections.length - 1;
        };
        
        prevBtn.addEventListener('click', function(e) {
            console.log('Previous button clicked');
            e.preventDefault();
            if (currentPage > 0) {
                showPage(currentPage - 1);
            }
        });
        
        nextBtn.addEventListener('click', function(e) {
            console.log('Next button clicked');
            e.preventDefault();
            if (currentPage < contextSections.length - 1) {
                showPage(currentPage + 1);
            }
        });
        
        // Initialize pagination using a URL hash if one is present
        const initialHash = window.location.hash;
        let initialPage = 0;
        if (initialHash) {
            const initialAnchor = initialHash.substring(1);
            const initialIndex = Array.from(contextSections).findIndex(section => section.id === initialAnchor);
            if (initialIndex !== -1) {
                initialPage = initialIndex;
            }
        }
        showPage(initialPage);
        
        // Bind context dropdown links to navigate sections (only for same-page links)
        const contextDropdownLinks = document.querySelectorAll('header .dropdown-content a');
        console.log('Found dropdown links:', contextDropdownLinks.length);
        
        contextDropdownLinks.forEach((link, idx) => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                console.log('Dropdown link clicked:', idx, href);
                
                // Only handle same-page links (starting with #)
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const anchorId = href.substring(1);
                    console.log('Extracted anchor ID:', anchorId);
                    
                    if (anchorId) {
                        const sectionIndex = Array.from(contextSections).findIndex(section => section.id === anchorId);
                        console.log('Found section index:', sectionIndex);
                        if (sectionIndex !== -1) {
                            showPage(sectionIndex);
                        }
                    }
                }
                // For cross-page links (like reference.html#...), let the browser handle navigation
            });
        });
    } else {
        // Reference page - use smooth scroll for dropdown links
        const subNavLinks = document.querySelectorAll('.dropdown-content a');
        
        // Handle initial hash on page load
        const initialHash = window.location.hash;
        if (initialHash) {
            const targetId = initialHash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    targetElement.classList.add('animate');
                }, 100); // Small delay to ensure page is fully loaded
            }
        }
        
        const bindSmoothScroll = function(link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        targetElement.classList.add('animate');
                    }
                });
            }
        };

        subNavLinks.forEach(bindSmoothScroll);
    }

    // Handle footer links - check if context page with pagination or reference page
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    if (contextSections.length > 0) {
        // Context page with pagination - footer links should trigger pagination
        footerLinks.forEach((link) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const anchorId = href.includes('#') ? href.substring(href.indexOf('#') + 1) : null;
                
                if (anchorId) {
                    const sectionIndex = Array.from(contextSections).findIndex(section => section.id === anchorId);
                    if (sectionIndex !== -1) {
                        // Access the showPage function from context page
                        const prevBtn = document.getElementById('prevBtn');
                        const nextBtn = document.getElementById('nextBtn');
                        const pageIndicator = document.getElementById('pageIndicator');
                        
                        // We need to recreate showPage logic for footer links
                        let currentPage = sectionIndex;
                        
                        contextSections.forEach(section => {
                            section.classList.remove('active');
                        });
                        
                        contextSections[sectionIndex].classList.add('active');
                        document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        if (pageIndicator) {
                            pageIndicator.textContent = (sectionIndex + 1) + ' / ' + contextSections.length;
                        }
                        
                        if (prevBtn) prevBtn.disabled = sectionIndex === 0;
                        if (nextBtn) nextBtn.disabled = sectionIndex === contextSections.length - 1;
                    }
                }
            });
        });
    } else {
        // Reference page - use smooth scroll for footer links
        const bindFooterScroll = function(link) {
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
        
        footerLinks.forEach(bindFooterScroll);
    }

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

    // Animation for scroll elements
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