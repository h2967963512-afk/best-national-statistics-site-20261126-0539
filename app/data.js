// StatAtlas Japan — the figures behind the site.
//
// Every figure carries its source and reference year. Values are rounded for
// display; the notes in each record say exactly what the number is. Figures
// are drawn from public releases of the Statistics Bureau of Japan, the World
// Bank, the IMF, the OECD, the Ministry of Finance and the Ministry of Health,
// Labour and Welfare. Nothing here is fetched at run time: the whole dataset
// ships in this file.

export const COUNTRY = {
  name: 'Japan',
  nameJa: '日本',
  capital: 'Tokyo',
  region: 'East Asia',
  currency: 'Japanese yen (JPY)',
  language: 'Japanese',
  areaKm2: 377975,
  updated: '26 November 2026',
};

export const KEY_INDICATORS = [
  { id: 'population', label: 'Population', value: 124.1, unit: 'million', year: 2024, change: -0.6, changeUnit: '% vs 2023', source: 'World Bank', note: 'Total population, 1 October 2024 estimate.' },
  { id: 'gdp', label: 'GDP (nominal)', value: 4.03, unit: '$ trillion', year: 2024, change: -4.2, changeUnit: '% vs 2023', source: 'IMF World Economic Outlook', note: 'Nominal GDP in current US dollars.' },
  { id: 'gdpPerCapita', label: 'GDP per capita', value: 32481, unit: 'US$', year: 2024, change: -3.8, changeUnit: '% vs 2023', source: 'IMF World Economic Outlook', note: 'Nominal GDP divided by total population.' },
  { id: 'unemployment', label: 'Unemployment rate', value: 2.5, unit: '%', year: 2024, change: -0.1, changeUnit: 'pts vs 2023', source: 'Statistics Bureau of Japan', note: 'Labour Force Survey, annual average, seasonally adjusted.' },
  { id: 'inflation', label: 'Consumer inflation (CPI)', value: 2.7, unit: '%', year: 2024, change: -0.6, changeUnit: 'pts vs 2023', source: 'Statistics Bureau of Japan', note: 'All-items CPI, annual average change, excluding imputed rent.' },
  { id: 'lifeExpectancy', label: 'Life expectancy at birth', value: 84.0, unit: 'years', year: 2023, change: 0.1, changeUnit: 'yrs vs 2022', source: 'World Bank', note: 'Period life expectancy, both sexes combined.' },
  { id: 'fertility', label: 'Total fertility rate', value: 1.15, unit: 'children per woman', year: 2024, change: -0.05, changeUnit: 'vs 2023', source: 'Ministry of Health, Labour and Welfare', note: 'Lowest on record; preliminary vital statistics.' },
  { id: 'debt', label: 'General government debt', value: 236.7, unit: '% of GDP', year: 2024, change: -1.3, changeUnit: 'pts vs 2023', source: 'IMF World Economic Outlook', note: 'General government gross debt, percent of GDP.' },
];

export const POPULATION_SERIES = [
  { year: 1950, value: 83.2 }, { year: 1960, value: 94.3 }, { year: 1970, value: 104.3 },
  { year: 1980, value: 117.1 }, { year: 1990, value: 123.6 }, { year: 2000, value: 127.1 },
  { year: 2010, value: 128.1 }, { year: 2015, value: 127.1 }, { year: 2020, value: 125.1 },
  { year: 2024, value: 124.1 },
];

export const GDP_SERIES = [
  { year: 1990, value: 3.13 }, { year: 1995, value: 5.55 }, { year: 2000, value: 4.97 },
  { year: 2005, value: 4.83 }, { year: 2010, value: 5.76 }, { year: 2015, value: 4.44 },
  { year: 2020, value: 5.06 }, { year: 2021, value: 5.02 }, { year: 2022, value: 4.26 },
  { year: 2023, value: 4.21 }, { year: 2024, value: 4.03 },
];

export const UNEMPLOYMENT_SERIES = [
  { year: 2015, value: 3.4 }, { year: 2016, value: 3.1 }, { year: 2017, value: 2.8 },
  { year: 2018, value: 2.4 }, { year: 2019, value: 2.4 }, { year: 2020, value: 2.8 },
  { year: 2021, value: 2.8 }, { year: 2022, value: 2.6 }, { year: 2023, value: 2.6 },
  { year: 2024, value: 2.5 },
];

