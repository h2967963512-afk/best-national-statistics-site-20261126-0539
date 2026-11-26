// StatAtlas Japan — the pages.
//
// Each route is a function returning the page's HTML. The numbers come from
// data.js; the charts from charts.js. Every page ends with a source line, and
// every control on a page is wired up by main.js after the page is rendered.

import {
  COUNTRY, KEY_INDICATORS, POPULATION_SERIES, GDP_SERIES, UNEMPLOYMENT_SERIES,
  CPI_SERIES, AGE_PYRAMID, AGE_STRUCTURE, PREFECTURES, TRADE_PARTNERS,
  TRADE_TOTALS, ENERGY_MIX, PISA_2022, SOCIETY, RELEASES, INDICATOR_TABLE, SOURCES,
} from './data.js';
import { lineChart, barChart, donutChart, pyramidChart, sparkline } from './charts.js';

function fmt(n, dec = 1) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function sourceLine(source, year) {
  return `<p class="source">Source: ${source}, ${year}.</p>`;
}

function indicatorCard(k) {
  const up = k.change >= 0;
  const arrow = up ? '▲' : '▼';
  const cls = k.id === 'unemployment' || k.id === 'fertility' ? (up ? 'down' : 'up') : (up ? 'up' : 'down');
  return `<article class="card indicator">
    <h3>${k.label}</h3>
    <p class="big">${fmt(k.value, k.value < 10 ? 2 : 0)} <span class="unit">${k.unit}</span></p>
    <p class="change ${cls}">${arrow} ${up ? '+' : ''}${k.change} ${k.changeUnit}</p>
    <p class="meta">${k.source}, ${k.year}</p>
    <p class="note">${k.note}</p>
  </article>`;
}

function pageHead(title, intro) {
  return `<div class="page-head"><h1>${title}</h1><p class="lede">${intro}</p></div>`;
}

// ---------------------------------------------------------------- overview
export function viewOverview() {
  const cards = KEY_INDICATORS.slice(0, 6).map(indicatorCard).join('\n');
  const popSpark = sparkline(POPULATION_SERIES.map((p) => p.value));
  const gdpSpark = sparkline(GDP_SERIES.map((p) => p.value));
  const releases = RELEASES.slice(0, 4).map((r) => `
    <li><time datetime="${r.date}">${r.date}</time><span class="tag">${r.topic}</span>
    <strong>${r.title}</strong><span>${r.summary}</span></li>`).join('\n');
  return `${pageHead('Japan in numbers', `The latest official statistics for ${COUNTRY.name} — population, the economy, work, prices and society — in one place. Figures are updated as each release lands; every number names its source and year.`)}
  <section class="grid indicators">${cards}</section>
  <section class="grid two">
    <article class="card chart-card">
      <h2>Population is shrinking</h2>
      <p class="card-sub">Total population, millions, 1950–2024 ${popSpark}</p>
      ${lineChart(POPULATION_SERIES, { label: 'Population of Japan, 1950 to 2024', unit: 'm', decimals: 1, color: '#1f4e79' })}
      <p class="card-note">Japan peaked at 128.1 million in 2010 and has fallen every year since. The 2024 fall of 0.6% is the largest on record.</p>
      ${sourceLine('World Bank, World Development Indicators', '2024')}
      <p><a class="btn" href="#/population">Explore population →</a></p>
    </article>
    <article class="card chart-card">
      <h2>The economy in dollars</h2>
      <p class="card-sub">Nominal GDP, $ trillion, 1990–2024 ${gdpSpark}</p>
      ${lineChart(GDP_SERIES, { label: 'Nominal GDP of Japan, 1990 to 2024', unit: '$T', decimals: 2, color: '#2e7d6b' })}
      <p class="card-note">In dollar terms GDP fell in 2024 as the yen weakened — the economy grew 0.1% in real terms, but the dollar figure shrank.</p>
      ${sourceLine('IMF World Economic Outlook', '2024')}
      <p><a class="btn" href="#/economy">Explore the economy →</a></p>
    </article>
  </section>
  <section class="grid two">
    <article class="card">
      <h2>Latest releases</h2>
      <ul class="releases">${releases}</ul>
      <p><a class="btn" href="#/data">Browse all indicators →</a></p>
    </article>
    <article class="card">
      <h2>At a glance</h2>
      <dl class="facts">
        <div><dt>Capital</dt><dd>${COUNTRY.capital}</dd></div>
        <div><dt>Land area</dt><dd>${COUNTRY.areaKm2.toLocaleString('en-US')} km²</dd></div>
        <div><dt>Currency</dt><dd>${COUNTRY.currency}</dd></div>
        <div><dt>Median age</dt><dd>49.9 years (UN, 2024)</dd></div>
        <div><dt>Urban share</dt><dd>92.0% of people live in cities (World Bank, 2024)</dd></div>
        <div><dt>Visitors in 2024</dt><dd>36.9 million international arrivals (JNTO, 2024)</dd></div>
      </dl>
      <p><a class="btn" href="#/regions">Compare prefectures →</a></p>
    </article>
  </section>
  <p class="updated">Last updated ${COUNTRY.updated}. Figures are rounded; see <a href="#/about">Sources &amp; methods</a>.</p>`;
}

