// ============================================
// BELLATERRA CONECTA — datos de las 5 puertas
// Fuente única para el home y para generar cada página de puerta.
// Coordenadas xPct/yPct verificadas visualmente sobre
// assets/general/aerea-hd.jpg — Player, Party e Impact con buena
// confianza. Hospitality = lado de la piscina (derecha de la casa,
// donde están las habitaciones reales junto a la piscina/terraza).
// Business = entre Impact y Hospitality; su pastilla se ancla POR
// DEBAJO del punto (pillY: calc(yPct + 14px)) en vez de encima, para
// no solaparse con la de Impact — si algún par vuelve a superponerse,
// usa calibrate.html y ajusta también el offset de la pastilla, no
// solo el punto. Posición movida de nuevo (2a corrección): la
// anterior caía sobre la cocina, no sobre lo que representa Business.
// ============================================

const BC_DOORS = [
  {
    id: "player", name: "Player", mono: "PL", accent: "#16302a",
    tagline: "Deporte, salud, comunidad",
    xPct: "30%", yPct: "58%", pillX: "30%", pillY: "calc(58% - 32px)",
    wiggleDelay: 0,
    heroImage: "assets/player/pistas-1.jpg",
    heroVideo: null, // ruta a .mp4 cuando esté generado con Higgsfield — mientras tanto se usa heroImage
    description: "Las pistas de pickleball son el uso principal de esta puerta: deporte, salud y comunidad al aire libre, en el mismo entorno donde ya se juegan partidas cada semana.",
    notices: ["El gimnasio está disponible como amenity de fin de semana — de lunes a viernes está alquilado a un entrenador personal."],
    gallery: [
      { src: "assets/player/pistas-2.jpg", tag: null },
      { src: "assets/player/pistas-3.jpg", tag: null },
      { src: "assets/player/pistas-4.jpg", tag: null },
      { src: "assets/player/pistas-5.jpg", tag: null },
      { src: "assets/player/pistas-6.jpg", tag: null },
      { src: "assets/player/gym-1.jpg", tag: "Fines de semana" },
      { src: "assets/player/gym-2.jpg", tag: "Fines de semana" },
    ],
    pricing: { badge: "59,90€ / año", title: "Abonado Plasty Player",
      items: ["Bonos de sesión a precio reducido", "Precio especial en alquiler de Party los sábados", "Precio especial en eventos de pickleball"] },
    consult: null, comingSoon: false, ctaLabel: "Hazte Abonado Plasty Player",
  },
  {
    id: "impact", name: "Impact", mono: "IM", accent: "#2d5c8a",
    tagline: "Empresas, team building",
    xPct: "59%", yPct: "36%", pillX: "59%", pillY: "calc(36% - 32px)",
    wiggleDelay: 0.6,
    heroImage: "assets/impact-business/comedor-1.jpg",
    heroVideo: null,
    description: "El comedor y la terraza chill-out se transforman en un espacio de reuniones y team building para empresas. Nota: esta puerta comparte ubicación física con Business, aunque son experiencias distintas.",
    notices: ["Este espacio comparte instalaciones — el porche trasero — con la puerta Party.", "Extra disponible en toda la finca: cocina equipada (add-on transversal) — a consultar."],
    gallery: [
      { src: "assets/impact-business/comedor-2.jpg", tag: null },
      { src: "assets/impact-business/comedor-3.jpg", tag: null },
      { src: "assets/impact-business/comedor-4.jpg", tag: null },
      { src: "assets/impact-business/terraza-1.jpg", tag: null },
      { src: "assets/impact-business/terraza-2.jpg", tag: null },
      { src: "assets/impact-business/terraza-3.jpg", tag: null },
      { src: "assets/impact-business/porche-1.jpg", tag: "Espacio compartido" },
      { src: "assets/general/cocina-1.jpg", tag: "Add-on" },
    ],
    pricing: null, consult: null, comingSoon: false,
    ctaLabel: "Solicitar información", noPricingNote: true,
  },
  {
    id: "party", name: "Party", mono: "PA", accent: "#d97b3f",
    tagline: "Celebraciones, familias",
    xPct: "92%", yPct: "45%", pillX: "calc(92% - 46px)", pillY: "calc(45% - 32px)",
    wiggleDelay: 1.2,
    heroImage: "assets/party/piscina-1.jpg",
    heroVideo: null,
    description: "La piscina y los jardines acogen celebraciones y encuentros familiares — estas son fotos reales de eventos ya celebrados en la finca, no imágenes de stock.",
    notices: ["El porche trasero se comparte con la puerta Impact.", "Precio especial en alquiler de Party los sábados para Abonados Plasty Player."],
    gallery: [
      { src: "assets/party/piscina-2.jpg", tag: null },
      { src: "assets/party/piscina-3.jpg", tag: null },
      { src: "assets/party/piscina-4.jpg", tag: null },
      { src: "assets/party/piscina-5.jpg", tag: null },
      { src: "assets/party/evento-real-1.jpg", tag: "Evento real" },
      { src: "assets/party/evento-real-2.jpg", tag: "Evento real" },
      { src: "assets/party/evento-real-3.jpg", tag: "Evento real" },
      { src: "assets/party/porche-1.jpg", tag: "Espacio compartido" },
    ],
    pricing: null,
    consult: ["Fotografía", "Vídeo", "DJ", "Decoración", "Barra de bebidas", "Carpa", "Catering a medida para bodas"],
    comingSoon: false, ctaLabel: "Solicitar presupuesto",
  },
  {
    id: "hospitality", name: "Hospitality", mono: "HO", accent: "#7a5c9e",
    tagline: "Alojamiento",
    xPct: "73%", yPct: "41%", pillX: "73%", pillY: "calc(41% - 32px)",
    wiggleDelay: 1.8,
    heroImage: "assets/hospitality/hab1-piscina-1.jpg",
    heroVideo: null,
    description: "Cuatro habitaciones reales, cada una con su propio carácter, dentro de la misma finca donde ocurre todo lo demás.",
    notices: [],
    gallery: [
      { src: "assets/hospitality/hab1-piscina-2.jpg", tag: "Cerca de la piscina" },
      { src: "assets/hospitality/hab1-piscina-3.jpg", tag: "Cerca de la piscina" },
      { src: "assets/hospitality/hab2-terraza-1.jpg", tag: "Con terraza" },
      { src: "assets/hospitality/hab2-terraza-2.jpg", tag: "Con terraza" },
      { src: "assets/hospitality/hab-literas-1.jpg", tag: "Literas — vistas y acceso a zona de empresas" },
      { src: "assets/hospitality/hab-literas-2.jpg", tag: "Literas — vistas y acceso a zona de empresas" },
      { src: "assets/hospitality/hab-abajo-1.jpg", tag: "Cerca de gimnasio y pistas" },
      { src: "assets/hospitality/hab-abajo-2.jpg", tag: "Cerca de gimnasio y pistas" },
    ],
    pricing: null, consult: null, comingSoon: false,
    ctaLabel: "Solicitar información", noPricingNote: true,
  },
  {
    id: "business", name: "Business", mono: "BU", accent: "#c79a2b",
    tagline: "Networking, oportunidades",
    xPct: "51%", yPct: "37%", pillX: "51%", pillY: "calc(37% + 14px)",
    wiggleDelay: 2.4,
    heroImage: "assets/general/entrada-1.jpg",
    heroVideo: null,
    description: "La puerta Business todavía no tiene un producto ni una tarifa definidos — la idea es networking empresarial. Comparte ubicación física con Impact, aunque son experiencias distintas. Únete a la lista de espera y serás de los primeros en saberlo.",
    notices: [],
    gallery: [{ src: "assets/general/entrada-2.jpg", tag: null }],
    pricing: null, consult: null, comingSoon: true,
    ctaLabel: "Apuntarme a la lista de espera",
  },
];

if (typeof module !== "undefined") module.exports = BC_DOORS;
