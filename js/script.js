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

    // --- NYELVVÁLTÓ LOGIKA ---
    const languageSwitcher = document.querySelector('.language-switcher');

    function getStoredLanguage() {
        return localStorage.getItem('giada-language') || 'hu';
    }

    function setStoredLanguage(lang) {
        localStorage.setItem('giada-language', lang);
    }

    // Az oldal fordítása és metaadatok frissítése
    function translatePage(lang) {
        if (typeof translations === 'undefined' || !translations[lang]) return;
        const t = translations[lang];

        // 1. Szöveges elemek fordítása (innerHTML a versek <br> tagjei miatt!)
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) {
                el.innerHTML = t[key];
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

    // Nyelvváltó menü felépítése
    function populateLanguageSwitcher(currentLang) {
        if (!languageSwitcher || typeof translations === 'undefined' || !translations[currentLang]) return;

        const currentLangData = translations[currentLang];
        const otherLangs = Object.keys(translations).filter(lang => lang !== currentLang);

        let dropdownHTML = '';
        otherLangs.forEach(lang => {
            const langData = translations[lang];
            dropdownHTML += `
                <li>
                    <a href="#" data-lang="${lang}">
                        <img src="${langData.flag}" alt="${langData.name} flag" class="lang-flag">
                        <span class="lang-text">${lang.toUpperCase()}</span>
                    </a>
                </li>
            `;
        });

        const switcherHTML = `
            <div class="current-language">
                <img src="${currentLangData.flag}" alt="${currentLangData.name} flag" class="lang-flag">
                <span class="lang-text">${currentLang.toUpperCase()}</span>
                <span class="arrow-down">&#9662;</span>
            </div>
            <ul class="language-dropdown">
                ${dropdownHTML}
            </ul>
        `;

        languageSwitcher.innerHTML = switcherHTML;

        // Eseményfigyelő hozzáadása az új menühöz
        languageSwitcher.querySelector('.language-dropdown').addEventListener('click', handleLanguageChange);
    }

    function handleLanguageChange(e) {
        const link = e.target.closest('a[data-lang]');
        if (link) {
            e.preventDefault();
            const selectedLang = link.getAttribute('data-lang');
            setStoredLanguage(selectedLang);
            translatePage(selectedLang);
            populateLanguageSwitcher(selectedLang); // Menü újraépítése
        }
    }

    function initLocalization() {
        const initialLang = getStoredLanguage();
        translatePage(initialLang);
        populateLanguageSwitcher(initialLang);
    }

    // --- ÁLTALÁNOS MODÁLKEZELŐ LOGIKA ---
    function initializeModals() {
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
            // Csak akkor állítjuk vissza az overflow-t, ha a lightbox sincs nyitva
            if (!document.querySelector('.lightbox.visible')) {
                document.body.style.overflow = 'auto';
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
        });
        
        // Escape gomb kezelése
         document.addEventListener('keydown', (e) => {
            // Csak akkor zárja be a modált, ha a lightbox nincs nyitva
            if (e.key === 'Escape' && !document.querySelector('.lightbox.visible')) {
                const visibleModal = document.querySelector('.modal.visible');
                if (visibleModal) closeModal(visibleModal);
            }
        });
    }

    // --- KÉPNAGYÍTÓ LIGHTBOX KÓD ---
    function initializeLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        
        if (galleryItems.length === 0 || !lightbox) return;

        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');

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
            // Csak akkor állítjuk vissza az overflow-t, ha modál sincs nyitva
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

        // Eseménykezelők
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

        // Billentyűzet navigáció
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('visible')) {
                if (e.key === 'Escape') hideLightbox();
                else if (e.key === 'ArrowLeft') showPrevImage();
                else if (e.key === 'ArrowRight') showNextImage();
            }
        });
    }

    // --- CHATBOT LOGIKA ---
    function initializeChatbot() {
        const chatWindow = document.querySelector('.chat-window');
        const chatInput = document.getElementById('chatbot-input');
        const sendButton = document.getElementById('chatbot-send');

        // A chatbot csak a kapcsolat oldalon létezik
        if (!chatWindow || !chatInput || !sendButton) {
            return;
        }

        // Üdvözlő üzenet eltávolítása az első interakciónál
        const welcomeMessage = chatWindow.querySelector('.bot-message');
        let isFirstInteraction = true;

        const qaPairs = [
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
            },
            {
                keywords: ['elérhető művek', 'galéria', 'képek', 'festmények', 'portfólió'],
                response: "A jelenleg elérhető alkotásokat megtekintheti az 'Alkotásaim' oldalon a galériában. Ha egy specifikus mű iránt érdeklődik, amely nincs a listában, kérjük, jelezze nekünk e-mailben."
            },
            {
                keywords: ['egyedi megrendelés', 'személyre szabott festmény', 'portré', 'megbízás'],
                response: "Giada vállal egyedi megrendeléseket is. Ha van egy konkrét elképzelése, kérjük, írja le részletesen a management@giadafervere.com e-mail címre, és felvesszük Önnel a kapcsolatot a részletekkel."
            },
            {
                keywords: ['szállítás', 'posta', 'hogyan kapom meg'],
                response: "A festmények biztonságos szállítását professzionális futárszolgálattal oldjuk meg, gondos csomagolásban. A szállítási részletekről és költségekről a vásárlás során adunk pontos tájékoztatást."
            },
            {
                keywords: ['kiállítás', 'esemény', 'hol láthatom élőben', 'megnyitó'],
                response: "A közelgő kiállításokról és eseményekről a 'Rendezvények' menüpontban tájékozódhat. Iratkozzon fel hírlevelünkre, hogy ne maradjon le semmiről!"
            },
            {
                keywords: ['sajtó', 'média', 'interjú', 'publikáció'],
                response: "Sajtómegkeresésekkel kapcsolatban kérjük, forduljon a menedzsmenthez a management@giadafervere.com e-mail címen. Örömmel állunk rendelkezésre interjúk és egyéb publikációk kapcsán."
            },
            {
                keywords: ['hírlevél', 'feliratkozás'],
                response: "Szeretne elsőként értesülni a legújabb alkotásokról és a közelgő kiállításokról? Iratkozzon fel hírlevelünkre az oldalon található űrlapon keresztül! (Hírlevél funkció fejlesztés alatt)"
            },
            {
                keywords: ['köszönet', 'köszi', 'szuper', 'remek'],
                response: "Örülök, hogy segíthettem! Ha további kérdése van, állok rendelkezésére."
            },
            {
                keywords: ['probléma', 'hiba', 'nem működik'],
                response: "Elnézést kérünk az esetleges kellemetlenségért. Kérjük, írja le a problémát részletesen a management@giadafervere.com címre, hogy mielőbb kivizsgálhassuk."
            }
        ];

        const defaultResponse = "Elnézést, ezt a kérdést nem értem. Kérem, fogalmazza meg másképp, vagy vegye fel velünk a kapcsolatot a management@giadafervere.com e-mail címen.";

        function getBotResponse(userInput) {
            const lowerCaseInput = userInput.toLowerCase();
            for (const pair of qaPairs) {
                for (const keyword of pair.keywords) {
                    if (lowerCaseInput.includes(keyword)) {
                        return pair.response;
                    }
                }
            }
            return defaultResponse;
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

    // --- HAMBURGER MENU LOGIKA ---
    function initializeHamburgerMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                mainNav.classList.toggle('nav-active');
                navToggle.classList.toggle('nav-active');
            });
        }
    }

    // --- INICIALIZÁLÁS ---
    initializeIntro();
    handleVideoAutoplay();
    initLocalization();
    initializeModals();
    initializeLightbox();
    initializeChatbot();
    initializeHamburgerMenu();
});