/**
 * Strings for the Preact islands (interactive UI), per locale. Kept separate from
 * page-level content (`en.ts` / `ja.ts` …).
 *
 * IMPORTANT: islands receive `locale` as a PROP (present during SSR) and never
 * read it from `document`. The same strings render on the server and the client,
 * so there is no hydration mismatch.
 *
 * Interpolated strings carry `{name}` / `{count}` / `{kept}` / `{removed}`
 * templates; the island does `.replace('{name}', x)`.
 */
export const ui = {
  en: {
    // RemoveFromZip island
    uploadHeading: 'Open a ZIP file',
    uploadSubtitle: 'Choose a .zip to trim — it is read in your browser, not uploaded.',
    dropClick: 'Click to choose a .zip',
    dropOr: 'or drop it anywhere on the page',
    dropSupported: 'One .zip archive',
    reading: 'Reading the archive…',
    keepingLabel: 'keeping',
    removingLabel: 'removing',
    selectHint:
      'Every file is kept by default. Uncheck the ones you want to remove — unchecking a folder removes everything inside it.',
    garbledNote:
      'Some names are not stored as UTF-8 and may look garbled. They are kept or removed exactly as they are.',
    keepAll: 'Keep all',
    removeAll: 'Remove all',
    loadAnother: 'Open another ZIP',
    keepAria: 'Keep',
    emptyWarning:
      'Every file is unchecked, so the result would be an empty archive. Keep at least one file.',
    resultSummary:
      'Done — removed {removed}, kept {kept}. Your download should start automatically.',
    building: 'Building',
    removeButton: 'Remove {count} & download',
    notificationsAria: 'Notifications',
    errUnsupported: 'That is not a .zip file ({name}).',
    errOpenFailed: 'This archive could not be read. It may be invalid or corrupted.',
    errBuildFailed: 'The trimmed archive could not be built.',
    errEncrypted:
      'This archive has encrypted entries, which cannot be re-packed without the password.',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // GlobalDropZone
    dzProcessing: 'Processing {count} file(s)…',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop a .zip to open',
    dzDropSub: 'It stays on your device',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    close: 'Close',
    required: 'Required',
  },
  ja: {
    // RemoveFromZip island
    uploadHeading: 'ZIP ファイルを開く',
    uploadSubtitle: '編集する .zip を選んでください。ブラウザ内で読み込み、アップロードはしません。',
    dropClick: 'クリックして .zip を選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: '.zip ファイル 1 つ',
    reading: 'アーカイブを読み込み中…',
    keepingLabel: '残す',
    removingLabel: '削除',
    selectHint:
      '初期状態ではすべて残ります。削除したいファイルのチェックを外してください。フォルダのチェックを外すと、その中身もすべて削除されます。',
    garbledNote:
      '一部の名前は UTF-8 で保存されておらず、文字化けして見えることがあります。名前はそのまま保持して処理します。',
    keepAll: 'すべて残す',
    removeAll: 'すべて削除',
    loadAnother: '別の ZIP を開く',
    keepAria: '残す',
    emptyWarning:
      'すべてのチェックが外れているため、結果が空のアーカイブになります。少なくとも 1 つは残してください。',
    resultSummary: '完了 — {removed} 件を削除し、{kept} 件を残しました。ダウンロードが自動で始まります。',
    building: '作成中',
    removeButton: '{count} 件を削除してダウンロード',
    notificationsAria: '通知',
    errUnsupported: 'これは .zip ファイルではありません（{name}）。',
    errOpenFailed: 'このアーカイブを読み込めませんでした。壊れているか、無効な可能性があります。',
    errBuildFailed: '編集後のアーカイブを作成できませんでした。',
    errEncrypted:
      'このアーカイブには暗号化されたエントリが含まれており、パスワードなしでは再作成できません。',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを処理中…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップで .zip を開く',
    dzDropSub: 'ファイルは端末内に留まります',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    close: '閉じる',
    required: '必須',
  },
  zh: {
    // RemoveFromZip island
    uploadHeading: '打开 ZIP 文件',
    uploadSubtitle: '选择要精简的 .zip。文件在浏览器中读取，不会上传。',
    dropClick: '点击选择 .zip',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: '一个 .zip 压缩包',
    reading: '正在读取压缩包…',
    keepingLabel: '保留',
    removingLabel: '删除',
    selectHint: '默认保留所有文件。取消勾选你想删除的文件；取消勾选文件夹会一并删除其中的所有内容。',
    garbledNote: '部分名称未以 UTF-8 保存，可能显示为乱码。名称会按原样保留处理。',
    keepAll: '全部保留',
    removeAll: '全部删除',
    loadAnother: '打开其他 ZIP',
    keepAria: '保留',
    emptyWarning: '所有文件都已取消勾选，结果将是一个空压缩包。请至少保留一个文件。',
    resultSummary: '完成 — 已删除 {removed} 个，保留 {kept} 个。下载将自动开始。',
    building: '正在生成',
    removeButton: '删除 {count} 个并下载',
    notificationsAria: '通知',
    errUnsupported: '这不是 .zip 文件（{name}）。',
    errOpenFailed: '无法读取此压缩包，它可能已损坏或无效。',
    errBuildFailed: '无法生成精简后的压缩包。',
    errEncrypted: '此压缩包含有加密条目，没有密码无法重新打包。',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // GlobalDropZone
    dzProcessing: '正在处理 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖放以打开 .zip',
    dzDropSub: '文件保留在你的设备上',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    close: '关闭',
    required: '必填',
  },
  de: {
    // RemoveFromZip island
    uploadHeading: 'ZIP-Datei öffnen',
    uploadSubtitle: 'Wähle ein .zip zum Bearbeiten – es wird im Browser gelesen, nicht hochgeladen.',
    dropClick: 'Zum Auswählen einer .zip klicken',
    dropOr: 'oder die Datei irgendwo auf die Seite ziehen',
    dropSupported: 'Ein .zip-Archiv',
    reading: 'Archiv wird gelesen…',
    keepingLabel: 'behalten',
    removingLabel: 'entfernen',
    selectHint:
      'Standardmäßig bleibt jede Datei erhalten. Hake die Dateien ab, die du entfernen möchtest – einen Ordner abzuwählen entfernt auch dessen Inhalt.',
    garbledNote:
      'Einige Namen sind nicht als UTF-8 gespeichert und wirken womöglich verstümmelt. Die Namen bleiben unverändert erhalten.',
    keepAll: 'Alle behalten',
    removeAll: 'Alle entfernen',
    loadAnother: 'Anderes ZIP öffnen',
    keepAria: 'Behalten',
    emptyWarning:
      'Alle Dateien sind abgewählt, das Ergebnis wäre ein leeres Archiv. Behalte mindestens eine Datei.',
    resultSummary:
      'Fertig – {removed} entfernt, {kept} behalten. Der Download sollte automatisch starten.',
    building: 'Wird erstellt',
    removeButton: '{count} entfernen & herunterladen',
    notificationsAria: 'Benachrichtigungen',
    errUnsupported: 'Das ist keine .zip-Datei ({name}).',
    errOpenFailed:
      'Dieses Archiv konnte nicht gelesen werden. Es ist möglicherweise ungültig oder beschädigt.',
    errBuildFailed: 'Das bearbeitete Archiv konnte nicht erstellt werden.',
    errEncrypted:
      'Dieses Archiv enthält verschlüsselte Einträge, die ohne Passwort nicht neu gepackt werden können.',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden verarbeitet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: '.zip zum Öffnen ablegen',
    dzDropSub: 'Sie bleibt auf deinem Gerät',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    close: 'Schließen',
    required: 'Erforderlich',
  },
  es: {
    // RemoveFromZip island
    uploadHeading: 'Abrir un archivo ZIP',
    uploadSubtitle: 'Elige un .zip para recortarlo. Se lee en tu navegador, no se sube.',
    dropClick: 'Haz clic para elegir un .zip',
    dropOr: 'o suéltalo en cualquier parte de la página',
    dropSupported: 'Un archivo .zip',
    reading: 'Leyendo el archivo…',
    keepingLabel: 'se conservan',
    removingLabel: 'se quitan',
    selectHint:
      'De forma predeterminada se conservan todos los archivos. Desmarca los que quieras quitar; desmarcar una carpeta quita también todo su contenido.',
    garbledNote:
      'Algunos nombres no están guardados como UTF-8 y pueden verse ilegibles. Los nombres se conservan tal cual.',
    keepAll: 'Conservar todo',
    removeAll: 'Quitar todo',
    loadAnother: 'Abrir otro ZIP',
    keepAria: 'Conservar',
    emptyWarning:
      'Todos los archivos están desmarcados, así que el resultado sería un archivo vacío. Conserva al menos uno.',
    resultSummary:
      'Listo: se quitaron {removed} y se conservaron {kept}. La descarga debería empezar automáticamente.',
    building: 'Creando',
    removeButton: 'Quitar {count} y descargar',
    notificationsAria: 'Notificaciones',
    errUnsupported: 'Esto no es un archivo .zip ({name}).',
    errOpenFailed: 'No se pudo leer este archivo. Puede estar dañado o no ser válido.',
    errBuildFailed: 'No se pudo crear el archivo recortado.',
    errEncrypted:
      'Este archivo tiene entradas cifradas que no se pueden volver a empaquetar sin la contraseña.',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // GlobalDropZone
    dzProcessing: 'Procesando {count} archivo(s)…',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta un .zip para abrirlo',
    dzDropSub: 'Se queda en tu dispositivo',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    close: 'Cerrar',
    required: 'Obligatorio',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
