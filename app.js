/* ============================================================
   YOUTH SPORTS DATA — Charts & Interactivity
   ============================================================ */

Chart.defaults.font.family = "'Inter', -apple-system, sans-serif";
Chart.defaults.color = '#8B9BB4';

/* Canvas background plugin — ensures PNGs look great on download */
const bgPlugin = {
  id: 'canvasBg',
  beforeDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = '#0E1420';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
Chart.register(bgPlugin);

const tooltipDefaults = {
  backgroundColor: '#080C10',
  borderColor: '#1E2840',
  borderWidth: 1,
  titleColor: '#FFFFFF',
  bodyColor: '#8B9BB4',
  padding: { x: 14, y: 10 },
  cornerRadius: 10,
  titleFont: { size: 13, weight: '700' },
  bodyFont: { size: 12, weight: '500' },
  boxPadding: 6,
};

const gridColor = 'rgba(30, 40, 64, 0.6)';
const tickColor = '#4A5C72';

/* Word-wrap long category-axis labels onto multiple lines on narrow screens.
   Returns a Chart.js tick `callback`; on wider screens labels are unchanged. */
function wrapTicks(maxChars) {
  return function (value) {
    const raw = this.getLabelForValue ? this.getLabelForValue(value) : value;
    if (typeof raw !== 'string') return raw;
    if (window.innerWidth > 600) return raw.includes('\n') ? raw.split('\n') : raw;
    const lines = [];
    let line = '';
    for (const word of raw.replace(/\n/g, ' ').split(' ')) {
      if (line && (line + ' ' + word).length > maxChars) { lines.push(line); line = word; }
      else line = line ? line + ' ' + word : word;
    }
    if (line) lines.push(line);
    return lines;
  };
}

/* ============================================================
   CHART 1 — Social Media Key Stats (Section 1)
   Ordered by most extreme/eye-popping first
   ============================================================ */
function initSocialChart() {
  const ctx = document.getElementById('chart-social').getContext('2d');

  const labels = [
    'Athletes using social media 2+ hrs/day (mean: 4 hrs)',
    'TikTok motivates fans to physically play sports',
    'Prefer watching sports on social media over TV',
    'Cite social media pressure / recognition as "success"',
  ];
  const data = [80, 72, 62, 31];
  const sources = [
    'Sports Psychiatry (Hogrefe), Nov 2023',
    'Stagwell / NRG, Jan 2026',
    'Stagwell / NRG, Jan 2026',
    'BSN Sports Survey, Nov 2025',
  ];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '% of respondents',
        data,
        backgroundColor: [
          'rgba(0, 229, 195, 0.90)',
          'rgba(0, 229, 195, 0.72)',
          'rgba(0, 229, 195, 0.54)',
          'rgba(0, 229, 195, 0.36)',
        ],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 36,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  ${item.parsed.x}%`,
            afterLabel: (item) => `  Source: ${sources[item.dataIndex]}`,
          }
        }
      },
      scales: {
        x: {
          min: 0, max: 100,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `${v}%`, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 8, callback: wrapTicks(22) }
        }
      }
    }
  });
}

/* ============================================================
   CHART 2 (NEW) — The Athlete Creator Economy: Market Size by Year
   Global influencer marketing industry size, 2016–2025
   Source: Statista / Oberlo / Influencer Marketing Hub annual benchmarks
   ============================================================ */
function initCreatorEconomyChart() {
  const ctx = document.getElementById('chart-creator-economy').getContext('2d');

  const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  // 2016–2025: confirmed actual data (Influencer Marketing Hub Benchmark Reports)
  // 2026: projected (~$40B, per multiple industry sources)
  const actualValues = [1.7, 3.0, 4.6, 6.5, 9.7, 13.8, 16.4, 21.1, 24.0, 32.55, null];
  const projValues   = [null, null, null, null, null, null, null, null, null, 32.55, 40.0];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Confirmed ($B)',
          data: actualValues,
          borderColor: '#00E5C3',
          backgroundColor: 'rgba(0, 229, 195, 0.10)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00E5C3',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 3,
          pointRadius: 7,
          pointHoverRadius: 10,
          borderWidth: 3,
          spanGaps: false,
        },
        {
          label: '2026 (Projected)',
          data: projValues,
          borderColor: '#00E5C3',
          backgroundColor: 'rgba(0, 229, 195, 0.04)',
          fill: true,
          tension: 0.4,
          borderDash: [6, 4],
          pointBackgroundColor: 'transparent',
          pointBorderColor: '#00E5C3',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2,
          spanGaps: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 24,
            boxHeight: 3,
            useBorderRadius: true,
            borderRadius: 2,
            padding: 20,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              if (item.parsed.y === null) return null;
              return `  ${item.dataset.label}: $${item.parsed.y}B`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '600' } }
        },
        y: {
          min: 0,
          grid: { color: gridColor },
          ticks: {
            color: tickColor,
            callback: v => `$${v}B`,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 3 — Sport Cost Surge 2019 vs 2024 (Section 2)
   Ordered by % increase: Basketball (+105%) first
   ============================================================ */
function initSportCostChart() {
  const ctx = document.getElementById('chart-sport-cost').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Basketball\n(+105%)', 'Soccer\n(+69%)', 'Baseball\n(+68%)'],
      datasets: [
        {
          label: '2019 Average',
          data: [427, 537, 660],
          backgroundColor: 'rgba(255, 107, 53, 0.2)',
          borderColor: 'rgba(255, 107, 53, 0.5)',
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: '2024 Average',
          data: [876, 910, 1113],
          backgroundColor: 'rgba(255, 107, 53, 0.85)',
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 12, boxHeight: 12,
            useBorderRadius: true, borderRadius: 3,
            padding: 20,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  ${item.dataset.label}: $${item.parsed.y.toLocaleString()}`,
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '700' }, callback: wrapTicks(12) }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: tickColor,
            callback: v => `$${v.toLocaleString()}`,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 4 — Where Families Spend (Section 2)
   Ordered by most expensive category first (Travel)
   ============================================================ */
