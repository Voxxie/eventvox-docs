// One-off: draws the demo's images (logo, event images, sponsor logos, product photos) as PNG/JPEG with Edge.
const puppeteer = require('puppeteer-core') // npm install in this folder;
const path = require('path');
const out = process.argv[2];

const font = "font-family:'Segoe UI',Arial,sans-serif";
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="200" viewBox="0 0 560 200">
  <circle cx="100" cy="100" r="92" fill="#1f6f78"/>
  <circle cx="100" cy="84" r="20" fill="#f6b93b"/>
  <path d="M30 128 Q100 40 170 128" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
  <path d="M40 150 Q70 138 100 150 T160 150" fill="none" stroke="#bfe3e6" stroke-width="7" stroke-linecap="round"/>
  <text x="212" y="102" style="${font};font-weight:700;font-size:64px" fill="#1f6f78">Vlietdorp</text>
  <text x="214" y="146" style="${font};font-size:34px" fill="#3c4b50">Evenementen</text>
</svg>`;

const scene = (sky1, sky2, ground, extra, front = '') => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient></defs>
  <rect width="1200" height="600" fill="url(#s)"/>${extra}
  <path d="M0 470 Q300 420 600 460 T1200 450 V600 H0Z" fill="${ground}"/>${front}</svg>`;
const tree = (x, y, s, c) => `<rect x="${x - 6 * s}" y="${y}" width="${12 * s}" height="${60 * s}" fill="#5b3b25"/><circle cx="${x}" cy="${y - 10 * s}" r="${45 * s}" fill="${c}"/>`;
const autumn = scene('#f7c59f', '#fbe3c4', '#8a6a3b',
    `<circle cx="930" cy="170" r="70" fill="#f39c3c" opacity=".9"/>
     <path d="M0 430 Q300 380 600 420 T1200 400 V600 H0Z" fill="#b5803e"/>
     ${tree(160, 330, 1.6, '#d35400')}${tree(330, 360, 1.2, '#e67e22')}${tree(820, 350, 1.4, '#c0392b')}${tree(1040, 330, 1.7, '#e1a33b')}`, `<path d="M520 600 Q600 500 640 440" stroke="#e9d3a6" stroke-width="46" fill="none"/>
     <g fill="#3c4b50"><circle cx="600" cy="452" r="9"/><rect x="593" y="462" width="14" height="34" rx="6"/><circle cx="635" cy="440" r="8"/><rect x="629" y="449" width="12" height="30" rx="5"/></g>`);
