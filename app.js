/**
 * Retrokellari Tampereella — Sovelluslogiikka
 * - Vierityksen syvyysvaikutelma & scroll-reveal
 * - 2-sliderin reaaliaikainen varaus- ja hintalaskuri
 * - Värikoodattu konevalikoima, suodatus, haku & toivelista
 * - Kuvagalleria ja varauspyyntö
 */

const MACHINES = [
  {
    id: 'pong',
    name: 'TV Pong (Gamatic 7600)',
    year: '1977',
    category: 'vintage',
    categoryName: 'Vintage / Pong',
    games: 'Tennis, Jalkapallo, Squash, Pellets',
    desc: 'Videopelihistorian aamunkoitto! Yksinkertainen, äärimmäisen koukuttava kaksinpeli analogisilla meloilla suoraan TV-ruudulta.'
  },
  {
    id: 'atari2600',
    name: 'Atari 2600 "Darth Vader"',
    year: '1982',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Space Invaders, Pac-Man, Pitfall!, River Raid, Asteroids',
    desc: 'Kaikkien aikojen legendaarisin pelikonsoli, jonka ilotikuilla ja moduuleilla kotipelaaminen mullistui maailmanlaajuisesti.'
  },
  {
    id: 'videopac',
    name: 'Philips Videopac G7000',
    year: '1978',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Munchkin, Freedom Fighters, Race, Space Monsters',
    desc: 'Euroopan vastine Atarille kiinteällä alfanumeerisella kalvonäppäimistöllä ja tarkoilla sauvaohjaimilla.'
  },
  {
    id: 'vic20',
    name: 'Commodore VIC-20',
    year: '1980',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'Radar Rat Race, Gorf, Omega Race, Jupiter Lander',
    desc: 'Maailman ensimmäinen yli miljoona kappaletta myynyt mikrotietokone. William Shatnerin tähdittämä "The Friendly Computer".'
  },
  {
    id: 'gamewatch',
    name: 'Nintendo Game & Watch',
    year: '1980–1989',
    category: 'vintage',
    categoryName: 'Taskukonsoli',
    games: 'Donkey Kong, Parachute, Fire, Octopus',
    desc: 'Gunpei Yokoin kulttisarja, joka synnytti Nintendon taskupeli-imperiumin ja toi maailmalle modernin ristiohjaimen.'
  },
  {
    id: 'spectrum',
    name: 'Sinclair ZX Spectrum 48k',
    year: '1982',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'Manic Miner, Jet Set Willy, Chuckie Egg, Knight Lore',
    desc: 'Brittiläisen tietokoneteollisuuden ylpeys ja demoskenen synnyttäjä ikonisilla kumitattinäppäimillä.'
  },
  {
    id: 'spectravideo',
    name: 'Spectravideo SVI-728',
    year: '1984',
    category: 'mikro',
    categoryName: 'Kotitietokone / MSX',
    games: 'Nemesis, Knightmare, Road Fighter, Vampire Killer',
    desc: 'Tyylikäs metallinsävyinen kotikone, joka toimi Microsoftin ja Kazuhiko Nishin ideoiman MSX-standardin esikuvana.'
  },
  {
    id: 'atari600xl',
    name: 'Atari 600XL',
    year: '1983',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'Montezuma\'s Revenge, Boulder Dash, Star Raiders, Dropzone',
    desc: 'Atarin virtaviivainen XL-sarjan kaunotar, jonka upeat värit ja 4-kanavainen POKEY-äänisiru loivat uskomattoman tunnelman.'
  },
  {
    id: 'c64sx',
    name: 'Commodore SX-64',
    year: '1984',
    category: 'mikro',
    categoryName: 'Kannettava C64',
    games: 'Kaikki Commodore 64 -klassikot, pelit ja demot',
    desc: 'Maailman ensimmäinen värillinen kannettava tietokone, jossa on sisäänrakennettu 5" CRT-kuvaputki ja 1541-lerppuasema.'
  },
  {
    id: 'c64c',
    name: 'Commodore 64C',
    year: '1986',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'The Great Giana Sisters, Turrican, Bubble Bobble, Uridium, IK+',
    desc: 'Tasavallan tietokone! Suomen ylivoimaisesti suosituin ja merkittävin kotikone legendaarisella SID-äänipiirillä.'
  },
  {
    id: 'c1541',
    name: 'Commodore 1541-II',
    year: '1988',
    category: 'vintage',
    categoryName: 'Oheislaite',
    games: 'Tallentaa ja lataa kaikki C64-pelit ja demot 5.25" lerpuilta',
    desc: 'Ikoninen lerppuasema, jonka raksutus, pärinä ja "LOAD \"*\",8,1" ovat jokaisen kasarin lapsen selkäytimessä.'
  },
  {
    id: 'toshiba3200sx',
    name: 'Toshiba 3200SX',
    year: '1989',
    category: 'pc',
    categoryName: 'Vintage PC / Kannettava',
    games: 'Prince of Persia, Commander Keen, Monkey Island, Sokoban',
    desc: 'Painava ja tinkimätön "luggable" PC oranssina hehkuvalla kaasuplasmaruudulla ja mekaanisella näppäimistöllä.'
  },
  {
    id: 'canon486',
    name: 'Canon 486 PC',
    year: '1993',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'Wolfenstein 3D, Doom, Day of the Tentacle, Civilization, Dune II',
    desc: 'Klassinen beigenvärinen 90-luvun alun PC-työasema, jolla DOS-aikakauden kirkkaimmat helmet heräävät henkiin.'
  },
  {
    id: 'pentium2compaq',
    name: 'Compaq Deskpro Pentium II',
    year: '1998',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'Quake II, Unreal, Half-Life, StarCraft, Age of Empires, Need for Speed',
    desc: '3D-grafiikan vallankumouksen aikainen yritys- ja pelitykki Voodoo-aikakaudelta.'
  },
  {
    id: 'atari1024st',
    name: 'Atari 1024ST (1040ST)',
    year: '1986',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'Dungeon Master, Xenon 2: Megablast, Populous, Speedball, MIDI-musiikkisoftat',
    desc: '16-bittinen tehotyöasema, joka mullisti kotitietokoneet, elektronisen musiikin teon ja syntetisaattoriohjauksen.'
  },
  {
    id: 'amiga1200',
    name: 'Commodore Amiga 1200',
    year: '1992',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'Alien Breed 3D, Banshee, Super Stardust, Slam Tilt, Gloom',
    desc: 'Amiga-perheen lippulaiva kotikäyttöön: kehittynyt AGA-grafiikka, upea moniäänisyys ja demoskenen ikisuosikki.'
  },
  {
    id: 'mikromikko1',
    name: 'MikroMikko 1 M6',
    year: '1981',
    category: 'pc',
    categoryName: 'Kotimainen PC / Nokia Data',
    games: 'Varhaiset CP/M- ja Nokia-ohjelmat, tekstiseikkailut, TekstiMikko',
    desc: 'Suomalaisen tietotekniikan suurin kansallisaarre! Nokia Datan historiallinen kone, joka toi mikrot suomalaisiin toimistoihin.'
  },
  {
    id: 'mikromikko3',
    name: 'MikroMikko 3 286',
    year: '1986',
    category: 'pc',
    categoryName: 'Kotimainen PC / Nokia Data',
    games: 'MS-DOS-pelit, Alley Cat, Grand Prix Circuit, Test Drive',
    desc: 'Nokia Datan legendaarinen suomalainen 286-työjuhta. Kestävä kuin kivi ja osa Suomen teollista huippumuotoilua.'
  },
  {
    id: 'mikromikko3tt',
    name: 'MikroMikko 3TT 286',
    year: '1987',
    category: 'pc',
    categoryName: 'Kotimainen PC / Nokia Data',
    games: 'Prince of Persia, Sierra On-Line AGI -seikkailut, SimCity',
    desc: 'Nokian edistyksellinen tornimalli tehotyöskentelyyn ja raskaaseen laskentaan. Kotimaisen PC-osaamisen huipentuma.'
  },
  {
    id: 'ibmat5170',
    name: 'IBM AT 5170 (286/12)',
    year: '1984',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'Sierra King\'s Quest, Space Quest, Police Quest, Rogue, Tetris',
    desc: 'Alkuperäinen "Advanced Technology" -malli, joka asetti standardin nykyisille PC-koneille ja AT-väylälle.'
  },
  {
    id: 'ibmps2',
    name: 'IBM PS/2 (386/20)',
    year: '1987',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'Monkey Island 1 & 2, Wing Commander, Leisure Suit Larry, Loom',
    desc: 'VGA-näytöt ja PS/2-liitännät maailmalle esitellyt merkkipaalu legendaarisella IBM Model M -näppäimistöllä.'
  },
  {
    id: 'intel486',
    name: 'Intel 486 DX2/66 PC',
    year: '1992',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'DOOM, DOOM II, Dune II, Theme Park, Alone in the Dark, Indiana Jones',
    desc: '90-luvun unelmakokoonpano! Juuri tällä kokoonpanolla id Softwaren Doom ja LucasArtsin seikkailupelit iskivät tajuntaan.'
  },
  {
    id: 'pentium2266',
    name: 'Intel Pentium II / 266',
    year: '1997',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'Quake II, Fallout, Carmageddon, Grim Fandango, Star Wars Jedi Knight',
    desc: 'Ysärin loppupuolen pelitykki, jossa Slot 1 -prosessori ja aito 3dfx Glide -grafiikkakiihdytys veivät pelaamisen uuteen ulottuvuuteen.'
  },
  {
    id: 'saturn',
    name: 'Sega Saturn',
    year: '1994',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Sega Rally Championship, Virtua Fighter 2, Nights into Dreams, Panzer Dragoon, Daytona USA',
    desc: 'Segan 32-bittinen arcade-hirviö huippuluokan 2D-mätkinnöillä ja kaahailuilla suoraan pelihallien alkuperäisillä tunteilla.'
  },
  {
    id: 'dreamcast',
    name: 'Sega Dreamcast',
    year: '1998',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Crazy Taxi, Shenmue, Sonic Adventure, Soulcalibur, Jet Set Radio',
    desc: 'Aikansa edellä ollut Segan joutsenlaulu konsolisodassa: kirkas 60 FPS -arcade-grafiikka ja interaktiivinen VMU-muistikortti.'
  },
  {
    id: 'amiga500',
    name: 'Commodore Amiga 500',
    year: '1987',
    category: 'mikro',
    categoryName: 'Kotitietokone',
    games: 'Turrican II, Speedball 2, Lemmings, Lotus Esprit Turbo Challenge, Sensible Soccer',
    desc: 'Euroopan kiistaton pelikuningas! Sen uskomaton stereoääni ja pehmeä laitteistotason vieritys jättivät kilpailijat vuosiksi taakseen.'
  },
  {
    id: 'pentium233mmx',
    name: 'PC Intel Pentium 233 MMX',
    year: '1997',
    category: 'pc',
    categoryName: 'PC-työasema',
    games: 'Duke Nukem 3D, Blood, Shadow Warrior, Red Alert, Heroes of Might and Magic III',
    desc: 'Socket 7 -aikakauden kruunaamaton valtias. Build-moottorin räiskinnät ja DOS-pelien kulta-aika aidoimmillaan.'
  },
  {
    id: 'mastersystem',
    name: 'Sega Master System',
    year: '1985',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Alex Kidd in Miracle World, Sonic the Hedgehog, Wonder Boy III, Castle of Illusion',
    desc: 'Segan 8-bittinen vastaus Nintendolle: kirkkaammat värit ja sulava liike tekivät siitä todellisen kulttiklassikon.'
  },
  {
    id: 'nes',
    name: 'Nintendo Entertainment System (NES)',
    year: '1983/86',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Super Mario Bros 3, The Legend of Zelda, Mega Man 2, Duck Hunt, Castlevania',
    desc: 'Pelihistorian pelastaja! Harmaa leipälaatikko, jonka moduulien puhaltelu ja musiikit määrittelivät kokonaisen sukupolven.'
  },
  {
    id: 'megadrive',
    name: 'Sega Mega Drive',
    year: '1988',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Sonic the Hedgehog 2, Streets of Rage 2, Golden Axe, Shinobi III, Gunstar Heroes',
    desc: 'Mustanpuhuva, rock-henkinen 16-bittinen vauhtipeto tunnusomaisilla Yamaha FM -syntikkabassoilla.'
  },
  {
    id: 'snes',
    name: 'Super Nintendo (SNES)',
    year: '1990',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Super Mario World, Donkey Kong Country, Super Mario Kart, Chrono Trigger, Super Metroid',
    desc: '16-bittisen aikakauden kruunattu mestari: Mode 7 -pseudo-3D, värikylläiset pikselit ja Sonyn kehittämä huippuäänipiiri.'
  },
  {
    id: 'ps1',
    name: 'Sony PlayStation 1',
    year: '1994',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'Tekken 3, Crash Bandicoot, Gran Turismo, Tony Hawk\'s Pro Skater 2, Resident Evil 2',
    desc: 'Pelaamisen pop-kulttuuriksi nostanut 32-bittinen CD-konsoli, polygonien vallankumous ja legendaarinen käynnistysääni.'
  },
  {
    id: 'n64',
    name: 'Nintendo 64',
    year: '1996',
    category: 'konsoli',
    categoryName: 'Pelikonsoli',
    games: 'GoldenEye 007, Mario Kart 64, Super Smash Bros, Super Mario 64, Zelda: Ocarina of Time',
    desc: 'Neljän ohjaimen moninpelien kiistaton kuningas! Samalta ruudulta jaetut kisat ja matsit, joista puhutaan vieläkin.'
  }
];

