function renderFigures(figures) {
  return figures.map((f, i) => {
    let media;
    if (f.video) {
      const title = (f.title || '').replace(/"/g, '&quot;');
      media = `<div class="fig-video"><iframe src="https://player.vimeo.com/video/${f.video}?badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" title="${title}" loading="lazy"></iframe></div>`;
    } else if (f.itchio) {
      media = `<div class="fig-itchio"><iframe src="https://itch.io/embed/${f.itchio}?bg_color=0f0e0c&fg_color=F0DCCA&link_color=F38325&border_color=0f0e0c&border_width=0" height="167" loading="lazy"><a href="${f.itchioUrl || '#'}">${f.itchioTitle || ''}</a></iframe></div>`;
    } else if (f.pub) {
      media = `<div class="fig-pub">
        <div class="pub-eyebrow">Publication</div>
        <div class="pub-title">${f.pub.title}</div>
        <div class="pub-meta">${f.pub.meta}</div>
        <div class="pub-links">
          ${f.pub.readUrl ? `<a href="${f.pub.readUrl}" target="_blank" rel="noopener">Read on Immerse</a>` : ''}
          ${f.pub.pdfUrl ? `<a href="${f.pub.pdfUrl}" target="_blank" rel="noopener">Download PDF</a>` : ''}
        </div>
      </div>`;
    } else if (f.download) {
      media = `<div class="fig-download"><a href="${f.download.href}" download target="_blank" rel="noopener">${f.download.label}</a></div>`;
    } else if (f.src) {
      media = `<img class="fig-img" src="${f.src}" alt="${(f.alt || '').replace(/"/g, '&quot;')}" loading="lazy">`;
    } else {
      media = `<div class="placeholder ${f.shape || ''}">[ image ${i + 1} ]</div>`;
    }
    return `
      <figure class="figure">
        ${media}
        <figcaption>${f.caption || ''}</figcaption>
      </figure>
    `;
  }).join('');
}

function renderHome() {
  const w = works[FEATURED];
  return `
    <div class="page">
      <div class="eyebrow">Most recent work</div>
      <h1 class="work-title">${w.title}</h1>
      <div class="work-meta">${w.year}</div>
      ${renderFigures(w.figures)}
    </div>
  `;
}

function renderWorkIndex() {
  const items = Object.entries(works).map(([slug, w]) => {
    const thumb = w.thumb
      ? `<img class="thumb" src="${w.thumb}" alt="${w.title}" loading="lazy">`
      : `<div class="thumb"></div>`;
    return `
      <a href="#work/${slug}" class="work-card">
        ${thumb}
        <div class="label">${w.title}<span class="year">${w.year}</span></div>
      </a>
    `;
  }).join('');
  return `
    <div class="page">
      <div class="eyebrow">Selected works</div>
      <div class="work-grid">${items}</div>
    </div>
  `;
}

function renderWorkDetail(slug) {
  const w = works[slug];
  if (!w) return renderWorkIndex();
  return `
    <div class="page">
      <h1 class="work-title">${w.title}</h1>
      <div class="work-meta">${w.year}</div>
      ${renderFigures(w.figures)}
    </div>
  `;
}

function renderAbout() {
  const press = [
    { title: 'Travel the World From Home',                                                source: 'Hyperallergic',                         href: 'https://hyperallergic.com/575351/travel-the-world-indie-video-games/' },
    { title: 'Travel the World From Home With These Immersive, Accessible Video Games',   source: 'blog.byjasonli.com',                    href: 'https://blog.byjasonli.com/travel-the-world-from-home-with-these-immersive-accessible-video-games/' },
    { title: 'Home Movie: The Official Player’s Guide',                                   source: 'Immerse News',                          href: 'https://immerse.news/home-movie-the-official-players-guide-aebf8ebfe1f1' },
    { title: 'Playing With Reality',                                                      source: 'Immerse News',                          href: 'https://immerse.news/call-for-proposals-mayjune2021-4fc481b7184' },
    { title: 'The Frantic Desire for Almost Real',                                        source: 'Chicago Artists Coalition',             href: 'https://chicagoartistscoalition.org/events/the-frantic-desire-for-almost-real' },
    { title: 'Chicago New Media Artists for Racial Justice',                              source: 'itch.io',                               href: 'https://itch.io/b/536/chicago-new-media-artists-for-racial-justice' },
    { title: 'Hello Neighbor — What is your name?',                                       source: 'Purple Window Gallery',                 href: 'https://www.purplewindowgallery.com/post/hello-neighbor-record' },
    { title: 'Reminiscing / Reinventing Graduate Conference',                             source: 'reminiscingreinventing.wordpress.com',  href: 'https://reminiscingreinventing.wordpress.com/' },
    { title: 'Wrath',                                                                     source: 'Future of Storytelling',                href: 'https://futureofstorytelling.org/story/wrath' },
    { title: 'Follow Danny Brown, DTCHPLNES, and 3D Skeletons into Detroit [Music Video]', source: 'Vice',                                 href: 'https://www.vice.com/en/article/53wemz/danny-brown-dtchplnes-3d-music-video' },
    { title: 'Bryan LeBeuf in Detroit',                                                   source: 'Playground Detroit',                    href: 'https://playgrounddetroit.com/tag/bryan-lebeuf/' }
  ];
  const pressItems = press.map(p => `
    <li class="press-item">
      <a href="${p.href}" target="_blank" rel="noopener">${p.title}</a>
      <span class="source">${p.source}</span>
    </li>
  `).join('');

  const contacts = [
    { label: 'Email',     value: 'bryanlebeuf(at)gmail.com', href: 'mailto:bryanlebeuf@gmail.com',      meta: 'General inquiries, press, studio visits' },
    { label: 'CV',        value: 'Download (PDF)',           href: 'Bryan LeBeuf_CV_2026.pdf',                                 meta: 'Updated 2026' }
  ];
  const contactItems = contacts.map(c => `
    <div class="contact-item">
      <div class="ci-label">${c.label}</div>
      <a href="${c.href}">${c.value}</a>
      <div class="ci-meta">${c.meta}</div>
    </div>
  `).join('');

  return `
    <div class="page">
      <div class="about">
        <div class="about-bio">
          <div class="eyebrow">Biography</div>
          <p>Bryan LeBeuf is a Chicago based new media artist and game designer whose work uses game structures to reconstruct social memory, civic history, and lived experience within post industrial communities.</p>
          <p>Shaped by his upbringing on Detroit's west side, his practice builds navigable digital environments from oral histories, civic archives, and collective memory, treating games as tools for documentary, preservation, and collective storytelling.</p>
          <p>LeBeuf holds an MFA in Film, Video, New Media, and Animation from the School of the Art Institute of Chicago (2019), where he received the Toby Devan Lewis Fellowship, and a BFA in Media Production and Film from Wayne State University (2010). He was a 2020 artist in residence at the MIT Open Documentary Lab.</p>
        </div>
        <img class="about-photo-img" src="assets/works/Portrait1.jpg" alt="Bryan LeBeuf" loading="lazy">
      </div>

      <section class="press">
        <div class="eyebrow">Press</div>
        <ul class="press-list">${pressItems}</ul>
      </section>

      <section class="about-contact">
        <div class="eyebrow">Contact</div>
        <div class="about-contact-grid">${contactItems}</div>
      </section>
    </div>
  `;
}

function renderUpcoming() {
  const entries = upcomingEntries;

  const items = entries.map(e => `
    <article class="entry">
      <div class="date">${e.date}</div>
      <h2>${e.title}</h2>
      <div class="entry-body">${e.body}</div>
    </article>
  `).join('');

  return `
    <div class="page">
      <div class="eyebrow">Upcoming · Research & process</div>
      <div class="upcoming-list">${items}</div>
    </div>
  `;
}

/* ============================================================
   ROUTER
   ============================================================ */
function route() {
  const hash = location.hash.replace(/^#/, '') || 'home';
  const [section, slug] = hash.split('/');
  let html, active = section;

  if (section === 'home' || hash === '') {
    html = renderHome();  active = 'home';
  } else if (section === 'work' && slug) {
    html = renderWorkDetail(slug);  active = 'work';
  } else if (section === 'work') {
    html = renderWorkIndex();  active = 'work';
  } else if (section === 'about') {
    html = renderAbout();
  } else if (section === 'upcoming') {
    html = renderUpcoming();
  } else {
    html = renderHome();  active = 'home';
  }

  document.getElementById('content').innerHTML = html;

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.route === active);
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);