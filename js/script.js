document.addEventListener('DOMContentLoaded', function() {
    // --- MEGLÉVŐ INTRO ÉS VIDEÓ KÓD ---
    console.log("DOM fully loaded and parsed.");

    const introSequence = document.getElementById('intro-sequence');
    const introLogo = document.querySelector('.intro-logo');
    const mainHeader = document.getElementById('main-header');
    const artistName = document.querySelector('.artist-name');
    const mainNav = document.querySelector('.main-nav');
    const mainFooter = document.getElementById('main-footer');
    const body = document.body;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function startIntro() {
        if (!introSequence || !introLogo || !mainHeader || !artistName) {
            console.error("Intro elements not found, skipping animation.");
            body.classList.add('loaded');
            if(mainHeader) mainHeader.classList.add('visible');
            if(mainFooter) mainFooter.classList.add('visible');
            return;
        }
        await delay(500);
        introLogo.classList.add('visible');
        await delay(2500);
        introLogo.classList.remove('visible');
        await delay(1500);
        introSequence.style.opacity = '0';
        mainHeader.classList.add('visible');
        mainFooter.classList.add('visible');
        await delay(500);
        introSequence.style.display = 'none';
        artistName.classList.add('visible');
        if(mainNav) mainNav.classList.add('visible');
        body.classList.add('loaded');
    }

    if (body.classList.contains('landing-page')) {
        startIntro();
    } else {
        body.classList.add('loaded');
        if(mainHeader) mainHeader.style.opacity = '1';
        if(mainFooter) mainFooter.style.opacity = '1';
    }

    const video = document.getElementById('background-video');
    if (video) {
        video.play().catch(error => {
            console.error("Video autoplay was prevented.", error);
        });
    }

    // --- ÁLTALÁNOS MODÁLKEZELŐ LOGIKA ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-close-btn');
    const modals = document.querySelectorAll('.modal');

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // --- KÉPNAGYÍTÓ LIGHTBOX KÓD ---
    function initializeLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

        if (galleryItems.length === 0 || !lightbox) return;

        let currentIndex = 0;
        const imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);

        function showLightbox(index) {
            currentIndex = index;
            lightboxImg.src = imageSources[currentIndex];
            lightbox.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }

        function hideLightbox() {
            lightbox.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
            lightboxImg.src = imageSources[currentIndex];
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % imageSources.length;
            lightboxImg.src = imageSources[currentIndex];
        }

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                showLightbox(index);
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', hideLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', showPrevImage);
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', showNextImage);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('visible')) {
                if (e.key === 'Escape') hideLightbox();
                else if (e.key === 'ArrowLeft') showPrevImage();
                else if (e.key === 'ArrowRight') showNextImage();
            }
        });
    }

    // --- INICIALIZÁLÁS ---
    // A galéria képeket statikusan töltjük be a HTML-ben, így nincs szükség dinamikus betöltésre.
    // A lightboxot inicializáljuk, ha vannak galériaelemek.
    if (document.querySelectorAll('.gallery-item').length > 0) {
        initializeLightbox();
    }
});