// -------------------------------------------------------------- population
export function viewPopulation() {
  const rows = PREFECTURES.slice(0, 6).map((p) => `
    <tr><td>${p.name}</td><td>${p.region}</td><td class="num">${p.pop.toFixed(1)}</td><td class="num">${p.density.toLocaleString('en-US')}</td><td class="num">${p.medianAge.toFixed(1)}</td></tr>`).join('\n');
  return `${pageHead('Population', '124.1 million people (World Bank, 2024), falling by about 0.6% a year — the fastest-shrinking large country on earth, and the oldest: nearly three in ten residents are 65 or over.')}
  <section class="grid two">
    <article class="card chart-card">
      <h2>Seventy-four years of change</h2>
      ${lineChart(POPULATION_SERIES, { label: 'Population of Japan, 1950 to 2024', unit: 'm', decimals: 1, color: '#1f4e79' })}
      <p class="card-note">Post-war growth ran until 2010. Births fell below deaths in 2007 and the gap has widened every year since.</p>
      ${sourceLine('World Bank, World Development Indicators', '2024')}
    </article>
    <article class="card chart-card">
      <h2>Who lives here now</h2>
      ${donutChart(AGE_STRUCTURE, { label: 'Age structure of Japan, 2024', centre: '124.1m', centreSub: 'people, 2024' })}
      <p class="card-note">The 65+ share, 29.6%, is the highest of any country. Children under 15 are 11.4% — the lowest share on record.</p>
      ${sourceLine('UN World Population Prospects', '2024')}
    </article>
  </section>
  <section class="card chart-card">
    <h2>The age pyramid, 2024</h2>
    <p class="card-sub">Population in millions by five-year band. The bulge at 70–74 is the post-war baby boom; the narrow base is the birth dearth.</p>
    ${pyramidChart(AGE_PYRAMID)}
    <p class="card-note">Fertility was 1.15 children per woman in 2024 (MHLW), the lowest ever recorded. Life expectancy is 84.0 years (World Bank, 2023).</p>
  </section>
  <section class="card">
    <h2>Largest prefectures</h2>
    <p class="card-sub">One in nine Japanese residents lives in Tokyo. The table is sorted by population; the full sortable table is on the <a href="#/regions">Regions</a> page.</p>
    <div class="table-wrap"><table>
      <thead><tr><th>Prefecture</th><th>Region</th><th class="num">Population (m)</th><th class="num">Density (per km²)</th><th class="num">Median age</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    ${sourceLine('Statistics Bureau of Japan, population estimates', '2024')}
  </section>`;
}

