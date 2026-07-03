/**
 * File-type validation for remove-from-zip.
 *
 * Accepts a single .zip archive. Validation returns a stable machine `code` (not a
 * message) so the UI can render the localized string for the current locale —
 * errors are surfaced through the island i18n table.
 */

/** Machine codes the UI maps to localized error strings. */
export type ValidationCode = 'wrongType';

export interface ValidationResult {
  valid: boolean;
  code?: ValidationCode;
}

export const ALLOWED_EXTENSIONS = ['.zip'] as const;

// MIME types browsers commonly report for a .zip. The type is often empty or
// generic (application/octet-stream), so the extension is authoritative and a
// non-empty MIME only helps when the extension is missing.
const ALLOWED_MIME_TYPES = [
  'application/zip',
  'application/x-zip-compressed',
  'application/x-zip',
  'multipart/x-zip',
];

/** Lower-cased extension including the dot, or '' when the name has none. */
export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : '';
}

export function validateFileExtension(fileName: string): ValidationResult {
  const ext = getExtension(fileName);
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext)
    ? { valid: true }
    : { valid: false, code: 'wrongType' };
}

/**
 * A file is accepted when it ends in .zip. When the extension is missing we still
 * accept it if the browser reported a ZIP MIME type.
 */
export function validateFile(file: File): ValidationResult {
  if (validateFileExtension(file.name).valid) {
    return { valid: true };
  }
  if (file.type && ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return { valid: true };
  }
  return { valid: false, code: 'wrongType' };
}
