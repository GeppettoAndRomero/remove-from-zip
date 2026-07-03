import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Formulierungen, die deutschsprachige ZIP-Werkzeuge tatsächlich verwenden.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Dateien aus einem ZIP entfernen — im Browser, ohne Upload | runlocally',
    description:
      'Lösche Dateien oder Ordner aus einem .zip und lade das bereinigte Archiv herunter, ohne von Hand zu entpacken und neu zu zippen. Das Archiv wird im Browser gelesen und neu aufgebaut – nichts wird hochgeladen. Open Source, offline nutzbar.',
    ogTitle: 'Dateien aus einem ZIP entfernen — im Browser',
    ogDescription:
      'Wähle, welche Dateien aus einem .zip fliegen, und lade eine bereinigte Kopie herunter. Im Browser gelesen und neu aufgebaut, kein Upload. Open Source, offline nutzbar.',
  },

  hero: {
    h1: 'Dateien aus einem ZIP entfernen',
    tagline:
      'Lösche Dateien aus einem .zip und lade das bereinigte Archiv herunter – im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'Dateien aus einem ZIP löschen, ohne neu zu zippen',
    paras: [
      'Dieses Werkzeug öffnet ein .zip, listet den gesamten Inhalt auf und lässt dich die Dateien oder Ordner abwählen, die weg sollen. Anschließend baut es ein frisches .zip, das nur die behaltenen Einträge enthält, und lädt es herunter – so wirst du eine verirrte Datei, einen __MACOSX-Ordner oder ein schweres Asset los, ohne das ganze Archiv von Hand zu entpacken und neu zu zippen.',
      'Die behaltenen Einträge werden so übernommen, wie sie gespeichert waren: Ordnerpfade und die ursprünglichen Änderungsdaten bleiben erhalten, und nichts wird neu komprimiert. Dateinamen werden mit gesetztem UTF-8-Flag geschrieben, sodass japanische und andere Nicht-ASCII-Namen korrekt bleiben, wenn das bereinigte Archiv unter Windows geöffnet wird.',
      'Alles läuft in deinem Browser mit @zip.js/zip.js. Das Archiv wird auf deinem Gerät gelesen und neu aufgebaut; es gibt keinen Upload und keinen Server, der die Arbeit übernimmt.',
    ],
  },

  privacy: {
    h2: 'Warum dein Archiv auf deinem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem hochgeladen werden könnte:',
    points: [
      'Das Archiv wird vollständig in deinem Browser gelesen und neu aufgebaut.',
      'Die Seite wird als statische Dateien ausgeliefert und stellt keine Anfrage mit deinen Daten.',
      'Der Quellcode ist offen und für jeden einsehbar (MIT).',
      'Es funktioniert offline – was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne das Netzwerk-Panel deines Browsers, während du ein Archiv bereinigst – keine Anfrage trägt deine Datei.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Ein .zip öffnen',
        p: 'Klicke, um eine .zip-Datei auszuwählen, oder ziehe sie irgendwo auf die Seite. Sie wird auf deinem Gerät gelesen und nicht hochgeladen.',
      },
      {
        h3: 'Abwählen, was weg soll',
        p: 'Jeder Eintrag wird aufgelistet und ist standardmäßig behalten. Hake die Dateien ab, die weg sollen – einen Ordner abzuwählen entfernt auch dessen Inhalt. Die Zähler für behalten und entfernt aktualisieren sich dabei laufend.',
      },
      {
        h3: 'Das bereinigte ZIP herunterladen',
        p: 'Baue das neue Archiv, und ein einzelnes .zip wird heruntergeladen – nur mit den behaltenen Einträgen, samt Ordnern und Daten.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Wird mein Archiv irgendwohin hochgeladen?',
      a: 'Nein. Das Archiv wird vollständig in deinem Browser gelesen und neu aufgebaut. Es gibt keine Serverkomponente, deine Datei hat also keinen Weg von deinem Gerät herunter. Der Quellcode ist offen, und du kannst das im Netzwerk-Panel deines Browsers bestätigen.',
    },
    {
      q: 'Wird der Rest neu komprimiert, wenn ich eine Datei entferne?',
      a: 'Nein. Die behaltenen Einträge werden so, wie sie gespeichert waren, direkt ins neue Archiv kopiert; sie werden nicht neu kodiert. Das Ergebnis ist ein normales .zip mit nur den behaltenen Einträgen, deren Ordnerpfade und Änderungsdaten erhalten bleiben.',
    },
    {
      q: 'Was passiert, wenn ich einen Ordner abwähle?',
      a: 'Einen Ordner abzuwählen wählt auch alles darin ab, sodass der ganze Ordner mit seinem Inhalt aus dem neuen Archiv herausfällt. Ein erneutes Anhaken holt alles zurück. Du kannst auch einzelne Dateien innerhalb eines Ordners abwählen.',
    },
    {
      q: 'Kann es Dateien aus einem passwortgeschützten ZIP entfernen?',
      a: 'Es kann die Einträge auflisten, aber ein Archiv mit verschlüsseltem Inhalt nicht neu aufbauen, denn die Dateidaten lassen sich ohne das Passwort nicht neu packen. In diesem Fall hält es an und sagt es dir, statt ein kaputtes Archiv zu erzeugen.',
    },
    {
      q: 'Bleiben japanische oder andere Nicht-ASCII-Dateinamen korrekt?',
      a: 'Ja. Das neue Archiv wird mit gesetztem UTF-8-Dateinamen-Flag geschrieben, sodass Nicht-ASCII-Namen korrekt entpackt werden statt zu Mojibake zu verkommen. Namen, die das Originalarchiv ohne UTF-8 gespeichert hat, werden ehrlich angezeigt und genau so übernommen.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch ist es zwischengespeichert, sodass das Bereinigen eines Archivs ohne Netzverbindung funktioniert. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
    {
      q: 'Gibt es eine Dateigrößenbeschränkung?',
      a: 'Es gibt kein festes Limit. Da alles im Browser läuft, hängt die praktische Grenze vom Arbeitsspeicher deines Geräts ab – ein sehr großes Archiv braucht beim Neuaufbau mehr Speicher.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Werkzeuge, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; alle Prüfungen und Entscheidungen liegen beim Betreuer.',
    securityText: 'Sicherheit',
  },
};
