// Makes the manual's screenshots (assets/images/*.png) from the local demo (seed.js), with headless Edge.
//   node capture.js                  all screenshots
//   node capture.js events order     only these (file names without .png)
//   node capture.js --out <dir> ...  write somewhere else (to compare first)
// Every screenshot: file name, address, what to do before the photo, viewport and optionally a crop (an element).
'use strict';
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const APP = process.env.EVX_APP || 'http://localhost:8099';
const EDGE = process.env.EVX_BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PASSWORD = 'Vlietdorp!2026';
const SANNE = 'sanne';
const JULIA = 'julia.deboer@vlietdorp.example';
const LUCAS = 'lucas.bakker@vlietdorp.example';
const demo = JSON.parse(fs.readFileSync(path.join(__dirname, 'demo.json'), 'utf8'));
const T = demo.tenant_uuid;

const args = process.argv.slice(2);
let out = path.resolve(__dirname, '../../assets/images');
if (args[0] === '--out') { out = path.resolve(args[1]); args.splice(0, 2); }
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// --- Helpers used by the steps ----------------------------------------------------------------------------------
const click = async (page, selector) => { await page.waitForSelector(selector, { visible: true }); await page.click(selector); };
const clickText = async (page, selector, text) => {
    await page.waitForFunction((s, t) => [...document.querySelectorAll(s)].some((e) => e.textContent.includes(t) && e.offsetParent), {}, selector, text);
    await page.evaluate((s, t) => [...document.querySelectorAll(s)].find((e) => e.textContent.includes(t) && e.offsetParent).click(), selector, text);
};
// The terminals were paired by seed.js: a heartbeat now makes them online
const heartbeats = () => Promise.all((demo.terminalTokens || []).map((token) => fetch(`${process.env.EVX_API || 'http://localhost:8090'}/terminal/heartbeat`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ version: '1.4.2', queue: 0 }),
})));

