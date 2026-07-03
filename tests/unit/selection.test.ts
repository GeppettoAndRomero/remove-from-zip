import { describe, it, expect } from 'vitest';
import {
  type EntryLike,
  descendants,
  allNames,
  applyToggle,
  setAll,
  keptFileCount,
  removedFileCount,
  isEmptyResult,
  directoryState,
} from '@/utils/selection';

// A small archive shape: two top-level files plus a folder with two children.
const entries: EntryLike[] = [
  { name: 'a.txt', directory: false },
  { name: 'b.txt', directory: false },
  { name: 'docs/', directory: true },
  { name: 'docs/guide.txt', directory: false },
  { name: 'docs/img/logo.png', directory: false },
];

describe('descendants', () => {
  it('includes the folder itself and everything under it', () => {
    expect(descendants(entries, 'docs/').sort()).toEqual(
      ['docs/', 'docs/guide.txt', 'docs/img/logo.png'].sort()
    );
  });

  it('is just the file for a non-folder name', () => {
    expect(descendants(entries, 'a.txt')).toEqual(['a.txt']);
  });
});

describe('allNames', () => {
  it('is the initial keep-everything set', () => {
    expect(allNames(entries).size).toBe(5);
    expect(keptFileCount(entries, allNames(entries))).toBe(4); // 4 files, 1 dir
  });
});

describe('applyToggle', () => {
  it('unchecking a folder removes all of its children', () => {
    const kept = applyToggle(entries, allNames(entries), 'docs/', false);
    expect(kept.has('docs/')).toBe(false);
    expect(kept.has('docs/guide.txt')).toBe(false);
    expect(kept.has('docs/img/logo.png')).toBe(false);
    // Siblings outside the folder are untouched.
    expect(kept.has('a.txt')).toBe(true);
    expect(kept.has('b.txt')).toBe(true);
  });

  it('re-checking a folder brings its children back', () => {
    const removed = applyToggle(entries, allNames(entries), 'docs/', false);
    const restored = applyToggle(entries, removed, 'docs/', true);
    expect(restored.has('docs/guide.txt')).toBe(true);
    expect(restored.has('docs/img/logo.png')).toBe(true);
  });

  it('toggling a single file does not touch siblings', () => {
    const kept = applyToggle(entries, allNames(entries), 'b.txt', false);
    expect(kept.has('b.txt')).toBe(false);
    expect(kept.has('a.txt')).toBe(true);
    expect(kept.has('docs/guide.txt')).toBe(true);
  });

  it('does not mutate the input set', () => {
    const before = allNames(entries);
    applyToggle(entries, before, 'a.txt', false);
    expect(before.has('a.txt')).toBe(true);
  });
});

describe('setAll', () => {
  it('keeps or clears everything', () => {
    expect(setAll(entries, true).size).toBe(5);
    expect(setAll(entries, false).size).toBe(0);
  });
});

describe('counts and empty result', () => {
  it('counts files (not directories) on each side', () => {
    const kept = applyToggle(entries, allNames(entries), 'b.txt', false);
    expect(keptFileCount(entries, kept)).toBe(3);
    expect(removedFileCount(entries, kept)).toBe(1);
  });

  it('flags an empty result only when no file survives', () => {
    expect(isEmptyResult(entries, allNames(entries))).toBe(false);
    expect(isEmptyResult(entries, setAll(entries, false))).toBe(true);
    // Keeping only the directory entry still counts as empty (no files).
    const onlyDir = new Set(['docs/']);
    expect(isEmptyResult(entries, onlyDir)).toBe(true);
  });
});

describe('directoryState', () => {
  it('is checked when every child is kept, unchecked when none are', () => {
    expect(directoryState(entries, 'docs/', allNames(entries))).toBe('checked');
    expect(directoryState(entries, 'docs/', setAll(entries, false))).toBe('unchecked');
  });

  it('is indeterminate when some children are kept and some are not', () => {
    const partial = applyToggle(entries, allNames(entries), 'docs/guide.txt', false);
    expect(directoryState(entries, 'docs/', partial)).toBe('indeterminate');
  });
});