// ----------------------------------------------------------------- economy
export function viewEconomy(gdpRange = 'all') {
  const series = gdpRange === 'recent' ? GDP_SERIES.filter((p) => p.year >= 2010) : GDP_SERIES;
  const tradeRows = TRADE_PARTNERS.map((t) => `
    <tr><td>${t.partner}</td><td class="num">${t.exports.toFixed(1)}%</td><td class="num">${t.imports.toFixed(1)}%</td></tr>`).join('\n');
  return `${pageHead('Economy', 'The world’s fourth-largest economy: $4.03 trillion of GDP in 2024 (IMF), unemployment at 2.5% and inflation back to 2.7% after the 2023 spike.')}
  <section class="grid three">
    ${indicatorCard(KEY_INDICATORS[1])}
    ${indicatorCard(KEY_INDICATORS[3])}
    ${indicatorCard(KEY_INDICATORS[4])}
  </section>
  <section class="card chart-card">
    <h2>Nominal GDP, 1990–2024</h2>
    <div class="range" role="group" aria-label="Chart range">
      <button type="button" data-range="all" class="${gdpRange === 'all' ? 'active' : ''}">1990–2024</button>
      <button type="button" data-range="recent" class="${gdpRange === 'recent' ? 'active' : ''}">2010–2024</button>
    </div>
    ${lineChart(series, { label: 'Nominal GDP of Japan', unit: '$T', decimals: 2, color: '#2e7d6b' })}
    <p class="card-note">The 1995 peak of $5.55 trillion has never been matched in dollar terms. In yen, the economy is far larger than it was in 1990 — the dollar series moves with the exchange rate.</p>
    ${sourceLine('IMF World Economic Outlook', '2024')}
  </section>
  <section class="grid two">
    <article class="card chart-card">
      <h2>Jobs: unemployment</h2>
      ${barChart(UNEMPLOYMENT_SERIES.slice(-8), { label: 'Unemployment rate, 2017 to 2024', unit: '%', decimals: 1, color: '#1f4e79' })}
      <p class="card-note">Unemployment has stayed under 3% since 2017. The labour force is 69.3 million; participation of 15–64 year olds is 80.8% (OECD, 2024).</p>
      ${sourceLine('Statistics Bureau of Japan, Labour Force Survey', '2024')}
    </article>
    <article class="card chart-card">
      <h2>Prices: consumer inflation</h2>
      ${barChart(CPI_SERIES.slice(-8), { label: 'Consumer price inflation, 2017 to 2024', unit: '%', decimals: 1, color: '#c98a2b' })}
      <p class="card-note">After decades near zero, prices jumped in 2022–2023 on energy and food. The Bank of Japan raised its policy rate to 0.5% in 2025.</p>
      ${sourceLine('Statistics Bureau of Japan, CPI', '2024')}
    </article>
  </section>
  <section class="grid two">
    <article class="card">
      <h2>Trade in 2024</h2>
      <p class="card-sub">Exports $${TRADE_TOTALS.exports}bn · Imports $${TRADE_TOTALS.imports}bn · Deficit $29bn</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Partner</th><th class="num">Share of exports</th><th class="num">Share of imports</th></tr></thead>
        <tbody>${tradeRows}</tbody>
      </table></div>
      ${sourceLine(TRADE_TOTALS.source, String(TRADE_TOTALS.year))}
      <p class="card-note">${TRADE_TOTALS.note}</p>
    </article>
    <article class="card chart-card">
      <h2>Where the electricity comes from</h2>
      ${donutChart(ENERGY_MIX, { label: 'Electricity generation mix, 2023', centre: '1,013 TWh', centreSub: 'generated, 2023' })}
      ${sourceLine('Agency for Natural Resources and Energy', '2023')}
    </article>
  </section>`;
}

