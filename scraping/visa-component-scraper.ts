import puppeteer, { Page } from 'puppeteer';
import fs from 'fs';

const BASE_URL = 'https://design.visa.com/components';
const FRAMEWORKS = [
  { name: 'angular', version: '5.1.3' },
  { name: 'react', version: '2.5.4' },
  { name: 'flutter', version: '8.1.2' },
  { name: 'css', version: '1.6.2' }
];

async function scrapeComponentNames(page: Page): Promise<string[]> {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  console.log('its loaded.')

  // Wait until there are at least some items rendered
  await page.waitForFunction(() => {
    return document.querySelectorAll('.collection-grid').length > 0;
  }, { timeout: 20000 });

  console.log(`✅ .collection-grid exists`);
  const names = await page.$$eval(
    '#main-content .collection-grid [data-collection-item]',
    (items: Element[]) => items.map(item => item.getAttribute('data-collection-item') || '')
  );

  console.log(`✅ Found ${names.length} components`);
  return names;
}

async function scrapeComponentVariants(
  page: Page,
  framework: string,
  version: string,
  component: string
) {
  const url = `${BASE_URL}/${component}/?code_library=${framework}&version=${version}`;
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.code-page-examples', { timeout: 30000 });


  const exists = await page.$('.code-page-examples');
  if (!exists) {
    console.warn(`No example section found for ${component} in ${framework}`);
    return [];
  }

  return await page.$$eval('.code-page-examples > div', (sections: Element[]) => {
    return sections.map(section => {
      const nameElement = section.querySelector('h3');
      const name = nameElement?.textContent?.trim() || 'Unnamed';
      const codeBlocks: { language: string; code: string }[] = [];

      const buttons = section.querySelectorAll('button');
      const containers = section.querySelectorAll('.codeContainer');

      buttons.forEach((btn, i) => {
        const language = btn.textContent?.trim().toLowerCase() || 'unknown';
        const code = containers[i]?.textContent?.trim() || '';
        if (code) {
          codeBlocks.push({ language, code });
        }
      });

      return { name, code: codeBlocks };
    });
  });
}

async function scrapeAll() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const componentNames = await scrapeComponentNames(page);

  const result: { framework: string; components: { name: string; variants: any[] }[] }[] = [];

  for (const { name: framework, version } of FRAMEWORKS) {
    const frameworkData = { framework, components: [] as any[] };

    for (const component of componentNames) {
      const variants = await scrapeComponentVariants(page, framework, version, component);
      frameworkData.components.push({ name: component, variants });
    }

    result.push(frameworkData);
  }

  await browser.close();

  fs.writeFileSync('visa-components.json', JSON.stringify({ frameworks: result }, null, 2));
  console.log('✅ visa-components.json has been saved.');
}

scrapeAll().catch(console.error);
