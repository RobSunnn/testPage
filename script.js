document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-trigger');
    const menu = document.getElementById('mobile-menu');
    const modal = document.getElementById('whitepaperModal');
    const openBtns = [document.getElementById('trigger-modal'), document.getElementById('trigger-modal-mob')];
    const closeModal = document.getElementById('close-modal');

    // Navigation Toggle
    burger.addEventListener('click', () => menu.classList.toggle('active'));

    // Modal Handlers
    const toggleModal = (show) => modal.style.display = show ? 'grid' : 'none';
    openBtns.forEach(btn => btn?.addEventListener('click', () => toggleModal(true)));
    closeModal.addEventListener('click', () => toggleModal(false));

    // Slow Scroll Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Outside Click for Modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) toggleModal(false);
    });
});