// Each entry: name, url (relative to the app; ?t= is added), who (sanne, julia, lucas: shop), before(page), viewport,
// fullPage, element (crop: a selector), size (the final PNG size when the crop differs, e.g. a scaled modal)
const D = demo;
const firstOrder = () => D.orders[0].uuid;
const cardWith = (text) => async (page) => page.evaluate((t) => {
    const card = [...document.querySelectorAll('.card')].find((c) => c.querySelector('.card-header, .card-title, h2, h3')?.textContent.includes(t));
    if (card) card.setAttribute('data-shot', '1');
}, text);
// A card cropped to its first n list items (a phone screenshot longer than the screen would show the sticky top bar)
const firstItems = (title, n) => async (page) => {
    await cardWith(title)(page);
    await page.evaluate((k) => document.querySelectorAll('[data-shot] .list-group > li').forEach((li, i) => { if (i >= k) li.remove(); }), n);
};
const SHOTS = [
    // Aan de slag
    { name: 'dashboard', url: '', viewport: { width: 1280, height: 1460 } },
    { name: 'dashboard-pickup', url: '', element: '[data-shot]', before: cardWith('Pick-Up deze week') },
    // A favourite page: the star is yellow and the group Favorieten opens by itself
    { name: 'favorites', url: 'checkpoints' },
    { name: 'profile', url: 'profile' },
    // Evenementen en tickets
    { name: 'events', url: 'events' },
    { name: 'event-new', url: 'event' },
    { name: 'event', url: () => `event?uuid=${D.events.walk}` },
    { name: 'tickets', url: () => `tickets?event_uuid=${D.events.walk}` },
    // Deelnemers en bestellingen
    { name: 'participants', url: 'participants' },
    { name: 'participant', url: () => `participant?uuid=${D.buyerParticipants[0][0]}` },
    { name: 'orders', url: 'orders' },
    { name: 'order', url: () => `order?uuid=${firstOrder()}` },
    { name: 'pos', url: 'pos', before: async (p) => {
        await p.type('[data-customer-search]', 'Anouk Smits');
        await click(p, '[data-pick="0"]');
        await wait(800);
        await click(p, `[data-add-ticket="${D.types.w10}"]`);
        await wait(300);
        await click(p, `[data-add-ticket="${D.types.w5}"]`);
        await wait(300);
        // The first ticket for the customer, the second for someone else (with a name)
        await (await p.$$('[data-line-participant]'))[0].select('self');
        await wait(200);
        const second = (await p.$$('[data-line-participant]'))[1];
        await second.select(await second.$$eval('option', (o) => o.find((x) => /Iemand anders/.test(x.textContent)).value));
        await wait(200);
        await p.click('[data-line-first]', { clickCount: 3 });
        await p.type('[data-line-first]', 'Daan');
        await p.click('[data-line-last]', { clickCount: 3 });
        await p.type('[data-line-last]', 'Smits');
        await click(p, `[data-add-product="${D.products.medal}"]`);
        await click(p, `[data-add-product="${D.products.medal}"]`);
        await click(p, '[data-method="cash"]');
        await p.type('[data-received]', '20');
        await p.evaluate(() => { document.activeElement.blur(); window.scrollTo(0, 0); });
    } },
    // Toegang en scannen
    { name: 'checkpoints', url: 'checkpoints' },
    // Scrolled so the progress per day (Voortgang) is in the picture
    { name: 'checkpoint', url: () => `checkpoint?uuid=${D.checkpoints.start}`, before: async (p) => p.evaluate(() => {
        const card = [...document.querySelectorAll('.card')].find((x) => /Voortgang/.test(x.querySelector('.card-header')?.textContent || ''));
        if (card) window.scrollBy(0, card.getBoundingClientRect().top - 330);
    }) },
    { name: 'scan', url: () => `scan?checkpoint=${D.checkpoints.start}` },
    { name: 'tags', url: 'tags' },
    { name: 'terminals', url: 'terminals', before: async (p) => { await heartbeats(); await p.reload({ waitUntil: 'networkidle0' }); } },
    // Vrijwilligers en roosters
    { name: 'employees', url: 'employees' },
    { name: 'employee', url: () => `employee?uuid=${D.employees['wout.meijer@vlietdorp.example']}` },
    { name: 'employee-settings', url: 'employees', scale: 2, element: '.modal.show .modal-content', before: async (p) => { await click(p, '[data-page-action="settings"]'); await p.waitForSelector('.modal.show'); await wait(600);
        // 500 x 500 (1000 x 1000 at scale 2), as the picture always was
        await p.$eval('.modal.show .modal-content', (e) => { e.style.minHeight = '500px'; });
    } },
    { name: 'employee-applications', url: 'employee-applications' },
    { name: 'schedule-tasks', url: 'schedule-tasks' },
    { name: 'schedules', url: 'schedules' },
    { name: 'schedule', url: () => `schedule?uuid=${D.schedules.walk}` },
    // The roster form: services as a table with search, groups, take over from another roster, needed per time slot
    { name: 'schedule-form', url: () => `schedule?uuid=${D.schedules.walk}`, element: '.modal.show .modal-content', before: async (p) => {
        await click(p, '[data-edit]');
        await p.waitForSelector('.modal.show [data-task-fieldset]');
        await wait(600);
    } },
    // A whole roster copied to next year's event: the shift in days and where the first time slot lands
    { name: 'schedule-copy', url: () => `schedule?uuid=${D.schedules.walk}`, element: '.modal.show .modal-content', before: async (p) => {
        await click(p, '[data-copy]');
        await p.waitForSelector('.modal.show #cp-event');
        await p.select('.modal.show #cp-event', D.events.summer);
        await wait(600);
    } },
    // The dienstenplanner with a time slot chosen: who can still come first
    { name: 'schedule-planner', url: () => `schedule?uuid=${D.schedules.walk}&mode=plan&view=tasks`, viewport: { width: 1280, height: 900 }, before: async (p) => {
        await click(p, '.schedule-planner .sp-cell');
        await p.waitForSelector('[data-planner-list] [data-assign]');
        await wait(400);
    } },
    // Diensten ruilen: the open offers above the roster, one by the volunteer, one by the planner
    { name: 'schedule-swaps', url: () => `schedule?uuid=${D.schedules.xmas}`, element: '[data-swaps-card]' },
    { name: 'checklists', url: 'checklists' },
    { name: 'checklist', url: () => `checklist?uuid=${D.checklist}` },
    { name: 'survey', url: () => `survey?uuid=${D.survey}` },
    // Pick-Up
    { name: 'pickups', url: 'pickups' },
    { name: 'pickup', url: () => `pickup?uuid=${D.slots.pickup[0]}`, before: async () => wait(2500) },
    // The same round on a phone: the addresses as cards with big status buttons
    { name: 'pickup-phone', url: () => `pickup?uuid=${D.slots.pickup[0]}`, viewport: { width: 390, height: 844 }, element: '[data-shot]', before: firstItems('Adressen', 3) },
    // Pick-Up -> Instellingen: the sign-up form and where the route starts
    { name: 'pickup-settings', url: 'pickups', viewport: { width: 1280, height: 1500 }, element: '.modal.show .modal-content', before: async (p) => {
        await clickText(p, 'button', 'Instellingen');
        await p.waitForSelector('.modal.show #pu-route-street');
        await wait(1200);
    } },
    { name: 'report-pickups', url: 'reports-pickups', viewport: { width: 1280, height: 1100 } },
    // Verkoop en webshop
    { name: 'webshop', url: 'webshop' },
    { name: 'products', url: 'products' },
    { name: 'product-pickups', url: 'product-pickups' },
    { name: 'subscription', url: () => `subscription?uuid=${D.subscription}` },
    // Communicatie
    { name: 'mailings', url: 'mailings' },
    { name: 'mailboxes', url: 'mailboxes' },
    { name: 'news', url: 'news' },
    { name: 'notification-templates', url: 'notification-templates' },
    // Sponsoring
    { name: 'sponsors', url: 'sponsors' },
    { name: 'sponsor', url: () => `sponsor?uuid=${D.sponsors['Café De Vliet']}` },
    { name: 'screens', url: 'screens' },
    // Rapportages
    { name: 'report-sales', url: 'reports-sales?event_uuid=all' },
    { name: 'report-activity', url: 'reports-activity' },
    { name: 'report-scans', url: () => `reports-scans?checkpoint_uuid=${D.checkpoints.start}` },
    { name: 'report-volunteers', url: 'reports-volunteers' },
    // Per volunteer: shifts this year and in all, the last and the next one
    { name: 'report-volunteers-people', url: 'reports-volunteers', viewport: { width: 1280, height: 2400 }, element: '[data-people] .card' },
    // Organisatie
    { name: 'users', url: 'users' },
    { name: 'roles', url: 'roles' },
    { name: 'phonebook', url: 'phonebook' },
    { name: 'mcp', url: 'api-tokens', element: '[data-shot]', before: cardWith('AI-koppeling') },
    // The dialog over the page (on a wide screen), cut out at 500 x 744
    { name: 'tenant-logo', url: 'tenants', viewport: { width: 1280, height: 744 }, clip: async (p) => {
        const box = await (await p.$('.modal.show .modal-dialog')).boundingBox();
        return { x: Math.round(box.x + box.width / 2 - 250), y: 0, width: 500, height: 744 };
    }, before: async (p) => {
        await clickText(p, 'button, a', 'Bewerken');
        await p.waitForSelector('.modal.show');
        await wait(600);
    } },
    // Voor vrijwilligers (Julia)
    { name: 'vrijw-my-schedule', who: 'julia', url: 'my-schedule' },
    // Julia's Pick-Up round on her phone: the address cards
    { name: 'vrijw-pickup', who: 'julia', url: () => `my-schedule?shift=${D.slots.pickup[0]}`, viewport: { width: 390, height: 844 }, element: '[data-shot]', before: firstItems('Adressen', 3) },
    { name: 'vrijw-availability', who: 'julia', url: 'availability' },
    // Diensten ruilen on Julia's phone: what colleagues offer, and her own shift with "Dienst aanbieden"
    { name: 'vrijw-swap-offers', who: 'julia', url: 'my-schedule', viewport: { width: 390, height: 844 }, element: '[data-offers]' },
    { name: 'vrijw-swap-offer', who: 'julia', url: () => `my-schedule?shift=${D.slots.xmas[0]}`, viewport: { width: 390, height: 844 } },
    // De webshop (Lucas, een koper)
    { name: 'shop-overview', who: 'lucas', url: '' },
    { name: 'shop-buy', who: 'lucas', url: 'buy' },
    { name: 'shop-volunteer', who: 'lucas', url: 'volunteer' },
];

