// StatAtlas Japan — the app shell.
//
// A hash router: each route renders its view into #app, then wires up that
// page's controls (search boxes, sort buttons, region filters, the GDP range
// switch, the CSV download). Everything runs from the site's own files.

import { ROUTES } from './views.js';
import { PREFECTURES, INDICATOR_TABLE } from './data.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  const { title, view } = ROUTES[route];
  document.title = `${title} — StatAtlas Japan`;
  app.innerHTML = view();
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    const on = href === `#${route}`;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  if (route === '/economy') wireEconomy();
  if (route === '/regions') wireRegions();
  if (route === '/data') wireData();
}

// ------------------------------------------------------------- economy page
let gdpRange = 'all';
function wireEconomy() {
  app.querySelectorAll('[data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      gdpRange = btn.dataset.range;
      const { view } = ROUTES['/economy'];
      app.innerHTML = view(gdpRange);
      wireEconomy();
    });
  });
}

// ------------------------------------------------------------- regions page
let regionFilter = 'all';
let regionQuery = '';
let regionSort = { key: 'pop', dir: -1 };

function regionRows() {
  let rows = PREFECTURES.filter((p) => (regionFilter === 'all' || p.region === regionFilter)
    && p.name.toLowerCase().includes(regionQuery));
  rows = [...rows].sort((a, b) => {
    const av = a[regionSort.key];
    const bv = b[regionSort.key];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return cmp * regionSort.dir;
  });
  return rows;
}

function paintRegions() {
  const body = document.getElementById('region-body');
  const count = document.getElementById('region-count');
  if (!body) return;
  const rows = regionRows();
  body.innerHTML = rows.map((p) => `
    <tr><td>${p.name}</td><td>${p.region}</td><td class="num">${p.pop.toFixed(1)}</td>
    <td class="num">${p.density.toLocaleString('en-US')}</td>
    <td class="num">${p.gdpPerCapita.toLocaleString('en-US')}</td>
    <td class="num">${p.medianAge.toFixed(1)}</td></tr>`).join('')
    || '<tr><td colspan="6">No prefecture matches that search.</td></tr>';
  count.textContent = `Showing ${rows.length} of ${PREFECTURES.length} prefectures.`;
}

function wireRegions() {
  const search = document.getElementById('region-search');
  search.addEventListener('input', () => {
    regionQuery = search.value.trim().toLowerCase();
    paintRegions();
  });
  app.querySelectorAll('[data-region]').forEach((btn) => {
    btn.addEventListener('click', () => {
      regionFilter = btn.dataset.region;
      app.querySelectorAll('[data-region]').forEach((b) => b.classList.toggle('active', b === btn));
      paintRegions();
    });
  });
  app.querySelectorAll('#region-table [data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (regionSort.key === key) regionSort.dir *= -1;
      else regionSort = { key, dir: key === 'name' || key === 'region' ? 1 : -1 };
      paintRegions();
    });
  });
  paintRegions();
}

// ---------------------------------------------------------------- data page
let dataQuery = '';
let dataSort = { key: 'name', dir: 1 };

function dataRows() {
  let rows = INDICATOR_TABLE.filter((r) => (r.name + ' ' + r.source + ' ' + r.unit)
    .toLowerCase().includes(dataQuery));
  return [...rows].sort((a, b) => {
    const av = a[dataSort.key];
    const bv = b[dataSort.key];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return cmp * dataSort.dir;
  });
}

function paintData() {
  const body = document.getElementById('data-body');
  const count = document.getElementById('data-count');
  if (!body) return;
  const rows = dataRows();
  body.innerHTML = rows.map((r) => `
    <tr><td>${r.name}</td><td class="num">${Number(r.value).toLocaleString('en-US')}</td>
    <td>${r.unit}</td><td class="num">${r.year}</td><td>${r.source}</td></tr>`).join('')
    || '<tr><td colspan="5">No indicator matches that search.</td></tr>';
  count.textContent = `Showing ${rows.length} of ${INDICATOR_TABLE.length} indicators.`;
}

function downloadCsv() {
  const header = 'Indicator,Value,Unit,Year,Source';
  const lines = INDICATOR_TABLE.map((r) => [r.name, r.value, r.unit, r.year, r.source]
    .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
  const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'statatlas-japan-indicators.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function wireData() {
  document.getElementById('data-search').addEventListener('input', (e) => {
    dataQuery = e.target.value.trim().toLowerCase();
    paintData();
  });
  app.querySelectorAll('#data-table [data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (dataSort.key === key) dataSort.dir *= -1;
      else dataSort = { key, dir: 1 };
      paintData();
    });
  });
  document.getElementById('download-csv').addEventListener('click', downloadCsv);
  paintData();
}

window.addEventListener('hashchange', render);
render();
