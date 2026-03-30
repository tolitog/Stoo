/**
 * STOO CHAOLONG - Main Interactions
 * Includes: Nav scroll, Scroll animations, FAB, Back-to-top, Open status, Copy, Social links
 */

const businessData = {
    facebook: "https://facebook.com/your-page",
    instagram: "https://instagram.com/your-profile",
    tiktok: "https://tiktok.com/@your-handle",
    googleMaps: "https://maps.app.goo.gl/XLPErcMpAxs1t8ox9",
    fullAddress: "Stoo Chaolong, QPVX+CGC, North National Highway, San Jose, Puerto Princesa, Palawan"
};

// Business hours (24h format, Philippine time)
const businessHours = {
    // 0=Sun, 1=Mon, ..., 6=Sat
    weekday: { open: 8, close: 21 },   // Mon-Fri 8AM-9PM
    weekend: { open: 7, close: 22 },   // Sat-Sun 7AM-10PM
};

document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       1. STICKY NAVBAR ON SCROLL
    ================================ */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });


    /* ================================
       2. SCROLL-IN REVEAL ANIMATIONS
    ================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // fire once
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    /* ================================
       4. LIVE OPEN / CLOSED STATUS
    ================================ */
    function updateOpenStatus() {
        const now = new Date();
        // Convert to Philippine time (UTC+8)
        const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
        const day = phTime.getDay();    // 0=Sun, 6=Sat
        const hour = phTime.getHours() + phTime.getMinutes() / 60;

        const isWeekend = (day === 0 || day === 6);
        const hours = isWeekend ? businessHours.weekend : businessHours.weekday;
        const isOpen = hour >= hours.open && hour < hours.close;

        const pill = document.getElementById('open-status-pill');
        const dot  = document.getElementById('status-dot');
        const text = document.getElementById('open-status-text');

        if (pill && dot && text) {
            if (isOpen) {
                pill.classList.add('open-pill');
                pill.classList.remove('closed-pill');
                dot.className = 'open-dot';
                text.textContent = 'Open Now';
            } else {
                pill.classList.add('closed-pill');
                pill.classList.remove('open-pill');
                dot.className = 'closed-dot';
                text.textContent = 'Closed';
            }
        }
    }

    updateOpenStatus();
    setInterval(updateOpenStatus, 60000); // refresh every minute


    /* ================================
       6. FLOATING ACTION BUTTON (FAB)
    ================================ */
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');

    if (fabMain && fabMenu) {
        fabMain.addEventListener('click', () => {
            const isOpen = fabMenu.classList.toggle('open');
            fabMain.classList.toggle('open', isOpen);
            fabMain.setAttribute('aria-expanded', isOpen);
        });

        // Close FAB when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabMain.contains(e.target) && !fabMenu.contains(e.target)) {
                fabMenu.classList.remove('open');
                fabMain.classList.remove('open');
            }
        });
    }


    /* ================================
       7. BACK TO TOP BUTTON
    ================================ */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ================================
       SOCIAL MEDIA LINKS (Footer)
    ================================ */
    document.querySelectorAll('.socials a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.textContent.trim().toLowerCase();
            const targetUrl = businessData[platform];
            if (targetUrl && targetUrl !== "#") {
                window.open(targetUrl, '_blank');
            } else {
                alert(`Our ${platform} page is coming soon!`);
            }
        });
    });


    /* ================================
       ADDRESS — OPEN MAPS ON CLICK
    ================================ */
    const addressText = document.querySelector('.shop-address');
    if (addressText) {
        addressText.addEventListener('click', () => {
            window.open(businessData.googleMaps, '_blank');
        });
    }


    /* ================================
       COPY ADDRESS BUTTON
    ================================ */
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(businessData.fullAddress).then(() => {
                const original = copyBtn.innerText;
                copyBtn.innerText = "Copied!";
                copyBtn.style.background = "#28a745";
                setTimeout(() => {
                    copyBtn.innerText = original;
                    copyBtn.style.background = "var(--stoo-brown)";
                }, 2000);
            });
        });
    }

});