// --- Running ---------------------------------------------------------------------------------------------------
async function settle(page) {
    await page.waitForNetworkIdle({ idleTime: 400, timeout: 20000 }).catch(() => {});
    // No spinners or "Laden..." left, no toasts in the picture
    await page.waitForFunction(() => !document.querySelector('.spinner-border, .placeholder-glow') && !/Laden…|Laden\.\.\./.test(document.body.innerText), { timeout: 15000 }).catch(() => console.log('  (nog aan het laden?)'));
    await page.evaluate(() => { document.querySelectorAll('.toast, .toast-container').forEach((e) => e.remove()); document.activeElement?.blur(); });
    await wait(300);
}

async function loginAdmin(context, username) {
    const page = await context.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(`${APP}/login`, { waitUntil: 'networkidle0' });
    await page.type('input[autocomplete=username]', username);
    await page.type('input[type=password]', PASSWORD);
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}), page.keyboard.press('Enter')]);
    await wait(1000);
    return page;
}

async function loginShop(context, email) {
    const page = await context.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(`${APP}/shop/login?t=${T}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#s-email');
    await page.type('#s-email', email);
    await page.type('#s-pass', PASSWORD);
    await page.$eval('[data-form] [type=submit]', (b) => b.click());
    await wait(2000);
    return page;
}

(async () => {
    const browser = await puppeteer.launch({ executablePath: EDGE, headless: 'new', args: ['--hide-scrollbars', '--lang=nl-NL', '--force-color-profile=srgb'] });
    const pages = {};
    const pageFor = async (who) => {
        if (!pages[who]) {
            // Each person in their own browser context (the session lives in localStorage)
            const context = await browser.createBrowserContext();
            pages[who] = who === 'lucas' ? await loginShop(context, LUCAS) : await loginAdmin(context, who === 'julia' ? JULIA : SANNE);
            pages[who].on('console', (m) => { if (m.type() === 'error') console.log(`  console (${who}):`, m.text()); });
        }
        return pages[who];
    };
    const todo = args.length ? SHOTS.filter((s) => args.includes(s.name)) : SHOTS;
    for (const shot of todo) {
        const page = await pageFor(shot.who || 'sanne');
        const viewport = shot.viewport || { width: 1280, height: 800 };
        await page.setViewport({ ...viewport, deviceScaleFactor: shot.scale || 1 });
        const base = shot.who === 'lucas' ? `${APP}/shop/` : `${APP}/`;
        const url = typeof shot.url === 'function' ? shot.url() : shot.url;
        // The shop needs its tenant in the address; Sanne and Julia are in one organisation (and favourites match the plain address)
        const target = shot.who === 'lucas' ? `${base}${url}${url.includes('?') ? '&' : '?'}t=${T}` : `${base}${url}`;
        await page.goto(target, { waitUntil: 'networkidle0' });
        await settle(page);
        if (shot.before) { await shot.before(page); await settle(page); }
        const file = path.join(out, `${shot.name}.png`);
        if (shot.clip) {
            await page.screenshot({ path: file, clip: await shot.clip(page) });
        } else if (shot.element) {
            const el = await page.waitForSelector(shot.element, { visible: true });
            await el.screenshot({ path: file });
        } else {
            await page.screenshot({ path: file, fullPage: !!shot.fullPage });
        }
        console.log('gemaakt:', shot.name);
    }
    await browser.close();
})().catch((e) => { console.error('FOUT:', e.message); process.exit(1); });
