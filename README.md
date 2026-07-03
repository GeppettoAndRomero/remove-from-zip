# remove-from-zip

Remove files or folders from a `.zip` and download the trimmed archive, entirely
in your browser. The archive is read and rebuilt on your device and never
uploaded. Open source, works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

You open a `.zip`, uncheck the entries you want gone, and the tool builds a fresh
`.zip` containing only the entries you kept, then downloads it. Reading and writing
are done with [@zip.js/zip.js](https://github.com/gildas-lormeau/zip.js) in the
browser — there is no server component, so your file has no path off your device.
Kept entries keep their folder paths and modification dates, and nothing is
re-compressed. Filenames are written with the UTF-8 flag so non-ASCII names stay
correct on Windows.

## Features

- List a ZIP's contents without extracting
- Uncheck files (or a whole folder) to remove them; keep the rest
- Rebuilds a new ZIP with only the kept entries — folders and dates preserved
- Refuses to silently break encrypted archives (their data can't be re-packed)
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev        # dev server
npm run build      # type-check + production build to dist/
npm run test:unit  # vitest unit + component tests
npm run test:e2e   # Playwright end-to-end tests
```

Stack: Astro + Preact + TypeScript. ZIP reading/writing runs client-side via
@zip.js/zip.js.

## Browser support

Works in current Chrome, Edge, Firefox and Safari. Everything runs in the browser;
the only hard requirement is a modern browser with JavaScript.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
