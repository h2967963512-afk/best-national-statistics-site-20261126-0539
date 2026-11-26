// StatAtlas Japan — small SVG chart builders.
//
// Every chart is drawn as inline SVG from the data passed in: no library, no
// network, no canvas. Each builder returns an SVG string; views.js places the
// result in the page. All charts carry a text summary for screen readers and
// axis labels so the numbers are readable without hovering.

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.ceil(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + 1e-9; v += s) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// A line chart with points, a light grid and labelled axes.
// series: [{year, value}], opts: {width, height, unit, label, color, decimals}
export function lineChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const pad = { l: 56, r: 16, t: 18, b: 34 };
  const values = series.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = opts.floorZero ? 0 : Math.max(0, min - (max - min) * 0.15);
  const hi = max + (max - min) * 0.1;
  const x = (i) => pad.l + (i * (w - pad.l - pad.r)) / (series.length - 1);
  const y = (v) => pad.t + ((hi - v) * (h - pad.t - pad.b)) / (hi - lo);
  const ticks = niceTicks(lo, hi, 4);
  const dec = opts.decimals ?? 1;
  const color = opts.color || '#1f4e79';
  const pts = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${pad.l},${y(lo)} ${pts} ${x(series.length - 1)},${y(lo)}`;
  const last = series[series.length - 1];
  const first = series[0];
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')} from ${first.year} (${first.value}) to ${last.year} (${last.value})" class="chart">
  ${ticks.map((t) => `<line x1="${pad.l}" y1="${y(t)}" x2="${w - pad.r}" y2="${y(t)}" class="grid"/><text x="${pad.l - 8}" y="${y(t) + 4}" text-anchor="end" class="tick">${t.toFixed(dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</text>`).join('\n  ')}
  <polygon points="${area}" fill="${color}" fill-opacity="0.08"/>
  <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  ${series.map((p, i) => `<circle cx="${x(i)}" cy="${y(p.value)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${p.year}: ${p.value.toFixed(dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</title></circle>`).join('\n  ')}
  ${series.map((p, i) => (i % 2 === 0 || i === series.length - 1 ? `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" class="tick">${p.year}</text>` : '')).join('\n  ')}
  <text x="${w - pad.r}" y="${y(last.value) - 10}" text-anchor="end" class="chart-value" fill="${color}">${last.value.toFixed(dec)}${opts.unit ? ' ' + esc(opts.unit) : ''} (${last.year})</text>
</svg>`;
}

// A vertical bar chart. series: [{label, value}], opts: {width, height, unit, color, decimals}
export function barChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 280;
  const pad = { l: 56, r: 16, t: 26, b: 40 };
  const max = Math.max(...series.map((p) => p.value)) || 1;
  const hi = max * 1.12;
  const bw = (w - pad.l - pad.r) / series.length;
  const y = (v) => pad.t + ((hi - v) * (h - pad.t - pad.b)) / hi;
  const ticks = niceTicks(0, hi, 4);
  const dec = opts.decimals ?? 1;
  const color = opts.color || '#2e7d6b';
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}" class="chart">
  ${ticks.map((t) => `<line x1="${pad.l}" y1="${y(t)}" x2="${w - pad.r}" y2="${y(t)}" class="grid"/><text x="${pad.l - 8}" y="${y(t) + 4}" text-anchor="end" class="tick">${t.toFixed(dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</text>`).join('\n  ')}
  ${series.map((p, i) => {
    const bx = pad.l + i * bw + bw * 0.16;
    const bwid = bw * 0.68;
    return `<rect x="${bx.toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${bwid.toFixed(1)}" height="${(h - pad.b - y(p.value)).toFixed(1)}" rx="3" fill="${p.color || color}"><title>${esc(p.label)}: ${p.value.toFixed(dec)}${opts.unit ? ' ' + esc(opts.unit) : ''}</title></rect>
    <text x="${(bx + bwid / 2).toFixed(1)}" y="${(y(p.value) - 6).toFixed(1)}" text-anchor="middle" class="chart-value">${p.value.toFixed(dec)}</text>
    <text x="${(bx + bwid / 2).toFixed(1)}" y="${h - 22}" text-anchor="middle" class="tick">${esc(p.label)}</text>`;
  }).join('\n  ')}
</svg>`;
}

// A donut chart with a centre total. parts: [{label, share, color}]
export function donutChart(parts, opts = {}) {
  const size = opts.size || 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = parts.reduce((s, p) => s + p.share, 0);
  let angle = -Math.PI / 2;
  const arcs = parts.map((p) => {
    const frac = p.share / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${p.color}"><title>${esc(p.label || p.group || p.source || '')}: ${p.share}%</title></path>`;
  }).join('\n  ');
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || 'Donut chart')}" class="chart donut">
  ${arcs}
  <text x="${cx}" y="${cy - 4}" text-anchor="middle" class="donut-centre">${esc(opts.centre || '')}</text>
  <text x="${cx}" y="${cy + 16}" text-anchor="middle" class="donut-sub">${esc(opts.centreSub || '')}</text>
</svg>
${parts.map((p) => `<div class="legend-row"><span class="swatch" style="background:${p.color}"></span><span>${esc(p.label || p.group || p.source || '')}</span><strong>${p.share}%</strong></div>`).join('\n')}`;
}

// A population pyramid: male bars left, female bars right, five-year bands.
export function pyramidChart(bands, opts = {}) {
  const w = opts.width || 640;
  const h = Math.max(300, bands.length * 24 + 60);
  const pad = { l: 8, r: 8, t: 30, b: 30 };
  const mid = w / 2;
  const max = Math.max(...bands.flatMap((b) => [b.male, b.female]));
  const half = (w - pad.l - pad.r) / 2 - 46;
  const rowH = (h - pad.t - pad.b) / bands.length;
  const scale = (v) => (v / max) * half;
  const rows = bands.map((b, i) => {
    const y = pad.t + i * rowH + 3;
    const bh = rowH - 6;
    return `<text x="${mid - 4}" y="${y + bh / 2 + 4}" text-anchor="end" class="tick">${esc(b.band)}</text>
    <rect x="${(mid - 40 - scale(b.male)).toFixed(1)}" y="${y}" width="${scale(b.male).toFixed(1)}" height="${bh}" fill="#1f4e79"><title>Male ${b.band}: ${b.male} million</title></rect>
    <rect x="${(mid + 40).toFixed(1)}" y="${y}" width="${scale(b.female).toFixed(1)}" height="${bh}" fill="#c98a2b"><title>Female ${b.band}: ${b.female} million</title></rect>
    <text x="${(mid - 40 - scale(b.male) - 4).toFixed(1)}" y="${y + bh / 2 + 4}" text-anchor="end" class="tick">${b.male.toFixed(1)}</text>
    <text x="${(mid + 40 + scale(b.female) + 4).toFixed(1)}" y="${y + bh / 2 + 4}" class="tick">${b.female.toFixed(1)}</text>`;
  }).join('\n  ');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Population pyramid, 2024, millions by five-year age band" class="chart">
  <text x="${mid - 40 - half / 2}" y="16" text-anchor="middle" class="chart-label">Male</text>
  <text x="${mid + 40 + half / 2}" y="16" text-anchor="middle" class="chart-label">Female</text>
  <line x1="${mid - 40}" y1="${pad.t - 6}" x2="${mid - 40}" y2="${h - pad.b}" class="axis"/>
  <line x1="${mid + 40}" y1="${pad.t - 6}" x2="${mid + 40}" y2="${h - pad.b}" class="axis"/>
  ${rows}
  <text x="${w / 2}" y="${h - 8}" text-anchor="middle" class="tick">Population in millions, 2024 · Source: UN World Population Prospects</text>
</svg>`;
}

// A tiny sparkline for indicator cards. values: number[]
export function sparkline(values, opts = {}) {
  const w = opts.width || 120;
  const h = opts.height || 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const x = (i) => (i * w) / (values.length - 1);
  const y = (v) => 3 + ((max - v) * (h - 6)) / span;
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const color = opts.color || '#1f4e79';
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" class="spark" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`;
}