function initCostBreakdownChart() {
  const ctx = document.getElementById('chart-cost-breakdown').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Travel', 'Private Lessons', 'Registration Fees', 'Equipment', 'Camps'],
      datasets: [{
        label: 'Avg. annual spend per child (per sport)',
        data: [260, 183, 168, 154, 111],
        backgroundColor: [
          'rgba(255, 107, 53, 0.95)',
          'rgba(255, 107, 53, 0.78)',
          'rgba(255, 107, 53, 0.62)',
          'rgba(255, 107, 53, 0.46)',
          'rgba(255, 107, 53, 0.30)',
        ],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 36,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  $${item.parsed.x} per sport, per child`,
            afterLabel: () => '  Source: Aspen Institute / Project Play',
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${v}`, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 8 }
        }
      }
    }
  });
}

/* ============================================================
   CHART 5 (NEW) — The Real Cost Spectrum (Section 2)
   From national average all the way to the reported high end
   ============================================================ */
function initCostLadderChart() {
  const ctx = document.getElementById('chart-cost-ladder').getContext('2d');

  const labels = [
    'National average (primary sport)',
    'Teen athletes, ages 15–18',
    'Hockey (most expensive sport avg.)',
    'Elite travel baseball (top of range)',
    'Survey maximum (2024 Aspen data)',
  ];
  const data = [1016, 2000, 2583, 17600, 25000];
  const sourceLabels = [
    'Aspen Institute, Feb 2025',
    'Kiplinger / Project Play',
    'Empower, Jun 2025',
    'Bat Digest survey (700+ families)',
    'Aspen Institute, Feb 2025',
  ];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Annual cost per child (USD)',
        data,
        backgroundColor: [
          'rgba(255, 107, 53, 0.28)',
          'rgba(255, 107, 53, 0.42)',
          'rgba(255, 107, 53, 0.56)',
          'rgba(255, 107, 53, 0.80)',
          'rgba(255, 107, 53, 0.96)',
        ],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 40,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  $${item.parsed.x.toLocaleString()} / year`,
            afterLabel: (item) => `  ${sourceLabels[item.dataIndex]}`,
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: {
            color: tickColor,
            callback: v => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`,
            font: { size: 11 },
          }
        },
        y: {
          afterFit(scale) { scale.width = Math.max(scale.width, window.innerWidth < 600 ? 0 : 250); },
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 10, callback: wrapTicks(20) }
        }
      }
    }
  });
}

/* ============================================================
   CHART 6 — NIL Market Explosion (Section 3)
   ============================================================ */
function initNILMarketChart() {
  const ctx = document.getElementById('chart-nil-market').getContext('2d');

  // Sources: Opendorse NIL at 1 (2021-22: $917M), NIL at 3 (2023-24: $1.17B; 2024-25: $1.67B),
  // NIL at 4 July 2025 (2025-26: $2.75B projection). Solid = reported actuals; dashed = Opendorse's own forecast.
  const actualData  = [917, 1170, 1670, null];
  const projData    = [null, null, 1670, 2750];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021–22', '2023–24', '2024–25', '2025–26\n(Opendorse proj.)'],
      datasets: [
        {
          label: 'Reported actuals',
          data: actualData,
          borderColor: '#4A9EFF',
          backgroundColor: 'rgba(74, 158, 255, 0.15)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#4A9EFF',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 11,
          borderWidth: 3,
          spanGaps: false,
        },
        {
          label: 'Opendorse projection',
          data: projData,
          borderColor: '#4A9EFF',
          backgroundColor: 'rgba(74, 158, 255, 0.06)',
          fill: true,
          tension: 0.35,
          borderDash: [6, 4],
          pointBackgroundColor: 'transparent',
          pointBorderColor: '#4A9EFF',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
          borderWidth: 2,
          spanGaps: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 24, boxHeight: 3,
            padding: 20,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              if (item.parsed.y === null) return null;
              return `  ${item.dataset.label}: $${(item.parsed.y / 1000).toFixed(2)}B`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: '#8B9BB4', font: { size: 11, weight: '500' }, maxRotation: 0 }
        },
        y: {
          min: 0, max: 3000,
          grid: { color: gridColor },
          ticks: {
            color: tickColor,
            callback: v => `$${(v / 1000).toFixed(1)}B`,
            font: { size: 11 }
          }
        }
      }
    }
  });
}

/* ============================================================
   CHART 7 — Eye-Popping NIL Deals (Section 3)
   Ordered by value descending (most shocking first)
   ============================================================ */
function initNILDealsChart() {
  const ctx = document.getElementById('chart-nil-deals').getContext('2d');

  const athletes = [
    'Bryce Underwood — Michigan QB, age 17',
    'Bronny James (Basketball, HS valuation)',
    'Mikey Williams (Basketball, HS valuation)',
    'Arch Manning (Football, HS valuation)',
    'NC High Schooler (unnamed)',
    'Ghalee Wadood Jr. (Football, age 9)',
  ];
  const values = [12, 7.5, 3.6, 3.4, 1, 0.1];
  const types = [
    'Reported 4-year deal, $10–12M range (Heavy.com / Athlon Sports)',
    'NIL Valuation (On3)',
    'NIL Valuation (On3)',
    'NIL Valuation (On3)',
    'Reported deal',
    'Reported deal (six figures)',
  ];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: athletes,
      datasets: [{
        label: 'Value ($M USD)',
        data: values,
        backgroundColor: [
          'rgba(74, 158, 255, 0.95)',
          'rgba(74, 158, 255, 0.80)',
          'rgba(74, 158, 255, 0.65)',
          'rgba(74, 158, 255, 0.52)',
          'rgba(74, 158, 255, 0.38)',
          'rgba(74, 158, 255, 0.25)',
        ],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 32,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  $${item.parsed.x}M — ${types[item.dataIndex]}`,
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${v}M`, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 11, weight: '500' }, padding: 8, callback: wrapTicks(22) }
        }
      }
    }
  });
}

/* ============================================================
   CHART DOWNLOAD UTILITY
   ============================================================ */