// ------------------------------------------------------------------ society
export function viewSociety() {
  const pisa = barChart(
    PISA_2022.map((p) => ({ label: p.domain, value: p.score })),
    { label: 'PISA 2022 scores, Japan vs OECD average', decimals: 0, color: '#1f4e79' },
  );
  const rows = SOCIETY.map((s) => `
    <tr><td>${s.label}</td><td class="num">${s.value}</td><td>${s.unit}</td><td class="num">${s.year}</td><td>${s.source}</td></tr>`).join('\n');
  return `${pageHead('Society', 'Long lives, strong schools, safe streets — and 9 million empty homes. How Japan lives, learns and stays healthy.')}
  <section class="grid two">
    <article class="card chart-card">
      <h2>School results lead the world</h2>
      ${pisa}
      <p class="card-note">Japan scored 536 in mathematics, 516 in reading and 547 in science in PISA 2022 — well above the OECD averages of 472, 476 and 485. Tertiary attainment for 25–34 year olds is 62% (OECD, 2023).</p>
      ${sourceLine('OECD PISA 2022', '2022')}
    </article>
    <article class="card">
      <h2>Health</h2>
      <dl class="facts">
        <div><dt>Life expectancy</dt><dd>84.0 years (World Bank, 2023)</dd></div>
        <div><dt>Women / men</dt><dd>87.1 / 81.1 years (World Bank, 2023)</dd></div>
        <div><dt>Infant mortality</dt><dd>1.8 per 1,000 live births (World Bank, 2023)</dd></div>
        <div><dt>Hospital beds</dt><dd>12.6 per 1,000 people — the most in the OECD (2022)</dd></div>
        <div><dt>Physicians</dt><dd>2.6 per 1,000 people (OECD, 2022)</dd></div>
      </dl>
      <p class="card-note">Universal health insurance has covered every resident since 1961; patients pay 30% of costs at the point of care, capped by income.</p>
    </article>
  </section>
  <section class="card">
    <h2>Society in figures</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Indicator</th><th class="num">Value</th><th>Unit</th><th class="num">Year</th><th>Source</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="card-note">The 9.0 million vacant homes (akiya) are 13.8% of the housing stock — a direct consequence of a shrinking population and an ageing one.</p>
  </section>`;
}

// ------------------------------------------------------------------ regions
export function viewRegions() {
  const regions = [...new Set(PREFECTURES.map((p) => p.region))];
  return `${pageHead('Regions', 'All 12 largest prefectures, side by side. Search by name, filter by region, or sort any column — Tokyo alone holds 14.1 million people, more than the bottom five combined.')}
  <section class="card">
    <div class="controls">
      <label class="search">Search prefectures
        <input id="region-search" type="search" placeholder="Type a name, e.g. Osaka…" autocomplete="off">
      </label>
      <div class="chips" role="group" aria-label="Filter by region">
        <button type="button" data-region="all" class="active">All regions</button>
        ${regions.map((r) => `<button type="button" data-region="${r}">${r}</button>`).join('\n')}
      </div>
    </div>
    <div class="table-wrap"><table id="region-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Prefecture ↕</button></th>
        <th><button type="button" data-sort="region">Region ↕</button></th>
        <th class="num"><button type="button" data-sort="pop">Population (m) ↕</button></th>
        <th class="num"><button type="button" data-sort="density">Density ↕</button></th>
        <th class="num"><button type="button" data-sort="gdpPerCapita">GDP per capita ($) ↕</button></th>
        <th class="num"><button type="button" data-sort="medianAge">Median age ↕</button></th>
      </tr></thead>
      <tbody id="region-body"></tbody>
    </table></div>
    <p class="card-note" id="region-count"></p>
    ${sourceLine('Statistics Bureau of Japan, population estimates; prefectural accounts', '2024')}
  </section>
  <section class="card chart-card">
    <h2>Population of the largest prefectures</h2>
    ${barChart(PREFECTURES.slice(0, 8).map((p) => ({ label: p.name, value: p.pop })), { label: 'Population by prefecture, millions, 2024', unit: 'm', decimals: 1, color: '#1f4e79' })}
    <p class="card-note">The greater Tokyo area (Tokyo, Kanagawa, Saitama, Chiba) holds 37.0 million people — almost 30% of the country on 3.6% of its land.</p>
  </section>`;
}

