/**
 * Keep/remove selection logic for the ZIP entry list.
 *
 * The archive is a flat list of entries; some are directories (name ends in `/`).
 * A "kept" set holds the names that will survive into the trimmed archive. The UI
 * toggles a single entry; when that entry is a directory, the toggle cascades to
 * every descendant so unchecking a folder removes its children (and re-checking it
 * brings them back). These are pure functions so the branching is unit-tested
 * without a DOM.
 */

export interface EntryLike {
  name: string;
  directory: boolean;
}

/** Every entry that is `dir` itself or lives under it (prefix match on the path). */
export function descendants(entries: EntryLike[], dir: string): string[] {
  return entries.filter((e) => e.name === dir || e.name.startsWith(dir)).map((e) => e.name);
}

/** The set of all entry names — the initial "keep everything" selection. */
export function allNames(entries: EntryLike[]): Set<string> {
  return new Set(entries.map((e) => e.name));
}

/**
 * Return a new kept-set after toggling `target` to `keep`. If `target` names a
 * directory, the change cascades to all of its descendants.
 */
export function applyToggle(
  entries: EntryLike[],
  kept: ReadonlySet<string>,
  target: string,
  keep: boolean
): Set<string> {
  const next = new Set(kept);
  const entry = entries.find((e) => e.name === target);
  const affected = entry?.directory ? descendants(entries, target) : [target];
  for (const name of affected) {
    if (keep) next.add(name);
    else next.delete(name);
  }
  return next;
}

/** Set every entry's keep-state at once (Keep all / Remove all). */
export function setAll(entries: EntryLike[], keep: boolean): Set<string> {
  return keep ? allNames(entries) : new Set<string>();
}

/** Count of non-directory entries that will be kept. */
export function keptFileCount(entries: EntryLike[], kept: ReadonlySet<string>): number {
  return entries.filter((e) => !e.directory && kept.has(e.name)).length;
}

/** Count of non-directory entries that will be removed. */
export function removedFileCount(entries: EntryLike[], kept: ReadonlySet<string>): number {
  return entries.filter((e) => !e.directory && !kept.has(e.name)).length;
}

/** True when no file entry survives — the trimmed archive would be empty. */
export function isEmptyResult(entries: EntryLike[], kept: ReadonlySet<string>): boolean {
  return keptFileCount(entries, kept) === 0;
}

/**
 * Directory checkbox tri-state relative to its children: 'checked' when every
 * descendant is kept, 'unchecked' when none are, otherwise 'indeterminate'.
 */
export function directoryState(
  entries: EntryLike[],
  dir: string,
  kept: ReadonlySet<string>
): 'checked' | 'unchecked' | 'indeterminate' {
  const children = descendants(entries, dir).filter((n) => n !== dir);
  if (children.length === 0) return kept.has(dir) ? 'checked' : 'unchecked';
  const keptCount = children.filter((n) => kept.has(n)).length;
  if (keptCount === 0) return 'unchecked';
  if (keptCount === children.length) return 'checked';
  return 'indeterminate';
}