function downloadChart(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  const padding = 32;
  const offscreen = document.createElement('canvas');
  offscreen.width = canvas.width + padding * 2;
  offscreen.height = canvas.height + padding * 2;
  const offCtx = offscreen.getContext('2d');
  offCtx.fillStyle = '#0E1420';
  offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
  offCtx.drawImage(canvas, padding, padding);
  const link = document.createElement('a');
  link.download = filename || `${canvasId}.png`;
  link.href = offscreen.toDataURL('image/png');
  link.click();
}

/* ============================================================
   SCROLL SPY
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   FADE-IN ANIMATIONS
   ============================================================ */
function initFadeIns() {
  const els = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => observer.observe(el));
}

/* ============================================================
   NAV SHADOW ON SCROLL
   ============================================================ */
function initNavScroll() {
  const nav = document.getElementById('top-nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 20
      ? 'rgba(30, 40, 64, 0.9)'
      : '';
  }, { passive: true });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   COPY BUTTONS — stats & quotes
   ============================================================ */
const copyIcon = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="7" height="7" rx="1"/><path d="M1 8V1h7"/></svg>`;
const checkIcon = `<svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6l3 3 5-5"/></svg>`;

function makeCopyBtn(text) {
  const btn = document.createElement('button');
  btn.className = 'btn-copy';
  btn.setAttribute('aria-label', 'Copy to clipboard');
  btn.innerHTML = `${copyIcon}Copy`;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const doConfirm = () => {
      btn.classList.add('copied');
      btn.innerHTML = `${checkIcon}Copied!`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = `${copyIcon}Copy`;
      }, 2000);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(doConfirm).catch(() => fallbackCopy(text, doConfirm));
    } else {
      fallbackCopy(text, doConfirm);
    }
  });

  return btn;
}

function fallbackCopy(text, onDone) {
  const ta = document.createElement('textarea');
  ta.value = text;
  Object.assign(ta.style, { position: 'fixed', opacity: '0', top: '0', left: '0' });
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(ta);
  onDone();
}

function initCopyButtons() {
  document.querySelectorAll('.stat-card').forEach(card => {
    const number = card.querySelector('.stat-number')?.textContent.trim() ?? '';
    const desc   = card.querySelector('.stat-desc')?.textContent.trim() ?? '';
    const source = card.querySelector('.stat-source')?.textContent.trim() ?? '';
    const text = `${number} ${desc}${source ? ` — Source: ${source}` : ''}`;

    const row = document.createElement('div');
    row.className = 'stat-copy-row';
    row.appendChild(makeCopyBtn(text));
    card.appendChild(row);
  });

  document.querySelectorAll('.quote-card').forEach(card => {
    const quoteText = card.querySelector('.quote-text')?.textContent.trim() ?? '';
    const attrEl   = card.querySelector('.quote-attribution');
    const attrName = attrEl?.childNodes[0]?.textContent.trim() ?? '';
    const attrSub  = attrEl?.querySelector('span')?.textContent.trim() ?? '';
    const text = `${quoteText}${attrName ? ` — ${attrName}` : ''}${attrSub ? `, ${attrSub}` : ''}`;

    const footer = card.querySelector('.quote-footer');
    if (!footer) return;
    const link = footer.querySelector('.quote-link');
    if (link) footer.insertBefore(makeCopyBtn(text), link);
    else footer.appendChild(makeCopyBtn(text));
  });
}

/* ============================================================
   READING PROGRESS BAR
   ============================================================ */
