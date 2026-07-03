/**
 * RemoveFromZip — the tool's only non-frozen island.
 *
 * Opens a single .zip (from the picker or dropped anywhere on the page via the
 * frozen GlobalDropZone's `filesDropped` CustomEvent<File[]>), lists its entries
 * with a keep/remove checkbox each, and rebuilds a NEW .zip containing only the
 * kept entries — all in the browser (@zip.js/zip.js, no upload). Unchecking a
 * folder cascades to its children.
 *
 * The island receives `locale` as a prop (present during SSR) and reads every
 * string from the i18n table, so SSR and client render identically.
 */

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ErrorToast } from './ErrorToast';
import { listZip, buildTrimmedZip, EncryptedEntryError, type ZipEntry } from '@/utils/zipEngine';
import {
  allNames,
  applyToggle,
  setAll,
  keptFileCount,
  removedFileCount,
  isEmptyResult,
  directoryState,
} from '@/utils/selection';
import { validateFile } from '@/utils/fileValidation';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

function humanSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function trimmedName(original: string): string {
  const base = original.replace(/\.zip$/i, '');
  return `${base || 'archive'}-trimmed.zip`;
}

interface RemoveFromZipProps {
  locale?: string;
}

export function RemoveFromZip({ locale = 'en' }: RemoveFromZipProps) {
  const t = ui[locale as keyof typeof ui] ?? ui.en;

  const [fileName, setFileName] = useState<string | null>(null);
  const [entries, setEntries] = useState<ZipEntry[] | null>(null);
  const [kept, setKept] = useState<Set<string>>(new Set());
  const [reading, setReading] = useState(false);
  const [building, setBuilding] = useState(false);
  const [progress, setProgress] = useState<{ index: number; total: number } | null>(null);
  const [result, setResult] = useState<{ kept: number; removed: number } | null>(null);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);

  // Latest values for the async build handler (avoids stale closures).
  const fileRef = useRef<File | null>(null);
  const keptRef = useRef<Set<string>>(kept);
  keptRef.current = kept;

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // Hydration-complete signal (E2E).
  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const openZip = useCallback(
    async (file: File) => {
      if (reading || building) return;
      if (!validateFile(file).valid) {
        showErrorToast(t.errUnsupported.replace('{name}', file.name));
        return;
      }
      setReading(true);
      setFileName(file.name);
      setEntries(null);
      setResult(null);
      try {
        const list = await listZip(file);
        fileRef.current = file;
        setEntries(list);
        setKept(allNames(list));
      } catch {
        fileRef.current = null;
        setFileName(null);
        setEntries(null);
        showErrorToast(`${file.name}: ${t.errOpenFailed}`);
      } finally {
        setReading(false);
      }
    },
    [reading, building, showErrorToast, t]
  );

  const handleFiles = useCallback(
    (files: File[]) => {
      const zip = files.find((f) => f.name.toLowerCase().endsWith('.zip')) ?? files[0];
      if (zip) void openZip(zip);
      window.dispatchEvent(new CustomEvent('filesProcessed'));
    },
    [openZip]
  );

  useEffect(() => {
    const handler = (e: Event) => handleFiles((e as CustomEvent<File[]>).detail ?? []);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const toggle = (name: string, keep: boolean) => {
    if (!entries) return;
    setKept((prev) => applyToggle(entries, prev, name, keep));
    setResult(null);
  };

  const keepAll = () => {
    if (entries) setKept(setAll(entries, true));
    setResult(null);
  };
  const removeAll = () => {
    if (entries) setKept(setAll(entries, false));
    setResult(null);
  };

  const reset = () => {
    fileRef.current = null;
    setFileName(null);
    setEntries(null);
    setKept(new Set());
    setResult(null);
  };

  const handleBuild = useCallback(async () => {
    const file = fileRef.current;
    const current = entries;
    if (!file || !current || building) return;
    const keptSet = keptRef.current;
    if (isEmptyResult(current, keptSet)) return;

    setBuilding(true);
    setResult(null);
    setProgress({ index: 0, total: current.length });
    try {
      const out = await buildTrimmedZip(
        file,
        (name) => keptSet.has(name),
        (p) => setProgress({ index: p.index, total: p.total })
      );
      const url = URL.createObjectURL(out.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = trimmedName(file.name);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setResult({ kept: out.kept, removed: out.removed });
    } catch (error) {
      showErrorToast(
        error instanceof EncryptedEntryError ? t.errEncrypted : t.errBuildFailed
      );
    } finally {
      setBuilding(false);
      setProgress(null);
    }
  }, [entries, building, showErrorToast, t]);

  const keepCount = entries ? keptFileCount(entries, kept) : 0;
  const removeCount = entries ? removedFileCount(entries, kept) : 0;
  const empty = entries ? isEmptyResult(entries, kept) : false;
  const hasGarbled = entries?.some((e) => !e.utf8 && /[\u0080-\uffff]/.test(e.name));

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h2>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);">🗑️</div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            accept=".zip,application/zip"
            onChange={(e) => {
              handleFiles(Array.from(e.currentTarget.files || []));
              e.currentTarget.value = '';
            }}
            style="display: none;"
          />
        </div>

        {reading && <p style="color: var(--color-subtle);">{t.reading}</p>}

        {entries && (
          <div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-3); margin-bottom: var(--space-2); flex-wrap: wrap;">
              <strong style="overflow-wrap: anywhere;">{fileName}</strong>
              <span style="font-size: var(--fs-2); color: var(--color-subtle);">
                <span data-testid="keep-count" class="num">{keepCount}</span> {t.keepingLabel} ·{' '}
                <span data-testid="remove-count" class="num">{removeCount}</span> {t.removingLabel}
              </span>
            </div>

            <p style="margin: 0 0 var(--space-3) 0; font-size: var(--fs-1); color: var(--color-subtle);">
              {t.selectHint}
            </p>

            {hasGarbled && (
              <p style="font-size: var(--fs-1); color: var(--color-warning); margin-bottom: var(--space-3);">
                {t.garbledNote}
              </p>
            )}

            <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-3);">
              <AppButton variant="secondary" onClick={keepAll}>{t.keepAll}</AppButton>
              <AppButton variant="secondary" onClick={removeAll}>{t.removeAll}</AppButton>
              <span style="flex: 1;" />
              <AppButton variant="secondary" onClick={reset}>{t.loadAnother}</AppButton>
            </div>

            <div data-testid="entry-list" style="display: flex; flex-direction: column; gap: 2px; max-height: 24rem; overflow-y: auto;">
              {entries.map((e, i) => {
                const state = e.directory
                  ? directoryState(entries, e.name, kept)
                  : (kept.has(e.name) ? 'checked' : 'unchecked');
                const checked = state === 'checked';
                const indeterminate = state === 'indeterminate';
                return (
                  <label
                    key={i}
                    style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: var(--fs-2); cursor: pointer;"
                  >
                    <input
                      type="checkbox"
                      class="rfz-check"
                      data-name={e.name}
                      checked={checked}
                      ref={(el) => {
                        if (el) el.indeterminate = indeterminate;
                      }}
                      onChange={(ev) => toggle(e.name, (ev.currentTarget as HTMLInputElement).checked)}
                      aria-label={`${t.keepAria} ${e.name}`}
                    />
                    <span title={e.name} style="flex: 1; min-width: 0; overflow-wrap: anywhere; word-break: break-word;">
                      {e.directory ? '📁 ' : ''}{e.encrypted ? '🔒 ' : ''}
                      {!e.utf8 && /[\u0080-\uffff]/.test(e.name) ? '⚠ ' : ''}
                      {e.name}
                    </span>
                    <span style="flex-shrink: 0; color: var(--color-subtle);" class="num">
                      {e.directory ? '' : humanSize(e.size)}
                    </span>
                  </label>
                );
              })}
            </div>

            {empty && (
              <p data-testid="empty-warning" role="alert" style="margin: var(--space-3) 0 0 0; font-size: var(--fs-1); color: var(--color-warning);">
                {t.emptyWarning}
              </p>
            )}

            {result && (
              <p data-testid="result" role="status" style="margin: var(--space-3) 0 0 0; font-size: var(--fs-2); color: var(--color-success, var(--color-primary));">
                {t.resultSummary
                  .replace('{removed}', String(result.removed))
                  .replace('{kept}', String(result.kept))}
              </p>
            )}

            <div style="margin-top: var(--space-4); display: flex; justify-content: flex-end;">
              <button
                id="remove-download-action"
                onClick={handleBuild}
                disabled={building || empty || removeCount === 0}
                class="app-button app-button--primary"
              >
                {building && progress
                  ? `${t.building} ${progress.index + 1}/${progress.total}`
                  : t.removeButton.replace('{count}', String(removeCount))}
              </button>
            </div>
          </div>
        )}
      </AppCard>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
