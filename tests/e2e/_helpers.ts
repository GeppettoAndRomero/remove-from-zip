import { type Page, type Download } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

export const ZIP_B64 = readFileSync(
  fileURLToPath(new URL('../fixtures/zip/sample.zip', import.meta.url))
).toString('base64');

/** Wait until the island has hydrated and is ready to accept a file. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/** Drop the bundled fixture .zip and wait for its entry list to render. */
export async function openFixture(page: Page): Promise<void> {
  await page.evaluate((b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    window.dispatchEvent(
      new CustomEvent('filesDropped', {
        detail: [new File([bytes], 'sample.zip', { type: 'application/zip' })],
      })
    );
  }, ZIP_B64);
  await page.locator('[data-testid="entry-list"]').waitFor({ state: 'visible', timeout: 10_000 });
}

/**
 * remove-from-zip's primary action: open the fixture, uncheck one file to mark it
 * for removal, build the trimmed archive and return the resulting download.
 */
export async function convert(page: Page): Promise<Download> {
  await openFixture(page);
  await page.locator('input.rfz-check[data-name="b.txt"]').uncheck();
  const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
  await page.click('#remove-download-action');
  return downloadPromise;
}