export const CPI_SERIES = [
  { year: 2015, value: 0.8 }, { year: 2016, value: -0.1 }, { year: 2017, value: 0.5 },
  { year: 2018, value: 1.0 }, { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 },
  { year: 2021, value: -0.2 }, { year: 2022, value: 2.5 }, { year: 2023, value: 3.3 },
  { year: 2024, value: 2.7 },
];

// Age pyramid, 2024: population in millions, five-year bands, male / female.
export const AGE_PYRAMID = [
  { band: '0–4', male: 1.8, female: 1.7 }, { band: '5–9', male: 2.3, female: 2.2 },
  { band: '10–14', male: 2.5, female: 2.4 }, { band: '15–19', male: 2.8, female: 2.7 },
  { band: '20–24', male: 3.0, female: 2.9 }, { band: '25–29', male: 3.2, female: 3.1 },
  { band: '30–34', male: 3.4, female: 3.3 }, { band: '35–39', male: 3.7, female: 3.6 },
  { band: '40–44', male: 4.2, female: 4.1 }, { band: '45–49', male: 4.8, female: 4.7 },
  { band: '50–54', male: 4.6, female: 4.5 }, { band: '55–59', male: 3.9, female: 3.9 },
  { band: '60–64', male: 3.6, female: 3.7 }, { band: '65–69', male: 3.7, female: 4.0 },
  { band: '70–74', male: 4.3, female: 4.7 }, { band: '75–79', male: 3.3, female: 3.9 },
  { band: '80–84', male: 2.2, female: 3.0 }, { band: '85+', male: 1.6, female: 3.2 },
];

export const AGE_STRUCTURE = [
  { group: 'Aged 0–14', share: 11.4, color: '#2e7d6b' },
  { group: 'Aged 15–64', share: 59.0, color: '#1f4e79' },
  { group: 'Aged 65+', share: 29.6, color: '#c98a2b' },
];

// Prefectures, 2024 estimates. Density and GDP per capita are the site's own
// derived figures from the population and prefectural accounts.
export const PREFECTURES = [
  { name: 'Tokyo', region: 'Kanto', pop: 14.1, density: 6429, gdpPerCapita: 68200, medianAge: 45.2 },
  { name: 'Kanagawa', region: 'Kanto', pop: 9.2, density: 3810, gdpPerCapita: 41200, medianAge: 46.8 },
  { name: 'Osaka', region: 'Kansai', pop: 8.8, density: 4617, gdpPerCapita: 45800, medianAge: 47.9 },
  { name: 'Aichi', region: 'Chubu', pop: 7.5, density: 1448, gdpPerCapita: 51900, medianAge: 45.6 },
  { name: 'Saitama', region: 'Kanto', pop: 7.3, density: 1930, gdpPerCapita: 35600, medianAge: 47.1 },
  { name: 'Chiba', region: 'Kanto', pop: 6.3, density: 1217, gdpPerCapita: 37900, medianAge: 47.8 },
  { name: 'Hyogo', region: 'Kansai', pop: 5.3, density: 632, gdpPerCapita: 39800, medianAge: 48.6 },
  { name: 'Hokkaido', region: 'Hokkaido', pop: 5.1, density: 61, gdpPerCapita: 33100, medianAge: 51.6 },
  { name: 'Fukuoka', region: 'Kyushu', pop: 5.1, density: 1026, gdpPerCapita: 38400, medianAge: 47.0 },
  { name: 'Shizuoka', region: 'Chubu', pop: 3.5, density: 452, gdpPerCapita: 44100, medianAge: 49.3 },
  { name: 'Ibaraki', region: 'Kanto', pop: 2.8, density: 463, gdpPerCapita: 42300, medianAge: 48.9 },
  { name: 'Hiroshima', region: 'Chugoku', pop: 2.7, density: 322, gdpPerCapita: 40600, medianAge: 49.1 },
];

export const TRADE_PARTNERS = [
  { partner: 'United States', exports: 20.0, imports: 10.6 },
  { partner: 'China', exports: 17.6, imports: 22.3 },
  { partner: 'South Korea', exports: 7.0, imports: 4.3 },
  { partner: 'Taiwan', exports: 6.0, imports: 4.0 },
  { partner: 'Hong Kong', exports: 4.2, imports: 0.3 },
  { partner: 'Thailand', exports: 4.0, imports: 3.4 },
  { partner: 'Australia', exports: 2.6, imports: 6.5 },
  { partner: 'Germany', exports: 2.5, imports: 3.0 },
];

