(() => {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const body = document.body;
  const root = document.documentElement;

  /* ===================================================
     SERVICES (from the firm letterhead)
     =================================================== */
  const SERVICES = [
    { name:'Bail Application', sub:'Criminal / Liberty',
      desc:'Swift, firm representation for accused persons seeking release pending trial.',
      p:['When liberty is at stake, time matters. We prepare and argue bail applications with the care the stakes demand, and keep families informed at every stage.',
         'Our approach is practical: thorough affidavits, clear supporting documents and focused advocacy before the court.'],
      f:['Formal and informal bail applications','Bail affidavits and supporting documents','Bail appeals','Variation of bail conditions','Representation at bail hearings','Guidance for families and sureties'],
      icon:'<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/><circle cx="12" cy="16" r="1.2"/>' },
    { name:'Litigation', sub:'Courts / Urgent Relief',
      desc:'Civil and constitutional litigation, urgent applications and strategic settlement.',
      p:['We act for individuals, households and businesses in civil disputes, from letters of demand through to trial and appeal, including urgent applications where delay would cause real harm.',
         'Strategy follows the client\u2019s interests: we pursue a negotiated outcome where it serves you, and press on in court where it does not.'],
      f:['Letters of demand and statutory notices','Urgent applications','Orders compelling performance','Constitutional and public law matters','Motion and trial proceedings','Claims against organs of state'],
      icon:'<path d="M12 3v18"/><path d="M4 21h16"/><path d="M6 7h12"/><path d="M6 7l-3 7a4 4 0 0 0 8 0z"/><path d="M18 7l3 7a4 4 0 0 1-8 0z"/>' },
    { name:'Unlawful Arrest', sub:'Rights / Damages',
      desc:'Claims for unlawful arrest, detention, malicious prosecution and related rights violations.',
      p:['An arrest or detention without lawful basis is a serious infringement of a person\u2019s rights. We assess what happened, preserve the evidence and pursue the appropriate remedies.',
         'Claims against organs of state are subject to strict notice requirements, so early advice is important.'],
      f:['Unlawful arrest and detention claims','Malicious prosecution','Assault and rights violation claims','Statutory notices to organs of state','Damages and compensation claims','Case assessment and evidence gathering'],
      icon:'<path d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7z"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/>' },
    { name:'Drafting of Contracts', sub:'Advisory / Transactional',
      desc:'Clear, enforceable agreements drafted, reviewed and negotiated for individuals and businesses.',
      p:['A well drafted agreement prevents the dispute that would otherwise follow. We draft and review contracts in plain, precise language that protects your position.',
         'Whether it is a sale, a lease or a service arrangement, we make sure the terms say what you intend them to say.'],
      f:['Sale and purchase agreements','Lease agreements','Employment and service contracts','Partnership and shareholder agreements','Contract review and negotiation','Acknowledgments of debt and settlements'],
      icon:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 15h6M9 18h3"/>' },
    { name:'RAF Claims', sub:'Injury / Compensation',
      desc:'Road Accident Fund claims for injury, loss of support and related damages.',
      p:['If you or a family member was injured, or lost a breadwinner, in a road accident, you may be entitled to compensation from the Road Accident Fund. We guide the claim from lodgement to finalisation.',
         'Claims are sensitive to time and heavy on documents, so we help you gather and organise what is needed from the start.'],
      f:['Personal injury claims','Loss of support for dependants','Claim lodgement and follow up','Coordination of medical and expert reports','Disputed or rejected claims','Settlement and trial'],
      icon:'<path d="M3 15l2-6a2 2 0 0 1 2-1.5h10a2 2 0 0 1 2 1.5l2 6v4h-3v-2H6v2H3z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/><path d="M5 11h14"/>' },
    { name:'Medical Negligence', sub:'Health / Compensation',
      desc:'Claims arising from negligent medical care by hospitals, clinics and practitioners.',
      p:['Where substandard care has caused harm, patients and families deserve answers and, where justified, compensation. We investigate carefully before we advise.',
         'These matters are technical and driven by evidence. We work with appropriate experts and treat every client with sensitivity.'],
      f:['Initial case assessment','Obtaining medical records','Expert opinions','Statutory notices to health authorities','Damages claims','Negotiated settlement or trial'],
      icon:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/>' },
    { name:'Debt Collection', sub:'Recovery / Enforcement',
      desc:'Recovering what you are owed, from letter of demand through to enforcement.',
      p:['We help creditors recover outstanding amounts efficiently and lawfully, and assist debtors in reaching fair, workable arrangements.',
         'Each file is approached with commercial sense: the aim is recovery, not needless litigation.'],
      f:['Letters of demand','Summons and default judgment','Warrants of execution and garnishee orders','Payment arrangements','Acknowledgments of debt','Defending debt claims'],
      icon:'<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>' },
    { name:'Administration of Estates', sub:'Succession / Estates',
      desc:'Guidance and administration of deceased estates, wills and succession.',
      p:['The death of a loved one is difficult enough. We guide families through reporting and administering the estate with care, clarity and discretion.',
         'From the first report to the Master of the High Court through to final distribution, we keep beneficiaries informed.'],
      f:['Reporting deceased estates to the Master','Drafting of wills','Executorship and administration','Liquidation and distribution accounts','Intestate succession','Transfer of property and assets'],
      icon:'<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>' }
  ];

  const WA_NUMBER = '27768571067'; /* WhatsApp number, international format, no + or spaces */

  const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  const CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
  const pad = n => String(n).padStart(2, '0');

  // Practice cards
  $('#practiceGrid').innerHTML = SERVICES.map((s, i) => `
    <article class="practice-card reveal" style="--d:${i % 4}" data-i="${i}" data-spot role="button" tabindex="0" aria-haspopup="dialog">
      <span class="glow"></span>
      <span class="practice-num">${pad(i + 1)}</span>
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <span class="learn">Learn more ${ARROW}</span>
    </article>`).join('');

  // Ribbon (letterhead services band)
  $('#ribbonTrack').innerHTML = SERVICES.map(s => `<span>${s.name}</span>`).join('').repeat(4);

  // Footer list + form select
  $('#footerServices').innerHTML = SERVICES.map((s, i) => `<li><a href="#practice" data-open="${i}">${s.name}</a></li>`).join('');
  $('#f-matter').innerHTML = '<option value="" disabled selected>Select a practice area</option>' +
    SERVICES.map(s => `<option>${s.name}</option>`).join('') + '<option>Other / not sure</option>';
  $('#year').textContent = new Date().getFullYear();

  /* ===================================================
     IMAGE PLACEHOLDERS
     =================================================== */
  const PH_ICON = '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="9" cy="10" r="1.8"/><path d="M3 17l5-5 4 4 3-3 6 6"/></svg>';
  $$('.ph').forEach(p => {
    const label = p.dataset.label || 'Image placeholder';
    const hint = p.dataset.hint || 'Attach picture';
    p.insertAdjacentHTML('afterbegin', `<div class="ph-inner">${PH_ICON}<span class="ph-label">${label}</span><span class="ph-hint">${hint}</span></div>`);
    const src = (p.dataset.src || '').trim();
    if (src) {
      const img = new Image();
      img.alt = p.dataset.alt || label;
      img.loading = 'lazy';
      if (p.dataset.pos) img.style.objectPosition = p.dataset.pos;
      img.style.opacity = '0';
      img.style.transition = 'opacity .8s';
      img.onload = () => { p.classList.add('has-img'); img.style.opacity = '1'; };
      img.onerror = () => img.remove();
      img.src = src;
      p.appendChild(img);
    }
  });

  /* ===================================================
     SCROLL LOCK (shared by drawer + modal)
     =================================================== */
  let lockCount = 0, lockY = 0;
  const lock = () => { if (lockCount++ === 0) { lockY = window.scrollY; body.style.top = `-${lockY}px`; body.classList.add('no-scroll'); } };
  const unlock = () => { if (lockCount > 0 && --lockCount === 0) { body.classList.remove('no-scroll'); body.style.top = ''; window.scrollTo({ top: lockY, behavior: 'instant' }); } };

  /* ===================================================
     THEME TOGGLE (circular reveal where supported)
     =================================================== */
  const themeBtn = $('#themeToggle');
  const setTheme = (t, save = true) => {
    root.setAttribute('data-theme', t);
    const m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'light' ? '#FBF9F4' : '#050F24');
    if (save) { try { localStorage.setItem('tw-theme', t); } catch (e) {} }
  };
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    const r = themeBtn.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    if (document.startViewTransition && !reduced) {
      const t = document.startViewTransition(() => setTheme(next));
      t.ready.then(() => {
        root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: 'cubic-bezier(0.22,1,0.36,1)', pseudoElement: '::view-transition-new(root)' });
      }).catch(() => {});
    } else {
      root.classList.add('theme-switching');
      setTheme(next);
      setTimeout(() => root.classList.remove('theme-switching'), 650);
    }
  });
  matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', e => {
    try { if (!localStorage.getItem('tw-theme')) setTheme(e.matches ? 'light' : 'dark', false); } catch (err) {}
  });

  /* ===================================================
     HEADER, PROGRESS, TO-TOP
     =================================================== */
  const header = $('#header'), progress = $('#progress'), toTop = $('#toTop');
  let ticking = false;
  const onScroll = () => {
    if (ticking || body.classList.contains('no-scroll')) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY, h = root.scrollHeight - innerHeight;
      header.classList.toggle('scrolled', y > 40);
      progress.style.transform = `scaleX(${h > 0 ? Math.min(y / h, 1) : 0})`;
      toTop.classList.toggle('show', y > 700);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ===================================================
     REVEAL + COUNTERS + SCROLLSPY
     =================================================== */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  const countIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const end = +e.target.dataset.count; if (reduced) return;
    const t0 = performance.now(), dur = 1400;
    const step = t => { const k = Math.min((t - t0) / dur, 1), v = 1 - Math.pow(1 - k, 3); e.target.textContent = Math.round(end * v); if (k < 1) requestAnimationFrame(step); };
    e.target.textContent = '0'; setTimeout(() => requestAnimationFrame(step), 1500);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  const links = $$('.nav-links a[href^="#"]:not(.nav-cta)');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['about', 'practice', 'people', 'insights', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ===================================================
     DRAWER
     =================================================== */
  const drawer = $('#drawer'), overlay = $('#drawerOverlay'), menuBtn = $('#menuToggle');
  const openDrawer = () => { lock(); drawer.classList.add('open'); overlay.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); menuBtn.classList.add('active'); menuBtn.setAttribute('aria-expanded', 'true'); };
  const closeDrawer = () => { if (!drawer.classList.contains('open')) return; drawer.classList.remove('open'); overlay.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); menuBtn.classList.remove('active'); menuBtn.setAttribute('aria-expanded', 'false'); unlock(); };
  menuBtn.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
  $('#drawerClose').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  $$('[data-drawer-link]').forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault(); closeDrawer();
      const t = href === '#top' ? null : $(href);
      setTimeout(() => window.scrollTo({ top: t ? t.getBoundingClientRect().top + window.scrollY - 64 : 0, behavior: 'smooth' }), 120);
    } else closeDrawer();
  }));
  addEventListener('resize', () => { if (innerWidth > 1024) closeDrawer(); });

  /* ===================================================
     SERVICE MODAL
     =================================================== */
  const modal = $('#modal'); let lastTrigger = null;
  const openModal = (i, trigger) => {
    const s = SERVICES[i]; if (!s) return;
    lastTrigger = trigger || null;
    $('#modalEyebrow').textContent = `Practice Area ${pad(i + 1)}`;
    $('#modalTitle').textContent = s.name;
    $('#modalSub').textContent = s.sub;
    $('#modalText').innerHTML = s.p.map(t => `<p>${t}</p>`).join('');
    $('#modalFeatures').innerHTML = s.f.map((t, k) => `<li style="--i:${k}">${CHECK}${t}</li>`).join('');
    $('#modalCta').dataset.service = s.name;
    $('#modalWa').href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hello Titi W Attorneys, I would like to enquire about ' + s.name + '.');
    lock(); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => $('#modalClose').focus({ preventScroll: true }), 300);
  };
  const closeModal = () => {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); unlock();
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  };
  $('#practiceGrid').addEventListener('click', e => { const c = e.target.closest('.practice-card'); if (c) openModal(+c.dataset.i, c); });
  $('#practiceGrid').addEventListener('keydown', e => { const c = e.target.closest('.practice-card'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openModal(+c.dataset.i, c); } });
  $$('[data-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openModal(+a.dataset.open, a); }));
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  $('#modalCta').addEventListener('click', e => {
    e.preventDefault();
    const svc = e.currentTarget.dataset.service; lastTrigger = null; closeModal();
    const sel = $('#f-matter'); if (svc) sel.value = svc;
    setTimeout(() => window.scrollTo({ top: $('#contact').getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }), 200);
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeArticle(); closeModal(); closeDrawer(); }
    const openDlg = artModal.classList.contains('open') ? artModal : (modal.classList.contains('open') ? modal : null);
    if (e.key === 'Tab' && openDlg) {
      const f = $$('button, a[href]', openDlg).filter(el => el.offsetParent !== null); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ===================================================
     ARTICLES
     =================================================== */
  const ARTICLES = [{"cat": "Criminal Law", "read": "5 min read", "svc": "Bail Application", "title": "Arrested? Know your rights before you speak.", "intro": "An arrest is frightening for the person arrested and for the family waiting at home. Knowing what the law allows, and what to do in the first hours, can protect both liberty and the outcome of the case.", "sec": [{"h": "Your rights on arrest", "p": ["The Constitution gives every arrested person important protections. You have the right to:"], "l": ["Remain silent, and to be told promptly of that right and of the consequences of speaking", "Not be forced to make a confession or admission that can be used against you", "Consult an attorney of your choice, and to be told of that right promptly", "Be brought before a court as soon as reasonably possible, and within 48 hours of arrest (or by the end of the next court day if the 48 hours end outside court hours)", "Be treated humanely in detention, with access to family, a doctor and a lawyer", "Apply to be released on bail where the interests of justice permit"]}, {"h": "What to do in the first hours", "l": ["Stay calm and do not resist, even if you believe the arrest is wrong", "Give your name and address, but do not answer questions about the allegations until you have spoken to an attorney", "Do not sign any document you have not read or do not understand", "Note the names of the arresting officers, the police station and the time of arrest", "Ask the police to let you contact a family member and an attorney"]}, {"h": "How a bail application works", "p": ["Bail is the release of an accused person from custody, on conditions, while the case is still pending. For less serious offences the police can sometimes grant bail before the first court appearance. Otherwise the application is made to the court.", "The court weighs whether the accused will stand trial, whether he or she might interfere with witnesses or evidence, and whether release would endanger the public or the proper working of the justice system. It also looks at the accused’s ties to the community, such as a fixed home, family and work, and at how strong the State’s case appears.", "For the most serious offences the law places a heavier burden on the accused to show that release is justified, so careful preparation matters."]}, {"h": "How families can help", "l": ["Provide a certified copy of the person’s ID and proof of residential address", "Gather proof of employment, school enrolment or other ties to the community", "Keep the case number and the name of the police station", "Decide early who will pay or stand as surety for any bail amount"]}, {"h": "If the arrest was unlawful", "p": ["An arrest or detention without lawful grounds can give rise to a claim for damages. Claims against the police and other organs of state require written notice, generally within six months, so early advice is important."]}]}, {"cat": "RAF Claims", "read": "4 min read", "svc": "RAF Claims", "title": "Injured in a road accident? Gather these documents early.", "intro": "The Road Accident Fund compensates people injured in road accidents, and the dependants of those who die, where another driver was at fault. A claim is only as strong as its paperwork, and the paperwork is easiest to collect early.", "sec": [{"h": "Who can claim", "p": ["A claim may be made by an injured driver, passenger or pedestrian, and by dependants who lost financial support when a breadwinner died. Compensation can cover future medical expenses, loss of income or earning capacity, loss of support and, in qualifying cases, general damages for serious injury."]}, {"h": "Documents to gather", "l": ["Your ID document, and the details of the driver and owner of the other vehicle, if known", "The police accident report and case number", "The completed claim form and the hospital admission and discharge records", "Medical reports, X rays and treatment records from every doctor and clinic that treated you", "Photographs of the scene, the vehicles and your injuries", "Names and contact details of witnesses", "Proof of income, such as payslips, tax returns or bank statements", "Receipts for medical, travel and other expenses you have paid"]}, {"h": "If a loved one died", "l": ["The death certificate and any mortuary report", "Marriage certificate and birth certificates of the spouse, children or other dependants", "Proof of the deceased person’s income and of the support given to dependants", "The funeral account"]}, {"h": "Serious injury claims", "p": ["Compensation for pain, suffering and loss of enjoyment of life, known as general damages, is available only where the injury is assessed as serious under the Fund’s rules. This requires a specific assessment form completed by a medical practitioner, so raise it with your doctor early."]}, {"h": "Time limits", "p": ["Report the accident to the police as soon as possible and keep the case number. A claim must generally be lodged within three years of the date of the accident, and within two years where the vehicle that caused it cannot be identified. Time limits can differ in some situations, for example for children, so do not wait."]}]}, {"cat": "Estates", "read": "5 min read", "svc": "Administration of Estates", "title": "A loved one has passed: where to begin with the estate.", "intro": "Grief and paperwork arrive together. The law sets out a clear process for dealing with a deceased person’s property, and following it protects the family from disputes and delays.", "sec": [{"h": "The first steps", "l": ["Obtain the death certificate or burial order from the Department of Home Affairs", "Find out whether there is a will, and locate the original", "Hand the original will to the Master of the High Court, or the Magistrate’s Court, within 14 days of the death", "Secure the deceased person’s property and important documents, but do not sell or share out any assets yet", "Do not close bank accounts or cancel policies before speaking to an attorney"]}, {"h": "Reporting the estate", "p": ["Most estates are reported to the Master of the High Court, who supervises the process and appoints the person who will administer it. Smaller estates, below a limit set by law, are usually dealt with through the Magistrate’s Court. We can tell you which route applies to your family."]}, {"h": "The role of the executor", "p": ["Where there is a will, the Master issues Letters of Executorship to the executor named in it. Where there is no will, an executor is appointed and given Letters of Authority. The executor holds the legal power to deal with the estate, and no one else may sell property or close accounts in the deceased person’s name without it."]}, {"h": "How the estate is wound up", "l": ["The executor lists the assets and debts of the estate", "Creditors are invited to submit claims, and debts are paid", "A liquidation and distribution account is prepared and made available for inspection", "Once the account is confirmed, the executor pays the beneficiaries and transfers property into their names"]}, {"h": "When there is no will", "p": ["The estate is shared according to the Intestate Succession Act, which generally gives a surviving spouse and children the right to inherit. Some families live under customary law, which can affect how certain property is dealt with, so tailored advice is important."]}, {"h": "Documents to gather", "l": ["The death certificate and the deceased person’s ID", "The will, if there is one", "Marriage certificate, or proof of a customary marriage", "Title deeds, vehicle registration papers and insurance policy documents", "Bank and investment details", "Details of any debts, such as loans and accounts"]}]}];
  const artModal = $('#artModal'); let artTrigger = null;
  const openArticle = (i, trigger) => {
    const a = ARTICLES[i]; if (!a) return;
    artTrigger = trigger || null;
    $('#artEyebrow').textContent = a.cat;
    $('#artTitle').textContent = a.title;
    $('#artSub').textContent = a.read;
    $('#artText').innerHTML = `<p class="lede">${a.intro}</p>` + a.sec.map(x =>
      `<h4>${x.h}</h4>` + (x.p || []).map(t => `<p>${t}</p>`).join('') + (x.l ? `<ul>${x.l.map(t => `<li>${t}</li>`).join('')}</ul>` : '')).join('');
    $('#artCta').dataset.service = a.svc;
    $('#artWa').href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hello Titi W Attorneys, I read your article "' + a.title + '" and would like advice.');
    lock(); artModal.classList.add('open'); artModal.setAttribute('aria-hidden', 'false');
    artModal.scrollTop = 0; $('.modal', artModal).scrollTop = 0;
    setTimeout(() => $('#artClose').focus({ preventScroll: true }), 300);
  };
  const closeArticle = () => {
    if (!artModal.classList.contains('open')) return;
    artModal.classList.remove('open'); artModal.setAttribute('aria-hidden', 'true'); unlock();
    if (artTrigger) artTrigger.focus({ preventScroll: true });
  };
  $$('.insight[data-a]').forEach(c => {
    c.addEventListener('click', () => openArticle(+c.dataset.a, c));
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openArticle(+c.dataset.a, c); } });
  });
  $('#artClose').addEventListener('click', closeArticle);
  artModal.addEventListener('click', e => { if (e.target === artModal) closeArticle(); });
  $('#artCta').addEventListener('click', e => {
    e.preventDefault();
    const svc = e.currentTarget.dataset.service; artTrigger = null; closeArticle();
    if (svc) $('#f-matter').value = svc;
    setTimeout(() => window.scrollTo({ top: $('#contact').getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }), 200);
  });

  /* ===================================================
     HOVER EFFECTS: spotlight, tilt, magnetic, hero parallax
     =================================================== */
  if (fine) {
    document.addEventListener('pointermove', e => {
      const t = e.target.closest && e.target.closest('[data-spot]'); if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });

    $$('.tilt').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.setProperty('--ry', (x * 7) + 'deg'); el.style.setProperty('--rx', (-y * 7) + 'deg');
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });

    $$('.magnetic').forEach(btn => {
      let raf = null;
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { btn.style.transform = `translate(${x * .16}px, ${y * .26}px)`; });
      });
      btn.addEventListener('mouseleave', () => { cancelAnimationFrame(raf); btn.style.transform = ''; });
    });

    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      hero.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    }, { passive: true });
  }

  /* ===================================================
     ENQUIRY FORM
     Opens WhatsApp with the form details written into a message
     to the firm. The visitor presses send in WhatsApp.
     =================================================== */
  $('#enquiry').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget, status = $('#formStatus');
    if (!form.reportValidity()) return;
    const f = new FormData(form);
    const phone = (f.get('phone') || '').trim();
    const text = [
      'Hello Titi W Attorneys, I would like to request a consultation.',
      '',
      `Name: ${f.get('name').trim()}`,
      `Matter: ${f.get('matter')}`,
      phone ? `Phone: ${phone}` : null,
      '',
      f.get('message').trim()
    ].filter(l => l !== null).join('\n');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    status.textContent = 'Opening WhatsApp. Please press send there to deliver your message. If nothing happens, message us on 076 857 1067.';
  });

  /* ===================================================
     SMOOTH ANCHORS
     =================================================== */
  $$('a[href^="#"]:not([data-drawer-link]):not([data-open]):not(#modalCta)').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: id === '#top' ? 0 : t.getBoundingClientRect().top + window.scrollY - (innerWidth <= 720 ? 64 : 80), behavior: 'smooth' });
  }));
})();
