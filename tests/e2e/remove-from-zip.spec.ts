import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { configure, ZipReader, BlobReader } from '@zip.js/zip.js';
import { waitReady, openFixture } from './_helpers';

configure({ useWebWorkers: false });

const isZip = (b: Buffer) => b[0] === 0x50 && b[1] === 0x4b; // 'PK'

/** Read the entry names out of a downloaded .zip buffer. */
async function entryNames(buf: Buffer): Promise<string[]> {
  const reader = new ZipReader(new BlobReader(new Blob([buf])));
  try {
    return (await reader.getEntries()).map((e) => e.filename);
  } finally {
    await reader.close();
  }
}

test.describe('remove-from-zip', () => {
  test('lists entries, removes the deselected file, and re-downloads the rest', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const u = req.url();
      if (!u.startsWith('http://localhost:4321') && !u.startsWith('data:') && !u.startsWith('blob:')) {
        external.push(u);
      }
    });

    await page.goto('/remove-from-zip/');
    await waitReady(page);
    await openFixture(page);

    // The archive's entries are listed.
    const list = page.locator('[data-testid="entry-list"]');
    await expect(list).toContainText('a.txt');
    await expect(list).toContainText('b.txt');
    await expect(list).toContainText('docs/guide.txt');

    // Everything is kept by default; the action is disabled (nothing to remove).
    await expect(page.locator('#remove-download-action')).toBeDisabled();

    // Deselect one file to mark it for removal.
    await page.locator('input.rfz-check[data-name="b.txt"]').uncheck();
    await expect(page.locator('[data-testid="remove-count"]')).toHaveText('1');

    const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
    await page.click('#remove-download-action');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.zip$/);

    const buf = readFileSync((await download.path()) as string);
    expect(isZip(buf)).toBe(true);

    // Re-open the output: the removed file is gone, the rest remain.
    const names = await entryNames(buf);
    expect(names).not.toContain('b.txt');
    expect(names).toContain('a.txt');
    expect(names).toContain('docs/guide.txt');
    expect(names).toContain('写真/メモ.txt');

    // No request left the origin.
    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('unchecking a folder removes its children', async ({ page }) => {
    await page.goto('/remove-from-zip/');
    await waitReady(page);
    await openFixture(page);

    await page.locator('input.rfz-check[data-name="docs/"]').uncheck();

    const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
    await page.click('#remove-download-action');
    const download = await downloadPromise;

    const buf = readFileSync((await download.path()) as string);
    const names = await entryNames(buf);
    expect(names.some((n) => n.startsWith('docs/'))).toBe(false);
    expect(names).toContain('a.txt');
    expect(names).toContain('b.txt');
  });

  test('warns and disables download when every file is removed', async ({ page }) => {
    await page.goto('/remove-from-zip/');
    await waitReady(page);
    await openFixture(page);

    await page.getByRole('button', { name: /Remove all/i }).click();
    await expect(page.locator('[data-testid="empty-warning"]')).toBeVisible();
    await expect(page.locator('#remove-download-action')).toBeDisabled();
  });
});
