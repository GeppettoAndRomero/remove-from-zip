import { describe, it, expect } from 'vitest';
import { configure, ZipReader, BlobReader, TextWriter } from '@zip.js/zip.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { listZip, buildTrimmedZip } from '@/utils/zipEngine';

// No web workers under vitest's node env.
configure({ useWebWorkers: false });

const buf = readFileSync(fileURLToPath(new URL('../fixtures/zip/sample.zip', import.meta.url)));
const zipFile = () => new File([buf], 'sample.zip', { type: 'application/zip' });

async function namesOf(blob: Blob): Promise<string[]> {
  const reader = new ZipReader(new BlobReader(blob));
  try {
    return (await reader.getEntries()).map((e) => e.filename);
  } finally {
    await reader.close();
  }
}

describe('listZip', () => {
  it('lists the entries with their names', async () => {
    const names = (await listZip(zipFile())).map((e) => e.name);
    expect(names).toContain('a.txt');
    expect(names).toContain('b.txt');
    expect(names).toContain('docs/guide.txt');
    expect(names).toContain('写真/メモ.txt');
  });

  it('reports size, UTF-8 flag and non-encrypted for a plain entry', async () => {
    const a = (await listZip(zipFile())).find((e) => e.name === 'a.txt')!;
    expect(a.size).toBeGreaterThan(0);
    expect(a.encrypted).toBe(false);
    expect(a.utf8).toBe(true);
  });

  it('throws on a non-zip blob', async () => {
    await expect(listZip(new File([new Uint8Array([1, 2, 3, 4])], 'x.zip'))).rejects.toThrow();
  });
});

describe('buildTrimmedZip', () => {
  it('drops the removed file and keeps the rest, with correct counts', async () => {
    const removed = new Set(['b.txt']);
    const out = await buildTrimmedZip(zipFile(), (name) => !removed.has(name));
    const names = await namesOf(out.blob);

    expect(names).not.toContain('b.txt');
    expect(names).toContain('a.txt');
    expect(names).toContain('docs/guide.txt');
    expect(names).toContain('写真/メモ.txt');
    // One entry removed; every other source entry kept.
    expect(out.removed).toBe(1);
    const total = (await listZip(zipFile())).length;
    expect(out.kept).toBe(total - 1);
  });

  it('removing a folder drops its children too', async () => {
    const removedPrefix = 'docs/';
    const out = await buildTrimmedZip(
      zipFile(),
      (name) => !(name === removedPrefix || name.startsWith(removedPrefix))
    );
    const names = await namesOf(out.blob);
    expect(names.some((n) => n.startsWith('docs/'))).toBe(false);
    expect(names).toContain('a.txt');
    expect(names).toContain('b.txt');
  });

  it('preserves the exact bytes of a kept entry', async () => {
    const out = await buildTrimmedZip(zipFile(), (name) => name === 'a.txt');
    const reader = new ZipReader(new BlobReader(out.blob));
    try {
      const [entry] = await reader.getEntries();
      expect(entry.filename).toBe('a.txt');
      if (entry.directory) throw new Error('expected a file entry');
      const text = await entry.getData(new TextWriter());
      expect(text).toBe('alpha');
    } finally {
      await reader.close();
    }
  });
});
