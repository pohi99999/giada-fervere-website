document.addEventListener('DOMContentLoaded', function() {
    
    const body = document.body;

    // --- INTRO ANIMÁCIÓ (Csak a főoldalon) ---
    function initializeIntro() {
        // Ha nem a főoldalon vagyunk, a CSS alapból láthatóvá teszi a tartalmat.
        if (!body.classList.contains('landing-page')) {
            return; 
        }

        const introSequence = document.getElementById('intro-sequence');
        const introLogo = document.querySelector('.intro-logo');
        const mainHeader = document.getElementById('main-header');
        const artistName = document.querySelector('.artist-name');
        const mainNav = document.querySelector('.main-nav');
        const mainFooter = document.getElementById('main-footer');

        async function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function startIntro() {
            if (!introSequence || !introLogo) return;

            // 1. Logó megjelenik
            await delay(500);
            introLogo.classList.add('visible');
            
            // 2. Logó eltűnik
            await delay(2500);
            introLogo.classList.remove('visible');
            
            // 3. Intro képernyő elhalványul, fő tartalom megjelenik
            await delay(1000);
            introSequence.style.opacity = '0';
            if(mainHeader) mainHeader.classList.add('visible');
            if(mainFooter) mainFooter.classList.add('visible');

            // 4. Intro képernyő eltávolítása
            await delay(1000); // Várunk az opacity transition végére (CSS-ben 1s)
            introSequence.style.display = 'none';
            
            // 5. Név és Navigáció animációja (CSS transition-ök kezelik az időzítést)
            if(artistName) artistName.classList.add('visible');
            if(mainNav) mainNav.classList.add('visible');
        }

        startIntro();
    }

    // --- VIDEÓ LEJÁTSZÁS KEZELÉSE ---
    function handleVideoAutoplay() {
        // Minden autoplay videót megpróbálunk elindítani
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(video => {
            video.play().catch(error => {
                // Böngésző policy blokkolhatja az autoplayt, ez normális.
            });
        });
    }

    // --- NYELVVÁLTÓ LOGIKA (Accessible with keyboard and mobile support) ---
    const languageSwitcher = document.querySelector('.language-switcher');
    let currentDropdown = null;
    let lastFocusedElement = null;

    function getStoredLanguage() {
        return localStorage.getItem('giada-language') || 'hu';
    }

    function setStoredLanguage(lang) {
        localStorage.setItem('giada-language', lang);
    }

    // Az oldal fordítása és metaadatok frissítése (Secure innerHTML handling)
    function translatePage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) {
            // Fallback to Hungarian if translation not found
            lang = 'hu';
            if (!translations[lang]) return;
        }
        const t = translations[lang];

        // 1. Szöveges elemek fordítása (csak rich content kulcsoknál innerHTML!)
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) {
                // Rich content keys that can use innerHTML (poems and specific content)
                if (key.startsWith('poem_') || 
                    key.includes('_modal_title') || 
                    key === 'about_p1' || 
                    key === 'about_p2') {
                    el.innerHTML = t[key];
                } else {
                    // Use textContent for security
                    el.textContent = t[key];
                }
            }
        });

        // 2. Placeholder szövegek fordítása
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (t[key]) {
                el.setAttribute('placeholder', t[key]);
            }
        });

        // 3. Oldal címének frissítése
        const pageTitleKey = document.body.getAttribute('data-page-title-key');
        if (pageTitleKey && t[pageTitleKey]) {
             // Főoldalon csak a név, aloldalakon "Cím | Giada Fervere"
            document.title = body.classList.contains('landing-page') ? t[pageTitleKey] : t[pageTitleKey] + " | Giada Fervere";
        }

        // 4. SEO Meta Description frissítése
        const metaDescEl = document.querySelector('meta[name="description"]');
        if (metaDescEl) {
            let descriptionKey;
            if (body.classList.contains('landing-page')) {
                descriptionKey = 'index_description';
            } else if (pageTitleKey) {
                descriptionKey = pageTitleKey.replace('_title', '_description');
            }
            
            if (descriptionKey && t[descriptionKey]) {
                metaDescEl.setAttribute('content', t[descriptionKey]);
            }
        }

        // 5. HTML lang attribútum frissítése
        document.documentElement.lang = lang;
    }

    // Accessible language switcher with button and dropdown
    function populateLanguageSwitcher(currentLang) {
        if (!languageSwitcher || typeof translations === 'undefined' || !translations[currentLang]) return;

        const currentLangData = translations[currentLang];
        const otherLangs = Object.keys(translations).filter(lang => lang !== currentLang);

        let dropdownHTML = '';
        otherLangs.forEach(lang => {
            const langData = translations[lang];
            dropdownHTML += `
                <li>
                    <a href="#" data-lang="${lang}" role="menuitem">
                        <img src="${langData.flag}" alt="${langData.name} flag" class="lang-flag">
                        <span class="lang-text">${lang.toUpperCase()}</span>
                    </a>
                </li>
            `;
        });

        const switcherHTML = `
            <button class="lang-current-btn" aria-expanded="false" aria-haspopup="true" aria-label="Nyelv váltása: ${currentLangData.name}">
                <img src="${currentLangData.flag}" alt="${currentLangData.name} flag" class="lang-flag">
                <span class="lang-text">${currentLang.toUpperCase()}</span>
                <span class="arrow-down">&#9662;</span>
            </button>
            <ul class="lang-dropdown" role="menu" aria-hidden="true">
                ${dropdownHTML}
            </ul>
        `;

        languageSwitcher.innerHTML = switcherHTML;

        // Event listeners for accessible language switcher
        const langButton = languageSwitcher.querySelector('.lang-current-btn');
        const langDropdown = languageSwitcher.querySelector('.lang-dropdown');

        langButton.addEventListener('click', toggleLanguageDropdown);
        langButton.addEventListener('keydown', handleLanguageButtonKeydown);
        langDropdown.addEventListener('click', handleLanguageChange);
        langDropdown.addEventListener('keydown', handleLanguageDropdownKeydown);
    }

    function toggleLanguageDropdown() {
        const langButton = languageSwitcher.querySelector('.lang-current-btn');
        const langDropdown = languageSwitcher.querySelector('.lang-dropdown');
        const isExpanded = langButton.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeLanguageDropdown();
        } else {
            openLanguageDropdown();
        }
    }

    function openLanguageDropdown() {
        const langButton = languageSwitcher.querySelector('.lang-current-btn');
        const langDropdown = languageSwitcher.querySelector('.lang-dropdown');
        
        langButton.setAttribute('aria-expanded', 'true');
        langDropdown.setAttribute('aria-hidden', 'false');
        langDropdown.classList.add('open');
        
        // Focus first item
        const firstItem = langDropdown.querySelector('a');
        if (firstItem) firstItem.focus();
        
        currentDropdown = langDropdown;
        lastFocusedElement = langButton;
    }

    function closeLanguageDropdown() {
        const langButton = languageSwitcher.querySelector('.lang-current-btn');
        const langDropdown = languageSwitcher.querySelector('.lang-dropdown');
        
        langButton.setAttribute('aria-expanded', 'false');
        langDropdown.setAttribute('aria-hidden', 'true');
        langDropdown.classList.remove('open');
        
        currentDropdown = null;
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    function handleLanguageButtonKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLanguageDropdown();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            openLanguageDropdown();
        }
    }

    function handleLanguageDropdownKeydown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeLanguageDropdown();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const links = [...currentDropdown.querySelectorAll('a')];
            const currentIndex = links.indexOf(document.activeElement);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
            }
            
            links[nextIndex].focus();
        }
    }

    function handleLanguageChange(e) {
        const link = e.target.closest('a[data-lang]');
        if (link) {
            e.preventDefault();
            const selectedLang = link.getAttribute('data-lang');
            setStoredLanguage(selectedLang);
            translatePage(selectedLang);
            populateLanguageSwitcher(selectedLang);
            closeLanguageDropdown();
        }
    }

    function initLocalization() {
        const initialLang = getStoredLanguage();
        // Add FOUC prevention class removal after translations loaded
        body.classList.add('i18n-loading');
        translatePage(initialLang);
        populateLanguageSwitcher(initialLang);
        // Remove FOUC prevention class
        setTimeout(() => {
            body.classList.remove('i18n-loading');
        }, 100);
    }

    // --- MOBILE NAVIGATION (Hamburger Menu) ---
    function initMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const primaryNav = document.querySelector('#primary-navigation');
        
        if (!navToggle || !primaryNav) return;

        let lastFocusedBeforeNav = null;

        function openMobileNav() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) return;

            lastFocusedBeforeNav = document.activeElement;
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.classList.add('nav-active');
            primaryNav.classList.add('nav-open');
            body.classList.add('nav-locked');

            // Focus first nav item
            const firstNavItem = primaryNav.querySelector('.nav-item');
            if (firstNavItem) {
                setTimeout(() => firstNavItem.focus(), 100);
            }
        }

        function closeMobileNav() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (!isExpanded) return;

            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('nav-active');
            primaryNav.classList.remove('nav-open');
            body.classList.remove('nav-locked');

            // Close language dropdown if open
            if (currentDropdown) {
                closeLanguageDropdown();
            }

            // Return focus
            if (lastFocusedBeforeNav) {
                lastFocusedBeforeNav.focus();
                lastFocusedBeforeNav = null;
            }
        }

        function toggleMobileNav() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        }

        // Event listeners
        navToggle.addEventListener('click', toggleMobileNav);

        // Close nav when clicking nav items (on mobile)
        primaryNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-item')) {
                closeMobileNav();
            }
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (currentDropdown) {
                    closeLanguageDropdown();
                } else if (navToggle.getAttribute('aria-expanded') === 'true') {
                    closeMobileNav();
                }
            }
        });

        // Close nav on window resize to desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && navToggle.getAttribute('aria-expanded') === 'true') {
                closeMobileNav();
            }
        });
    }

    // --- MODAL HANDLER WITH ACCESSIBILITY (Focus Trap, ARIA, ESC) ---
    function initializeModals() {
        const openModalButtons = document.querySelectorAll('[data-modal-target]');
        const closeModalButtons = document.querySelectorAll('.modal-close-btn');
        const modals = document.querySelectorAll('.modal');
        let lastFocusedBeforeModal = null;

        function openModal(modal) {
            if (modal == null) return;
            
            lastFocusedBeforeModal = document.activeElement;
            modal.classList.add('visible');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Focus first focusable element in modal
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            
            // Set up focus trap
            modal.addEventListener('keydown', handleModalKeydown);
        }

        function closeModal(modal) {
            if (modal == null) return;
            
            modal.classList.remove('visible');
            modal.setAttribute('aria-hidden', 'true');
            modal.removeEventListener('keydown', handleModalKeydown);
            
            // Restore focus
            if (lastFocusedBeforeModal) {
                lastFocusedBeforeModal.focus();
                lastFocusedBeforeModal = null;
            }
            
            // Only restore body overflow if lightbox is not visible
            if (!document.querySelector('.lightbox.visible')) {
                document.body.style.overflow = 'auto';
            }
        }

        function handleModalKeydown(e) {
            if (e.key === 'Escape') {
                const modal = e.target.closest('.modal');
                if (modal) closeModal(modal);
                return;
            }

            if (e.key === 'Tab') {
                const modal = e.target.closest('.modal');
                if (!modal) return;

                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
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
            // Set initial ARIA hidden state
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    // --- ACCESSIBLE LIGHTBOX WITH FOCUS MANAGEMENT ---
    function initializeLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        
        if (galleryItems.length === 0 || !lightbox) return;

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

        let currentIndex = 0;
        let lastFocusedBeforeLightbox = null;
        const imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);

        function showLightbox(index) {
            lastFocusedBeforeLightbox = document.activeElement;
            currentIndex = index;
            lightboxImg.src = imageSources[currentIndex];
            lightbox.classList.add('visible');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Focus the close button for accessibility
            if (lightboxClose) {
                setTimeout(() => lightboxClose.focus(), 100);
            }
            
            // Add keyboard event listener
            lightbox.addEventListener('keydown', handleLightboxKeydown);
        }

        function hideLightbox() {
            lightbox.classList.remove('visible');
            lightbox.setAttribute('aria-hidden', 'true');
            lightbox.removeEventListener('keydown', handleLightboxKeydown);
            
            // Restore focus
            if (lastFocusedBeforeLightbox) {
                lastFocusedBeforeLightbox.focus();
                lastFocusedBeforeLightbox = null;
            }
            
            // Only restore body overflow if no modal is visible
            if (!document.querySelector('.modal.visible')) {
                document.body.style.overflow = 'auto';
            }
        }

        function showPrevImage(e) {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
            lightboxImg.src = imageSources[currentIndex];
        }

        function showNextImage(e) {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % imageSources.length;
            lightboxImg.src = imageSources[currentIndex];
        }

        function handleLightboxKeydown(e) {
            switch(e.key) {
                case 'Escape':
                    hideLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'Tab':
                    // Keep focus within lightbox controls
                    const focusableElements = lightbox.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                    break;
            }
        }

        // Event listeners
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => showLightbox(index));
        });

        if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });

        // Set initial ARIA state
        lightbox.setAttribute('aria-hidden', 'true');
    }

    // --- MULTILINGUAL CHATBOT ---
    function initializeChatbot() {
        const chatWindow = document.querySelector('.chat-window');
        const chatInput = document.getElementById('chatbot-input');
        const sendButton = document.getElementById('chatbot-send');

        // The chatbot only exists on the contact page
        if (!chatWindow || !chatInput || !sendButton) {
            return;
        }

        // Remove welcome message on first interaction
        const welcomeMessage = chatWindow.querySelector('.bot-message');
        let isFirstInteraction = true;

        // Multilingual Q&A pairs
        const qaPairs = {
            hu: [
                {
                    keywords: ['ki az a giada fervere', 'róla', 'bemutatkozás', 'életrajz', 'művész'],
                    response: "Giada Fervere egy feltörekvő festőművész, aki a neo-expresszionizmus és az absztrakt művészet határán alkot. Műveiben az emberi érzelmek és a természet kapcsolata áll a középpontban. Bővebb információt a 'Rólam' menüpontban talál."
                },
                {
                    keywords: ['kapcsolat', 'elérhetőség', 'hol érlek el', 'e-mail'],
                    response: "Általános kérdésekkel és megkeresésekkel kapcsolatban, kérjük, írjon a management@giadafervere.com e-mail címre. Minden üzenetre igyekszünk a lehető leghamarabb válaszolni."
                },
                {
                    keywords: ['közösségi média', 'social media', 'instagram', 'facebook', 'követhetem'],
                    response: 'Kövess minket a közösségi médiában is a friss hírekért és a legújabb alkotásokért! Megtalálsz minket <a href="https://www.instagram.com/giadafervere/#" target="_blank">Instagramon</a> és <a href="https://www.facebook.com/profile.php?id=100070613388519" target="_blank">Facebookon</a>.'
                },
                {
                    keywords: ['vásárlás', 'kép vásárlása', 'festményvásárlás', 'ár', 'mennyibe kerül'],
                    response: "Festményvásárlással és az elérhető művekkel kapcsolatosan, kérjük, vegye fel velünk a kapcsolatot a management@giadafervere.com címen. Személyre szabott tájékoztatást és segítséget nyújtunk a választásban."
                }
            ],
            en: [
                {
                    keywords: ['who is giada fervere', 'about', 'introduction', 'biography', 'artist'],
                    response: "Giada Fervere is an emerging painter working at the intersection of neo-expressionism and abstract art. Her works focus on the relationship between human emotions and nature. You can find more information in the 'About' section."
                },
                {
                    keywords: ['contact', 'reach', 'email', 'get in touch'],
                    response: "For general inquiries and requests, please write to management@giadafervere.com. We try to respond to all messages as soon as possible."
                },
                {
                    keywords: ['social media', 'instagram', 'facebook', 'follow'],
                    response: 'Follow us on social media for fresh news and latest works! Find us on <a href="https://www.instagram.com/giadafervere/#" target="_blank">Instagram</a> and <a href="https://www.facebook.com/profile.php?id=100070613388519" target="_blank">Facebook</a>.'
                },
                {
                    keywords: ['purchase', 'buy', 'painting purchase', 'price', 'cost'],
                    response: "For painting purchases and available works, please contact us at management@giadafervere.com. We provide personalized information and assistance in your selection."
                }
            ],
            de: [
                {
                    keywords: ['wer ist giada fervere', 'über', 'vorstellung', 'biografie', 'künstler'],
                    response: "Giada Fervere ist eine aufstrebende Malerin, die an der Schnittstelle von Neo-Expressionismus und abstrakter Kunst arbeitet. Ihre Werke konzentrieren sich auf die Beziehung zwischen menschlichen Emotionen und der Natur. Weitere Informationen finden Sie im Abschnitt 'Über mich'."
                },
                {
                    keywords: ['kontakt', 'erreichen', 'e-mail', 'verbindung'],
                    response: "Für allgemeine Anfragen und Anliegen schreiben Sie bitte an management@giadafervere.com. Wir bemühen uns, alle Nachrichten so schnell wie möglich zu beantworten."
                }
            ],
            fr: [
                {
                    keywords: ['qui est giada fervere', 'à propos', 'introduction', 'biographie', 'artiste'],
                    response: "Giada Fervere est une peintre émergente travaillant à l'intersection du néo-expressionnisme et de l'art abstrait. Ses œuvres se concentrent sur la relation entre les émotions humaines et la nature. Vous pouvez trouver plus d'informations dans la section 'À propos'."
                },
                {
                    keywords: ['contact', 'joindre', 'email', 'contacter'],
                    response: "Pour les demandes générales et les requêtes, veuillez écrire à management@giadafervere.com. Nous nous efforçons de répondre à tous les messages dès que possible."
                }
            ],
            it: [
                {
                    keywords: ['chi è giada fervere', 'riguardo', 'introduzione', 'biografia', 'artista'],
                    response: "Giada Fervere è una pittrice emergente che lavora all'intersezione tra neo-espressionismo e arte astratta. Le sue opere si concentrano sulla relazione tra emozioni umane e natura. Puoi trovare maggiori informazioni nella sezione 'Chi sono'."
                },
                {
                    keywords: ['contatto', 'raggiungere', 'email', 'mettersi in contatto'],
                    response: "Per richieste generali e domande, si prega di scrivere a management@giadafervere.com. Cerchiamo di rispondere a tutti i messaggi il prima possibile."
                }
            ]
        };

        function getBotResponse(userInput) {
            const currentLang = getStoredLanguage();
            const currentPairs = qaPairs[currentLang] || qaPairs.hu; // Fallback to Hungarian
            const lowerCaseInput = userInput.toLowerCase();
            
            for (const pair of currentPairs) {
                for (const keyword of pair.keywords) {
                    if (lowerCaseInput.includes(keyword)) {
                        return pair.response;
                    }
                }
            }
            
            // Use translation for "not understood" message
            const t = translations[currentLang] || translations.hu;
            return t.chatbot_not_understood;
        }

        function appendMessage(message, sender) {
            const messageElement = document.createElement('p');
            // Add specific class for user messages for potential styling
            if (sender === 'user') {
                messageElement.classList.add('user-message');
            } else {
                messageElement.classList.add('bot-message');
            }
            messageElement.innerHTML = message; // Use innerHTML to render links
            chatWindow.appendChild(messageElement);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        function handleUserInput() {
            const userInput = chatInput.value.trim();
            if (userInput === "") return;

            if (isFirstInteraction && welcomeMessage) {
                chatWindow.innerHTML = ''; // Clear welcome message
                isFirstInteraction = false;
            }

            appendMessage(userInput, 'user');
            chatInput.value = "";

            const botResponse = getBotResponse(userInput);
            
            setTimeout(() => {
                appendMessage(botResponse, 'bot');
            }, 500);
        }

        sendButton.addEventListener('click', handleUserInput);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }

    // --- INICIALIZÁLÁS ---
    initializeIntro();
    handleVideoAutoplay();
    initLocalization();
    initMobileNavigation();
    initializeModals();
    initializeLightbox();
    initializeChatbot();
});