import { test, expect } from '@playwright/test';
import { waitReady, convert } from './_helpers';

// Content routing is engine-independent; one browser is enough.
test.describe('i18n', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'content routing (one engine)');
  });

  for (const loc of [
    { path: '/remove-from-zip/', lang: 'en' },
    { path: '/remove-from-zip/ja/', lang: 'ja' },
  ]) {
    test(`converts on the ${loc.lang} route (#5)`, async ({ page }) => {
      await page.goto(loc.path);
      await waitReady(page);
      await convert(page);
    });
  }

  test('serves every locale with the correct <html lang>', async ({ page }) => {
    const expected: Array<[string, string]> = [
      ['/remove-from-zip/', 'en'],
      ['/remove-from-zip/ja/', 'ja'],
      ['/remove-from-zip/zh/', 'zh-Hans'],
      ['/remove-from-zip/de/', 'de'],
      ['/remove-from-zip/es/', 'es'],
    ];
    for (const [path, lang] of expected) {
      await page.goto(path);
      expect(await page.getAttribute('html', 'lang'), `lang on ${path}`).toBe(lang);
    }
  });
});
