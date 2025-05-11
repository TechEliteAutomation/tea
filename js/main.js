/* START OF FILE: js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Mobile Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenuContainer = document.querySelector('.nav-menu-container');

    if (menuToggle && navMenuContainer) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenuContainer.classList.toggle('active'); // Add/remove 'active' class for styling
            // Optional: toggle body class to prevent scrolling when menu is open
            // document.body.classList.toggle('no-scroll'); 
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Exclude EmailJS form status link if any
        if (anchor.getAttribute('href') === '#form-status') return;

        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's a valid selector and not just "#"
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // If mobile menu is open, close it after clicking a link
                    if (navMenuContainer && navMenuContainer.classList.contains('active')) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                        navMenuContainer.classList.remove('active');
                        // document.body.classList.remove('no-scroll');
                    }
                }
            }
        });
    });

    // --- Active Navigation Link Highlighting based on Scroll Position ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    function changeLinkState() {
        let index = sections.length;
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;

        while (--index && window.scrollY + navbarHeight < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        // Ensure the link exists before trying to add 'active' class
        if (sections[index] && navLinks[index]) {
             // Check if current section is the homepage hero section
            if (sections[index].id === 'hero' && window.location.pathname === '/') {
                document.querySelector('.nav-links a[href="/"]').classList.add('active');
            } else if (navLinks[index] && sections[index].id !== 'hero') { // Avoid activating non-home link for hero
                const activeLink = document.querySelector(`.nav-links a[href*="${sections[index].id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            } else if (window.location.pathname === '/' && !sections[index]) { // Default to home if at top of page
                 document.querySelector('.nav-links a[href="/"]').classList.add('active');
            }
        } else if (window.location.pathname === '/' && (window.scrollY + navbarHeight < (sections[0]?.offsetTop || 0))) {
             document.querySelector('.nav-links a[href="/"]').classList.add('active'); // Activate home if scrolled to top
        }
    }
    
    // Initial check in case the page is loaded on a section
    // And handle current page active link (non-scrolling based)
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove all active first
        if (link.getAttribute('href') === currentPath || (currentPath.startsWith(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
            // For service parent link when on a child service page
            if (currentPath.includes('/services/') && link.getAttribute('href') === '/services.html') {
                 link.classList.add('active-parent'); // Special class for parent
            } else {
                link.classList.add('active');
            }
        }
    });
    // If on homepage, ensure "Home" is active by default if no hash
    if (currentPath === '/' && window.location.hash === '') {
        const homeLink = document.querySelector('.nav-links a[href="/"]');
        if (homeLink) homeLink.classList.add('active');
    }


    // Add scroll listener if sections exist
    if (sections.length > 0) {
        // changeLinkState(); // Initial call
        // window.addEventListener('scroll', changeLinkState); // Disabled for now as it might conflict with static active states
    }


    // --- Update Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    const yearSpanFooter = document.getElementById('current-year-footer'); // For legal pages
    if (yearSpanFooter) {
        yearSpanFooter.textContent = new Date().getFullYear();
    }

});
/* END OF FILE: js/main.js */