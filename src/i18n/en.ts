import type { ToolContent } from './types';

// remove-from-zip. English source content.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Remove files from a ZIP — in your browser, no upload | runlocally',
    description:
      'Delete files or folders from a .zip and download the trimmed archive, without unpacking and re-zipping by hand. The archive is read and rebuilt in your browser — nothing is uploaded. Open source, works offline.',
    ogTitle: 'Remove files from a ZIP — in your browser',
    ogDescription:
      'Pick which files to drop from a .zip and download a trimmed copy. Read and rebuilt in your browser, nothing uploaded. Open source, works offline.',
  },

  hero: {
    h1: 'Remove files from a ZIP',
    tagline:
      'Delete files from a .zip and download the trimmed archive — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Delete files from a ZIP without re-zipping by hand',
    paras: [
      'This tool opens a .zip, lists everything inside, and lets you uncheck the files or folders you want gone. It then builds a fresh .zip that contains only the entries you kept and downloads it — so you can drop a stray file, a __MACOSX folder or a heavy asset without unpacking and re-zipping the whole archive yourself.',
      'The entries you keep are copied across as they were stored: their folder paths and their original modification dates are preserved, and nothing is re-compressed. Filenames are written with the UTF-8 flag set, so Japanese and other non-ASCII names stay correct when the trimmed archive is opened on Windows.',
      'Everything runs in your browser with @zip.js/zip.js. The archive is read and rebuilt on your device; there is no upload and no server doing the work.',
    ],
  },

  privacy: {
    h2: 'Why your archive stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The archive is read and rebuilt entirely in your browser.',
      'The page is served as static files and makes no request with your data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while you trim an archive — no request carries your file.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Open a .zip',
        p: 'Click to choose a .zip file, or drop it anywhere on the page. It is read on your device; it is not uploaded.',
      },
      {
        h3: 'Uncheck what to remove',
        p: 'Every entry is listed and kept by default. Uncheck the files you want gone — unchecking a folder removes everything inside it. The kept and removed counts update as you go.',
      },
      {
        h3: 'Download the trimmed ZIP',
        p: 'Build the new archive and a single .zip downloads, containing only the entries you kept — with their folders and dates intact.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my archive uploaded anywhere?',
      a: 'No. The archive is read and rebuilt entirely in your browser. There is no server component, so your file has no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'Does removing a file recompress the rest?',
      a: 'No. The entries you keep are copied straight into the new archive as they were stored; they are not re-encoded. The result is a normal .zip containing only the kept entries, with their folder paths and modification dates preserved.',
    },
    {
      q: 'What happens when I uncheck a folder?',
      a: 'Unchecking a folder unchecks everything inside it, so the whole folder and its contents are left out of the new archive. Re-checking it brings them all back. You can also uncheck individual files within a folder.',
    },
    {
      q: 'Can it remove files from a password-protected ZIP?',
      a: 'It can list the entries, but it cannot rebuild an archive whose contents are encrypted, because the file data cannot be re-packed without the password. In that case it stops and tells you, rather than producing a broken archive.',
    },
    {
      q: 'Will Japanese or other non-ASCII filenames stay correct?',
      a: 'Yes. The new archive is written with the UTF-8 filename flag set, so non-ASCII names extract correctly instead of turning into mojibake. Names the original archive stored without UTF-8 are shown honestly and carried over exactly as they are.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so trimming an archive works without a network connection. You can also install it to your home screen.',
    },
    {
      q: 'Is there a file size limit?',
      a: 'There is no fixed limit. Because everything runs in your browser, the practical ceiling depends on your device\'s memory — a very large archive uses more memory while it is rebuilt.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};