const xmas = scene('#16324f', '#2e5a87', '#eef3f7',
    `${[...Array(40)].map((_, i) => `<circle cx="${(i * 131) % 1200}" cy="${(i * 71) % 380}" r="${2 + (i % 3)}" fill="#fff" opacity=".8"/>`).join('')}
     <polygon points="600,120 690,330 510,330" fill="#1e7a46"/><polygon points="600,200 720,430 480,430" fill="#1e7a46"/>
     <rect x="585" y="430" width="30" height="40" fill="#5b3b25"/><circle cx="600" cy="115" r="14" fill="#f6d743"/>
     ${[[560, 300, '#e74c3c'], [640, 280, '#f1c40f'], [600, 360, '#e67e22'], [540, 400, '#f1c40f'], [670, 390, '#e74c3c']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="10" fill="${c}"/>`).join('')}
     <g><rect x="140" y="330" width="220" height="140" fill="#b03a2e"/><polygon points="120,330 250,250 380,330" fill="#eef3f7"/>
        <rect x="840" y="340" width="220" height="130" fill="#7d5a3c"/><polygon points="820,340 950,260 1080,340" fill="#eef3f7"/></g>`);
const summer = scene('#7ec8e3', '#d6f0fa', '#5aa64a',
    `<circle cx="180" cy="140" r="70" fill="#ffd34e"/>
     <path d="M0 440 Q300 400 600 430 T1200 420 V600 H0Z" fill="#79c267"/>
     <path d="M0 520 Q400 490 800 520 T1200 510 V600 H0Z" fill="#4a90c2"/>
     ${[[700, '#e74c3c'], [780, '#f1c40f'], [860, '#3498db'], [940, '#9b59b6']].map(([x, c]) => `<polygon points="${x},230 ${x + 40},300 ${x - 40},300" fill="${c}"/>`).join('')}
     <path d="M640 230 Q800 200 980 230" stroke="#555" stroke-width="3" fill="none"/>
     <rect x="760" y="330" width="200" height="110" fill="#fff"/><polygon points="740,330 860,270 980,330" fill="#e74c3c"/>`);

const sponsor = (name, color, shape) => `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 -150 600 600">
  <rect y="-150" width="600" height="600" fill="#fff"/>${shape(color)}
  <text x="300" y="250" text-anchor="middle" style="${font};font-weight:700;font-size:44px" fill="${color}">${name}</text></svg>`;
const sponsors = {
    'sponsor-bakkerij.png': sponsor('Bakkerij Van Dijk', '#a0522d', (c) => `<ellipse cx="300" cy="120" rx="110" ry="60" fill="${c}"/><path d="M220 110 Q300 70 380 110" stroke="#f5deb3" stroke-width="10" fill="none"/>`),
    'sponsor-bloemen.png': sponsor('Bloemenhuis Iris', '#8e44ad', (c) => [0, 72, 144, 216, 288].map((r) => `<ellipse cx="300" cy="80" rx="26" ry="50" fill="${c}" transform="rotate(${r} 300 120)"/>`).join('') + '<circle cx="300" cy="120" r="22" fill="#f1c40f"/>'),
    'sponsor-bouw.png': sponsor('Bouwbedrijf Mulder', '#d35400', (c) => `<polygon points="300,40 410,130 190,130" fill="${c}"/><rect x="215" y="130" width="170" height="70" fill="${c}" opacity=".8"/>`),
    'sponsor-cafe.png': sponsor('Café De Vliet', '#1f6f78', (c) => `<rect x="240" y="60" width="110" height="110" rx="14" fill="${c}"/><path d="M350 90 h30 a25 25 0 0 1 0 50 h-30" stroke="${c}" stroke-width="14" fill="none"/>`),
    'sponsor-fiets.png': sponsor('Fietsenmaker De Spaak', '#27ae60', (c) => `<circle cx="230" cy="130" r="55" stroke="${c}" stroke-width="12" fill="none"/><circle cx="370" cy="130" r="55" stroke="${c}" stroke-width="12" fill="none"/><path d="M230 130 L290 70 L370 130 L300 130 Z" stroke="${c}" stroke-width="10" fill="none"/>`),
};
const medal = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f4f1ea"/>
  <polygon points="300,60 400,330 500,60" fill="#e67e22"/><polygon points="350,60 400,200 450,60" fill="#1f6f78"/>
  <circle cx="400" cy="470" r="200" fill="#d4a017"/><circle cx="400" cy="470" r="160" fill="#f1c40f"/>
  <text x="400" y="500" text-anchor="middle" style="${font};font-weight:700;font-size:90px" fill="#9a7400">4</text></svg>`;
const shirt = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f4f1ea"/>
  <path d="M250 150 L330 110 Q400 170 470 110 L550 150 L680 270 L600 350 L550 310 L550 690 L250 690 L250 310 L200 350 L120 270 Z" fill="#e67e22"/>
  <circle cx="400" cy="380" r="70" fill="#fff"/><path d="M345 410 Q400 330 455 410" stroke="#1f6f78" stroke-width="14" fill="none"/></svg>`;

(async () => {
    const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: 'new' });
    const page = await browser.newPage();
    const shoot = async (svg, w, h, file, opts = {}) => {
        await page.setViewport({ width: w, height: h });
        await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
        await page.screenshot({ path: path.join(out, file), omitBackground: !!opts.transparent, type: file.endsWith('.jpg') ? 'jpeg' : 'png', ...(file.endsWith('.jpg') ? { quality: 85 } : {}) });
        console.log(file);
    };
    await shoot(logo, 560, 200, 'logo-vlietdorp.png', { transparent: true });
    await shoot(autumn, 1200, 600, 'event-herfst.jpg');
    await shoot(xmas, 1200, 600, 'event-kerst.jpg');
    await shoot(summer, 1200, 600, 'event-zomer.jpg');
    for (const [file, svg] of Object.entries(sponsors)) await shoot(svg, 400, 400, file);
    await shoot(medal, 800, 800, 'product-medaille.jpg');
    await shoot(shirt, 800, 800, 'product-shirt.jpg');
    await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