let selectedWishlist = new Set();

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCalculator();
  initMachineCatalog();
  initGallerySlider();
  initLightbox();
  initBookingForm();
});

// 1. VIERITYKSEN SYVYYSVAIKUTELMA (PARALLAX & REVEAL)
function initScrollAnimations() {
  const heroBg = document.getElementById('hero-bg');
  const header = document.getElementById('site-header');

  // Parallaksi taustakuvalle
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        if (heroBg && scrolled < window.innerHeight) {
          heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
        }
        if (header) {
          if (scrolled > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Scroll Reveal animaatiot IntersectionObserverilla
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
}

// 2. NEROKAS 2-SLIDERIN VARAUSMODULI (HINTALASKURI)
function getCalculationData() {
  const sliderHours = document.getElementById('slider-hours');
  const sliderGroup = document.getElementById('slider-group');
  const dateInput = document.getElementById('form-date');

  const hours = sliderHours ? parseInt(sliderHours.value, 10) : 3;
  const groupSize = sliderGroup ? parseInt(sliderGroup.value, 10) : 8;

  let timing = 'weekend';
  let dayName = '';
  let hasDate = false;

  if (dateInput && dateInput.value) {
    const parts = dateInput.value.split('-').map(Number);
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const dayNamesFi = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
      dayName = dayNamesFi[dayOfWeek];
      hasDate = true;
      timing = (dayOfWeek === 0 || dayOfWeek === 6) ? 'weekend' : 'weekday';
    }
  }

  const hourlyRate = (timing === 'weekday') ? 50 : 65;
  const total = hours * hourlyRate;
  const perPerson = Math.round(total / groupSize);

  let timingLabel = '';
  if (hasDate) {
    timingLabel = (timing === 'weekday')
      ? `${dayName} (arkipäivä, 50 €/h)`
      : `${dayName} (viikonloppu, 65 €/h)`;
  } else {
    timingLabel = 'Viikonloppu (la–su, 65 €/h)';
  }

  return { hours, groupSize, timing, dayName, hasDate, timingLabel, hourlyRate, total, perPerson };
}

function initCalculator() {
  const sliderHours = document.getElementById('slider-hours');
  const sliderGroup = document.getElementById('slider-group');
  const dateInput = document.getElementById('form-date');

  const valHoursEl = document.getElementById('val-hours');
  const valGroupEl = document.getElementById('val-group');
  const totalPriceEl = document.getElementById('total-price');
  const perPersonPriceEl = document.getElementById('per-person-price');
  const dateHint = document.getElementById('date-hint-tag');

  if (!sliderHours || !sliderGroup || !totalPriceEl) return;

  // Asetetaan minimipäivämääräksi tämä päivä
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  function calculate() {
    const data = getCalculationData();

    if (valHoursEl) valHoursEl.textContent = `${data.hours} tuntia`;
    if (valGroupEl) valGroupEl.textContent = `${data.groupSize} henkeä`;
    if (totalPriceEl) totalPriceEl.textContent = `${data.total} €`;
    if (perPersonPriceEl) perPersonPriceEl.textContent = `~${data.perPerson} €`;

    // Päivämääräkentän palaute
    if (dateHint) {
      if (data.hasDate) {
        if (data.timing === 'weekday') {
          dateHint.className = 'date-hint-tag active-weekday';
          dateHint.textContent = `✓ ${data.dayName} → Arkipäivähinta 50 €/h`;
        } else {
          dateHint.className = 'date-hint-tag active-weekend';
          dateHint.textContent = `✓ ${data.dayName} → Viikonloppuhinta 65 €/h`;
        }
      } else {
        dateHint.className = 'date-hint-tag';
        dateHint.textContent = 'Valitse päivä kalenterista';
      }
    }

    return data;
  }

  sliderHours.addEventListener('input', calculate);
  sliderGroup.addEventListener('input', calculate);

  if (dateInput) {
    dateInput.addEventListener('input', calculate);
    dateInput.addEventListener('change', calculate);
  }

  calculate();
}

// 3. VÄRIKOODATTU KONEVALIKOIMA (HAULLA & SUODATUKSELLA)
function initMachineCatalog() {
  const container = document.getElementById('machines-grid');
  const searchInput = document.getElementById('search-machines');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!container) return;

  let currentCategory = 'all';
  let query = '';

  function render() {
    const filtered = MACHINES.filter(m => {
      const matchCat = currentCategory === 'all' || m.category === currentCategory;
      const q = query.toLowerCase().trim();
      const matchQuery = !q ||
        m.name.toLowerCase().includes(q) ||
        m.year.includes(q) ||
        m.games.toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <p style="font-size: 1.15rem; margin-bottom: 0.5rem;">Ei koneita hakusanalla "<strong>${escapeHtml(query)}</strong>"</p>
          <button type="button" class="btn-secondary" id="clear-search-btn" style="padding: 0.45rem 1rem; font-size: 0.85rem;">Tyhjennä haku</button>
        </div>
      `;
      document.getElementById('clear-search-btn')?.addEventListener('click', () => {
        searchInput.value = '';
        query = '';
        render();
      });
      return;
    }

    container.innerHTML = filtered.map(m => {
      const isSelected = selectedWishlist.has(m.name);
      return `
        <div class="machine-card-colored cat-${m.category}">
          <div>
            <div class="card-top-meta">
              <span class="category-tag-badge">${m.categoryName}</span>
              <span class="card-year-tag">${m.year}</span>
            </div>
            <h3 class="card-machine-title">${m.name}</h3>
            <p class="card-machine-desc">${m.desc}</p>
          </div>

          <div>
            <div class="card-games-box">
              <span class="card-games-label">Esimerkkipelejä:</span>
              <div class="card-games-list">${m.games}</div>
            </div>

            <div class="card-actions-row">
              <button type="button" class="btn-wish-toggle ${isSelected ? 'selected' : ''}" data-name="${m.name}">
                ${isSelected ? '✓ Toivottu ryhmälle' : '+ Toivo tätä konetta'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Kuuntelijat toivepainikkeille
    container.querySelectorAll('.btn-wish-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const machineName = btn.getAttribute('data-name');
        if (selectedWishlist.has(machineName)) {
          selectedWishlist.delete(machineName);
        } else {
          selectedWishlist.add(machineName);
        }
        updateWishlistInput();
        render();
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      render();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    query = e.target.value;
    render();
  });

  render();
}

function updateWishlistInput() {
  const wishInput = document.getElementById('form-wishlist');
  if (wishInput) {
    wishInput.value = Array.from(selectedWishlist).join(', ');
  }
}

// 4. KUVASLIDER & LIGHTBOX
function initGallerySlider() {
  const track = document.getElementById('gallery-slider-track');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('slider-btn-prev');
  const nextBtn = document.getElementById('slider-btn-next');
  const counterCur = document.getElementById('slider-counter-cur');
  const counterTotal = document.getElementById('slider-counter-total');
  const thumbBtns = document.querySelectorAll('.slider-thumb-btn');
  const viewport = document.getElementById('gallery-slider-viewport');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;
  let autoplayTimer = null;

  if (counterTotal) {
    counterTotal.textContent = String(total).padStart(2, '0');
  }

  function goToSlide(index) {
    currentIndex = (index + total) % total;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (counterCur) {
      counterCur.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    thumbBtns.forEach((btn, i) => {
      const isActive = i === currentIndex;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index') || '0', 10);
      goToSlide(idx);
      resetAutoplay();
    });
  });

  // Näppäimistöohjaus (nuolet vasen/oikea)
  viewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    }
  });

  // Kosketuspyyhkäisy mobiililaitteille
  let touchStartX = 0;
  let touchDiffX = 0;

  viewport?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchDiffX = 0;
    stopAutoplay();
  }, { passive: true });

  viewport?.addEventListener('touchmove', (e) => {
    touchDiffX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  viewport?.addEventListener('touchend', () => {
    if (Math.abs(touchDiffX) > 40) {
      if (touchDiffX < 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
    startAutoplay();
  });

  // Pysäytä automaattinen vaihto hiiren ollessa kuvan päällä
  viewport?.addEventListener('mouseenter', stopAutoplay);
  viewport?.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

function initLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('lightbox-display-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !imgEl) return;

  function openLightbox(src) {
    if (src) {
      imgEl.src = src;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  }

  // Avaa kuva täysikokoisena zoom-napista
  document.querySelectorAll('.btn-slide-zoom').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      openLightbox(src);
    });
  });

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      close();
    }
  });
}