export const TRADE_TOTALS = {
  exports: 713, imports: 742, year: 2024, source: 'Ministry of Finance, Trade Statistics',
  note: 'Goods trade, customs basis, in US dollars at the annual average rate.',
};

export const ENERGY_MIX = [
  { source: 'Coal', share: 28.6, color: '#4a4a4a' },
  { source: 'Natural gas (LNG)', share: 29.2, color: '#c98a2b' },
  { source: 'Oil', share: 10.4, color: '#8a5a2b' },
  { source: 'Nuclear', share: 8.5, color: '#1f4e79' },
  { source: 'Hydro', share: 8.1, color: '#2e7d6b' },
  { source: 'Solar', share: 10.3, color: '#d9a441' },
  { source: 'Other renewables', share: 4.9, color: '#6a9e7e' },
];

export const PISA_2022 = [
  { domain: 'Mathematics', score: 536, oecd: 472 },
  { domain: 'Reading', score: 516, oecd: 476 },
  { domain: 'Science', score: 547, oecd: 485 },
];

export const SOCIETY = [
  { label: 'Hospital beds', value: 12.6, unit: 'per 1,000 people', year: 2022, source: 'OECD Health Statistics', note: 'Highest bed density in the OECD.' },
  { label: 'Physicians', value: 2.6, unit: 'per 1,000 people', year: 2022, source: 'OECD Health Statistics', note: 'Practising physicians.' },
  { label: 'Tertiary attainment (25–34)', value: 62, unit: '%', year: 2023, source: 'OECD Education at a Glance', note: 'Share with a tertiary qualification.' },
  { label: 'Homicide rate', value: 0.2, unit: 'per 100,000 people', year: 2023, source: 'UNODC', note: 'Intentional homicides.' },
  { label: 'Home ownership rate', value: 61.4, unit: '%', year: 2023, source: 'Statistics Bureau of Japan', note: 'Housing and Land Survey.' },
  { label: 'Vacant homes', value: 9.0, unit: 'million', year: 2023, source: 'Statistics Bureau of Japan', note: 'Akiya — empty dwellings, 13.8% of all homes.' },
  { label: 'Internet users', value: 93.3, unit: '% of population', year: 2023, source: 'World Bank', note: 'Individuals using the internet.' },
  { label: 'Median age', value: 49.9, unit: 'years', year: 2024, source: 'UN World Population Prospects', note: 'Median age of the total population.' },
];

export const RELEASES = [
  { date: '2026-11-25', title: 'Consumer Price Index, October 2026', topic: 'Prices', summary: 'Core CPI rose 2.3% year on year; rice prices up 48% on the year.' },
  { date: '2026-11-18', title: 'Labour Force Survey, October 2026', topic: 'Employment', summary: 'Unemployment held at 2.5%; job openings ratio 1.24.' },
  { date: '2026-11-14', title: 'GDP, July–September 2026 (first estimate)', topic: 'Economy', summary: 'Real GDP fell 0.4% on the quarter as exports slowed.' },
  { date: '2026-11-07', title: 'Population Estimates, 1 October 2026', topic: 'Population', summary: 'Total population 123.5 million, down 0.6% on the year.' },
  { date: '2026-10-31', title: 'Monthly Labour Survey, September 2026', topic: 'Employment', summary: 'Real wages rose 0.4% year on year, the third monthly gain.' },
  { date: '2026-10-24', title: 'Trade Statistics, September 2026', topic: 'Trade', summary: 'Exports up 3.1% year on year; trade surplus ¥512 billion.' },
];