function initReadProgress() {
  const bar = document.getElementById('read-progress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (window.scrollY || h.scrollTop) / max : 0;
    bar.style.width = (Math.min(1, Math.max(0, pct)) * 100).toFixed(2) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

/* ============================================================
   SECTION WATERMARK NUMERALS — derived from each section label
   (auto-covers any sections added later)
   ============================================================ */
function initSectionNumbers() {
  document.querySelectorAll('section.section[id]').forEach(section => {
    const header = section.querySelector('.section-header');
    if (!header || header.querySelector('.section-number')) return;
    const m = (section.querySelector('.section-label')?.textContent || '').match(/(\d{1,2})/);
    if (!m) return;
    const el = document.createElement('div');
    el.className = 'section-number';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = m[1].padStart(2, '0');
    header.insertBefore(el, header.firstChild);
  });
}

/* ============================================================
   COUNT-UP — animates numeric stats into view, preserving any
   prefix/suffix ($, +, %, ×, K, B, M, commas, decimals, "Age N")
   ============================================================ */
function parseStat(raw) {
  const m = raw.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/s);
  if (!m) return null;
  const numStr = m[2];
  return {
    prefix: m[1],
    suffix: m[3],
    hasComma: numStr.includes(','),
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
    target: parseFloat(numStr.replace(/,/g, '')),
    raw,
  };
}

function fmtStat(p, v) {
  let s = v.toFixed(p.decimals);
  if (p.hasComma) {
    s = Number(s).toLocaleString('en-US', { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals });
  }
  return p.prefix + s + p.suffix;
}

function animateCount(el) {
  const p = parseStat(el.dataset.countRaw || el.textContent.trim());
  if (!p || !isFinite(p.target)) { if (el.dataset.countRaw) el.textContent = el.dataset.countRaw; return; }
  const dur = 1100, start = performance.now();
  (function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = fmtStat(p, p.target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = p.raw;
  })(performance.now());
}

function initCountUp() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.hero-stat-number, .stat-number, .dd-count');
  if (reduce) return; // leave exact values untouched

  els.forEach(el => {
    const raw = el.textContent.trim();
    el.dataset.countRaw = raw;
    const p = parseStat(raw);
    if (p && isFinite(p.target)) el.textContent = fmtStat(p, 0);
  });

  // Restore exact authored values before printing, in case any are mid-animation
  window.addEventListener('beforeprint', () => {
    els.forEach(el => { if (el.dataset.countRaw) el.textContent = el.dataset.countRaw; });
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

/* ============================================================
   SECTION 04 — DATA DEEP DIVE CHARTS
   ============================================================ */

/* Chart DD-1: Follower growth over time — reported milestones (not interpolation)
   Overtime (total, all platforms): ~50M Apr 2021 (CNBC, $80M raise); 65M+ Aug 2022
     ($100M Series D — Axios/Sportico); 100M+ across 7 platforms sustained through 2026
     (Overtime overtime.tv/about; Marketing Brew Dec 2024).
   House of Highlights (Instagram): 2.1M Jan 2016, 5M+ Mar 2017 (Wikipedia/Fast Company),
     10M Jul 2018 (Fast Company), ~52M late 2025 (HypeAuditor). */
function initAccountGrowthChart() {
  const el = document.getElementById('chart-account-growth');
  if (!el) return;
  const ctx = el.getContext('2d');

  const years    = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  const overtime = [null, null, null, null, null, 50, 65, null, 100, null, 100];
  const hoh      = [2.1, 5, 10, null, null, null, null, null, null, 52, null];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Overtime — total, all platforms',
          data: overtime,
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.10)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 9,
          borderWidth: 3,
          spanGaps: true,
        },
        {
          label: 'House of Highlights — Instagram',
          data: hoh,
          borderColor: '#00E5C3',
          backgroundColor: 'rgba(0, 229, 195, 0.08)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#00E5C3',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 9,
          borderWidth: 3,
          spanGaps: true,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 20, boxHeight: 3,
            padding: 18,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              if (item.parsed.y === null) return null;
              const v = item.parsed.y;
              const shown = Number.isInteger(v) ? v : v.toFixed(1);
              return `  ${item.dataset.label}: ${shown}M${v >= 100 ? '+' : ''}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: '#8B9BB4', font: { size: 11, weight: '500' }, maxRotation: 0 }
        },
        y: {
          min: 0, max: 110,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `${v}M`, font: { size: 11 } }
        }
      }
    }
  });
}

/* Chart DD-2: Platform audience by age (global users, 2025)
   Source: Statista 2025 global user age distributions.
   13–17: Instagram ~7%, TikTok ~14%, Snapchat ~18%, YouTube n/a (no published <18 share).
   18–24: Instagram ~30%, TikTok ~33%, Snapchat ~37%, YouTube ~16%. */
function initPlatformDemographicsChart() {
  const el = document.getElementById('chart-platform-age');
  if (!el) return;
  const ctx = el.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Instagram', 'TikTok', 'Snapchat', 'YouTube'],
      datasets: [
        {
          label: '13–17 (middle & high school)',
          data: [7, 14, 18, null],
          backgroundColor: 'rgba(139, 92, 246, 0.90)',
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: '18–24 (college age)',
          data: [30, 33, 37, 16],
          backgroundColor: 'rgba(74, 158, 255, 0.85)',
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 12, boxHeight: 12,
            useBorderRadius: true, borderRadius: 3,
            padding: 18,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  ${item.dataset.label}: ${item.parsed.y}% of users`,
            afterLabel: () => '  Source: Statista / DataReportal, 2025',
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '700' } }
        },
        y: {
          min: 0, max: 45,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `${v}%`, font: { size: 11 } }
        }
      }
    }
  });
}

/* Chart DD-3: Youth sports spend vs CPI inflation 2019–2024
   Aspen Institute confirmed: $695 (2019), $1,016 (2024)
   CPI-adjusted baseline: $695 × 1.237 = $860 */
function initSpendingVsCpiChart() {
  const ctx = document.getElementById('chart-spending-vs-cpi').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2019 (Baseline)', '2024 (Actual)'],
      datasets: [
        {
          label: 'Actual family spend',
          data: [695, 1016],
          backgroundColor: ['rgba(255, 107, 53, 0.35)', 'rgba(255, 107, 53, 0.95)'],
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'CPI-inflation baseline (what $695 would be at +23.7%)',
          data: [695, 860],
          backgroundColor: ['rgba(139, 92, 246, 0.35)', 'rgba(139, 92, 246, 0.70)'],
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 12, boxHeight: 12,
            useBorderRadius: true, borderRadius: 3,
            padding: 16,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => `  ${item.dataset.label}: $${item.parsed.y.toLocaleString()}`,
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8B9BB4', font: { size: 12, weight: '700' } } },
        y: {
          min: 0, max: 1200,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${v.toLocaleString()}`, font: { size: 11 } }
        }
      }
    }
  });
}

/* Chart DD-4: Global youth sports market 2020–2035
   Source: Business Research Insights (via Strive Apr 2026)
   Confirmed: $56B (2025), $154.5B (2035 projected), 10.68% CAGR
   Historical values back-calculated from confirmed CAGR */
function initGlobalMarketChart() {
  const ctx = document.getElementById('chart-global-market').getContext('2d');

  const actualVals = [33.7, 37.3, 41.3, 45.7, 50.6, 56.0, null, null, null, null, null];
  const projVals   = [null, null, null, null, null, 56.0, 62.0, 68.6, 76.0, 93.1, 154.5];
  const labels = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2030', '2035'];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Historical (back-calc from 10.68% CAGR)',
          data: actualVals,
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.12)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 9,
          borderWidth: 3,
          spanGaps: false,
        },
        {
          label: 'Projected (10.68% CAGR)',
          data: projVals,
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.04)',
          fill: true,
          tension: 0.35,
          borderDash: [6, 4],
          pointBackgroundColor: 'transparent',
          pointBorderColor: '#8B5CF6',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2,
          spanGaps: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 24, boxHeight: 3,
            padding: 20,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              if (item.parsed.y === null) return null;
              return `  ${item.dataset.label}: $${item.parsed.y.toFixed(1)}B`;
            }
          }
        }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: '#8B9BB4', font: { size: 11, weight: '500' }, maxRotation: 0 } },
        y: {
          min: 0,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${v}B`, font: { size: 11 } }
        }
      }
    }
  });
}

/* Chart DD-5: NIL by sport 2025-26 ($2.75B total)
   Estimated from Opendorse NIL at 3 and NIL at 4 percentage reporting */
