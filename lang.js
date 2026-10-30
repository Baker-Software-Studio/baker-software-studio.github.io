/* Idiomas: los mismos 7 del juego. Se elige por el idioma del dispositivo (inglés si no hay coincidencia)
   y se recuerda la elección manual. Los textos de la portada están en D (data-k);
   la política de privacidad tiene un bloque por idioma (data-l). */
(function () {
  var LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ro'];
  var NAMES = { en: 'English', es: 'Español', pt: 'Português', fr: 'Français', de: 'Deutsch', it: 'Italiano', ro: 'Română' };
  var C = '<span class="c">';
  var D = {
    en: {
      't.home': 'Bakersoft — Software studio', 't.priv': 'Crimeoku — Privacy policy',
      'nav.what': 'What we do', 'nav.products': 'Products',
      'hero.kicker': 'Software studio',
      'hero.h1': 'Software for ' + C + 'play</span> and for work.',
      'hero.lead': 'Bakersoft is an independent software studio. We design and build mobile games and apps for Android and iOS, from the first idea to the store.',
      'cta.products': 'See our products', 'cta.what': 'What we do',
      'what.h2': 'What we do', 'what.p': 'We take care of every part of the product: design, development, art and publishing.',
      'p1.h': 'Games', 'p1.p': 'Puzzle and logic games with fair challenges, built to be played again and again.',
      'p2.h': 'Apps', 'p2.p': 'Practical tools that solve everyday problems with a clear, simple interface.',
      'p3.h': 'Android and iOS', 'p3.p': 'Apps for Google Play and the App Store, available in several languages.',
      'prod.h2': 'Products', 'prod.p': 'What we’re working on.',
      'cr.tag': 'Find the killer',
      'cr.desc': 'A logic deduction game. Every case is a crime scene with areas, objects, suspects and a victim: place each character using their clues — no two share a row or column — and uncover who the killer was.',
      'cr.l1': 'Endless randomly generated cases, from 5×5 to 24×24', 'cr.l2': 'Houses, museums, zoos, casinos, castles and more',
      'cr.l3': 'Step-by-step hints that teach the reasoning', 'cr.l4': 'In 7 languages, playable offline',
      'cr.more': 'Discover Crimeoku',
      'cr.soon': 'Coming soon to Google Play', 'cr.priv': 'Privacy policy', 'foot.priv': 'Crimeoku privacy policy'
    },
    es: {
      't.home': 'Bakersoft — Estudio de software', 't.priv': 'Crimeoku — Política de privacidad',
      'nav.what': 'Qué hacemos', 'nav.products': 'Productos',
      'hero.kicker': 'Estudio de software',
      'hero.h1': 'Software para ' + C + 'jugar</span> y para trabajar.',
      'hero.lead': 'Bakersoft es un estudio de software independiente. Diseñamos y desarrollamos juegos y apps para Android y iOS, desde la primera idea hasta la tienda.',
      'cta.products': 'Ver productos', 'cta.what': 'Qué hacemos',
      'what.h2': 'Qué hacemos', 'what.p': 'Nos encargamos de cada parte del producto: diseño, desarrollo, arte y publicación.',
      'p1.h': 'Juegos', 'p1.p': 'Juegos de ingenio y lógica con desafíos justos, pensados para jugarse una y otra vez.',
      'p2.h': 'Apps', 'p2.p': 'Herramientas prácticas que resuelven problemas del día a día con una interfaz clara y simple.',
      'p3.h': 'Android y iOS', 'p3.p': 'Apps para Google Play y el App Store, disponibles en varios idiomas.',
      'prod.h2': 'Productos', 'prod.p': 'En lo que estamos trabajando.',
      'cr.tag': 'Encontrá al asesino',
      'cr.desc': 'Un juego de deducción lógica. Cada caso es una escena del crimen con áreas, objetos, sospechosos y una víctima: ubicá a cada personaje según sus pistas —nadie comparte fila ni columna— y descubrí quién era el asesino.',
      'cr.l1': 'Casos infinitos generados al azar, de 5×5 a 24×24', 'cr.l2': 'Casas, museos, zoológicos, casinos, castillos y más',
      'cr.l3': 'Pistas paso a paso que enseñan el razonamiento', 'cr.l4': 'En 7 idiomas, se juega sin conexión',
      'cr.more': 'Conocé Crimeoku',
      'cr.soon': 'Muy pronto en Google Play', 'cr.priv': 'Política de privacidad', 'foot.priv': 'Privacidad de Crimeoku'
    },
    pt: {
      't.home': 'Bakersoft — Estúdio de software', 't.priv': 'Crimeoku — Política de privacidade',
      'nav.what': 'O que fazemos', 'nav.products': 'Produtos',
      'hero.kicker': 'Estúdio de software',
      'hero.h1': 'Software para ' + C + 'jogar</span> e para trabalhar.',
      'hero.lead': 'A Bakersoft é um estúdio de software independente. Projetamos e desenvolvemos jogos e apps para Android e iOS, da primeira ideia até a loja.',
      'cta.products': 'Ver produtos', 'cta.what': 'O que fazemos',
      'what.h2': 'O que fazemos', 'what.p': 'Cuidamos de cada parte do produto: design, desenvolvimento, arte e publicação.',
      'p1.h': 'Jogos', 'p1.p': 'Jogos de raciocínio e lógica com desafios justos, feitos para serem jogados vezes sem conta.',
      'p2.h': 'Apps', 'p2.p': 'Ferramentas práticas que resolvem problemas do dia a dia com uma interface clara e simples.',
      'p3.h': 'Android e iOS', 'p3.p': 'Apps para o Google Play e a App Store, disponíveis em vários idiomas.',
      'prod.h2': 'Produtos', 'prod.p': 'No que estamos trabalhando.',
      'cr.tag': 'Encontre o assassino',
      'cr.desc': 'Um jogo de dedução lógica. Cada caso é uma cena de crime com áreas, objetos, suspeitos e uma vítima: posicione cada personagem de acordo com as pistas — ninguém divide a mesma linha ou coluna — e descubra quem era o assassino.',
      'cr.l1': 'Casos infinitos gerados aleatoriamente, de 5×5 a 24×24', 'cr.l2': 'Casas, museus, zoológicos, cassinos, castelos e muito mais',
      'cr.l3': 'Dicas passo a passo que ensinam o raciocínio', 'cr.l4': 'Em 7 idiomas, funciona sem internet',
      'cr.more': 'Conheça o Crimeoku',
      'cr.soon': 'Em breve no Google Play', 'cr.priv': 'Política de privacidade', 'foot.priv': 'Política de privacidade do Crimeoku'
    },
    fr: {
      't.home': 'Bakersoft — Studio de logiciels', 't.priv': 'Crimeoku — Politique de confidentialité',
      'nav.what': 'Ce que nous faisons', 'nav.products': 'Produits',
      'hero.kicker': 'Studio de logiciels',
      'hero.h1': 'Des logiciels pour ' + C + 'jouer</span> et pour travailler.',
      'hero.lead': 'Bakersoft est un studio de logiciels indépendant. Nous concevons et développons des jeux et des applications pour Android et iOS, de la première idée jusqu’au store.',
      'cta.products': 'Voir nos produits', 'cta.what': 'Ce que nous faisons',
      'what.h2': 'Ce que nous faisons', 'what.p': 'Nous nous occupons de chaque étape du produit : conception, développement, graphisme et publication.',
      'p1.h': 'Jeux', 'p1.p': 'Des jeux de réflexion et de logique aux défis équitables, faits pour être rejoués encore et encore.',
      'p2.h': 'Applications', 'p2.p': 'Des outils pratiques qui résolvent les problèmes du quotidien avec une interface claire et simple.',
      'p3.h': 'Android et iOS', 'p3.p': 'Des applications pour Google Play et l’App Store, disponibles en plusieurs langues.',
      'prod.h2': 'Produits', 'prod.p': 'Sur quoi nous travaillons.',
      'cr.tag': 'Trouvez l’assassin',
      'cr.desc': 'Un jeu de déduction logique. Chaque affaire est une scène de crime avec des zones, des objets, des suspects et une victime : placez chaque personnage grâce à ses indices — deux personnages ne partagent jamais la même ligne ni la même colonne — et découvrez qui était l’assassin.',
      'cr.l1': 'Des affaires illimitées générées au hasard, de 5×5 à 24×24', 'cr.l2': 'Maisons, musées, zoos, casinos, châteaux et bien plus',
      'cr.l3': 'Des indices pas à pas qui enseignent le raisonnement', 'cr.l4': 'En 7 langues, jouable hors ligne',
      'cr.more': 'Découvrir Crimeoku',
      'cr.soon': 'Bientôt sur Google Play', 'cr.priv': 'Politique de confidentialité', 'foot.priv': 'Politique de confidentialité de Crimeoku'
    },
    de: {
      't.home': 'Bakersoft — Software-Studio', 't.priv': 'Crimeoku — Datenschutzerklärung',
      'nav.what': 'Was wir machen', 'nav.products': 'Produkte',
      'hero.kicker': 'Software-Studio',
      'hero.h1': 'Software zum ' + C + 'Spielen</span> und zum Arbeiten.',
      'hero.lead': 'Bakersoft ist ein unabhängiges Software-Studio. Wir entwerfen und entwickeln mobile Spiele und Apps für Android und iOS – von der ersten Idee bis in den Store.',
      'cta.products': 'Unsere Produkte ansehen', 'cta.what': 'Was wir machen',
      'what.h2': 'Was wir machen', 'what.p': 'Wir kümmern uns um jeden Teil des Produkts: Design, Entwicklung, Grafik und Veröffentlichung.',
      'p1.h': 'Spiele', 'p1.p': 'Knobel- und Logikspiele mit fairen Herausforderungen, die man immer wieder spielen kann.',
      'p2.h': 'Apps', 'p2.p': 'Praktische Werkzeuge, die Alltagsprobleme mit einer klaren, einfachen Oberfläche lösen.',
      'p3.h': 'Android und iOS', 'p3.p': 'Apps für Google Play und den App Store, in mehreren Sprachen verfügbar.',
      'prod.h2': 'Produkte', 'prod.p': 'Woran wir arbeiten.',
      'cr.tag': 'Finde den Mörder',
      'cr.desc': 'Ein Logik-Deduktionsspiel. Jeder Fall ist ein Tatort mit Bereichen, Gegenständen, Verdächtigen und einem Opfer: Platziere jede Figur anhand ihrer Hinweise – keine zwei teilen sich eine Zeile oder Spalte – und finde heraus, wer der Mörder war.',
      'cr.l1': 'Unendlich viele zufällig erzeugte Fälle, von 5×5 bis 24×24', 'cr.l2': 'Häuser, Museen, Zoos, Casinos, Burgen und mehr',
      'cr.l3': 'Hinweise Schritt für Schritt, die das Schlussfolgern beibringen', 'cr.l4': 'In 7 Sprachen, auch offline spielbar',
      'cr.more': 'Crimeoku entdecken',
      'cr.soon': 'Bald bei Google Play', 'cr.priv': 'Datenschutzerklärung', 'foot.priv': 'Datenschutzerklärung von Crimeoku'
    },
    it: {
      't.home': 'Bakersoft — Studio di software', 't.priv': 'Crimeoku — Informativa sulla privacy',
      'nav.what': 'Cosa facciamo', 'nav.products': 'Prodotti',
      'hero.kicker': 'Studio di software',
      'hero.h1': 'Software per ' + C + 'giocare</span> e per lavorare.',
      'hero.lead': 'Bakersoft è uno studio di software indipendente. Progettiamo e sviluppiamo giochi e app per Android e iOS, dalla prima idea fino allo store.',
      'cta.products': 'Scopri i prodotti', 'cta.what': 'Cosa facciamo',
      'what.h2': 'Cosa facciamo', 'what.p': 'Ci occupiamo di ogni parte del prodotto: design, sviluppo, grafica e pubblicazione.',
      'p1.h': 'Giochi', 'p1.p': 'Giochi di logica e di ingegno con sfide eque, pensati per essere rigiocati all’infinito.',
      'p2.h': 'App', 'p2.p': 'Strumenti pratici che risolvono i problemi di tutti i giorni con un’interfaccia chiara e semplice.',
      'p3.h': 'Android e iOS', 'p3.p': 'App per Google Play e App Store, disponibili in diverse lingue.',
      'prod.h2': 'Prodotti', 'prod.p': 'A cosa stiamo lavorando.',
      'cr.tag': 'Trova l’assassino',
      'cr.desc': 'Un gioco di deduzione logica. Ogni caso è una scena del crimine con aree, oggetti, sospettati e una vittima: posiziona ogni personaggio in base ai suoi indizi — due personaggi non condividono mai la stessa riga o colonna — e scopri chi era l’assassino.',
      'cr.l1': 'Casi infiniti generati a caso, da 5×5 a 24×24', 'cr.l2': 'Case, musei, zoo, casinò, castelli e altro ancora',
      'cr.l3': 'Indizi passo dopo passo che insegnano il ragionamento', 'cr.l4': 'In 7 lingue, si gioca anche offline',
      'cr.more': 'Scopri Crimeoku',
      'cr.soon': 'Presto su Google Play', 'cr.priv': 'Informativa sulla privacy', 'foot.priv': 'Informativa sulla privacy di Crimeoku'
    },
    ro: {
      't.home': 'Bakersoft — Studio de software', 't.priv': 'Crimeoku — Politica de confidențialitate',
      'nav.what': 'Ce facem', 'nav.products': 'Produse',
      'hero.kicker': 'Studio de software',
      'hero.h1': 'Software pentru ' + C + 'joacă</span> și pentru muncă.',
      'hero.lead': 'Bakersoft este un studio de software independent. Proiectăm și dezvoltăm jocuri și aplicații pentru Android și iOS, de la prima idee până în magazin.',
      'cta.products': 'Vezi produsele', 'cta.what': 'Ce facem',
      'what.h2': 'Ce facem', 'what.p': 'Ne ocupăm de fiecare parte a produsului: design, dezvoltare, grafică și publicare.',
      'p1.h': 'Jocuri', 'p1.p': 'Jocuri de logică și ingeniozitate cu provocări corecte, făcute pentru a fi jucate iar și iar.',
      'p2.h': 'Aplicații', 'p2.p': 'Unelte practice care rezolvă probleme de zi cu zi printr-o interfață clară și simplă.',
      'p3.h': 'Android și iOS', 'p3.p': 'Aplicații pentru Google Play și App Store, disponibile în mai multe limbi.',
      'prod.h2': 'Produse', 'prod.p': 'La ce lucrăm.',
      'cr.tag': 'Găsește ucigașul',
      'cr.desc': 'Un joc de deducție logică. Fiecare caz este o scenă a crimei cu zone, obiecte, suspecți și o victimă: așază fiecare personaj după indiciile lui — două personaje nu împart niciodată același rând sau aceeași coloană — și descoperă cine a fost ucigașul.',
      'cr.l1': 'Cazuri nesfârșite generate aleatoriu, de la 5×5 la 24×24', 'cr.l2': 'Case, muzee, grădini zoologice, cazinouri, castele și multe altele',
      'cr.l3': 'Indicii pas cu pas care te învață raționamentul', 'cr.l4': 'În 7 limbi, se joacă și fără internet',
      'cr.more': 'Descoperă Crimeoku',
      'cr.soon': 'În curând pe Google Play', 'cr.priv': 'Politica de confidențialitate', 'foot.priv': 'Politica de confidențialitate Crimeoku'
    }
  };

  /* Textos propios de cada página (p. ej. la landing de Crimeoku) */
  if (window.BK_I18N) LANGS.forEach(function (x) { var e = window.BK_I18N[x] || {}; for (var k in e) D[x][k] = e[k]; });

  var d = document.documentElement, l = null;
  try { l = localStorage.getItem('bk:lang'); } catch (e) {}
  if (LANGS.indexOf(l) < 0) {
    l = 'en';
    var nl = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < nl.length; i++) {
      var c = String(nl[i] || '').toLowerCase().slice(0, 2);
      if (LANGS.indexOf(c) >= 0) { l = c; break; }
    }
  }
  d.lang = l;

  function t(k) { var v = D[d.lang] && D[d.lang][k]; return v !== undefined ? v : D.en[k]; }
  function apply() {
    document.querySelectorAll('[data-k]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-k')); });
    var tk = d.getAttribute('data-tk'); if (tk) document.title = t(tk);
    /* Imágenes por idioma: data-img="img/{l}/play.webp" */
    document.querySelectorAll('[data-img]').forEach(function (el) { var u = el.getAttribute('data-img').replace('{l}', d.lang); if (el.getAttribute('src') !== u) el.setAttribute('src', u); });
    document.dispatchEvent(new CustomEvent('bk:lang', { detail: d.lang }));
    var s = document.getElementById('selLang'); if (s) s.value = d.lang;
  }
  document.addEventListener('DOMContentLoaded', function () {
    var s = document.getElementById('selLang');
    if (s) {
      LANGS.forEach(function (x) { var o = document.createElement('option'); o.value = x; o.textContent = NAMES[x]; s.appendChild(o); });
      s.addEventListener('change', function () {
        d.lang = s.value;
        try { localStorage.setItem('bk:lang', d.lang); } catch (e) {}
        apply();
      });
    }
    apply();
  });
})();