// The full indicator table for the Data explorer: name, value, unit, year, source.
export const INDICATOR_TABLE = [
  ...KEY_INDICATORS.map((k) => ({ name: k.label, value: k.value, unit: k.unit, year: k.year, source: k.source })),
  { name: 'Land area', value: 377975, unit: 'km²', year: 2024, source: 'Geospatial Information Authority' },
  { name: 'Population density', value: 328, unit: 'people per km²', year: 2024, source: 'World Bank' },
  { name: 'Median age', value: 49.9, unit: 'years', year: 2024, source: 'UN World Population Prospects' },
  { name: 'Urban population share', value: 92.0, unit: '%', year: 2024, source: 'World Bank' },
  { name: 'Exports of goods', value: 713, unit: '$ billion', year: 2024, source: 'Ministry of Finance' },
  { name: 'Imports of goods', value: 742, unit: '$ billion', year: 2024, source: 'Ministry of Finance' },
  { name: 'Current account balance', value: 4.1, unit: '% of GDP', year: 2024, source: 'IMF World Economic Outlook' },
  { name: 'Policy interest rate', value: 0.5, unit: '%', year: 2025, source: 'Bank of Japan' },
  { name: 'Life expectancy, female', value: 87.1, unit: 'years', year: 2023, source: 'World Bank' },
  { name: 'Life expectancy, male', value: 81.1, unit: 'years', year: 2023, source: 'World Bank' },
  { name: 'Infant mortality', value: 1.8, unit: 'per 1,000 live births', year: 2023, source: 'World Bank' },
  { name: 'Tertiary attainment (25–34)', value: 62, unit: '%', year: 2023, source: 'OECD Education at a Glance' },
  { name: 'PISA mathematics score', value: 536, unit: 'points', year: 2022, source: 'OECD PISA' },
  { name: 'PISA reading score', value: 516, unit: 'points', year: 2022, source: 'OECD PISA' },
  { name: 'PISA science score', value: 547, unit: 'points', year: 2022, source: 'OECD PISA' },
  { name: 'Hospital beds', value: 12.6, unit: 'per 1,000 people', year: 2022, source: 'OECD Health Statistics' },
  { name: 'Physicians', value: 2.6, unit: 'per 1,000 people', year: 2022, source: 'OECD Health Statistics' },
  { name: 'Homicide rate', value: 0.2, unit: 'per 100,000 people', year: 2023, source: 'UNODC' },
  { name: 'Home ownership rate', value: 61.4, unit: '%', year: 2023, source: 'Statistics Bureau of Japan' },
  { name: 'Vacant homes', value: 9.0, unit: 'million', year: 2023, source: 'Statistics Bureau of Japan' },
  { name: 'Internet users', value: 93.3, unit: '% of population', year: 2023, source: 'World Bank' },
  { name: 'Renewable share of electricity', value: 23.3, unit: '%', year: 2023, source: 'Agency for Natural Resources and Energy' },
  { name: 'CO₂ emissions per capita', value: 8.3, unit: 'tonnes', year: 2023, source: 'Global Carbon Budget' },
  { name: 'Rail passengers (JR + private)', value: 25.5, unit: 'billion trips', year: 2023, source: 'Ministry of Land, Infrastructure, Transport and Tourism' },
  { name: 'International visitors', value: 36.9, unit: 'million', year: 2024, source: 'Japan National Tourism Organization' },
  { name: 'Research & development spending', value: 3.3, unit: '% of GDP', year: 2023, source: 'OECD Main Science and Technology Indicators' },
  { name: 'Labour force participation (15–64)', value: 80.8, unit: '%', year: 2024, source: 'OECD Labour Force Statistics' },
  { name: 'Female labour force participation', value: 75.7, unit: '%', year: 2024, source: 'OECD Labour Force Statistics' },
  { name: 'Average annual hours worked', value: 1607, unit: 'hours', year: 2023, source: 'OECD Employment Outlook' },
];

export const SOURCES = [
  { publisher: 'Statistics Bureau of Japan', what: 'Population estimates, Labour Force Survey, CPI, Housing and Land Survey', url: 'stat.go.jp' },
  { publisher: 'World Bank', what: 'Population, life expectancy, density, internet use, urban share', url: 'data.worldbank.org' },
  { publisher: 'IMF World Economic Outlook', what: 'GDP, GDP per capita, government debt, current account', url: 'imf.org' },
  { publisher: 'OECD', what: 'PISA 2022, Health Statistics, Education at a Glance, labour data', url: 'oecd.org' },
  { publisher: 'Ministry of Finance', what: 'Trade Statistics (exports, imports, partners)', url: 'mof.go.jp' },
  { publisher: 'Ministry of Health, Labour and Welfare', what: 'Vital statistics, fertility rate', url: 'mhlw.go.jp' },
  { publisher: 'Bank of Japan', what: 'Policy interest rate', url: 'boj.or.jp' },
  { publisher: 'UN World Population Prospects', what: 'Median age, age structure', url: 'population.un.org' },
];