function initNilBySportChart() {
  const ctx = document.getElementById('chart-nil-by-sport').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        "Men's Football",
        "Men's Basketball",
        "Women's Basketball",
        'Baseball / Softball',
        'Other Sports',
      ],
      datasets: [{
        label: 'Estimated NIL compensation ($M, 2025-26)',
        data: [1100, 605, 385, 193, 467],
        backgroundColor: [
          'rgba(74, 158, 255, 0.95)',
          'rgba(74, 158, 255, 0.78)',
          'rgba(139, 92, 246, 0.90)',
          'rgba(255, 107, 53, 0.75)',
          'rgba(139, 92, 246, 0.45)',
        ],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 36,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              const total = 2750;
              const pct = ((item.parsed.x / total) * 100).toFixed(0);
              return `  ~$${item.parsed.x}M  (${pct}% of $2.75B total)`;
            },
            afterLabel: () => '  Source: Estimated from Opendorse annual reports',
          }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${v}M`, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 8 }
        }
      }
    }
  });
}

/* Chart DD-6: Men vs Women NIL 2021-22 → 2025-26
   Confirmed totals from Opendorse; men/women splits estimated from reported % trends */
function initNilGenderChart() {
  const ctx = document.getElementById('chart-nil-gender').getContext('2d');
  const years = ['2021-22', '2022-23\n(est.)', '2023-24', '2024-25', '2025-26'];
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: "Men's Sports",
          data: [826, 880, 960, 1237, 2035],
          backgroundColor: 'rgba(74, 158, 255, 0.80)',
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: "Women's Sports",
          data: [91, 130, 210, 433, 715],
          backgroundColor: 'rgba(139, 92, 246, 0.80)',
          borderRadius: 4,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 12, boxHeight: 12,
            useBorderRadius: true, borderRadius: 3,
            padding: 20,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              const totals = [917, 1010, 1170, 1670, 2750];
              const total = totals[item.dataIndex];
              const pct = ((item.parsed.y / total) * 100).toFixed(0);
              return `  ${item.dataset.label}: $${item.parsed.y}M (${pct}%)`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 11, weight: '600' }, maxRotation: 0 }
        },
        y: {
          stacked: true,
          min: 0, max: 3000,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${(v / 1000).toFixed(1)}B`, font: { size: 11 } }
        }
      }
    }
  });
}

/* Chart DD-7: High School NIL state adoption 2021–2025
   Confirmed endpoint: 45 states + DC = 46 jurisdictions (2aDays, Dec 2025)
   Intermediate years estimated from NFHS tracking and state legislation rollout timeline */
function initHsNilStatesChart() {
  const ctx = document.getElementById('chart-hs-nil-states').getContext('2d');

  const confirmedData = [null, null, null, null, 46];
  const estimatedData = [2, 10, 22, 35, 46];
  const labels = ['Mid-2021', 'Mid-2022', 'Mid-2023', 'Mid-2024', 'Late 2025'];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Estimated (from NFHS / state tracking)',
          data: estimatedData,
          borderColor: 'rgba(139, 92, 246, 0.55)',
          backgroundColor: 'rgba(139, 92, 246, 0.10)',
          fill: true,
          tension: 0.35,
          borderDash: [4, 3],
          pointRadius: 4,
          pointBackgroundColor: 'rgba(139, 92, 246, 0.55)',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 2,
          borderWidth: 2,
          spanGaps: true,
        },
        {
          label: 'Confirmed (2aDays, Dec 2025)',
          data: confirmedData,
          borderColor: '#8B5CF6',
          backgroundColor: '#8B5CF6',
          showLine: false,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#0E1420',
          pointBorderWidth: 3,
          pointRadius: 10,
          pointHoverRadius: 13,
          spanGaps: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 20, boxHeight: 3,
            padding: 20,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              if (item.parsed.y === null) return null;
              const suffix = item.parsed.y === 46 ? ' (45 states + DC)' : ' jurisdictions';
              return `  ${item.dataset.label}: ${item.parsed.y}${suffix}`;
            }
          }
        }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: '#8B9BB4', font: { size: 12, weight: '600' } } },
        y: {
          min: 0, max: 51,
          grid: { color: gridColor },
          ticks: { color: tickColor, stepSize: 10, font: { size: 11 }, callback: v => `${v} states` }
        }
      }
    }
  });
}

/* ============================================================
   SECTION 02 (survey) — Spend by household income (stacked)
   Source: Aspen Institute Project Play 2024 Parent Survey (Dorsch & Blazo, p.81)
   ============================================================ */
function initCostIncomeChart() {
  const el = document.getElementById('chart-cost-income');
  if (!el) return;
  new Chart(el.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Under $50K', '$50K–$99K', '$100K+'],
      datasets: [
        { label: 'Primary sport', data: [604, 961, 1591], backgroundColor: 'rgba(255, 107, 53, 0.92)', borderRadius: 4, borderSkipped: false },
        { label: 'Other sports',  data: [286, 426, 771],  backgroundColor: 'rgba(255, 107, 53, 0.38)', borderRadius: 4, borderSkipped: false },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#8B9BB4', font: { size: 12, weight: '600' }, boxWidth: 12, boxHeight: 12, useBorderRadius: true, borderRadius: 3, padding: 20 } },
        tooltip: { ...tooltipDefaults, callbacks: {
          label: (item) => `  ${item.dataset.label}: $${item.parsed.y.toLocaleString()}`,
          footer: (items) => `  Total: $${items.reduce((s, i) => s + i.parsed.y, 0).toLocaleString()}`,
        } }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: '#8B9BB4', font: { size: 12, weight: '700' } } },
        y: { stacked: true, min: 0, grid: { color: gridColor }, ticks: { color: tickColor, callback: v => `$${v.toLocaleString()}`, font: { size: 11 } } }
      }
    }
  });
}

/* ============================================================
   MOBILE NAV — hamburger dropdown (≤768px)
   ============================================================ */
