// Generado por backend/scripts/export-content.js a partir de backend/seeders/initial-content.js.
// No lo edites a mano: cambia el seeder y corre `npm run content:export` en backend/.
import { SiteSettings } from '../types/settings.model';

export const INITIAL_CONTENT: SiteSettings = {
  "brand": {
    "name": "Logik Marketing",
    "tagline": "Estrategas del mercado digital",
    "phrase": "No hacemos magia, hacemos marketing."
  },
  "hero": {
    "titleStart": "No hacemos magia,",
    "titleEnd": "hacemos marketing.",
    "subtitle": "Agencia de marketing digital en Aguascalientes. Redes, contenido y campañas de Meta para pymes de todo México.",
    "ctaLabel": "Agenda tu consulta gratis",
    "facts": [
      "6 años",
      "+70 clientes",
      "Equipo a nivel nacional"
    ],
    "reelVideo": "/media/hero/reel.mp4",
    "reelPoster": "/media/hero/reel.webp",
    "reelAlt": "Grabación de contenido en el estudio de Logik"
  },
  "results": {
    "title": "Así amanecemos casi a diario.",
    "annotation": "¡resultados reales!",
    "intro": "Son notificaciones de Meta Ads de campañas de nuestros clientes, tal como las compartimos en nuestras historias.",
    "notifications": [
      {
        "percent": 97,
        "time": "hace 9 min"
      },
      {
        "percent": 96,
        "time": "hace 37 min"
      },
      {
        "percent": 85,
        "time": "12:59 a. m."
      },
      {
        "percent": 64,
        "time": "ahora"
      },
      {
        "percent": 41,
        "time": "hace 2 h"
      }
    ],
    "highlight": {
      "value": "+200",
      "label": "mensajes al mes, a menos de **$8** cada uno",
      "note": "Dos clínicas de Aguascalientes, campañas de agosto y septiembre."
    },
    "estimator": {
      "title": "¿Cuántos mensajes te daría tu presupuesto?",
      "minCost": 7,
      "maxCost": 14,
      "minBudget": 1000,
      "maxBudget": 15000,
      "step": 500,
      "defaultBudget": 3000,
      "note": "Estimación con el costo por conversación de campañas reales de Logik ($7 a $14). Cada giro es distinto.",
      "ctaLabel": "Quiero esos mensajes"
    },
    "isProvisional": true
  },
  "services": {
    "title": "Todo tu marketing, en un solo equipo.",
    "items": [
      {
        "title": "Manejo de redes",
        "description": "Facebook, Instagram y TikTok con **calendario mensual**, publicaciones, historias y respuesta a tu comunidad.",
        "image": "/media/servicios/redes.webp",
        "imageAlt": "Publicaciones de Logik para sus clientes"
      },
      {
        "title": "Contenido y fotografía",
        "description": "Grabamos reels y hacemos **fotografía de producto** en nuestro estudio o en tu negocio.",
        "image": "/media/servicios/fotografia.webp",
        "imageAlt": "Fotografía de producto: helado de Techani"
      },
      {
        "title": "Campañas de publicidad",
        "description": "Meta, Google y TikTok Ads con planeación de medios y **optimización semanal**. Certificadas por Meta.",
        "image": "/media/servicios/campanas.webp",
        "imageAlt": "Revisión de una campaña en el administrador de anuncios de Meta"
      },
      {
        "title": "Identidad de marca",
        "description": "Logotipo, naming y **manual de identidad** para que tu marca se vea igual en todos lados.",
        "image": "/media/servicios/identidad.webp",
        "imageAlt": "Diseños de marca hechos por Logik"
      },
      {
        "title": "Páginas web y landing pages",
        "description": "Sitios rápidos para tus campañas, con **pixel de Meta y botón de WhatsApp**, para que cada anuncio termine en una venta.",
        "image": "/media/servicios/web.webp",
        "imageAlt": "Equipo de Logik trabajando en una laptop"
      },
      {
        "title": "Asesoría mercadológica",
        "description": "Análisis situacional, **FODA** y estrategia para saber a quién hablarle y cómo.",
        "image": "/media/servicios/asesoria.webp",
        "imageAlt": "Reunión de planeación en la oficina de Logik"
      }
    ]
  },
  "showcase": {
    "title": "Más de 70 marcas.",
    "video": "/media/showcase/marcas.mp4",
    "poster": "/media/showcase/marcas.webp",
    "caption": "Ya crecen con nosotras. Así se ve un mes con Logik."
  },
  "work": {
    "lead": "Hemos hecho crecer",
    "items": [
      {
        "name": "Hampton by Hilton",
        "image": "/media/trabajo/hampton.webp"
      },
      {
        "name": "Techani",
        "image": "/media/trabajo/techani.webp"
      },
      {
        "name": "GASE Dental Group",
        "image": "/media/trabajo/gase.webp"
      },
      {
        "name": "Secret Plus",
        "image": "/media/trabajo/secret-plus.webp"
      },
      {
        "name": "Desperrucados",
        "image": "/media/trabajo/desperrucados.webp"
      },
      {
        "name": "Novedades y Cosméticos",
        "image": "/media/trabajo/novedades.webp"
      },
      {
        "name": "Li-Kaan",
        "image": "/media/trabajo/li-kaan.webp"
      },
      {
        "name": "Glüu",
        "image": "/media/trabajo/gluu.webp"
      },
      {
        "name": "Plan B",
        "image": "/media/trabajo/plan-b.webp"
      },
      {
        "name": "Olaya",
        "image": null
      },
      {
        "name": "Shekinah Amma",
        "image": null
      },
      {
        "name": "Pepe's Burgers",
        "image": null
      },
      {
        "name": "La Patrona",
        "image": null
      },
      {
        "name": "Camelia",
        "image": null
      },
      {
        "name": "Holistik",
        "image": null
      },
      {
        "name": "Sr. Sorbete",
        "image": null
      }
    ],
    "note": "Más de 70 marcas en Aguascalientes, Chihuahua, Zacatecas, Guanajuato, CDMX y Jalisco, desde 2020.",
    "isProvisional": true
  },
  "process": {
    "steps": [
      {
        "verb": "Analizamos",
        "text": "Revisamos tu negocio, tu competencia y tus números antes de publicar nada.",
        "image": "/media/proceso/analizamos.webp",
        "imageAlt": "El equipo de Logik en una reunión de planeación"
      },
      {
        "verb": "Creamos",
        "text": "Grabamos y diseñamos en nuestro estudio, con un calendario aprobado por ti.",
        "image": "/media/proceso/creamos.webp",
        "imageAlt": "Grabación con aros de luz en el estudio de Logik"
      },
      {
        "verb": "Anunciamos",
        "text": "Lanzamos campañas con un presupuesto claro y las optimizamos cada semana.",
        "image": "/media/proceso/anunciamos.webp",
        "imageAlt": "Laptop con el administrador de anuncios abierto"
      },
      {
        "verb": "Medimos",
        "text": "Cada mes recibes un reporte con lo que funcionó y lo que vamos a mejorar.",
        "image": "/media/proceso/medimos.webp",
        "imageAlt": "Reporte mensual de resultados en una tableta"
      }
    ]
  },
  "packages": {
    "lead": "Tus redes, desde",
    "price": "$2,499",
    "period": "al mes.",
    "includes": "Estrategia integral, 10 publicaciones, una campaña con 4 anuncios, portada de Facebook, análisis situacional y reporte de resultados. **La primera consulta es gratis.**",
    "ctaLabel": "Quiero este paquete",
    "others": [
      {
        "name": "Emprendedor",
        "description": "Facebook e Instagram, 12 publicaciones con 5 reels, historias, 1 campaña y sesión de contenido de 1 hora.",
        "price": null
      },
      {
        "name": "Paquete'n Redes",
        "description": "Facebook, Instagram y TikTok, 18 publicaciones con 8 reels, 2 campañas y remarketing.",
        "price": null
      },
      {
        "name": "Paquete Flash",
        "description": "Contenido profesional y una campaña publicitaria, para resultados rápidos.",
        "price": null
      }
    ],
    "note": "El presupuesto para anuncios se paga aparte, directo a Meta.",
    "isProvisional": true
  },
  "testimonials": {
    "featured": {
      "quote": "Se interesan no solo por cumplir.",
      "name": "Roberto Chávez",
      "role": "Cliente",
      "source": "Recomendación en Facebook"
    },
    "items": [
      {
        "quote": "Excelente trato, son un equipo increíble. Muy profesionales, recomiendo ampliamente su servicio.",
        "name": "Xochitl Serna"
      },
      {
        "quote": "Un servicio muy profesional, siempre atentas con nosotros los clientes.",
        "name": "César Eduardo Quezada"
      },
      {
        "quote": "Buen rendimiento del equipo y atención constante sobre el marketing.",
        "name": "Alejandro Egure"
      }
    ]
  },
  "team": {
    "body": "**Diana Maldonado y Abigail Alcántara** fundaron Logik hace seis años con una idea sencilla: que una pyme de Aguascalientes pudiera tener el mismo marketing que una gran marca.",
    "second": "Diana compra los anuncios y es Meta Certified Media Buying Professional; Abigail dirige el contenido y la fotografía. Hoy son un equipo de mujeres con oficina y estudio propios, al que ellas llaman el Marke-team.",
    "portrait": "/media/equipo/fundadoras.webp",
    "portraitAlt": "Diana Maldonado y Abigail Alcántara",
    "facts": [
      "Jesús Gómez Portugal, Ags.",
      "Desde 2020",
      "Meta Certified"
    ],
    "photos": [
      {
        "src": "/media/equipo/oficina.webp",
        "alt": "El equipo de Logik en su oficina"
      },
      {
        "src": "/media/equipo/estudio.webp",
        "alt": "Grabación en el estudio de Logik"
      }
    ],
    "isProvisional": true
  },
  "contact": {
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
    "isProvisional": true
  },
  "closing": {
    "invitation": "¿Empezamos este mes?",
    "ctaLabel": "Agenda tu consulta gratis"
  }
};
