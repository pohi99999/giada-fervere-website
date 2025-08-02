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

    // --- NYELVVÁLTÓ LOGIKA (VERZIÓ 3.0) ---
    const languageSwitcher = document.querySelector('.language-switcher');

    function getStoredLanguage() {
        return localStorage.getItem('giada-language') || 'hu';
    }

    function setStoredLanguage(lang) {
        localStorage.setItem('giada-language', lang);
    }

    function translatePage(lang) {
        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) {
                el.innerHTML = t[key];
            }
        });
        
        const pageTitleKey = document.body.getAttribute('data-page-title-key');
        if (pageTitleKey && t[pageTitleKey]) {
            document.title = t[pageTitleKey];
        } else {
            document.title = "Giada Fervere";
        }

        // Frissítjük a HTML lang attribútumot is
        document.documentElement.lang = lang;
    }

    function populateLanguageSwitcher(currentLang) {
        if (!languageSwitcher) return;

        const currentLangData = translations[currentLang];
        const otherLangs = Object.keys(translations).filter(lang => lang !== currentLang);

        let dropdownHTML = '';
        otherLangs.forEach(lang => {
            const langData = translations[lang];
            dropdownHTML += `
                <li>
                    <a href="#" data-lang="${lang}">
                        <img src="${langData.flag}" alt="${langData.name} (${lang.toUpperCase()}) flag" class="lang-flag">
                        <span class="lang-text">${lang.toUpperCase()}</span>
                    </a>
                </li>
            `;
        });

        const switcherHTML = `
            <div class="current-language">
                <img src="${currentLangData.flag}" alt="${currentLangData.name} flag" class="lang-flag">
                <span class="lang-text">${currentLang.toUpperCase()}</span>
                <span class="arrow-down"></span>
            </div>
            <ul class="language-dropdown">
                ${dropdownHTML}
            </ul>
        `;

        languageSwitcher.innerHTML = switcherHTML;

        // Újra hozzárendeljük az eseményfigyelőt, mert a tartalom felülíródott
        languageSwitcher.querySelector('.language-dropdown').addEventListener('click', handleLanguageChange);
    }

    function handleLanguageChange(e) {
        const link = e.target.closest('a[data-lang]');
        if (link) {
            e.preventDefault();
            const selectedLang = link.getAttribute('data-lang');
            setStoredLanguage(selectedLang);
            translatePage(selectedLang);
            populateLanguageSwitcher(selectedLang); // Újraépítjük a menüt
        }
    }

    function initLocalization() {
        if (!languageSwitcher || typeof translations === 'undefined') return;
        const initialLang = getStoredLanguage();
        translatePage(initialLang);
        populateLanguageSwitcher(initialLang);
    }

    // --- INICIALIZÁLÁS ---
    if (document.querySelectorAll('.gallery-item').length > 0) {
        initializeLightbox();
    }
    initLocalization();
});