// --------------------------------------------------------------------- data
export function viewData() {
  return `${pageHead('Data explorer', `Every indicator on this site in one searchable table — ${INDICATOR_TABLE.length} figures, each with its year and source. Search, sort, or download the whole set as a CSV file.`)}
  <section class="card">
    <div class="controls">
      <label class="search">Search indicators
        <input id="data-search" type="search" placeholder="Try “fertility”, “GDP”, “PISA”… " autocomplete="off">
      </label>
      <button type="button" id="download-csv" class="btn">Download CSV (${INDICATOR_TABLE.length} rows)</button>
    </div>
    <div class="table-wrap"><table id="data-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Indicator ↕</button></th>
        <th class="num"><button type="button" data-sort="value">Value ↕</button></th>
        <th>Unit</th>
        <th class="num"><button type="button" data-sort="year">Year ↕</button></th>
        <th><button type="button" data-sort="source">Source ↕</button></th>
      </tr></thead>
      <tbody id="data-body"></tbody>
    </table></div>
    <p class="card-note" id="data-count"></p>
  </section>
  <section class="card">
    <h2>Using these figures</h2>
    <p>All figures are rounded for display; the underlying series are exact as published. Values in US dollars use the source’s own conversion. To cite a figure, name the indicator, its year and its source — for example, “Population 124.1 million, World Bank, 2024”. The full source list is on the <a href="#/about">About</a> page.</p>
  </section>`;
}

// -------------------------------------------------------------------- about
export function viewAbout() {
  const list = SOURCES.map((s) => `
    <tr><td>${s.publisher}</td><td>${s.what}</td><td>${s.url}</td></tr>`).join('\n');
  return `${pageHead('About StatAtlas', 'StatAtlas is an independent statistics portal. It is not affiliated with the Statistics Bureau of Japan or any government body. It gathers the public figures people actually look up — population, the economy, work, prices, schools and health — and presents each one with its source and year, so you can check it and use it.')}
  <section class="grid two">
    <article class="card">
      <h2>How the numbers are chosen</h2>
      <p>Each figure is the latest value from the publisher’s headline release: the World Bank’s World Development Indicators for population and life expectancy, the IMF’s World Economic Outlook for GDP and debt, the Statistics Bureau’s Labour Force Survey and CPI for work and prices, and the OECD for schools and health. Where a publisher revises a series, the figure shown is the latest vintage.</p>
      <p>Values are rounded to the precision shown — population to one decimal place in millions, money to two decimals in trillions — and the rounding never changes the story. Prefecture GDP per capita is derived from prefectural accounts and population estimates.</p>
    </article>
    <article class="card">
      <h2>What this site does not do</h2>
      <p>It makes no forecast and takes no position: there are no projections here, only published figures. It does not collect any data about you — there is no account, no tracker and nothing is sent anywhere; the whole site runs from its own files and works with the network off.</p>
      <p>Figures for 2026 releases are shown in the <a href="#/">Latest releases</a> list as they land. If a number looks wrong, check the named source: the source and year beside every figure are the fastest way to verify it.</p>
    </article>
  </section>
  <section class="card">
    <h2>Sources</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Publisher</th><th>What we take from them</th><th>Site</th></tr></thead>
      <tbody>${list}</tbody>
    </table></div>
    <p class="card-note">StatAtlas Japan · Last updated ${COUNTRY.updated} · Figures are public statistics; the design, text and charts on this site are original.</p>
  </section>`;
}

export const ROUTES = {
  '/': { title: 'Japan in numbers', view: viewOverview },
  '/population': { title: 'Population', view: viewPopulation },
  '/economy': { title: 'Economy', view: viewEconomy },
  '/society': { title: 'Society', view: viewSociety },
  '/regions': { title: 'Regions', view: viewRegions },
  '/data': { title: 'Data explorer', view: viewData },
  '/about': { title: 'About', view: viewAbout },
};
