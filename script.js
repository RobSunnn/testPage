document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element Selectors ---
    const elements = {
        burger: document.getElementById('burger-trigger'),
        closeBtn: document.getElementById('burger-close'),
        menu: document.getElementById('mobile-menu'),
        progressBar: document.querySelector('.status-progress'),
        statusText: document.querySelector('.status-text'),
        imgFrames: document.querySelectorAll('.img-frame'),
        revealElements: document.querySelectorAll('.reveal'),
        modal: document.getElementById('whitepaperModal'),
        triggerModal: document.getElementById('trigger-modal'),
        triggerModalMob: document.getElementById('trigger-modal-mob'),
        closeModal: document.getElementById('close-modal')
    };

    // --- 2. Navigation & Modal Logic ---
    const toggleMenu = (active) => {
        elements.menu?.classList.toggle('active', active);
        document.body.style.overflow = active ? 'hidden' : 'auto';
    };

    elements.burger?.addEventListener('click', () => toggleMenu(true));
    elements.closeBtn?.addEventListener('click', () => toggleMenu(false));

    // Close menu on link click
    document.querySelectorAll('.mobile-overlay a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Modal Handlers
    const toggleModal = (show) => {
        if (elements.modal) elements.modal.style.display = show ? 'grid' : 'none';
    };

    [elements.triggerModal, elements.triggerModalMob].forEach(btn => {
        btn?.addEventListener('click', () => toggleModal(true));
    });
    elements.closeModal?.addEventListener('click', () => toggleModal(false));

    // --- 3. Scroll & System Monitor ---
    const updateScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        if (elements.progressBar) {
            elements.progressBar.style.width = `${scrollPercent}%`;
        }

        if (elements.statusText) {
            if (scrollPercent < 15) elements.statusText.innerText = "SYSTEM: STANDBY";
            else if (scrollPercent < 85) elements.statusText.innerText = "SYSTEM: SCANNING BIOMETRICS";
            else elements.statusText.innerText = "SYSTEM: OPTIMIZATION COMPLETE";
        }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });

    // --- 4. Advanced 3D Tilt & Parallax ---
    // Combined logic to handle frame rotation and internal image movement
    elements.imgFrames.forEach(frame => {
        frame.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = frame.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            // Rotate the entire container
            frame.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;

            // Subtle parallax for the inner images (front and back)
            const imgs = frame.querySelectorAll('img');
            imgs.forEach(img => {
                // If hovering, we adjust scale slightly for the "focus" effect
                const baseScale = frame.matches(':hover') ? 1.05 : 1;
                img.style.transform = `scale(${baseScale}) translate(${x * 10}px, ${y * 10}px)`;
            });
        });

        frame.addEventListener('mouseleave', () => {
            frame.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            const imgs = frame.querySelectorAll('img');
            imgs.forEach(img => {
                img.style.transform = `scale(1) translate(0, 0)`;
            });
        });
    });

    // --- 5. Intersection Observer (Reveal on Scroll) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, { threshold: 0.15 });

    elements.revealElements.forEach(el => revealObserver.observe(el));
});