function initMobileNav() {
  const nav = document.getElementById('top-nav');
  const toggle = document.getElementById('nav-toggle');
  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close after a destination is chosen
  nav.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', close));

  // Close on outside tap, Escape, scroll, or growing back to desktop width
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  window.addEventListener('scroll', () => {
    if (nav.classList.contains('nav-open')) close();
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) close();
  });
}

/* ============================================================
   CHART (NEW) — Cost by Sport, full breakdown (Section 2)
   Source: Aspen Institute / Utah State 2019 National Youth Sport
   Survey (n=1,032). Stacked by the five tracked spending categories,
   sorted high->low by total. The 2024 survey only broke out 6 sports,
   so 2019 is the only complete per-sport breakdown (clearly dated).
   ============================================================ */
function initSportSpendChart() {
  const el = document.getElementById('chart-sport-spend');
  if (!el) return;
  const ctx = el.getContext('2d');

  // [Registration, Equipment, Travel, Lessons, Camps] — 2019 survey means (rounded $)
  const rows = [
    ['Ice hockey',      634, 389, 829, 389, 302],
    ['Field hockey',    409, 521, 934,  86, 132],
    ['Gymnastics',      152, 111, 763, 422, 104],
    ['Lacrosse',        411, 280, 281,  68, 231],
    ['Tennis',          115, 122, 352, 471,  95],
    ['Golf',             81, 364, 238,  88, 113],
    ['Swimming',        116,  59, 388, 154,  68],
    ['Baseball',        166, 121, 175, 106, 100],
    ['Softball',        141, 159, 187,  66,  53],
    ['Volleyball',      242,  66, 170,  53,  54],
    ['Soccer',          158, 125, 107,  66,  73],
    ['Tackle football',  91, 110,  83, 116,  76],
    ['Wrestling',       102,  59, 172,  62,  54],
    ['Basketball',       86,  75, 114,  61,  88],
    ['Flag football',    74,  68,  58,  27,  36],
    ['Track & field',    51,  47,  49,  20,  14],
  ];
  const cats = ['Registration', 'Equipment', 'Travel', 'Lessons', 'Camps'];
  const ramp = ['#FFC9A3', '#FF9D5C', '#FF6B35', '#D14E1D', '#8F3410'];
  const datasets = cats.map((c, i) => ({
    label: c,
    data: rows.map(r => r[i + 1]),
    backgroundColor: ramp[i],
    borderWidth: 0,
    maxBarThickness: 22,
  }));

  new Chart(ctx, {
    type: 'bar',
    data: { labels: rows.map(r => r[0]), datasets },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', axis: 'y', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#8B9BB4', font: { size: 11, weight: '600' }, boxWidth: 11, boxHeight: 11, useBorderRadius: true, borderRadius: 3, padding: 12 }
        },
        tooltip: {
          ...tooltipDefaults,
          footerColor: '#E8EEF6',
          footerFont: { size: 12, weight: '700' },
          callbacks: {
            label: (item) => `  ${item.dataset.label}: $${item.parsed.x.toLocaleString()}`,
            footer: (items) => `  Total: $${items.reduce((a, it) => a + (it.parsed.x || 0), 0).toLocaleString()}/yr`,
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `$${v.toLocaleString()}`, font: { size: 11 } }
        },
        y: {
          stacked: true,
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 11.5, weight: '600' }, padding: 6, autoSkip: false, callback: wrapTicks(11) }
        }
      }
    }
  });
}

/* ============================================================
   CHART (NEW) — Travel baseball: real cost by program tier (Section 2)
   Source: Bat Digest survey of 700+ travel-baseball families (via
   Baseball Mode). Floating bars show each tier's reported all-in range;
   the average team fee alone is $2,178.
   ============================================================ */
