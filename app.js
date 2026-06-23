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
    'Youth athletes measuring success by social media presence',
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
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 8 }
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
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '700' } }
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
    'Travel baseball (high end)',
    'Survey maximum (2024 Aspen data)',
  ];
  const data = [1016, 2000, 2583, 15000, 25000];
  const sourceLabels = [
    'Aspen Institute, Feb 2025',
    'Kiplinger / Project Play',
    'Empower, Jun 2025',
    'Baseball Mode / Beyond the Dugout',
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
          afterFit(scale) { scale.width = Math.max(scale.width, 250); },
          grid: { display: false },
          ticks: { color: '#8B9BB4', font: { size: 12, weight: '500' }, padding: 10 }
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

  // Sources: Opendorse NIL at 1 (2021-22), NIL at 3 (2023-24, 2024-25), NIL at 4 July 2025 (2025-26)
  // 2028-29 trajectory from Opendorse NIL at 4 report
  const actualData  = [917, 1170, 1670, 2750, null];
  const projData    = [null, null, null, 2750, 3150];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2021–22\n(Actual)', '2023–24\n(Confirmed)', '2024–25\n(Confirmed)', '2025–26\n(Opendorse)', '~2028–29\n(Projected)'],
      datasets: [
        {
          label: 'Confirmed Data',
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
          label: 'Projected',
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
          min: 0, max: 3500,
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
          ticks: { color: '#8B9BB4', font: { size: 11, weight: '500' }, padding: 8 }
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
   BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initFadeIns();
  initNavScroll();
  initSmoothScroll();
  initCopyButtons();

  setTimeout(() => {
    initSocialChart();
    initCreatorEconomyChart();
    initSportCostChart();
    initCostBreakdownChart();
    initCostLadderChart();
    initNILMarketChart();
    initNILDealsChart();
  }, 100);
});
