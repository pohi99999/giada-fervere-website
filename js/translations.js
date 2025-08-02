// Többnyelvű rendszer - Giada Fervere Website
// Támogatott nyelvek: Magyar, Német, Angol, Francia, Olasz

const translations = {
    hu: {
        // Navigáció
        nav_about: "Rólam",
        nav_performances: "Előadásaim", 
        nav_creations: "Alkotásaim",
        nav_events: "Rendezvények",
        nav_contact: "Kapcsolat",
        
        // Főoldal
        artist_name: "GIADA FERVERE",
        
        // Rólam oldal
        about_title: "Rólam",
        about_text_1: "Giada Fervere egy multidiszciplináris művész, akinek alkotói univerzuma a festészet, a zene és a költészet metszéspontjában kel életre. Munkássága egy mély, belső utazás, ahol az ecsetvonások, a hegedű dallamai és a zongora akkordjai egyetlen, koherens üzenetté fonódnak össze.",
        about_text_2: "Művészete a kifejezés eszköze; egyfajta párbeszéd a látható és a láthatatlan világok között, ahol minden festmény egy vers, és minden dallam egy elmesélt történet. Célja, hogy a sötét esztétika és a finom szimbolizmus segítségével olyan érzelmi tereket hozzon létre, amelyek elgondolkodtatnak, megérintenek és velünk maradnak.",
        
        // Előadásaim oldal
        performances_title: "Előadásaim",
        live_poetry_title: "Élő Versek",
        music_performances_title: "Zenei Előadások",
        
        // Alkotásaim oldal
        creations_title: "Alkotásaim",
        paintings_title: "Festmények",
        poems_title: "Verseim",
        gallery_open: "Galéria megnyitása",
        poems_read: "Versek olvasása",
        
        // Rendezvények oldal
        events_title: "Rendezvények",
        events_text: "Közelgő események és kiállítások információi hamarosan elérhetők lesznek.",
        
        // Kapcsolat oldal
        contact_title: "Kapcsolat",
        contact_text: "Kapcsolatfelvételi információk és űrlap hamarosan elérhető lesz.",
        
        // Versek
        poem_1_title: "Haldokló Varázs",
        poem_1_text: `Düledék közt andalogva
Egy letűnt kor sápadt-emléke pislákol.
Nyikorgó, rozsda-ett kapun túl
Elmém árnya közt kísért;
Az elsírt, remény-verte múlt.
S az idő lehántja ezüstfoncsorát
- Meg nem hazudtolva magát...
Purgatóriuma tisztára mossa
Gyötört-lelkem porát.
A volt lehelete - némán s kegyetlen -
Többé nem apasztja;
Zálogba hajigált szívem.
Már nem sodor magával
A múlt kísértő árja.
Haldokló varázs...
Eltűnő fájdalom.
Békés csend.`,
        
        poem_2_title: "Metamorfózis",
        poem_2_text: `Szirtből hasadt martalék omlott
Mélységbe, hol a sötétség honol.
Ott, ahol a fény sosem járt,
Új forma születik a romokból.
Átváltozás kínjai közt
Lelkem újjászületik.`,
        
        poem_3_title: "Halálfaló Könnyszivárvány",
        poem_3_text: `Nem öli ártalom,
Nem szennyzi bűn.
Tiszta könnyekben
Szivárvány születik.
Halált faló fény
Reményt hoz a sötétbe.`,
        
        // Lábléc
        copyright: "© 2025 Giada Fervere Produkció - minden jog fenntartva.",
        
        // Galéria
        gallery_title: "Festmények Galéria",
        poems_modal_title: "Verseim"
    },
    
    en: {
        // Navigation
        nav_about: "About",
        nav_performances: "Performances",
        nav_creations: "Creations", 
        nav_events: "Events",
        nav_contact: "Contact",
        
        // Homepage
        artist_name: "GIADA FERVERE",
        
        // About page
        about_title: "About",
        about_text_1: "Giada Fervere is a multidisciplinary artist whose creative universe comes to life at the intersection of painting, music, and poetry. Her work is a deep, inner journey where brushstrokes, violin melodies, and piano chords weave together into a single, coherent message.",
        about_text_2: "Her art is a means of expression; a dialogue between the visible and invisible worlds, where every painting is a poem, and every melody is a told story. Her goal is to create emotional spaces through dark aesthetics and subtle symbolism that make us think, touch us, and stay with us.",
        
        // Performances page
        performances_title: "Performances",
        live_poetry_title: "Live Poetry",
        music_performances_title: "Musical Performances",
        
        // Creations page
        creations_title: "Creations",
        paintings_title: "Paintings",
        poems_title: "My Poems",
        gallery_open: "Open Gallery",
        poems_read: "Read Poems",
        
        // Events page
        events_title: "Events",
        events_text: "Information about upcoming events and exhibitions will be available soon.",
        
        // Contact page
        contact_title: "Contact",
        contact_text: "Contact information and form will be available soon.",
        
        // Poems
        poem_1_title: "Dying Magic",
        poem_1_text: `Wandering among ruins
A pale memory of a bygone era flickers.
Beyond the creaking, rust-eaten gate
It haunts among the shadows of my mind;
The wept, hope-beaten past.
And time peels off its silver braid
- Not lying to itself...
Its purgatory cleanly washes
The dust of my tormented soul.
The breath of what was - silent and cruel -
No longer withers;
My heart thrown into pawn.
No longer swept away
By the haunting current of the past.
Dying magic...
Fading pain.
Peaceful silence.`,
        
        poem_2_title: "Metamorphosis",
        poem_2_text: `Prey cracked from rock fell
Into depths where darkness dwells.
There, where light never walked,
New form is born from ruins.
Through the torments of transformation
My soul is reborn.`,
        
        poem_3_title: "Death-Eating Rainbow of Tears",
        poem_3_text: `No harm kills,
No sin pollutes.
In pure tears
A rainbow is born.
Death-eating light
Brings hope to darkness.`,
        
        // Footer
        copyright: "© 2025 Giada Fervere Production - all rights reserved.",
        
        // Gallery
        gallery_title: "Paintings Gallery",
        poems_modal_title: "My Poems"
    },
    
    de: {
        // Navigation
        nav_about: "Über mich",
        nav_performances: "Aufführungen",
        nav_creations: "Kreationen",
        nav_events: "Veranstaltungen", 
        nav_contact: "Kontakt",
        
        // Homepage
        artist_name: "GIADA FERVERE",
        
        // About page
        about_title: "Über mich",
        about_text_1: "Giada Fervere ist eine multidisziplinäre Künstlerin, deren kreatives Universum an der Schnittstelle von Malerei, Musik und Poesie zum Leben erwacht. Ihr Werk ist eine tiefe, innere Reise, wo Pinselstriche, Geigenmelodien und Klavierakkorde zu einer einzigen, kohärenten Botschaft verwoben werden.",
        about_text_2: "Ihre Kunst ist ein Ausdrucksmittel; ein Dialog zwischen der sichtbaren und unsichtbaren Welt, wo jedes Gemälde ein Gedicht ist und jede Melodie eine erzählte Geschichte. Ihr Ziel ist es, durch dunkle Ästhetik und subtile Symbolik emotionale Räume zu schaffen, die zum Nachdenken anregen, uns berühren und bei uns bleiben.",
        
        // Performances page
        performances_title: "Aufführungen",
        live_poetry_title: "Live-Poesie",
        music_performances_title: "Musikalische Aufführungen",
        
        // Creations page
        creations_title: "Kreationen",
        paintings_title: "Gemälde",
        poems_title: "Meine Gedichte",
        gallery_open: "Galerie öffnen",
        poems_read: "Gedichte lesen",
        
        // Events page
        events_title: "Veranstaltungen",
        events_text: "Informationen über kommende Veranstaltungen und Ausstellungen werden bald verfügbar sein.",
        
        // Contact page
        contact_title: "Kontakt",
        contact_text: "Kontaktinformationen und Formular werden bald verfügbar sein.",
        
        // Poems
        poem_1_title: "Sterbende Magie",
        poem_1_text: `Wandelnd zwischen Ruinen
Flackert eine blasse Erinnerung vergangener Zeit.
Jenseits des knarrenden, rostgefressenen Tors
Spukt es zwischen den Schatten meines Geistes;
Die verweinte, hoffnungsgeschlagene Vergangenheit.
Und die Zeit schält ihren silbernen Zopf ab
- Sich selbst nicht belügend...
Ihr Fegefeuer wäscht rein
Den Staub meiner gequälten Seele.
Der Atem des Gewesenen - stumm und grausam -
Verdorrt nicht mehr;
Mein verpfändetes Herz.
Nicht mehr fortgerissen
Von der spukenden Strömung der Vergangenheit.
Sterbende Magie...
Schwindender Schmerz.
Friedliche Stille.`,
        
        poem_2_title: "Metamorphose",
        poem_2_text: `Aus Fels gespaltene Beute fiel
In Tiefen, wo Dunkelheit wohnt.
Dort, wo Licht nie wandelte,
Wird neue Form aus Ruinen geboren.
Durch die Qualen der Verwandlung
Wird meine Seele wiedergeboren.`,
        
        poem_3_title: "Todfressender Tränenregenbogen",
        poem_3_text: `Kein Schaden tötet,
Keine Sünde beschmutzt.
In reinen Tränen
Wird ein Regenbogen geboren.
Todfressendes Licht
Bringt Hoffnung in die Dunkelheit.`,
        
        // Footer
        copyright: "© 2025 Giada Fervere Produktion - alle Rechte vorbehalten.",
        
        // Gallery
        gallery_title: "Gemälde-Galerie",
        poems_modal_title: "Meine Gedichte"
    },
    
    fr: {
        // Navigation
        nav_about: "À propos",
        nav_performances: "Spectacles",
        nav_creations: "Créations",
        nav_events: "Événements",
        nav_contact: "Contact",
        
        // Homepage
        artist_name: "GIADA FERVERE",
        
        // About page
        about_title: "À propos",
        about_text_1: "Giada Fervere est une artiste multidisciplinaire dont l'univers créatif prend vie à l'intersection de la peinture, de la musique et de la poésie. Son travail est un voyage profond et intérieur où les coups de pinceau, les mélodies de violon et les accords de piano se tissent en un message unique et cohérent.",
        about_text_2: "Son art est un moyen d'expression ; un dialogue entre les mondes visible et invisible, où chaque peinture est un poème et chaque mélodie une histoire racontée. Son objectif est de créer des espaces émotionnels à travers une esthétique sombre et un symbolisme subtil qui nous font réfléchir, nous touchent et restent avec nous.",
        
        // Performances page
        performances_title: "Spectacles",
        live_poetry_title: "Poésie en Direct",
        music_performances_title: "Spectacles Musicaux",
        
        // Creations page
        creations_title: "Créations",
        paintings_title: "Peintures",
        poems_title: "Mes Poèmes",
        gallery_open: "Ouvrir la Galerie",
        poems_read: "Lire les Poèmes",
        
        // Events page
        events_title: "Événements",
        events_text: "Les informations sur les événements et expositions à venir seront bientôt disponibles.",
        
        // Contact page
        contact_title: "Contact",
        contact_text: "Les informations de contact et le formulaire seront bientôt disponibles.",
        
        // Poems
        poem_1_title: "Magie Mourante",
        poem_1_text: `Errant parmi les ruines
Un pâle souvenir d'une époque révolue scintille.
Au-delà de la porte grinçante et rongée par la rouille
Il hante parmi les ombres de mon esprit ;
Le passé pleuré et battu par l'espoir.
Et le temps épluche sa tresse d'argent
- Ne se mentant pas...
Son purgatoire lave proprement
La poussière de mon âme tourmentée.
Le souffle de ce qui était - silencieux et cruel -
Ne flétrit plus ;
Mon cœur jeté en gage.
Plus emporté
Par le courant hanté du passé.
Magie mourante...
Douleur qui s'estompe.
Silence paisible.`,
        
        poem_2_title: "Métamorphose",
        poem_2_text: `Une proie fendue du rocher tomba
Dans les profondeurs où habite l'obscurité.
Là, où la lumière n'a jamais marché,
Une nouvelle forme naît des ruines.
À travers les tourments de la transformation
Mon âme renaît.`,
        
        poem_3_title: "Arc-en-ciel de Larmes Mangeur de Mort",
        poem_3_text: `Aucun mal ne tue,
Aucun péché ne souille.
Dans les larmes pures
Un arc-en-ciel naît.
Lumière mangeuse de mort
Apporte l'espoir dans l'obscurité.`,
        
        // Footer
        copyright: "© 2025 Giada Fervere Production - tous droits réservés.",
        
        // Gallery
        gallery_title: "Galerie de Peintures",
        poems_modal_title: "Mes Poèmes"
    },
    
    it: {
        // Navigation
        nav_about: "Chi sono",
        nav_performances: "Spettacoli",
        nav_creations: "Creazioni",
        nav_events: "Eventi",
        nav_contact: "Contatto",
        
        // Homepage
        artist_name: "GIADA FERVERE",
        
        // About page
        about_title: "Chi sono",
        about_text_1: "Giada Fervere è un'artista multidisciplinare il cui universo creativo prende vita all'intersezione tra pittura, musica e poesia. Il suo lavoro è un viaggio profondo e interiore dove pennellate, melodie di violino e accordi di pianoforte si intrecciano in un messaggio unico e coerente.",
        about_text_2: "La sua arte è un mezzo di espressione; un dialogo tra i mondi visibile e invisibile, dove ogni dipinto è una poesia e ogni melodia una storia raccontata. Il suo obiettivo è creare spazi emotivi attraverso un'estetica scura e un simbolismo sottile che ci fanno riflettere, ci toccano e rimangono con noi.",
        
        // Performances page
        performances_title: "Spettacoli",
        live_poetry_title: "Poesia dal Vivo",
        music_performances_title: "Spettacoli Musicali",
        
        // Creations page
        creations_title: "Creazioni",
        paintings_title: "Dipinti",
        poems_title: "Le Mie Poesie",
        gallery_open: "Apri Galleria",
        poems_read: "Leggi Poesie",
        
        // Events page
        events_title: "Eventi",
        events_text: "Le informazioni su eventi e mostre in arrivo saranno presto disponibili.",
        
        // Contact page
        contact_title: "Contatto",
        contact_text: "Le informazioni di contatto e il modulo saranno presto disponibili.",
        
        // Poems
        poem_1_title: "Magia Morente",
        poem_1_text: `Vagando tra le rovine
Un pallido ricordo di un'epoca passata tremola.
Oltre il cancello cigolante e mangiato dalla ruggine
Infesta tra le ombre della mia mente;
Il passato pianto e battuto dalla speranza.
E il tempo sbuccia la sua treccia d'argento
- Non mentendo a se stesso...
Il suo purgatorio lava pulito
La polvere della mia anima tormentata.
Il respiro di ciò che era - silenzioso e crudele -
Non appassisce più;
Il mio cuore gettato in pegno.
Non più trascinato via
Dalla corrente infestante del passato.
Magia morente...
Dolore che svanisce.
Silenzio pacifico.`,
        
        poem_2_title: "Metamorfosi",
        poem_2_text: `Preda spaccata dalla roccia cadde
Nelle profondità dove dimora l'oscurità.
Là, dove la luce non ha mai camminato,
Nuova forma nasce dalle rovine.
Attraverso i tormenti della trasformazione
La mia anima rinasce.`,
        
        poem_3_title: "Arcobaleno di Lacrime Mangia-Morte",
        poem_3_text: `Nessun danno uccide,
Nessun peccato contamina.
Nelle lacrime pure
Nasce un arcobaleno.
Luce mangia-morte
Porta speranza nell'oscurità.`,
        
        // Footer
        copyright: "© 2025 Giada Fervere Produzione - tutti i diritti riservati.",
        
        // Gallery
        gallery_title: "Galleria Dipinti",
        poems_modal_title: "Le Mie Poesie"
    }
};

