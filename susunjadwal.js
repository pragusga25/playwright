const { chromium } = require('playwright');

// Put your credentials and matkul that you want to schedule here
const config = {
  username: '',
  password: '',
  matkuls: ['KASDD', 'DAA B', 'Kriptografi', 'Pemrograman Lanjut B', 'TBA-B'],
};

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 10,
  });

  const page = await browser.newPage();

  await page.goto('https://susunjadwal.cs.ui.ac.id');
  await page.click('text="Masuk dengan SSO"');
  await page.fill('input[name="username"]', config.username);
  await page.fill('input[name="password"]', config.password);
  await page.click('button[type="submit"]');

  await page.waitForNavigation({
    url: 'https://susunjadwal.cs.ui.ac.id/susun',
  });

  for (const matkul of config.matkuls) {
    await page.click(`text="${matkul}"`);
  }

  await page.click('button[type="button"]:text("Simpan Jadwal")');
  await page.click('footer button[type="button"]:text("Simpan")');
})();
