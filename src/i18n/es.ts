import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario que usan las herramientas de
// ZIP en español, no una traducción literal.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Quitar archivos de un ZIP — en tu navegador, sin subir nada | runlocally',
    description:
      'Elimina archivos o carpetas de un .zip y descarga el archivo recortado, sin descomprimir y volver a comprimir a mano. El archivo se lee y se reconstruye en tu navegador; no se sube nada. Código abierto, funciona sin conexión.',
    ogTitle: 'Quitar archivos de un ZIP — en tu navegador',
    ogDescription:
      'Elige qué archivos quitar de un .zip y descarga una copia recortada. Se lee y se reconstruye en tu navegador, sin subir nada. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Quitar archivos de un ZIP',
    tagline:
      'Elimina archivos de un .zip y descarga el archivo recortado — en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Elimina archivos de un ZIP sin volver a comprimir a mano',
    paras: [
      'Esta herramienta abre un .zip, muestra todo lo que contiene y te deja desmarcar los archivos o carpetas que quieres eliminar. Después crea un .zip nuevo con solo las entradas que conservaste y lo descarga, para que puedas quitar un archivo suelto, una carpeta __MACOSX o un recurso pesado sin descomprimir y volver a comprimir todo el archivo a mano.',
      'Las entradas que conservas se copian tal como estaban guardadas: se mantienen sus rutas de carpeta y sus fechas de modificación originales, y no se vuelve a comprimir nada. Los nombres se escriben con la marca UTF-8 activada, así que los nombres en japonés y otros caracteres no ASCII se mantienen correctos al abrir el archivo recortado en Windows.',
      'Todo se ejecuta en tu navegador con @zip.js/zip.js. El archivo se lee y se reconstruye en tu dispositivo; no hay subida ni un servidor haciendo el trabajo.',
    ],
  },

  privacy: {
    h2: 'Por qué tu archivo se queda en tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay paso de subida porque no hay ningún servidor al que subir:',
    points: [
      'El archivo se lee y se reconstruye por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición con tus datos.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo tú mismo, abre el panel de red de tu navegador mientras recortas un archivo: ninguna petición lleva tu archivo.',
    sourceLinkText: 'Ver el código.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Abre un .zip',
        p: 'Haz clic para elegir un archivo .zip, o suéltalo en cualquier parte de la página. Se lee en tu dispositivo; no se sube.',
      },
      {
        h3: 'Desmarca lo que quieres quitar',
        p: 'Todas las entradas aparecen listadas y se conservan de forma predeterminada. Desmarca los archivos que quieras quitar; desmarcar una carpeta elimina todo lo que hay dentro. Los recuentos de lo conservado y lo quitado se actualizan sobre la marcha.',
      },
      {
        h3: 'Descarga el ZIP recortado',
        p: 'Crea el archivo nuevo y se descargará un solo .zip con solo las entradas que conservaste, con sus carpetas y fechas intactas.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi archivo a algún sitio?',
      a: 'No. El archivo se lee y se reconstruye por completo en tu navegador. No hay componente de servidor, así que tu archivo no tiene forma de salir de tu dispositivo. El código es abierto y puedes confirmarlo en el panel de red de tu navegador.',
    },
    {
      q: '¿Al quitar un archivo se vuelve a comprimir el resto?',
      a: 'No. Las entradas que conservas se copian directamente al archivo nuevo tal como estaban guardadas; no se vuelven a codificar. El resultado es un .zip normal con solo las entradas conservadas, y con sus rutas de carpeta y fechas de modificación intactas.',
    },
    {
      q: '¿Qué pasa cuando desmarco una carpeta?',
      a: 'Desmarcar una carpeta desmarca todo lo que hay dentro, así que la carpeta entera y su contenido quedan fuera del archivo nuevo. Al volver a marcarla, todo regresa. También puedes desmarcar archivos concretos dentro de una carpeta.',
    },
    {
      q: '¿Puede quitar archivos de un ZIP protegido con contraseña?',
      a: 'Puede listar las entradas, pero no puede reconstruir un archivo cuyo contenido está cifrado, porque los datos no se pueden volver a empaquetar sin la contraseña. En ese caso se detiene y te lo indica, en lugar de generar un archivo dañado.',
    },
    {
      q: '¿Los nombres en japonés u otros caracteres no ASCII se mantienen correctos?',
      a: 'Sí. El archivo nuevo se escribe con la marca de nombre UTF-8 activada, así que los nombres no ASCII se extraen correctamente en vez de convertirse en mojibake. Los nombres que el archivo original guardó sin UTF-8 se muestran con honestidad y se conservan tal cual.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda en caché, así que recortar un archivo funciona sin conexión de red. También puedes añadirla a tu pantalla de inicio.',
    },
    {
      q: '¿Hay un límite de tamaño de archivo?',
      a: 'No hay un límite fijo. Como todo se ejecuta en tu navegador, el tope práctico depende de la memoria de tu dispositivo: un archivo muy grande usa más memoria mientras se reconstruye.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que se ejecutan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; toda la revisión y las decisiones son del responsable.',
    securityText: 'Seguridad',
  },

  related: {
    h2: 'Herramientas relacionadas',
    blogLinkText: 'Leer las notas técnicas',
  },
};