// 5. YHTEYDENOTTO- & VARAUSLOMAKE
function initBookingForm() {
  const form = document.getElementById('direct-booking-form');
  const whatsappBtn = document.getElementById('btn-submit-whatsapp');

  if (!form) return;

  function buildMessage() {
    const name = document.getElementById('form-name')?.value.trim() || 'Ei ilmoitettu';
    const email = document.getElementById('form-email')?.value.trim() || 'Ei ilmoitettu';
    const phone = document.getElementById('form-phone')?.value.trim() || 'Ei ilmoitettu';
    const dateVal = document.getElementById('form-date')?.value;
    const wishlist = document.getElementById('form-wishlist')?.value.trim() || 'Normaali monipuolinen kattaus';
    const notes = document.getElementById('form-notes')?.value.trim() || 'Ei lisätoiveita';

    const calc = getCalculationData();
    const dateFormatted = calc.hasDate ? `${dateVal} (${calc.dayName})` : 'Ei vielä lukittu';

    return `Hei! Haluaisimme varata Retrokellarin tilan ryhmällemme:

👤 Tilaaja: ${name}
📱 Puhelin: ${phone}
📧 Sähköposti: ${email}

📅 Toivottu päivämäärä: ${dateFormatted}
⏱️ Varauksen kesto: ${calc.hours} tuntia (${calc.timingLabel})
👥 Väkimäärä: ${calc.groupSize} henkeä
💶 Hinta-arvio: ${calc.total} € (n. ${calc.perPerson} € / hlö)

🕹️ Toivotut koneet / pelit:
${wishlist}

📝 Lisätiedot:
${notes}

Terveisin,
${name}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = buildMessage();
    const name = document.getElementById('form-name')?.value.trim() || '';
    const subject = encodeURIComponent(`Retrokellari varauspyyntö — ${name}`);
    const body = encodeURIComponent(text);

    window.location.href = `mailto:info@koneet.net?subject=${subject}&body=${body}`;
  });

  whatsappBtn?.addEventListener('click', () => {
    const text = buildMessage();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