// Nyelváltó rendszer
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || this.detectBrowserLanguage() || 'hu';
        this.init();
    }
    
    init() {
        this.createLanguageSelector();
        this.translatePage();
        this.bindEvents();
    }
    
    getStoredLanguage() {
        return localStorage.getItem('giada-website-language');
    }
    
    detectBrowserLanguage() {
        const browserLang = navigator.language.slice(0, 2);
        return translations[browserLang] ? browserLang : 'hu';
    }
    
    createLanguageSelector() {
        const navs = document.querySelectorAll('.main-nav');
        navs.forEach(nav => {
            if (!nav.querySelector('.language-selector')) {
                const langSelector = document.createElement('div');
                langSelector.className = 'language-selector';
                langSelector.innerHTML = `
                    <select class="language-select">
                        <option value="hu" ${this.currentLanguage === 'hu' ? 'selected' : ''}>🇭🇺 HU</option>
                        <option value="en" ${this.currentLanguage === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
                        <option value="de" ${this.currentLanguage === 'de' ? 'selected' : ''}>🇩🇪 DE</option>
                        <option value="fr" ${this.currentLanguage === 'fr' ? 'selected' : ''}>🇫🇷 FR</option>
                        <option value="it" ${this.currentLanguage === 'it' ? 'selected' : ''}>🇮🇹 IT</option>
                    </select>
                `;
                nav.appendChild(langSelector);
            }
        });
    }
    
    bindEvents() {
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('language-select')) {
                this.changeLanguage(e.target.value);
            }
        });
    }
    
    changeLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('giada-website-language', lang);
            this.translatePage();
            this.updateLanguageSelectors();
        }
    }
    
    updateLanguageSelectors() {
        const selectors = document.querySelectorAll('.language-select');
        selectors.forEach(select => {
            select.value = this.currentLanguage;
        });
    }
    
    translatePage() {
        const currentTranslations = translations[this.currentLanguage];
        
        // Navigációs elemek fordítása
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
            }
        });
        
        // Speciális elemek fordítása
        this.translateSpecialElements(currentTranslations);
    }
    
    translateSpecialElements(translations) {
        // Címek fordítása
        const titles = {
            'h2': ['about_title', 'performances_title', 'creations_title', 'events_title', 'contact_title'],
            'h3': ['live_poetry_title', 'music_performances_title', 'gallery_title', 'poems_modal_title'],
            'h4': ['poem_1_title', 'poem_2_title', 'poem_3_title']
        };
        
        Object.keys(titles).forEach(tag => {
            const elements = document.querySelectorAll(tag);
            elements.forEach((element, index) => {
                const key = titles[tag][index];
                if (key && translations[key]) {
                    element.textContent = translations[key];
                }
            });
        });
        
        // Bekezdések fordítása
        const paragraphs = document.querySelectorAll('p[data-translate-key]');
        paragraphs.forEach(p => {
            const key = p.getAttribute('data-translate-key');
            if (translations[key]) {
                p.textContent = translations[key];
            }
        });
        
        // Gombok fordítása
        const buttons = document.querySelectorAll('button[data-translate]');
        buttons.forEach(button => {
            const key = button.getAttribute('data-translate');
            if (translations[key]) {
                button.textContent = translations[key];
            }
        });
    }
}

// Inicializálás DOM betöltés után
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

