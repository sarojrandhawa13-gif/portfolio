document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded fired");

  const goToTopBtn = document.getElementById("goToTop");

  // Context page detection
  const contextSections = document.querySelectorAll(".context-section");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageIndicator = document.getElementById("pageIndicator");

  if (contextSections.length > 0 && prevBtn && nextBtn) {
    let currentPage = 0;

    const showPage = function (pageIndex) {
      // Hide all
      contextSections.forEach((section) => {
        section.classList.remove("active");
      });

      // Show selected
      if (contextSections[pageIndex]) {
        contextSections[pageIndex].classList.add("active");

        // ✅ Update URL hash (important fix)
        window.location.hash = contextSections[pageIndex].id;

        // Smooth scroll
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition =
            contextSections[pageIndex].getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 50);
      }

      currentPage = pageIndex;

      if (pageIndicator) {
        pageIndicator.textContent =
          currentPage + 1 + " / " + contextSections.length;
      }

      // Button states
      if (prevBtn) prevBtn.disabled = currentPage === 0;
      if (nextBtn)
        nextBtn.disabled = currentPage === contextSections.length - 1;
    };

    // Prev / Next
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage > 0) {
        showPage(currentPage - 1);
      }
    });

    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage < contextSections.length - 1) {
        showPage(currentPage + 1);
      }
    });

    // Initial load with hash
    const initialHash = window.location.hash;
    let initialPage = 0;

    if (initialHash) {
      const anchor = initialHash.substring(1);
      const index = Array.from(contextSections).findIndex(
        (sec) => sec.id === anchor,
      );
      if (index !== -1) {
        initialPage = index;
      }
    }

    showPage(initialPage);

    // ✅ FIXED dropdown navigation
    const contextDropdownLinks = document.querySelectorAll(
      'header .dropdown-content a[href*="context.html#"], header .dropdown-content a[href^="#"]',
    );

    contextDropdownLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href.includes("#")) {
          e.preventDefault();

          const anchorId = href.substring(href.indexOf("#") + 1);

          const sectionIndex = Array.from(contextSections).findIndex(
            (section) => section.id === anchorId,
          );

          if (sectionIndex !== -1) {
            showPage(sectionIndex);
          }
        }
      });
    });
  } else {
    // Reference page smooth scroll
    const subNavLinks = document.querySelectorAll(".dropdown-content a");

    const initialHash = window.location.hash;
    if (initialHash) {
      const targetId = initialHash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          targetElement.classList.add("animate");
        }, 100);
      }
    }

    subNavLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });

            targetElement.classList.add("animate");
          }
        });
      }
    });
  }

  // Footer links
  const footerLinks = document.querySelectorAll(".footer-links a");

  if (contextSections.length > 0) {
    footerLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const href = this.getAttribute("href");
        const anchorId = href.includes("#")
          ? href.substring(href.indexOf("#") + 1)
          : null;

        if (anchorId) {
          const sectionIndex = Array.from(contextSections).findIndex(
            (section) => section.id === anchorId,
          );

          if (sectionIndex !== -1) {
            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");
            const pageIndicator = document.getElementById("pageIndicator");

            contextSections.forEach((section) => {
              section.classList.remove("active");
            });

            contextSections[sectionIndex].classList.add("active");

            window.location.hash = anchorId;

            document.querySelector("main").scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            if (pageIndicator) {
              pageIndicator.textContent =
                sectionIndex + 1 + " / " + contextSections.length;
            }

            if (prevBtn) prevBtn.disabled = sectionIndex === 0;
            if (nextBtn)
              nextBtn.disabled = sectionIndex === contextSections.length - 1;
          }
        }
      });
    });
  }

  // Go to top
  if (goToTopBtn) {
    window.addEventListener("scroll", function () {
      goToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    goToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scroll animations
  const animateElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 },
  );

  animateElements.forEach((el) => observer.observe(el));
});
