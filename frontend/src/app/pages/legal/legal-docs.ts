/**
 * Textos base de las páginas legales. Son un borrador para México (LFPDPPP y Código de Comercio)
 * y deben revisarlos la agencia y, de preferencia, un abogado antes de publicarse.
 * `{name}`, `{address}`, `{email}` y `{city}` se reemplazan con los datos de contacto del sitio.
 */
export type LegalDocId = 'privacidad' | 'terminos' | 'cookies';

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDoc {
  id: LegalDocId;
  title: string;
  short: string;
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_UPDATED = '14 de octubre de 2026';

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: 'privacidad',
    title: 'Aviso de privacidad',
    short: 'Privacidad',
    intro:
      '{name}, con domicilio en {address}, es responsable del tratamiento de los datos personales que nos compartes, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
    sections: [
      {
        title: 'Qué datos recabamos',
        paragraphs: [
          'Nombre, nombre de tu negocio, teléfono, correo electrónico y la información que nos compartas sobre tu marca cuando nos escribes por WhatsApp, correo, redes sociales o el formulario de este sitio.',
          'No recabamos datos sensibles ni datos financieros a través de este sitio.',
        ],
      },
      {
        title: 'Para qué los usamos',
        paragraphs: [
          'Finalidades necesarias: responder tus mensajes, preparar cotizaciones, prestar los servicios que contrates y darles seguimiento.',
          'Finalidades secundarias: enviarte novedades o promociones de nuestros servicios. Si no quieres recibirlas, escríbenos a {email} y dejaremos de enviarlas.',
        ],
      },
      {
        title: 'Con quién los compartimos',
        paragraphs: [
          'No vendemos ni rentamos tus datos. Solo los compartimos con las plataformas necesarias para prestar el servicio (por ejemplo, Meta, Google o TikTok para administrar tus campañas) o cuando lo exija una autoridad.',
        ],
      },
      {
        title: 'Tus derechos (ARCO)',
        paragraphs: [
          'Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso, así como revocar tu consentimiento, enviando una solicitud a {email} con tu nombre, el derecho que quieres ejercer y un medio para responderte. Te contestaremos en un plazo máximo de 20 días hábiles.',
        ],
      },
      {
        title: 'Cambios a este aviso',
        paragraphs: ['Cualquier cambio se publicará en esta misma página, con la fecha de la última actualización.'],
      },
    ],
  },
  {
    id: 'terminos',
    title: 'Términos y condiciones',
    short: 'Términos',
    intro:
      'Estos términos regulan el uso de este sitio y la contratación de los servicios de {name}, agencia de marketing digital con sede en {city}. Al usar el sitio o contratar un servicio, los aceptas.',
    sections: [
      {
        title: 'Servicios',
        paragraphs: [
          'Los alcances, entregables, precios y tiempos de cada servicio o paquete se acuerdan por escrito (cotización, propuesta o mensaje) antes de iniciar. Los precios publicados en este sitio son de referencia y pueden cambiar sin previo aviso.',
          'El presupuesto para anuncios (Meta, Google, TikTok u otras plataformas) se paga aparte y directamente a cada plataforma, salvo que se acuerde otra cosa.',
        ],
      },
      {
        title: 'Pagos',
        paragraphs: [
          'Los paquetes mensuales se pagan por adelantado al inicio de cada periodo. Si un pago no se realiza a tiempo, el servicio puede pausarse hasta regularizarlo.',
        ],
      },
      {
        title: 'Resultados',
        paragraphs: [
          'Trabajamos con estrategia y medimos todo, pero los resultados de las campañas dependen también de factores externos (el mercado, el producto, las plataformas). Por eso no garantizamos cifras específicas de ventas, seguidores o alcance; los casos que mostramos son resultados reales de clientes anteriores.',
        ],
      },
      {
        title: 'Contenido y propiedad',
        paragraphs: [
          'El cliente es responsable de contar con los derechos del material que nos entrega (logotipos, fotos, textos). Una vez pagado, el contenido creado para el cliente puede usarse libremente en sus canales. {name} puede mostrarlo en su portafolio, salvo que el cliente pida lo contrario.',
        ],
      },
      {
        title: 'Cancelación',
        paragraphs: [
          'Los paquetes mensuales pueden cancelarse avisando con al menos 15 días de anticipación al siguiente periodo. Lo ya pagado y trabajado no es reembolsable.',
        ],
      },
      {
        title: 'Contacto y jurisdicción',
        paragraphs: [
          'Para cualquier duda escríbenos a {email}. Estos términos se rigen por las leyes de México; cualquier controversia se atenderá ante los tribunales de {city}.',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Política de cookies',
    short: 'Cookies',
    intro:
      'Las cookies y tecnologías parecidas son pequeños archivos que un sitio guarda en tu navegador. Aquí te explicamos cuáles usa este sitio y para qué.',
    sections: [
      {
        title: 'Qué usamos hoy',
        paragraphs: [
          'Este sitio no usa cookies de publicidad ni de terceros. Solo guarda en tu navegador dos datos técnicos: que ya viste la animación de entrada (para no repetirla en la misma visita) y, si entras al panel de administración, tu sesión.',
        ],
      },
      {
        title: 'Si en el futuro agregamos medición',
        paragraphs: [
          'Si se instala el pixel de Meta o Google Analytics para medir las campañas, lo indicaremos aquí y te pediremos tu consentimiento antes de activarlos.',
        ],
      },
      {
        title: 'Cómo borrarlas',
        paragraphs: [
          'Puedes borrar las cookies y los datos guardados desde la configuración de tu navegador en cualquier momento. El sitio seguirá funcionando; solo volverás a ver la animación de entrada.',
        ],
      },
    ],
  },
];
