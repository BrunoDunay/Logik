// Generado por backend/scripts/export-content.js a partir de backend/seeders/initial-content.js.
// No lo edites a mano: cambia el seeder y corre `npm run content:export` en backend/.
import { SiteSettings } from '../types/settings.model';

export const INITIAL_CONTENT: SiteSettings = {
  "brand": {
    "name": "Logik Marketing",
    "tagline": "Manejo de redes sociales para empresas",
    "phrase": "No hacemos magia, hacemos marketing."
  },
  "hero": {
    "kicker": "Agencia de marketing digital",
    "subtitle": "Redes, contenido y campañas para pymes de todo México.",
    "ctaLabel": "Agenda tu consulta gratis",
    "location": "Aguascalientes, México"
  },
  "about": {
    "lead": "No hacemos magia,",
    "accent": "hacemos",
    "script": "Marketing",
    "summary": "Somos una agencia **100 % digital** de Aguascalientes. Planeamos, creamos, anunciamos y medimos para que tu marca crezca con estrategia, no con suerte.",
    "more": "Trabajamos con pequeñas y medianas empresas de Aguascalientes, Chihuahua, Zacatecas, Guanajuato, CDMX y Jalisco. Cada proyecto empieza con un análisis de tu negocio y tu competencia; después diseñamos el contenido en nuestro estudio, lanzamos campañas con un presupuesto claro y cada mes te entregamos un reporte con lo que funcionó.",
    "photos": [
      {
        "image": "/media/v2/equipo/fundadoras.webp",
        "imageAlt": "Diana Maldonado y Abigail Alcántara, directoras de Logik"
      },
      {
        "image": "/media/v2/equipo/nosotras-1.webp",
        "imageAlt": "El Marke-team de Logik tomándose una selfie en grupo"
      },
      {
        "image": "/media/v2/equipo/nosotras-2.webp",
        "imageAlt": "Parte del equipo de Logik saludando a la cámara"
      },
      {
        "image": "/media/v2/equipo/nosotras-3.webp",
        "imageAlt": "Dos integrantes de Logik trabajando con sus laptops en un café"
      },
      {
        "image": "/media/v2/equipo/nosotras-5.webp",
        "imageAlt": "Sesión de grabación de contenido en el estudio de Logik"
      }
    ],
    "stats": [
      {
        "value": 6,
        "prefix": "",
        "suffix": " años",
        "label": "haciendo crecer marcas"
      },
      {
        "value": 70,
        "prefix": "+",
        "suffix": "",
        "label": "clientes en México"
      },
      {
        "value": 10,
        "prefix": "",
        "suffix": "",
        "label": "servicios bajo un mismo techo"
      }
    ]
  },
  "results": {
    "title": "Resultados que",
    "script": "se miden",
    "intro": "Gráficas reales de campañas de nuestros clientes. Pasa el cursor para ver el detalle.",
    "cases": [
      {
        "id": "techani",
        "tab": "Techani",
        "client": "Techani · Heladería artesanal",
        "headline": "+67 % de resultados con la mitad del presupuesto",
        "summary": "Antes de Logik invertían en anuncios con pocos resultados y a costos altos.",
        "more": "Optimizamos sus campañas de interacción en Facebook e Instagram: en abril lograron 2,686 interacciones a $0.37 cada una, y en junio–julio de 2021, 3,385 interacciones a solo $0.12.",
        "chart": {
          "kind": "area",
          "title": "Alcance diario de sus publicaciones",
          "unit": "personas al día",
          "note": "Leído de la gráfica de Meta Business Suite de Techani (promedio mensual), jun 2020 – abr 2022.",
          "markerIndex": 4,
          "markerLabel": "Llega Logik",
          "points": [
            {
              "label": "jun 2020",
              "value": 0,
              "peak": 0
            },
            {
              "label": "jul 2020",
              "value": 0,
              "peak": 0
            },
            {
              "label": "ago 2020",
              "value": 0,
              "peak": 0
            },
            {
              "label": "sep 2020",
              "value": 0,
              "peak": 0
            },
            {
              "label": "oct 2020",
              "value": 1540,
              "peak": 7060
            },
            {
              "label": "nov 2020",
              "value": 960,
              "peak": 6870
            },
            {
              "label": "dic 2020",
              "value": 2390,
              "peak": 3780
            },
            {
              "label": "ene 2021",
              "value": 5820,
              "peak": 7820
            },
            {
              "label": "feb 2021",
              "value": 2330,
              "peak": 3540
            },
            {
              "label": "mar 2021",
              "value": 2780,
              "peak": 5600
            },
            {
              "label": "abr 2021",
              "value": 4790,
              "peak": 7180
            },
            {
              "label": "may 2021",
              "value": 4660,
              "peak": 5930
            },
            {
              "label": "jun 2021",
              "value": 6130,
              "peak": 8250
            },
            {
              "label": "jul 2021",
              "value": 5480,
              "peak": 7440
            },
            {
              "label": "ago 2021",
              "value": 3420,
              "peak": 7750
            },
            {
              "label": "sep 2021",
              "value": 5390,
              "peak": 7920
            },
            {
              "label": "oct 2021",
              "value": 7710,
              "peak": 12440
            },
            {
              "label": "nov 2021",
              "value": 4070,
              "peak": 7250
            },
            {
              "label": "dic 2021",
              "value": 5140,
              "peak": 10360
            },
            {
              "label": "ene 2022",
              "value": 9770,
              "peak": 10100
            },
            {
              "label": "feb 2022",
              "value": 9710,
              "peak": 10050
            },
            {
              "label": "mar 2022",
              "value": 8760,
              "peak": 9290
            },
            {
              "label": "abr 2022",
              "value": 9080,
              "peak": 13426
            }
          ],
          "steps": [],
          "items": []
        },
        "kpis": [
          {
            "value": 67,
            "prefix": "+",
            "suffix": " %",
            "label": "resultados",
            "detail": "Con la mitad del presupuesto anterior."
          },
          {
            "value": 100,
            "prefix": "+",
            "suffix": " %",
            "label": "alcance",
            "detail": "Más del doble de personas vieron sus publicaciones."
          },
          {
            "value": 95,
            "prefix": "+",
            "suffix": " %",
            "label": "interacción",
            "detail": "Y sigue creciendo."
          }
        ]
      },
      {
        "id": "gase",
        "tab": "GASE Dental",
        "client": "GASE Dental Group · Clínica dental",
        "headline": "De 72 mil personas alcanzadas a 5 citas en un mes",
        "summary": "Una campaña de mensajes para la Dra. Xochitl Serna.",
        "more": "Los pacientes escribieron por Messenger y WhatsApp: \"Hoy agendamos a 1 persona más\", \"Ya cayó la primera cita\", \"Pudimos agendar 4 pacientes\".",
        "chart": {
          "kind": "steps",
          "title": "Del anuncio a la cita",
          "unit": "",
          "note": "Resultados de un mes de campaña compartidos por la clínica.",
          "markerIndex": null,
          "markerLabel": null,
          "points": [],
          "steps": [
            {
              "label": "Personas alcanzadas",
              "value": 72000,
              "detail": "Vieron la campaña al menos una vez."
            },
            {
              "label": "Seguidores nuevos",
              "value": 166,
              "detail": "Se quedaron siguiendo la página."
            },
            {
              "label": "Mensajes",
              "value": 141,
              "detail": "Escribieron para pedir información."
            },
            {
              "label": "Citas agendadas",
              "value": 5,
              "detail": "Pacientes nuevos en la agenda."
            }
          ],
          "items": []
        },
        "kpis": []
      },
      {
        "id": "clinicas",
        "tab": "Clínicas",
        "client": "Clínicas y consultorios",
        "headline": "Más de 200 mensajes al mes, a menos de $8 cada uno",
        "summary": "Campañas de mensajes para doctoras de Aguascalientes.",
        "more": "En el primer mes de redes de una tricóloga capilar: +510 seguidores, más de 86 mil personas alcanzadas, más de 2,800 visitas al perfil y 188 mensajes.",
        "chart": {
          "kind": "bars",
          "title": "Costo por conversación de WhatsApp",
          "unit": "MXN por conversación",
          "note": "Datos del administrador de anuncios de Meta, 2025.",
          "markerIndex": null,
          "markerLabel": null,
          "points": [],
          "steps": [],
          "items": [
            {
              "label": "Doctora · campaña A",
              "value": 6.8,
              "detail": "254 conversaciones · ago–sep"
            },
            {
              "label": "Campaña DEL",
              "value": 7.34,
              "detail": "177 conversaciones · dic, $1,300"
            },
            {
              "label": "Doctora · campaña B",
              "value": 7.72,
              "detail": "232 conversaciones · ago–sep"
            },
            {
              "label": "Campaña CH",
              "value": 9.77,
              "detail": "133 conversaciones · dic, $1,300"
            },
            {
              "label": "Tricóloga · primer mes",
              "value": 14,
              "detail": "188 mensajes en su primer mes"
            }
          ]
        },
        "kpis": [
          {
            "value": 200,
            "prefix": "+",
            "suffix": "",
            "label": "mensajes al mes",
            "detail": "Dos doctoras, campañas de agosto y septiembre."
          },
          {
            "value": 8,
            "prefix": "<$",
            "suffix": "",
            "label": "por conversación",
            "detail": "El costo más bajo fue de $6.80."
          }
        ]
      },
      {
        "id": "meta",
        "tab": "Meta Ads",
        "client": "Notificaciones de Meta Ads",
        "headline": "Hasta 97 % más barato que negocios similares",
        "summary": "Así amanecemos casi a diario: Meta nos avisa que los anuncios de nuestros clientes cuestan menos que los de la competencia.",
        "more": "Cada punto es una notificación real de \"Tu anuncio tiene buen rendimiento\" que compartimos en nuestras historias de Resultados.",
        "chart": {
          "kind": "dots",
          "title": "Costo por resultado más bajo que el de negocios similares",
          "unit": "% más bajo",
          "note": "Notificaciones de Meta Ads de campañas de clientes, 2024–2026.",
          "markerIndex": null,
          "markerLabel": null,
          "points": [],
          "steps": [],
          "items": [
            {
              "label": "Notificación",
              "value": 97,
              "detail": "Anuncios un 97 % más bajos que los similares"
            },
            {
              "label": "Notificación",
              "value": 97,
              "detail": "De nuevo, 97 %"
            },
            {
              "label": "Notificación",
              "value": 96,
              "detail": "Amanecimos con esta notificación"
            },
            {
              "label": "Notificación",
              "value": 96,
              "detail": "\"Algo bien\""
            },
            {
              "label": "Notificación",
              "value": 85,
              "detail": "12:59 a. m."
            },
            {
              "label": "Notificación",
              "value": 84,
              "detail": "Your ad is performing well"
            },
            {
              "label": "Notificación",
              "value": 81,
              "detail": "Terminando la noche con algo bien"
            },
            {
              "label": "Recomendación",
              "value": 64,
              "detail": "Conjunto ene–feb 2025"
            },
            {
              "label": "Notificación",
              "value": 64,
              "detail": "Empezando bien el día"
            },
            {
              "label": "Recomendación",
              "value": 60,
              "detail": "Comenzando bien el día"
            },
            {
              "label": "Recomendación",
              "value": 59,
              "detail": "Certificación, dic 2024"
            },
            {
              "label": "Notificación",
              "value": 56,
              "detail": "Amanecimos con esta notificación"
            },
            {
              "label": "Recomendación",
              "value": 41,
              "detail": "Cerrando la semana con algo bien"
            },
            {
              "label": "Recomendación",
              "value": 40,
              "detail": "Conjunto ene–feb 2025"
            },
            {
              "label": "Recomendación",
              "value": 18,
              "detail": "Campaña ene–feb 2025"
            }
          ]
        },
        "kpis": []
      }
    ],
    "isProvisional": true
  },
  "posts": {
    "title": "Contenido para",
    "script": "todo tipo de marcas",
    "intro": "Desliza y mira cómo se ve cada diseño publicado en Instagram.",
    "categories": [
      {
        "id": "logik",
        "label": "Logik"
      },
      {
        "id": "gastronomia",
        "label": "Gastronomía"
      },
      {
        "id": "salud",
        "label": "Salud"
      },
      {
        "id": "belleza",
        "label": "Belleza"
      },
      {
        "id": "turismo",
        "label": "Turismo y hoteles"
      },
      {
        "id": "servicios",
        "label": "Servicios"
      }
    ],
    "items": [
      {
        "image": "/media/v2/posts/logik-015.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Ser mercadólogo hoy va mucho más allá de la creatividad. 💻\n\n🚀 Implica analizar datos, entender consumidor y ejecutar estrategia que genera resultados. Hoy se reconoce a quienes convierten información en estrategia y estrategia en crecimiento.\n\nFeliz Día del Mercadólogo. 🩷\n\n#DiaDelMercadologo #MarketingDigital #Aguascalientes #LogikMarketing #MarketingMexico",
        "permalink": "https://www.instagram.com/logikmkt/p/DYhddY6id3e/"
      },
      {
        "image": "/media/v2/posts/logik-017.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "🌟 Hoy celebramos el esfuerzo que construye grandes resultados.\nPero en marketing, no gana quien más hace… gana quien lo hace con estrategia. ¡Feliz Día del Trabajo! 🩷\n\nHoy también es momento de trabajar mejor en tu marca.\n📩 Convierte tu contenido en resultados, contáctanos.\n\n#MarketingDigital #SocialMediaMarketing #Branding #Emprendedores #LogikMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DXzRyEAFQPa/"
      },
      {
        "image": "/media/v2/posts/logik-019.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "✨ Hoy no se trata solo de ser creativo, se trata de hacerlo con intención.\n\nEn un mundo donde todo compite por atención, las ideas que realmente funcionan son las que entienden al cliente, conectan y tienen un propósito claro. 🩷\n\n📩 Si quieres llevar tu contenido a otro nivel, contáctanos.\n\n#CreatividadEInnovacion #LogikMarketing #MarketingQueFunciona #AguascalientesEmprende #EstrategiaDigital",
        "permalink": "https://www.instagram.com/logikmkt/p/DXZjmyjFQAJ/"
      },
      {
        "image": "/media/v2/posts/logik-024.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "💡 Las mujeres no solo trabajan en marketing… lo están transformando.\n\nSon mayoría en la industria 👩‍💻, pero no en las mesas de decisión 📉\nExiste brecha salarial, menor presencia en dirección y una carga operativa que pocas veces recibe crédito.\n\nY aquí está la verdad 🚀\nLa equidad no es tendencia, es estrategia.\nLos equipos diversos generan más resultados.\n\nEn LOGIK creemos en un marketing con voz, liderazgo y oportunidades reales 💜\n\n#LogikMarketing #AgenciaDeMarketing #MarketingConProposito #MujeresEnMarketing #LiderazgoFemenino",
        "permalink": "https://www.instagram.com/logikmkt/p/DVltN4oDY7D/"
      },
      {
        "image": "/media/v2/posts/logik-025.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Un buen video no empieza cuando grabas 🎬\nEmpieza cuando planeas, estructuras y defines el mensaje correcto.\n\nEstrategia, producción y copy trabajando juntos = contenido que sí conecta 🚀\n\nNada es improvisado. Todo tiene intención.\n\n#LogikMarketing #AgenciaDeMarketing #EstrategiaDigital #CreacionDeContenido #MarketingConProposito",
        "permalink": "https://www.instagram.com/logikmkt/p/DVrLVZkiFoe/"
      },
      {
        "image": "/media/v2/posts/logik-027.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "🚨 ¿Tus anuncios iban bien… y de repente bajaron?\n\nNo siempre es el presupuesto 👀\nPuede ser saturación: tu audiencia ya vio lo mismo demasiadas veces y dejó de reaccionar.\n\nLa solución no es gastar más 💸\nEs refrescar, ampliar y optimizar 🎯\n\nNuevos creativos, público más amplio y estrategia inteligente = campañas que vuelven a rendir 🚀\n\n📩 Déjalo en nuestras manos y hagamos que tus campañas vuelvan a despegar\n\n#LogikMarketing #AgenciaDeMarketing #MetaAds #PublicidadDigital #MarketingEstrategico",
        "permalink": "https://www.instagram.com/logikmkt/reel/DVPEWp_jW_K/"
      },
      {
        "image": "/media/v2/posts/logik-039.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "✨ Febrero es corto, pero ideal para fortalecer la conexión con tu audiencia.\nContenido con intención, fechas clave y un calendario que te ayuda a aprovechar cada oportunidad del mes. 📅💡\n\n#LogikMarketing #AgenciaDeMarketing #Marketing2026 #CommunityManager",
        "permalink": "https://www.instagram.com/logikmkt/p/DTyXr14k3tB/"
      },
      {
        "image": "/media/v2/posts/logik-041.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Cuando la creatividad queda en nuestras manos…\nasí se ve lo que no siempre se muestra ✨🧠\n\n#LogikMarketing #ProcesoCreativo #AgenciaDeMarketing  #CreatividadReal #Humor",
        "permalink": "https://www.instagram.com/logikmkt/reel/DTi0G8bCnAo/"
      },
      {
        "image": "/media/v2/posts/logik-043.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Menos hashtags no significa menos alcance, significa mejor estrategia 🎯\nElegir los correctos puede cambiar por completo el rendimiento de tu contenido.\nHaz que cada hashtag trabaje a tu favor 🚀\n\n#LogikMarketing #MarketingDigital #EstrategiaDeContenido #ActualizaciónInstagram",
        "permalink": "https://www.instagram.com/logikmkt/p/DTDfHHWjAGH/"
      },
      {
        "image": "/media/v2/posts/logik-052.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "✨ Cerrar el año también es parte de la estrategia.\nOrganiza tus redes, limpia tus pendientes y deja todo listo para arrancar el 2026 con más enfoque y mejores resultados. 📲🚀\n\n#LogikMarketing #AgenciaDeMarketing #CierreDeAño #MarketingDigital #SocialMediaTips",
        "permalink": "https://www.instagram.com/logikmkt/p/DR7mhofD42o/"
      },
      {
        "image": "/media/v2/posts/logik-061.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "¡Hoy es el día internacional del marketing! 🤩🥳\n\nY por ese motivo te compartimos 5 de las campañas más exitosas del mundo ✨\n\nTodas estas campañas tienen algo en común:\n👉 No vendían productos. Vendían ideas, emociones y significado.\nY eso es, en esencia, lo que el marketing bien hecho logra.\n\n💬 Cuéntanos: ¿qué campaña te inspira más?\n\n#diainternacionaldelmarketing #diadelmarketing #marketing #mkt #campañasexitosasdemarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DQpXI81iTJG/"
      },
      {
        "image": "/media/v2/posts/logik-063.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "🧘‍♀️ Hoy en el Día Mundial de la Salud Mental recordamos algo clave: en marketing, cuidarte a ti es cuidar tus resultados 💜.\n\n🎯 Metas claras, 📅 organización, ⚡ automatización y pausas reales = más creatividad y mejores campañas 🚀.\n\n#LogikMarketing #SaludMental #MarketingConConciencia #CreatividadSinBurnout",
        "permalink": "https://www.instagram.com/logikmkt/p/DPogpx3CWUd/"
      },
      {
        "image": "/media/v2/posts/logik-073.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "🎃 Octubre llega con calabazas, café y mucho contenido por crear ☕🍂\nYa está listo el calendario de octubre 🗓️ para que aproveches cada fecha clave y mantengas tu marca siempre presente. ¡No dejes pasar ninguna oportunidad de conectar con tu audiencia! 🚀\n\n \n\n#CalendarioCM #CommunityManager #ContenidoDigital #MarketingDigital #LogikMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DPCozj4Cb8i/"
      },
      {
        "image": "/media/v2/posts/logik-077.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Así se ve el proceso creativo por dentro: Un poco de café, mucha cabeza y, a veces, una carrera contra el reloj. 🤯💡\n\n¡Pero el resultado siempre vale la pena! ✨\n\n¿Cuál es tu etapa favorita (o la más temida)?\n\n#Creatividad #MarketingDigital #Diseño #LogikMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DOwL2KJDeyj/"
      },
      {
        "image": "/media/v2/posts/logik-081.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Si aún no sabes qué hace una agencia como Logik…\n\n💡 Aquí va un resumen rápido:\n\n📱 Redes, 🎥 contenido, 📊 pauta, 🧠 estrategia…\n\nY ahora, con nueva imagen.\n\nHablemos de cómo hacer que tu marca destaque. 🙌\n\n.\n.\n.\n#AgenciaCreativa #MarketingDigital #EstrategiaDeMarca #ContenidoQueVende #HazQueTeVean",
        "permalink": "https://www.instagram.com/logikmkt/reel/DLNl3SyvaLZ/"
      },
      {
        "image": "/media/v2/posts/logik-085.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "📢 Ya está listo el calendario de septiembre para que tu contenido ¡arrase! 🗓️ Adapta tus publicaciones a las fechas clave y no te pierdas ninguna oportunidad de conectar con tu audiencia.\n\n \n\n#CalendarioCM #CommunityManager #ContenidoDigital #MarketingDigital #LogikMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DNvfQvWRTww/"
      },
      {
        "image": "/media/v2/posts/logik-089.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Impulsa tus redes sociales!🚀 Hacemos crecer tu presencia en Facebook con estrategias. Alcanza tus objetivos y haz que tu marca brille 📈\n\n¡Contáctanos ahora y comienza tu transformación digital! 💬\n\n#CrecimientoEnRedes #MarketingDigital #LogikMarketing #ResultadosGarantizados  #AgenciadeMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DNrF1t43Mf0/"
      },
      {
        "image": "/media/v2/posts/logik-093.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "¡Instagram trae novedades que te encantarán! 🤩\n\nDesliza para descubrir las últimas actualizaciones que cambiarán tu forma de interactuar: desde gestionar tu tiempo, editar tu contenido de forma pro, hasta conectar con el mundo entero 🌐.\n\n \n\n#InstagramUpdates  #MarketingDigital #SocialMedia #LokigMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DM8BJxXxfUq/"
      },
      {
        "image": "/media/v2/posts/logik-099.webp",
        "category": "logik",
        "account": "logikmkt",
        "caption": "Planifica tu contenido de agosto con ideas clave y mantén tu estrategia activa todo el mes. 📆✨\n\n#MarketingDeContenido #CommunityManager #LogikMarketing",
        "permalink": "https://www.instagram.com/logikmkt/p/DMp282lO5Rc/"
      },
      {
        "image": "/media/v2/posts/gastronomia-06.webp",
        "category": "gastronomia",
        "account": "Techani",
        "caption": "Diseño de Logik Marketing para Techani.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/gastronomia-09.webp",
        "category": "gastronomia",
        "account": "Techani",
        "caption": "Diseño de Logik Marketing para Techani.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/gastronomia-18.webp",
        "category": "gastronomia",
        "account": "Techani",
        "caption": "Diseño de Logik Marketing para Techani.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/gastronomia-22.webp",
        "category": "gastronomia",
        "account": "Techani",
        "caption": "Diseño de Logik Marketing para Techani.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/gastronomia-40.webp",
        "category": "gastronomia",
        "account": "Techani",
        "caption": "Diseño de Logik Marketing para Techani.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/gastronomia-19.webp",
        "category": "gastronomia",
        "account": "Glüu",
        "caption": "Diseño de Logik Marketing para Glüu.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/salud-08.webp",
        "category": "salud",
        "account": "GASE Dental Group",
        "caption": "Diseño de Logik Marketing para GASE Dental Group.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/salud-12.webp",
        "category": "salud",
        "account": "GASE Dental Group",
        "caption": "Diseño de Logik Marketing para GASE Dental Group.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/salud-27.webp",
        "category": "salud",
        "account": "GASE Dental Group",
        "caption": "Diseño de Logik Marketing para GASE Dental Group.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/salud-37.webp",
        "category": "salud",
        "account": "GASE Dental Group",
        "caption": "Diseño de Logik Marketing para GASE Dental Group.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/salud-07.webp",
        "category": "salud",
        "account": "Holistik",
        "caption": "Diseño de Logik Marketing para Holistik.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/belleza-10.webp",
        "category": "belleza",
        "account": "Novedades y Cosméticos",
        "caption": "Diseño de Logik Marketing para Novedades y Cosméticos.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/belleza-13.webp",
        "category": "belleza",
        "account": "Novedades y Cosméticos",
        "caption": "Diseño de Logik Marketing para Novedades y Cosméticos.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/belleza-43.webp",
        "category": "belleza",
        "account": "Novedades y Cosméticos",
        "caption": "Diseño de Logik Marketing para Novedades y Cosméticos.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/belleza-11.webp",
        "category": "belleza",
        "account": "Novedades y Cosméticos",
        "caption": "Diseño de Logik Marketing para Novedades y Cosméticos.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/belleza-24.webp",
        "category": "belleza",
        "account": "Novedades y Cosméticos",
        "caption": "Diseño de Logik Marketing para Novedades y Cosméticos.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/belleza-03.webp",
        "category": "belleza",
        "account": "Novedades y Cosméticos",
        "caption": "Diseño de Logik Marketing para Novedades y Cosméticos.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-02.webp",
        "category": "turismo",
        "account": "Hampton by Hilton",
        "caption": "Diseño de Logik Marketing para Hampton by Hilton.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-04.webp",
        "category": "turismo",
        "account": "Hampton by Hilton",
        "caption": "Diseño de Logik Marketing para Hampton by Hilton.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-15.webp",
        "category": "turismo",
        "account": "Hampton by Hilton",
        "caption": "Diseño de Logik Marketing para Hampton by Hilton.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-17.webp",
        "category": "turismo",
        "account": "Hampton by Hilton",
        "caption": "Diseño de Logik Marketing para Hampton by Hilton.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-41.webp",
        "category": "turismo",
        "account": "Hampton by Hilton",
        "caption": "Diseño de Logik Marketing para Hampton by Hilton.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-29.webp",
        "category": "turismo",
        "account": "Li-Kaan",
        "caption": "Diseño de Logik Marketing para Li-Kaan.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/turismo-39.webp",
        "category": "turismo",
        "account": "Li-Kaan",
        "caption": "Diseño de Logik Marketing para Li-Kaan.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/servicios-30.webp",
        "category": "servicios",
        "account": "Desperrucados",
        "caption": "Diseño de Logik Marketing para Desperrucados.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/servicios-33.webp",
        "category": "servicios",
        "account": "Desperrucados",
        "caption": "Diseño de Logik Marketing para Desperrucados.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/servicios-23.webp",
        "category": "servicios",
        "account": "Plan B",
        "caption": "Diseño de Logik Marketing para Plan B.",
        "permalink": null
      },
      {
        "image": "/media/v2/posts/servicios-44.webp",
        "category": "servicios",
        "account": "Plan B",
        "caption": "Diseño de Logik Marketing para Plan B.",
        "permalink": null
      }
    ]
  },
  "services": {
    "title": "Lo que hacemos",
    "script": "por tu marca",
    "intro": "Estos son los servicios de Logik. Elige uno o combínalos: trabajamos todo como una sola estrategia.",
    "items": [
      {
        "title": "Manejo de redes sociales",
        "summary": "Facebook, Instagram y TikTok con calendario mensual.",
        "detail": "Gestionamos tus redes creando una conexión real con tus clientes, siempre de la mano del objetivo que buscas: más alcance, interacción, seguidores o ventas.",
        "image": "/media/v2/posts/logik-089.webp"
      },
      {
        "title": "Facebook e Instagram Ads",
        "summary": "Campañas que acercan tu producto a quien lo busca.",
        "detail": "Acercamos tu mercado potencial a tu producto con publicidad efectiva en Facebook e Instagram. Somos Meta Certified Media Buying Professional.",
        "image": "/media/servicios/ads.webp"
      },
      {
        "title": "Google Ads",
        "summary": "Aparece en las primeras búsquedas.",
        "detail": "Acercamos tu producto a tus potenciales consumidores y lo posicionamos en las primeras búsquedas de Google.",
        "image": "/media/proceso/anunciamos.webp"
      },
      {
        "title": "TikTok Ads",
        "summary": "Tú creas la comunidad, nosotras la convertimos.",
        "detail": "Despega tu marca en TikTok: tú haces los TikToks, nosotras los anuncios. Tú creas una comunidad y nosotras la transformamos en tus potenciales clientes.",
        "image": "/media/proceso/creamos.webp"
      },
      {
        "title": "Contenido y video",
        "summary": "Reels y sesiones en nuestro estudio.",
        "detail": "Planeamos, grabamos y editamos reels y videos en nuestro estudio o en tu negocio, con guion, música y portada.",
        "image": "/media/servicios/video.webp"
      },
      {
        "title": "Fotografía de producto",
        "summary": "Tus productos, listos para vender.",
        "detail": "Capturamos y presentamos tus artículos de manera atractiva y estratégica para tus potenciales clientes.",
        "image": "/media/servicios/fotografia.webp"
      },
      {
        "title": "Manual de identidad",
        "summary": "Una marca que se ve igual en todos lados.",
        "detail": "Creamos la identidad de tu marca: su filosofía, logotipo, tipografía, colorimetría, tarjetas de presentación y aplicaciones digitales.",
        "image": "/media/servicios/identidad.webp"
      },
      {
        "title": "Logotipo y naming",
        "summary": "El concepto de tu marca, desde cero.",
        "detail": "Te ayudamos a nombrar tu marca y a diseñar su logotipo, con propuestas y ajustes hasta que te represente.",
        "image": "/media/v2/marcas/techani.webp"
      },
      {
        "title": "Páginas web y landing pages",
        "summary": "Sitios rápidos que convierten tus anuncios en ventas.",
        "detail": "Llevamos tu negocio al mundo de la web: sitios y páginas de aterrizaje para tus campañas, con pixel de Meta y botón de WhatsApp, para que cada anuncio termine en un mensaje.",
        "image": "/media/servicios/web-sitio.webp"
      },
      {
        "title": "Asesoría mercadológica",
        "summary": "Estrategia antes de publicar.",
        "detail": "Te asesoramos con profesionales en Mercadotecnia: análisis situacional, FODA, competencia y plan de medios para alcanzar tus objetivos.",
        "image": "/media/servicios/asesoria.webp"
      }
    ]
  },
  "packages": {
    "title": "Paquetes",
    "script": "a tu medida",
    "intro": "Todos incluyen estrategia, diseño y reporte de resultados. La primera consulta es gratis.",
    "items": [
      {
        "name": "Facebook Plus",
        "tagline": "Para empezar con orden",
        "price": "$2,499",
        "period": "al mes",
        "highlighted": false,
        "features": [
          "Página de Facebook",
          "10 publicaciones al mes",
          "1 campaña con 4 anuncios",
          "Portada de Facebook",
          "Análisis situacional",
          "Reporte de resultados"
        ]
      },
      {
        "name": "Emprendedor",
        "tagline": "El más pedido",
        "price": null,
        "period": "al mes",
        "highlighted": true,
        "features": [
          "Facebook e Instagram",
          "12 publicaciones (incluye 5 reels)",
          "Historias",
          "1 campaña",
          "Sesión de contenido de 1 hora",
          "Reporte de resultados"
        ]
      },
      {
        "name": "Paquete'n Redes",
        "tagline": "Presencia completa",
        "price": null,
        "period": "al mes",
        "highlighted": false,
        "features": [
          "Facebook, Instagram y TikTok",
          "18 publicaciones (incluye 8 reels)",
          "2 campañas",
          "Remarketing",
          "Reporte de resultados"
        ]
      },
      {
        "name": "Paquete Flash",
        "tagline": "Resultados rápidos",
        "price": null,
        "period": "por proyecto",
        "highlighted": false,
        "features": [
          "Contenido profesional",
          "Una campaña publicitaria",
          "Reporte de resultados"
        ]
      }
    ],
    "note": "El presupuesto para anuncios se paga aparte, directo a Meta.",
    "isProvisional": true
  },
  "brands": {
    "title": "Marcas que",
    "script": "confían en nosotras",
    "intro": "Más de 70 marcas en seis estados de México. Estas son algunas.",
    "items": [
      {
        "name": "Hampton by Hilton",
        "category": "Hotel · Aguascalientes",
        "description": "Hotel en el centro de Aguascalientes. Diseñamos sus publicaciones y promociones de temporada.",
        "logo": "/media/v2/logos/logo-15-1.png",
        "photo": "/media/v2/marcas/hampton-by-hilton.webp",
        "color": "#0d2c54"
      },
      {
        "name": "Techani",
        "category": "Heladería artesanal",
        "description": "Fotografía de producto, contenido y campañas: +67 % de resultados con la mitad del presupuesto.",
        "logo": "/media/v2/logos/logo-14-0.png",
        "photo": "/media/v2/marcas/techani.webp",
        "color": "#c8143c"
      },
      {
        "name": "GASE Dental Group",
        "category": "Clínica dental",
        "description": "Campañas de mensajes que llegaron a 72 mil personas y llenaron la agenda.",
        "logo": "/media/v2/logos/logo-03-1.png",
        "photo": "/media/v2/marcas/gase-dental-group.webp",
        "color": "#1d4f91"
      },
      {
        "name": "Novedades y Cosméticos",
        "category": "Tienda de belleza",
        "description": "Fotografía de producto y promociones para sus marcas de maquillaje y skincare.",
        "logo": "/media/v2/logos/logo-15-0.png",
        "photo": "/media/v2/marcas/novedades-y-cosmeticos.webp",
        "color": "#1b1b1f"
      },
      {
        "name": "Desperrucados",
        "category": "Estética canina · Chihuahua",
        "description": "Alto diseño en estilismo canino. Contenido de servicios y eventos para Chihuahua y CDMX.",
        "logo": "/media/v2/logos/logo-01-0.png",
        "photo": "/media/v2/marcas/desperrucados.webp",
        "color": "#1f4fa0"
      },
      {
        "name": "Li-Kaan",
        "category": "Agencia de viajes",
        "description": "Paquetes de viaje con todo incluido, diseñados para vender por redes.",
        "logo": "/media/v2/logos/logo-12-0.png",
        "photo": "/media/v2/marcas/li-kaan.webp",
        "color": "#0b7f8a"
      },
      {
        "name": "Glüu",
        "category": "Agua purificada",
        "description": "Lanzamiento de su sucursal en Jesús María, Aguascalientes.",
        "logo": "/media/v2/logos/logo-18-0.png",
        "photo": "/media/v2/marcas/gluu.webp",
        "color": "#1673c6"
      },
      {
        "name": "Plan B",
        "category": "Asesoría financiera",
        "description": "Talleres de planeación para el retiro y seguros, comunicados con claridad.",
        "logo": "/media/v2/logos/logo-16-0.png",
        "photo": "/media/v2/marcas/plan-b.webp",
        "color": "#e5881b"
      },
      {
        "name": "Holistik",
        "category": "Bienestar",
        "description": "Consciencia en expansión: contenido para sus clases y servicios de bienestar.",
        "logo": "/media/v2/logos/logo-04-0.png",
        "photo": "/media/v2/marcas/holistik.webp",
        "color": "#2f4a37"
      },
      {
        "name": "Khibuq",
        "category": "Marca local",
        "description": "Diseño de identidad y contenido para sus redes sociales.",
        "logo": "/media/v2/logos/logo-03-0.png",
        "photo": null,
        "color": "#3b2a5c"
      },
      {
        "name": "Bárbaras",
        "category": "Mercería y manualidades",
        "description": "\"Cose, pega y hila tus ideas\": publicaciones para su tienda.",
        "logo": "/media/v2/logos/logo-05-0.png",
        "photo": null,
        "color": "#8c3b5a"
      },
      {
        "name": "Camelia Accesorios",
        "category": "Accesorios",
        "description": "Fotografía y contenido para su catálogo de accesorios.",
        "logo": "/media/v2/logos/logo-06-0.png",
        "photo": null,
        "color": "#a0577a"
      },
      {
        "name": "RCM",
        "category": "Reparación de celulares",
        "description": "Publicaciones de servicios y promociones de reparación.",
        "logo": "/media/v2/logos/logo-06-1.png",
        "photo": null,
        "color": "#1e3a5f"
      },
      {
        "name": "Texhi",
        "category": "Marca local",
        "description": "Contenido para redes y campañas de su marca.",
        "logo": "/media/v2/logos/logo-07-0.png",
        "photo": null,
        "color": "#22313f"
      },
      {
        "name": "Shekinah Amma",
        "category": "Agencia de viajes",
        "description": "Paquetes y destinos comunicados para vender por redes.",
        "logo": "/media/v2/logos/logo-08-0.png",
        "photo": null,
        "color": "#6b4c8a"
      },
      {
        "name": "Greenfood",
        "category": "Comida saludable",
        "description": "Contenido de menú y promociones de comida saludable.",
        "logo": "/media/v2/logos/logo-09-0.png",
        "photo": null,
        "color": "#2e7d32"
      },
      {
        "name": "Alisson Tours",
        "category": "Agencia de viajes",
        "description": "Promociones de viajes y salidas grupales.",
        "logo": "/media/v2/logos/logo-10-1.svg",
        "photo": null,
        "color": "#0e7490"
      },
      {
        "name": "Olaya Accesorios",
        "category": "Accesorios",
        "description": "Contenido para su tienda de accesorios.",
        "logo": "/media/v2/logos/logo-11-0.png",
        "photo": null,
        "color": "#7c5c3b"
      },
      {
        "name": "Sr. Sorbete",
        "category": "Heladería y cafetería",
        "description": "Publicaciones de producto para su heladería y cafetería.",
        "logo": "/media/v2/logos/logo-13-a.png",
        "photo": null,
        "color": "#c2185b"
      },
      {
        "name": "Moño",
        "category": "Marca local",
        "description": "Diseño de contenido para sus redes sociales.",
        "logo": "/media/v2/logos/logo-13-b.png",
        "photo": null,
        "color": "#4a3f6b"
      },
      {
        "name": "Tu Contfiable",
        "category": "Asesoría contable y fiscal",
        "description": "Contenido que explica temas contables y fiscales con claridad.",
        "logo": "/media/v2/logos/logo-16-1.svg",
        "photo": null,
        "color": "#14532d"
      },
      {
        "name": "Mimpre",
        "category": "Marca local",
        "description": "Contenido y campañas para sus redes.",
        "logo": "/media/v2/logos/logo-17-1.png",
        "photo": null,
        "color": "#334155"
      },
      {
        "name": "3WS",
        "category": "Marca local",
        "description": "Contenido y campañas para sus redes.",
        "logo": "/media/v2/logos/logo-20-0.png",
        "photo": null,
        "color": "#1f2937"
      },
      {
        "name": "Oki Premium",
        "category": "Detallado automotriz",
        "description": "Antes y después de sus servicios de detallado.",
        "logo": "/media/v2/logos/logo-21-0.png",
        "photo": null,
        "color": "#0b0b0f"
      },
      {
        "name": "CEECA",
        "category": "Centro de educación especial",
        "description": "Comunicación cercana para las familias de su centro.",
        "logo": "/media/v2/logos/logo-21-1.svg",
        "photo": null,
        "color": "#1565c0"
      },
      {
        "name": "California Frutería",
        "category": "Frutería",
        "description": "Contenido fresco de producto y promociones.",
        "logo": "/media/v2/logos/logo-22-0.svg",
        "photo": null,
        "color": "#d9480f"
      },
      {
        "name": "Sin Justificar",
        "category": "Marca local",
        "description": "Contenido y campañas para sus redes.",
        "logo": "/media/v2/logos/logo-22-1.png",
        "photo": null,
        "color": "#262626"
      }
    ],
    "isProvisional": true
  },
  "videos": {
    "title": "Así se ve",
    "script": "trabajar con Logik",
    "intro": "Videos de nuestro estudio y de los resultados de nuestros clientes.",
    "items": [
      {
        "title": "Así trabajamos",
        "description": "Video marketing, campañas efectivas y fotografía de producto.",
        "src": "/media/v2/videos/asi-trabajamos.mp4",
        "poster": "/media/v2/videos/asi-trabajamos.webp",
        "orientation": "horizontal"
      },
      {
        "title": "Campañas efectivas",
        "description": "Un mes de campaña: 72 mil personas, 141 mensajes y 5 citas.",
        "src": "/media/v2/videos/campanas-efectivas.mp4",
        "poster": "/media/v2/videos/campanas-efectivas.webp",
        "orientation": "vertical"
      }
    ]
  },
  "team": {
    "title": "Las mentes",
    "script": "detrás de Logik",
    "intro": "Dos mercadólogas que fundaron Logik y hoy dirigen al Marke-team.",
    "members": [
      {
        "name": "Diana Maldonado Medina",
        "role": "Directora · Publicidad pagada",
        "photo": "/media/v2/equipo/diana.webp",
        "summary": "Soy Diana Maldonado Medina, Licenciada en Mercadotecnia con 29 años y una sólida trayectoria de 5 años en el mundo del social media marketing. Mi experiencia abarca desde la planeación estratégica hasta el análisis de datos y resultados, siempre enfocada en obtener el máximo rendimiento para cada campaña.",
        "more": "Especialista en el área de Paid Media, domino plataformas clave como Meta Ads, TikTok Ads, LinkedIn Ads y Google Ads, gestionando estrategias publicitarias efectivas y personalizadas. He tenido la oportunidad de colaborar con más de 50 marcas de distintos giros, adaptándome a diversos sectores y necesidades, lo que me ha permitido desarrollar una visión integral y enfocada en resultados medibles.\n\nMi pasión por la mercadotecnia digital y mi compromiso con la excelencia me han llevado a construir campañas innovadoras, optimizar presupuestos y generar un impacto significativo en la presencia digital de las marcas con las que trabajo.",
        "badges": [
          {
            "image": "/media/v2/equipo/meta-certified.png",
            "label": "Meta Certified Media Buying Professional"
          }
        ]
      },
      {
        "name": "Abigail Alcántara",
        "role": "Directora · Contenido y comunidad",
        "photo": "/media/v2/equipo/abigail.webp",
        "summary": "Soy Abigail Alcantara, Licenciada en Mercadotecnia con 26 años y más de 5 años de experiencia en el ámbito del marketing digital. A lo largo de mi trayectoria, he trabajado en la planeación, desarrollo y ejecución de estrategias digitales que generan resultados medibles y valor para las marcas.",
        "more": "Especialista en Community Management y estrategias multicanal, domino la creación de contenido atractivo, fotografía de producto y campañas que fortalecen la conexión entre marcas y audiencias. He colaborado con más de 60 empresas de diferentes sectores, adaptando estrategias innovadoras para cada necesidad.\n\nMi pasión por el marketing digital, respaldada por una maestría en Marketing y Medios Digitales, me impulsa a crear campañas creativas, optimizar recursos y potenciar la presencia digital de las marcas con las que colaboro. Estoy comprometida con la excelencia y con ofrecer soluciones que marquen la diferencia.\n\n¡Juntos desarrollaremos el mejor potencial de tu empresa!",
        "badges": []
      }
    ],
    "isProvisional": true
  },
  "contact": {
    "title": "Hablemos de",
    "script": "tu marca",
    "intro": "Cuéntanos de tu negocio por WhatsApp. Te respondemos el mismo día.",
    "whatsapp": "5214492119107",
    "whatsappMessage": "Hola Logik, quiero agendar mi consulta gratis.",
    "phoneDisplay": "449 211 9107",
    "email": "logikmarketing1@gmail.com",
    "city": "Aguascalientes, México",
    "address": "Carretera Panamericana #107, Jesús Gómez Portugal, Ags. 20909",
    "instagram": "logikmkt",
    "facebook": "logikmkt",
    "tiktok": "logikmarketing",
    "linkedin": "logikmarketing",
    "isProvisional": true
  },
  "closing": {
    "invitation": "¿Empezamos este mes?",
    "ctaLabel": "Agenda tu consulta gratis"
  }
};