function initTravelBaseballChart() {
  const el = document.getElementById('chart-travel-baseball');
  if (!el) return;
  const ctx = el.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Budget program', 'Mid-level program', 'Elite program'],
      datasets: [{
        label: 'All-in annual cost range',
        data: [[1400, 3500], [4250, 8450], [9000, 17600]],
        backgroundColor: ['rgba(255,107,53,0.45)', 'rgba(255,107,53,0.72)', 'rgba(255,107,53,0.96)'],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 46,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: {
            label: (item) => {
              const v = item.raw;
              return `  $${v[0].toLocaleString()} - $${v[1].toLocaleString()} all-in / year`;
            },
            afterLabel: () => '  Avg. team fee alone: $2,178 (n = 700+)',
          }
        }
      },
      scales: {
        x: {
          min: 0,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${v}`, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '600' }, padding: 8, callback: wrapTicks(12) }
        }
      }
    }
  });
}

/* ============================================================
   BOOT
   ============================================================ */
/* ============================================================
   CHART — Google Trends: Search Interest in Youth-Sports Phrases
   Indexed interest (0–100), U.S. web search, 2014–2025.
   Trend SHAPES are grounded in documented patterns (NIL spike after
   the July 1, 2021 NCAA rule change; "youth sports" 2020 COVID dip).
   Exact index points are illustrative — regenerate from a live
   Google Trends export before publication.
   ============================================================ */
function initTrendsChart() {
  const el = document.getElementById('chart-trends');
  if (!el) return;
  const ctx = el.getContext('2d');

  const years = ['2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];

  const series = [
    { label: 'NIL',             color: '#3B82F6', data: [2, 2, 3, 4, 5, 6, 8, 42, 70, 82, 92, 100] },
    { label: 'Travel baseball', color: '#00E5C3', data: [40, 42, 45, 48, 52, 55, 41, 58, 65, 70, 75, 80] },
    { label: 'Club volleyball', color: '#FF6B35', data: [24, 27, 30, 33, 37, 40, 28, 46, 56, 64, 73, 85] },
    { label: 'Youth sports',    color: '#A78BFA', data: [55, 54, 56, 55, 57, 58, 38, 55, 60, 62, 65, 68] },
  ];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: series.map(s => ({
        label: s.label,
        data: s.data,
        borderColor: s.color,
        backgroundColor: s.color,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2.5,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: '#8B9BB4',
            font: { size: 12, weight: '600' },
            boxWidth: 24, boxHeight: 3, useBorderRadius: true, borderRadius: 2, padding: 18,
          }
        },
        tooltip: {
          ...tooltipDefaults,
          callbacks: { label: (item) => `  ${item.dataset.label}: ${item.parsed.y}` }
        }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: '#8B9BB4', font: { size: 11, weight: '600' } } },
        y: {
          min: 0, max: 100,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => v, font: { size: 11 } }
        }
      }
    }
  });
}

/* ============================================================
   CHART — Sports Hashtag Volume on TikTok (total posts, millions)
   Source: eDigital Agency, "Top Sports Hashtags on TikTok" (2026).
   ============================================================ */
function initHashtagsChart() {
  const el = document.getElementById('chart-hashtags');
  if (!el) return;
  const ctx = el.getContext('2d');

  const labels = ['#football', '#basketball', '#soccer', '#volleyball', '#baseball'];
  const data   = [80, 26, 18.3, 10.4, 8];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Posts (millions)',
        data,
        backgroundColor: [
          'rgba(0, 229, 195, 0.90)',
          'rgba(0, 229, 195, 0.74)',
          'rgba(0, 229, 195, 0.60)',
          'rgba(0, 229, 195, 0.46)',
          'rgba(0, 229, 195, 0.34)',
        ],
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 34,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipDefaults,
          callbacks: { label: (item) => `  ${item.parsed.x}M posts` }
        }
      },
      scales: {
        x: {
          min: 0,
          grid: { color: gridColor },
          ticks: { color: tickColor, callback: v => `${v}M`, font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 13, weight: '600' }, padding: 8 }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initFadeIns();
  initNavScroll();
  initSmoothScroll();
  initMobileNav();
  initCopyButtons();
  initReadProgress();
  initSectionNumbers();
  initCountUp();

  setTimeout(() => {
    initSocialChart();
    initCreatorEconomyChart();
    initTrendsChart();
    initHashtagsChart();
    initSportCostChart();
    initCostBreakdownChart();
    initCostLadderChart();
    initSportSpendChart();
    initTravelBaseballChart();
    initNILMarketChart();
    initNILDealsChart();
    initAccountGrowthChart();
    initPlatformDemographicsChart();
    initSpendingVsCpiChart();
    initGlobalMarketChart();
    initNilBySportChart();
    initNilGenderChart();
    initHsNilStatesChart();
    initCostIncomeChart();
    initElite11Chart();
  }, 100);
});

/* ============================================================
   UI ENHANCEMENTS — cursor-aware card spotlight + hero parallax
   (additive; runs independently of the main boot block)
   ============================================================ */
function initCardSpotlight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sel = '.stat-card, .quote-card, .hero-stat';
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest(sel);
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
}

function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid = document.querySelector('.hero-grid');
  if (!grid) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > window.innerHeight) return;            // only while hero is in view
    grid.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initCardSpotlight();
  initHeroParallax();
});


/* ============================================================
   CHART — Elite 11 → NFL Pipeline (Section 5, gold)
   Source: Code Eleven / Elite 11 (codeelevenagency.com/elite-11)
   ============================================================ */
function initElite11Chart() {
  const el = document.getElementById('chart-elite11');
  if (!el) return;
  const ctx = el.getContext('2d');
  const labels = ['Recent Heisman winners (16 of 17)', 'NFL starting QBs (28 of 32)', 'QBs on NFL rosters, 2025 (87 of 102)'];
  const data = [94, 88, 85];
  const detail = ['16 of the last 17 Heisman Trophy winners', '28 of 32 NFL starting quarterbacks', '87 of 102 QBs on NFL rosters to start 2025'];
  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: '% who came through Elite 11', data, backgroundColor: ['rgba(244, 183, 64, 0.95)', 'rgba(244, 183, 64, 0.72)', 'rgba(244, 183, 64, 0.52)'], borderRadius: 6, borderSkipped: false, barThickness: 38 }] },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipDefaults, callbacks: { label: (item) => `  ${item.parsed.x}% — ${detail[item.dataIndex]}`, afterLabel: () => '  Source: Code Eleven / Elite 11' } }
      },
      scales: {
        x: { min: 0, max: 100, grid: { color: gridColor }, ticks: { color: tickColor, callback: v => `${v}%`, font: { size: 11 } } },
        y: { grid: { display: false }, ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 8 } }
      }
    }
  });
}

/* ============================================================
   ATHLETE-INFLUENCER INDEX — filter by era + sport (Deep Dive §04)
   NIL = peak On3 valuation (market estimate, not a confirmed contract)
   unless a reported deal is noted. IG counts ≈ June 2026.
   ============================================================ */
function initAthleteIndex() {
  const grid = document.getElementById('ath-grid');
  if (!grid) return;
  const empty = document.getElementById('ath-empty');

  const ATHLETES = [
    // ── Current (still HS / college amateurs) ──
    { name:'Bryce Underwood', sport:'football', era:'current', role:'Michigan QB (Fr.)', nil:'$10–12M', nilVal:12, nilNote:'reported 4-yr deal', igLabel:'231K IG · On3 profile →', igUrl:'https://www.on3.com/rivals/bryce-underwood-15949/nil/' },
    { name:'Arch Manning', sport:'football', era:'current', role:'Texas QB', nil:'$5.4M', nilVal:5.4, igLabel:'@archmanning · 619K', igUrl:'https://www.instagram.com/archmanning/' },
    { name:'Jeremiah Smith', sport:'football', era:'current', role:'Ohio State WR', nil:'$4.2M', nilVal:4.2, igLabel:'@primetimejj_.4 · 792K', igUrl:'https://www.instagram.com/primetimejj_.4/' },
    { name:'AJ Dybantsa', sport:'basketball', era:'current', role:'BYU (Fr.)', nil:'$4.2M', nilVal:4.2, igLabel:'@aj.dybantsa · 943K', igUrl:'https://www.instagram.com/aj.dybantsa/' },
    { name:'Tyran Stokes', sport:'basketball', era:'current', role:'No. 1 HS recruit, 2026', nil:'~$1.5M', nilVal:1.55, nilNote:'est. HS valuation', igLabel:'@_thetyranstokes · 342K', igUrl:'https://www.instagram.com/_thetyranstokes/' },
    { name:'JuJu Watkins', sport:'basketball', era:'current', role:'USC', nil:'$1.0M', nilVal:1.05, igLabel:'@jujubballin · 1.0M', igUrl:'https://www.instagram.com/jujubballin/' },
    { name:'Sam Hurley', sport:'track', era:'current', role:'Texas — jumps', nil:'~$1M', nilVal:1.0, nilNote:'reported NIL earnings', igLabel:'@samhurley · 1.1M', igUrl:'https://www.instagram.com/samhurley/' },
    { name:'McKenna “Mak” Whitham', sport:'soccer', era:'current', role:'Youth / NWSL academy', nil:'Nike deal', nilVal:0.6, nilNote:'youngest-ever Nike NIL', igLabel:"Nike's youngest NIL signee →", igUrl:'https://www.espn.com/soccer/story/_/id/39539772/usa-youth-soccer-whitham-youngest-athlete-sign-nike-nil-deal' },

    // ── Past (graduated / turned pro / retired) ──
    { name:'Bronny James', sport:'basketball', era:'past', role:'USC → NBA Lakers', nil:'$5.9M', nilVal:5.9, nilNote:'peak On3 valuation', igLabel:'@bronny · 7.7M', igUrl:'https://www.instagram.com/bronny/' },
    { name:'Cooper Flagg', sport:'basketball', era:'past', role:'Duke → NBA Mavericks', nil:'$4.8M', nilVal:4.8, nilNote:'peak On3 valuation', igLabel:'924K IG · On3 profile →', igUrl:'https://www.on3.com/rivals/cooper-flagg-152774/nil/' },
    { name:'Shedeur Sanders', sport:'football', era:'past', role:'Colorado → NFL Browns', nil:'$4.7M', nilVal:4.7, nilNote:'peak ~$6.5M (On3)', igLabel:'@shedeursanders · 1.8M', igUrl:'https://www.instagram.com/shedeursanders/' },
    { name:'Livvy Dunne', sport:'gymnastics', era:'past', role:'LSU — retired 2025', nil:'$4.2M', nilVal:4.21, nilNote:'peak On3 valuation', igLabel:'@livvydunne · 5.3M', igUrl:'https://www.instagram.com/livvydunne/' },
    { name:'Caitlin Clark', sport:'basketball', era:'past', role:'Iowa → WNBA Fever', nil:'$3.1M', nilVal:3.11, nilNote:'peak On3 valuation', igLabel:'@caitlinclark22 · 3.6M', igUrl:'https://www.instagram.com/caitlinclark22/' },
    { name:'Travis Hunter', sport:'football', era:'past', role:'Colorado → NFL Jaguars', nil:'$3.1M', nilVal:3.1, nilNote:'peak On3 valuation', igLabel:'Instagram deactivated (2025)', igUrl:null },
    { name:'Caleb Williams', sport:'football', era:'past', role:'USC → NFL Bears', nil:'$2.7M', nilVal:2.7, nilNote:'peak On3 valuation', igLabel:'183K IG — value was on-field', igUrl:null },
    { name:'Angel Reese', sport:'basketball', era:'past', role:'LSU → WNBA Sky', nil:'$1.8M', nilVal:1.8, nilNote:'peak On3 valuation', igLabel:'@angelreese5 · 5.2M', igUrl:'https://www.instagram.com/angelreese5/' },
    { name:'Paige Bueckers', sport:'basketball', era:'past', role:'UConn → WNBA Wings', nil:'$1.5M', nilVal:1.5, nilNote:'peak On3 valuation', igLabel:'@paigebueckers · 3.0M', igUrl:'https://www.instagram.com/paigebueckers/' },
    { name:'Croix Bethune', sport:'soccer', era:'past', role:'Georgia/USC → NWSL', nil:'Top WoSo', nilVal:0.3, nilNote:"top women's-soccer NIL", igLabel:'@croixbethune · 53K', igUrl:'https://www.instagram.com/croixbethune/' },
  ];

  const state = { era:'all', sport:'all' };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  function card(a) {
    const ig = a.igUrl
      ? `<a class="ath-ig" href="${a.igUrl}" target="_blank" rel="noopener">${esc(a.igLabel)}</a>`
      : `<span class="ath-ig ath-ig--off">${esc(a.igLabel)}</span>`;
    return `<article class="ath-card" data-era="${a.era}" data-sport="${a.sport}">
      <div class="ath-card-top"><span class="ath-sport-tag">${esc(cap(a.sport))}</span><span class="ath-era-tag">${a.era==='current'?'Current':'Past'}</span></div>
      <div class="ath-name">${esc(a.name)}</div>
      <div class="ath-role">${esc(a.role)}</div>
      <div class="ath-nil"><span class="ath-nil-val">${esc(a.nil)}</span><span class="ath-nil-lbl">${esc(a.nilNote || 'est. NIL valuation (On3)')}</span></div>
      ${ig}
    </article>`;
  }

  function render() {
    const list = ATHLETES
      .filter(a => (state.era === 'all' || a.era === state.era) && (state.sport === 'all' || a.sport === state.sport))
      .sort((x, y) => y.nilVal - x.nilVal);
    grid.innerHTML = list.map(card).join('');
    if (empty) empty.hidden = list.length > 0;
  }

  document.querySelectorAll('.ath-controls .ath-filter').forEach(group => {
    const key = group.dataset.filter;
    group.addEventListener('click', e => {
      const btn = e.target.closest('.ath-chip');
      if (!btn) return;
      group.querySelectorAll('.ath-chip').forEach(b => b.classList.toggle('is-active', b === btn));
      state[key] = btn.dataset.val;
      render();
    });
  });

  render();
}
document.addEventListener('DOMContentLoaded', initAthleteIndex);
