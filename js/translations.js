// Többnyelvű rendszer - Giada Fervere Website
// Verzió: 2.0 - A stílusos HTML-alapú váltóhoz igazítva

const translations = {
    // MAGYAR
    hu: {
        // Navigáció és Lábléc
        nav_about: "Rólam",
        nav_performances: "Előadásaim",
        nav_creations: "Alkotásaim",
        nav_events: "Rendezvények",
        nav_contact: "Kapcsolat",
        copyright: "© 2025 Giada Fervere Produkció - minden jog fenntartva.",

        // Főoldal (index.html)
        main_title: "Giada Fervere",

        // Rólam oldal (rolam.html)
        about_title: "Rólam",
        about_p1: "Giada Fervere egy multidiszciplináris művész, akinek alkotói univerzuma a festészet, a zene és a költészet metszéspontjában kel életre. Munkássága egy mély, belső utazás, ahol az ecsetvonások, a hegedű dallamai és a zongora akkordjai egyetlen, koherens üzenetté fonódnak össze.",
        about_p2: "Művészete a kifejezés eszköze; egyfajta párbeszéd a látható és a láthatatlan világok között, ahol minden festmény egy vers, és minden dallam egy elmesélt történet. Célja, hogy a sötét esztétika és a finom szimbolizmus segítségével olyan érzelmi tereket hozzon létre, amelyek elgondolkodtatnak, megérintenek és velünk maradnak.",
        about_quote: "„Amikor a tükörbe néztem, már nem láttam a régi lányt”",
        about_article_link: "cikk: www.heol.hu",

        // Alkotásaim oldal (alkotasaim.html)
        creations_title: "Alkotásaim",
        creations_card_paintings_title: "Festmények",
        creations_card_paintings_button: "Galéria megnyitása",
        creations_card_poems_title: "Verseim",
        creations_card_poems_button: "Versek olvasása",
        
        // Előadásaim oldal (eloadasaim.html)
        performances_title: "Előadásaim",
        performances_live_poetry_title: "Élő Versek",
        performances_music_title: "Zenei Előadások",

        // Rendezvények oldal (rendezvenyek.html)
        events_title: "Rendezvények",
        events_card_artist: "Giada Fervere",
        events_card_title: "A Láthatatlan Visszhangjai",
        events_card_gallery: "KORTÁRS KÉPZŐMŰVÉSZETI GALÉRIA",
        events_card_address: "V. BUDAPEST, MAGYAR U. 44.",
        events_card_opening: "MEGNYITÓ: 2025. 08. 15. 18:00",
        events_card_button: "További Információk",

        // Kapcsolat oldal (kapcsolat.html)
        contact_title: "Kapcsolat",
        contact_intro: "Lépj kapcsolatba Giada Ferverével. Írj neki üzenetet az alábbi elérhetőségek valamelyikén.",
        contact_artist_name: "Giada Fervere",
        contact_general_title: "Általános / Produkció",
        contact_art_title: "Művészeti Projektek",
        contact_music_title: "Zenei Projektek",

        // Modálok
        gallery_modal_title: "Festmények Galéria",
        poems_modal_title: "Verseim",
        poem_1_title: "Haldokló Varázs",
        poem_1_text: `(A vers szövege itt)...`,
        poem_2_title: "Metamorfózis",
        poem_2_text: `(A vers szövege itt)...`,
        poem_3_title: "Halálfaló Könnyszivárvány",
        poem_3_text: `(A vers szövege itt)...`
    },
    // ANGOL
    en: {
        nav_about: "About",
        nav_performances: "Performances",
        nav_creations: "Creations",
        nav_events: "Events",
        nav_contact: "Contact",
        copyright: "© 2025 Giada Fervere Production - all rights reserved.",
        main_title: "Giada Fervere",
        about_title: "About Me",
        about_p1: "Giada Fervere is a multidisciplinary artist whose creative universe comes to life at the intersection of painting, music, and poetry. Her work is a deep, inner journey where brushstrokes, violin melodies, and piano chords weave together into a single, coherent message.",
        about_p2: "Her art is a means of expression; a dialogue between the visible and invisible worlds, where every painting is a poem, and every melody is a told story. Her goal is to create emotional spaces through dark aesthetics and subtle symbolism that make us think, touch us, and stay with us.",
        about_quote: ""When I looked in the mirror, I no longer saw the old girl"",
        about_article_link: "article: www.heol.hu",
        creations_title: "Creations",
        creations_card_paintings_title: "Paintings",
        creations_card_paintings_button: "Open Gallery",
        creations_card_poems_title: "My Poems",
        creations_card_poems_button: "Read Poems",
        performances_title: "Performances",
        performances_live_poetry_title: "Live Poetry",
        performances_music_title: "Music Performances",
        events_title: "Events",
        events_card_artist: "Giada Fervere",
        events_card_title: "Echoes of the Unseen",
        events_card_gallery: "CONTEMPORARY ART GALLERY",
        events_card_address: "V. BUDAPEST, MAGYAR U. 44.",
        events_card_opening: "OPENING: 15. 08. 2025. 18:00",
        events_card_button: "More Information",
        contact_title: "Contact",
        contact_intro: "Get in touch with Giada Fervere. Send her a message at one of the contacts below.",
        contact_artist_name: "Giada Fervere",
        contact_general_title: "General / Production",
        contact_art_title: "Art Projects",
        contact_music_title: "Music Projects",
        gallery_modal_title: "Paintings Gallery",
        poems_modal_title: "My Poems",
        poem_1_title: "Dying Magic",
        poem_2_title: "Metamorphosis",
        poem_3_title: "Death-Eating Rainbow of Tears"
    },
    // NÉMET
    de: {
        nav_about: "Über mich",
        nav_performances: "Aufführungen",
        nav_creations: "Kreationen",
        nav_events: "Veranstaltungen",
        nav_contact: "Kontakt",
        copyright: "© 2025 Giada Fervere Produktion - alle Rechte vorbehalten.",
        main_title: "Giada Fervere",
        about_title: "Über mich",
        about_p1: "Giada Fervere ist eine multidisziplinäre Künstlerin, deren kreatives Universum an der Schnittstelle von Malerei, Musik und Poesie zum Leben erwacht. Ihr Werk ist eine tiefe, innere Reise, wo Pinselstriche, Geigenmelodien und Klavierakkorde zu einer einzigen, kohärenten Botschaft verwoben werden.",
        about_p2: "Ihre Kunst ist ein Ausdrucksmittel; ein Dialog zwischen der sichtbaren und unsichtbaren Welt, wo jedes Gemälde ein Gedicht ist und jede Melodie eine erzählte Geschichte. Ihr Ziel ist es, durch dunkle Ästhetik und subtile Symbolik emotionale Räume zu schaffen, die zum Nachdenken anregen, uns berühren und bei uns bleiben.",
        about_quote: "„Als ich in den Spiegel schaute, sah ich das alte Mädchen nicht mehr“",
        about_article_link: "artikel: www.heol.hu",
        creations_title: "Kreationen",
        creations_card_paintings_title: "Gemälde",
        creations_card_paintings_button: "Galerie öffnen",
        creations_card_poems_title: "Meine Gedichte",
        creations_card_poems_button: "Gedichte lesen",
        performances_title: "Aufführungen",
        performances_live_poetry_title: "Live-Poesie",
        performances_music_title: "Musikalische Darbietungen",
        events_title: "Veranstaltungen",
        events_card_artist: "Giada Fervere",
        events_card_title: "Echos des Unsichtbaren",
        events_card_gallery: "GALERIE FÜR ZEITGENÖSSISCHE KUNST",
        events_card_address: "V. BUDAPEST, MAGYAR U. 44.",
        events_card_opening: "ERÖFFNUNG: 15. 08. 2025. 18:00",
        events_card_button: "Mehr Informationen",
        contact_title: "Kontakt",
        contact_intro: "Nehmen Sie Kontakt mit Giada Fervere auf. Senden Sie ihr eine Nachricht an eine der unten stehenden Adressen.",
        contact_artist_name: "Giada Fervere",
        contact_general_title: "Allgemein / Produktion",
        contact_art_title: "Kunstprojekte",
        contact_music_title: "Musikprojekte",
        gallery_modal_title: "Gemäldegalerie",
        poems_modal_title: "Meine Gedichte",
        poem_1_title: "Sterbende Magie",
        poem_2_title: "Metamorphose",
        poem_3_title: "Todfressender Regenbogen der Tränen"
    },
    // FRANCIA
    fr: {
        nav_about: "À propos",
        nav_performances: "Spectacles",
        nav_creations: "Créations",
        nav_events: "Événements",
        nav_contact: "Contact",
        copyright: "© 2025 Giada Fervere Production - tous droits réservés.",
        main_title: "Giada Fervere",
        about_title: "À propos de moi",
        about_p1: "Giada Fervere est une artiste multidisciplinaire dont l'univers créatif prend vie à l'intersection de la peinture, de la musique et de la poésie. Son travail est un voyage profond et intérieur où les coups de pinceau, les mélodies de violon et les accords de piano se tissent en un message unique et cohérent.",
        about_p2: "Son art est un moyen d'expression ; un dialogue entre les mondes visible et invisible, où chaque peinture est un poème et chaque mélodie une histoire racontée. Son objectif est de créer des espaces émotionnels à travers une esthétique sombre et un symbolisme subtil qui nous font réfléchir, nous touchent et restent avec nous.",
        about_quote: "« Quand j'ai regardé dans le miroir, je n'ai plus vu l'ancienne fille »",
        about_article_link: "article: www.heol.hu",
        creations_title: "Créations",
        creations_card_paintings_title: "Peintures",
        creations_card_paintings_button: "Ouvrir la galerie",
        creations_card_poems_title: "Mes poèmes",
        creations_card_poems_button: "Lire les poèmes",
        performances_title: "Spectacles",
        performances_live_poetry_title: "Poésie en direct",
        performances_music_title: "Performances musicales",
        events_title: "Événements",
        events_card_artist: "Giada Fervere",
        events_card_title: "Échos de l'invisible",
        events_card_gallery: "GALERIE D'ART CONTEMPORAIN",
        events_card_address: "V. BUDAPEST, MAGYAR U. 44.",
        events_card_opening: "OUVERTURE: 15. 08. 2025. 18:00",
        events_card_button: "Plus d'informations",
        contact_title: "Contact",
        contact_intro: "Prenez contact avec Giada Fervere. Envoyez-lui un message à l'un des contacts ci-dessous.",
        contact_artist_name: "Giada Fervere",
        contact_general_title: "Général / Production",
        contact_art_title: "Projets artistiques",
        contact_music_title: "Projets musicaux",
        gallery_modal_title: "Galerie de peintures",
        poems_modal_title: "Mes poèmes",
        poem_1_title: "Magie mourante",
        poem_2_title: "Métamorphose",
        poem_3_title: "Arc-en-ciel de larmes mangeur de mort"
    },
    // OLASZ
    it: {
        nav_about: "Chi sono",
        nav_performances: "Spettacoli",
        nav_creations: "Creazioni",
        nav_events: "Eventi",
        nav_contact: "Contatto",
        copyright: "© 2025 Giada Fervere Produzione - tutti i diritti riservati.",
        main_title: "Giada Fervere",
        about_title: "Chi sono",
        about_p1: "Giada Fervere è un'artista multidisciplinare il cui universo creativo prende vita all'intersezione tra pittura, musica e poesia. Il suo lavoro è un viaggio profondo e interiore dove pennellate, melodie di violino e accordi di pianoforte si intrecciano in un messaggio unico e coerente.",
        about_p2: "La sua arte è un mezzo di espressione; un dialogo tra i mondi visibile e invisibile, dove ogni dipinto è una poesia e ogni melodia una storia raccontata. Il suo obiettivo è creare spazi emotivi attraverso un'estetica scura e un simbolismo sottile che ci fanno riflettere, ci toccano e rimangono con noi.",
        about_quote: ""Quando mi sono guardata allo specchio, non ho più visto la vecchia ragazza"",
        about_article_link: "articolo: www.heol.hu",
        creations_title: "Creazioni",
        creations_card_paintings_title: "Dipinti",
        creations_card_paintings_button: "Apri galleria",
        creations_card_poems_title: "Le mie poesie",
        creations_card_poems_button: "Leggi le poesie",
        performances_title: "Spettacoli",
        performances_live_poetry_title: "Poesia dal vivo",
        performances_music_title: "Esibizioni musicali",
        events_title: "Eventi",
        events_card_artist: "Giada Fervere",
        events_card_title: "Echi dell'invisibile",
        events_card_gallery: "GALLERIA D'ARTE CONTEMPORANEA",
        events_card_address: "V. BUDAPEST, MAGYAR U. 44.",
        events_card_opening: "INAUGURAZIONE: 15. 08. 2025. 18:00",
        events_card_button: "Più informazioni",
        contact_title: "Contatto",
        contact_intro: "Mettiti in contatto con Giada Fervere. Inviale un messaggio a uno dei contatti qui sotto.",
        contact_artist_name: "Giada Fervere",
        contact_general_title: "Generale / Produzione",
        contact_art_title: "Progetti artistici",
        contact_music_title: "Progetti musicali",
        gallery_modal_title: "Galleria dei dipinti",
        poems_modal_title: "Le mie poesie",
        poem_1_title: "Magia morente",
        poem_2_title: "Metamorfosi",
        poem_3_title: "Arcobaleno di lacrime mangia-morte"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.querySelector('.language-switcher');
    if (!languageSwitcher) return;

    const currentLanguageDisplay = languageSwitcher.querySelector('.current-language');
    const languageDropdown = languageSwitcher.querySelector('.language-dropdown');
    const currentLangFlag = currentLanguageDisplay.querySelector('.lang-flag');
    const currentLangText = currentLanguageDisplay.querySelector('.lang-text');

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
        
        // Címsor frissítése
        const pageTitleKey = document.body.getAttribute('data-page-title-key');
        if (pageTitleKey && t[pageTitleKey]) {
            document.title = t[pageTitleKey];
        } else {
            document.title = "Giada Fervere";
        }
    }

    function updateSwitcherDisplay(lang) {
        const langOption = languageDropdown.querySelector(`[data-lang="${lang}"]`);
        if (!langOption) return;

        const newFlagSrc = langOption.querySelector('.lang-flag').getAttribute('src');
        const newLangText = langOption.querySelector('.lang-text').textContent;

        currentLangFlag.setAttribute('src', newFlagSrc);
        currentLangText.textContent = newLangText;
    }

    languageDropdown.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-lang]');
        if (link) {
            e.preventDefault();
            const selectedLang = link.getAttribute('data-lang');
            setStoredLanguage(selectedLang);
            translatePage(selectedLang);
            updateSwitcherDisplay(selectedLang);
        }
    });

    // Kezdeti beállítás
    const initialLang = getStoredLanguage();
    translatePage(initialLang);
    updateSwitcherDisplay(initialLang);
});