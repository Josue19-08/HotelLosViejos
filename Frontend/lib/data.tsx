import type {
  HotelInfo,
  NavItem,
  HeroContent,
  GalleryImage,
  Advertisement,
  Promotion,
  Facility,
  LocationInfo,
  RoomType,
} from "@/types"
import { BookOpen, Palmtree, MapPin, Phone, Info, CreditCard, Calendar } from "lucide-react"

// =====================================================================
// IMPLEMENTACIÓN ACTUAL: DATOS ESTÁTICOS
// =====================================================================

// Datos de facilidades simplificados
export const facilities: Facility[] = [
  {
    id: "pool",
    name: "Piscina Infinita",
    description:
      "Disfrute de nuestra espectacular piscina infinita con vistas panorámicas al océano. Perfecta para relajarse bajo el sol tropical mientras disfruta de su bebida favorita del bar de la piscina. Contamos con tumbonas cómodas y servicio de toallas.",
    image: "/images/piscina.png",
  },
  {
    id: "restaurant",
    name: "Restaurante El Velero",
    description:
      "Nuestro restaurante principal ofrece una exquisita selección de platos locales e internacionales. Con ingredientes frescos y locales, nuestro chef ejecutivo crea experiencias culinarias memorables en un ambiente elegante con vista al mar.",
    image: "/images/restaurante.png",
  },
  {
    id: "spa",
    name: "Spa & Wellness",
    description:
      "Rejuvenezca cuerpo y mente en nuestro spa de lujo. Ofrecemos una variedad de tratamientos terapéuticos, masajes y servicios de belleza. Nuestras cabinas privadas y ambiente tranquilo le garantizan una experiencia relajante.",
    image: "/images/spa.png",
  },
  {
    id: "gym",
    name: "Gimnasio",
    description:
      "Mantenga su rutina de ejercicios en nuestro moderno gimnasio equipado con máquinas cardiovasculares y de fuerza de última generación. Entrenadores personales disponibles bajo petición.",
    image: "/images/gimnasio.png",
  },
  {
    id: "beach-club",
    name: "Club de Playa",
    description:
      "Acceso exclusivo a nuestra playa privada con servicio de alimentos y bebidas. Disfrute de actividades acuáticas como kayak, paddleboard y snorkel, o simplemente relájese en nuestras cómodas hamacas bajo las palmeras.",
    image: "/images/club-playa.png",
  },
]

// Información del hotel
export const hotelInfo: HotelInfo = {
  name: "Hotel Los Viejos",
  slogan: "Su paraíso en la playa",
  description: "Disfrute de nuestras instalaciones de lujo y la mejor vista al mar.",
  longDescription: [
    "Hotel Los Viejos nació en 2005 con la visión de crear un paraíso tropical donde nuestros huéspedes pudieran experimentar la belleza natural de las playas más hermosas del mundo, combinada con el lujo y la comodidad de instalaciones de primera clase.",
    "Ubicado en una exclusiva zona costera, nuestro hotel ha sido diseñado para integrarse armoniosamente con el entorno natural, respetando el ecosistema y promoviendo prácticas sostenibles. Cada rincón de nuestras instalaciones ha sido cuidadosamente pensado para ofrecer una experiencia inolvidable.",
    "Nuestro equipo está formado por profesionales apasionados por la hospitalidad, dedicados a hacer de su estancia una experiencia excepcional. Desde nuestro chef ejecutivo hasta nuestro personal de limpieza, todos compartimos el mismo compromiso con la excelencia y la atención personalizada.",
    "En Hotel Los Viejos, no solo ofrecemos alojamiento, sino una experiencia completa que combina la belleza natural, la gastronomía local e internacional, actividades recreativas y el más alto nivel de servicio. Le invitamos a descubrir por qué somos el destino preferido de viajeros exigentes de todo el mundo.",
  ],
  mission:
    "Proporcionar experiencias vacacionales excepcionales en un entorno paradisíaco, donde cada huésped se sienta especial y cada momento sea memorable, manteniendo siempre un compromiso con la sostenibilidad y el respeto por nuestro entorno natural.",
  vision:
    "Ser reconocidos como el destino de playa más exclusivo y sostenible, estableciendo nuevos estándares en la industria hotelera a través de la innovación, el servicio personalizado y el compromiso con la conservación del medio ambiente.",
  foundedYear: 2005,
  contactInfo: {
    address: "Av. Playa Hermosa 123, Costa del Sol",
    phone: "+1 234 567 890",
    email: "info@hotellosviejo.com",
    hours: "24 horas, 7 días a la semana",
  },
  logo: "/images/logo.png",
}

export const navigationItems: NavItem[] = [
  { title: "Home", href: "/", icon: <Palmtree size={18} /> },
  { title: "Sobre Nosotros", href: "/sobre-nosotros", icon: <Info size={18} /> },
  { title: "Facilidades", href: "/facilidades", icon: <BookOpen size={18} /> },
  { title: "Como llegar?", href: "/como-llegar", icon: <MapPin size={18} /> },
  { title: "Tarifas", href: "/tarifas", icon: <CreditCard size={18} /> },
  { title: "Reservar en Línea", href: "/reservar", icon: <Calendar size={18} /> },
  { title: "Contáctenos", href: "/contactenos", icon: <Phone size={18} /> },
]

export const heroContent: HeroContent = {
  title: "Bienvenidos al Hotel Los Viejos",
  subtitle: "Su paraíso en la playa le espera. Disfrute de nuestras instalaciones de lujo y la mejor vista al mar.",
  primaryButtonText: "Reservar Ahora",
  secondaryButtonText: "Ver Habitaciones",
  backgroundImage: "/images/portada.png",
}

export const welcomeContent = {
  title: "Bienvenidos al Hotel Los Viejos",
  paragraphs: [
    "Ubicado en la hermosa costa, Hotel Los Viejos ofrece una experiencia única de hospedaje con vistas impresionantes al océano. Nuestras habitaciones están diseñadas para brindar el máximo confort y relajación durante su estadía.",
    "Disfrute de nuestras instalaciones de primera clase, incluyendo piscina infinita, restaurante gourmet, y acceso directo a la playa. Nuestro personal está dedicado a hacer de su visita una experiencia inolvidable.",
    "Ya sea que visite por negocios o placer, Hotel Los Viejos es su hogar lejos del hogar.",
    "Nuestro compromiso es brindarle una experiencia excepcional, donde cada detalle ha sido cuidadosamente pensado para su comodidad y disfrute. Desde el momento de su llegada, será recibido con la calidez y hospitalidad que nos caracteriza.",
  ],
  image: {
    src: "/images/hotel.png",
    alt: "Vista de playa tropical",
  },
  primaryButton: {
    text: "Conocer más sobre nosotros",
    href: "/sobre-nosotros",
  },
  secondaryButton: {
    text: "Ver galería",
    href: "/galeria",
  },
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/atardecer.png",
    alt: "Bungalows sobre el agua al atardecer con iluminación cálida",
    width: 1366,
    height: 768,
  },
  {
    id: "2",
    src: "/images/atardecer-gaviotas.png",
    alt: "Atardecer en la playa con gaviotas volando sobre el horizonte",
    width: 800,
    height: 533,
  },
  {
    id: "3",
    src: "/images/isla.png",
    alt: "Isla tropical paradisíaca con palmeras y canoa tradicional en aguas cristalinas",
    width: 1024,
    height: 768,
  },
  {
    id: "4",
    src: "/images/puesta-olas.png",
    alt: "Puesta de sol espectacular en la playa con palmeras y olas suaves",
    width: 736,
    height: 1308,
  },
  {
    id: "5",
    src: "/images/playa-turquesa.png",
    alt: "Playa tropical con aguas turquesas y arena blanca",
    width: 800,
    height: 600,
  },
  {
    id: "6",
    src: "/images/playa-panoramica.png",
    alt: "Vista panorámica de bungalows sobre el agua cristalina",
    width: 1920,
    height: 1080,
  },
]

// Publicidad
export const advertisements: Advertisement[] = [
  {
    id: 1,
    src: "/images/klm.png",
    alt: "Avión de KLM sobrevolando el mar",
    title: "Viaja con KLM",
    description: "Descubre el mundo con nuestras ofertas especiales",
  },
  {
    id: 2,
    src: "/images/coca-cola.png",
    alt: "Botella de Coca-Cola en la arena",
    title: "Refresca tu día",
    description: "Disfruta una Coca-Cola bien fría en la playa",
  },
  {
    id: 3,
    src: "/images/apple.png",
    alt: "iPhone sobre una toalla de playa",
    title: "Tecnología bajo el sol",
    description: "Descubre las últimas novedades de Apple",
  },
  {
    id: 4,
    src: "/images/playa-promo.png",
    alt: "Playa con palmeras y sombrillas",
    title: "Relájate en la playa",
    description: "Camastros y sombrillas disponibles",
  },
]

// Datos de ubicación y cómo llegar
export const locationInfo: LocationInfo = {
  address: "Liberia, Guanacaste, Costa Rica",
  coordinates: {
    lat: 10.6345,
    lng: -85.4407,
  },
  directions: [
    "Hotel Los Viejos está ubicado en el corazón de Liberia, la capital de la provincia de Guanacaste, Costa Rica. Nuestra propiedad se encuentra en una zona privilegiada, cerca de los principales atractivos de la ciudad y con fácil acceso a las hermosas playas del Pacífico.",
    "Liberia es conocida como 'La Ciudad Blanca' por sus edificios históricos de adobe blanco y es el centro cultural y económico de Guanacaste. Nuestro hotel está a solo 20 minutos del Aeropuerto Internacional Daniel Oduber y a aproximadamente 1 hora de las playas más populares como Tamarindo y Playa del Coco.",
    "Si necesita ayuda para llegar, no dude en contactar a nuestra recepción al +506 2666 1234. Estaremos encantados de proporcionarle indicaciones detalladas según su punto de partida.",
  ],
  transportOptions: [
    {
      type: "car",
      title: "En automóvil",
      description: "La forma más conveniente de llegar es en automóvil, siguiendo la carretera Interamericana.",
      details: [
        "Desde San José: Tome la Ruta 1 (Carretera Interamericana Norte) directamente hasta Liberia (aproximadamente 3 horas y 30 minutos).",
        "Desde el Aeropuerto Internacional Daniel Oduber: Tome la carretera principal hacia el centro de Liberia (aproximadamente 20 minutos).",
      ],
    },
    {
      type: "bus",
      title: "En autobús",
      description: "Hay servicios regulares de autobús desde San José y otras ciudades importantes.",
      details: [
        "Empresa Pulmitan de Liberia: Sale varias veces al día desde la Terminal 7-10 en San José.",
        "Tiempo aproximado de viaje desde San José: 4 horas.",
      ],
    },
    {
      type: "plane",
      title: "En avión",
      description: "La forma más rápida de llegar es volando al Aeropuerto Internacional de Liberia.",
      details: [
        "Vuelos internacionales directos desde Estados Unidos, Canadá y varios países europeos al Aeropuerto Internacional Daniel Oduber (LIR).",
        "Vuelos domésticos desde San José (SJO) con Sansa (25 minutos de vuelo).",
        "Ofrecemos servicio de traslado gratuito desde el aeropuerto con reserva previa.",
      ],
    },
    {
      type: "shuttle",
      title: "Servicio de transporte",
      description: "Ofrecemos servicio de transporte privado desde cualquier punto de Costa Rica.",
      details: [
        "Transporte privado disponible desde San José, playas de Guanacaste, Monteverde, Arenal y otros destinos populares.",
        "Reserva con al menos 24 horas de anticipación para garantizar disponibilidad.",
      ],
    },
  ],
}

// Datos de tipos de habitaciones
export const roomTypes: RoomType[] = [
  {
    id: "standard",
    name: "Habitación Standard",
    description:
      "Nuestras habitaciones Standard ofrecen una combinación perfecta de comodidad y estilo. Diseñadas para proporcionar un ambiente relajante después de un día de aventuras, estas habitaciones cuentan con todas las comodidades necesarias para una estancia placentera.",
    price: 120,
    capacity: {
      adults: 2,
      children: 1,
    },
    amenities: [
      "Cama King o dos camas individuales",
      "Aire acondicionado",
      "TV de pantalla plana",
      "Minibar",
      "Baño privado con ducha",
      "Artículos de tocador de cortesía",
      "Caja fuerte",
      "Wi-Fi gratuito",
    ],
    images: [
      {
        id: "standard-1",
        src: "/images/standard-1.png",
        alt: "Habitación Standard con cama king y vista al jardín",
        width: 800,
        height: 600,
      },
      {
        id: "standard-2",
        src: "/images/standard-2.png",
        alt: "Baño de la habitación Standard con ducha",
        width: 800,
        height: 600,
      },
    ],
  },
  {
    id: "junior",
    name: "Suite Junior",
    description:
      "Nuestras Suites Junior ofrecen un espacio más amplio y elegante para aquellos que buscan un poco más de lujo. Con una zona de estar separada y vistas panorámicas, estas suites son perfectas para parejas o viajeros de negocios que desean más espacio y comodidades.",
    price: 180,
    capacity: {
      adults: 2,
      children: 2,
    },
    amenities: [
      "Cama King size",
      "Sala de estar separada",
      "Balcón privado",
      "Aire acondicionado",
      'TV de pantalla plana de 42"',
      "Minibar surtido",
      "Cafetera Nespresso",
      "Baño completo con bañera y ducha",
      "Artículos de tocador premium",
      "Albornoz y zapatillas",
      "Caja fuerte digital",
      "Wi-Fi gratuito de alta velocidad",
    ],
    images: [
      {
        id: "junior-1",
        src: "/images/junior-1.png",
        alt: "Suite Junior con cama king y área de estar",
        width: 800,
        height: 600,
      },
      {
        id: "junior-2",
        src: "/images/junior-2.png",
        alt: "Balcón privado de la Suite Junior con vista al mar",
        width: 800,
        height: 600,
      },
    ],
  },
]

// =====================================================================
// IMPLEMENTACIÓN CON BASE DE DATOS: EJEMPLOS COMENTADOS
// =====================================================================

/*
// EJEMPLO DE IMPLEMENTACIÓN CON BASE DE DATOS: FACILIDADES SIMPLIFICADAS
export async function getFacilities(): Promise<Facility[]> {
  try {
    const response = await fetch('/api/facilities');
    
    if (!response.ok) {
      throw new Error('Error al obtener las facilidades');
    }
    
    const data = await response.json();
    
    // Transformar los datos para que coincidan con la interfaz Facility simplificada
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image_url
    }));
  } catch (error) {
    console.error('Error:', error);
    // Devolver datos por defecto en caso de error
    return facilities;
  }
}

// Obtener una facilidad específica por ID
export async function getFacilityById(id: string): Promise<Facility | null> {
  try {
    const response = await fetch(`/api/facilities/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener la facilidad con ID ${id}`);
    }
    
    const item = await response.json();
    
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image_url
    };
  } catch (error) {
    console.error('Error:', error);
    // Buscar en los datos estáticos como fallback
    return facilities.find(f => f.id === id) || null;
  }
}
*/

/*
// Ejemplo 1: Obtener información del hotel desde una API REST
export async function getHotelInfo(): Promise<HotelInfo> {
  try {
    // Realizar petición a la API
    const response = await fetch('/api/hotel-info');
    
    // Verificar si la respuesta es correcta
    if (!response.ok) {
      throw new Error('Error al obtener información del hotel');
    }
    
    // Convertir respuesta a JSON
    const data = await response.json();
    
    // Devolver datos con la estructura correcta según la interfaz HotelInfo
    return data;
  } catch (error) {
    console.error('Error:', error);
    
    // En caso de error, devolver datos por defecto
    return {
      name: "Hotel Los Viejos",
      slogan: "Su paraíso en la playa",
      description: "Disfrute de nuestras instalaciones de lujo y la mejor vista al mar.",
      longDescription: ["Información no disponible temporalmente"],
      mission: "Información no disponible",
      vision: "Información no disponible",
      foundedYear: 2005,
      contactInfo: {
        address: "Contacte para más información",
        phone: "Contacte para más información",
        email: "info@hotellosviejo.com",
        hours: "24 horas, 7 días a la semana"
      },
      logo: "/images/logo.png"
    };
  }
}

// Ejemplo 2: Obtener elementos de navegación desde una base de datos
export async function getNavigationItems(): Promise<NavItem[]> {
  try {
    const response = await fetch('/api/navigation');
    
    if (!response.ok) {
      throw new Error('Error al obtener elementos de navegación');
    }
    
    const data = await response.json();
    
    // Mapear los datos para asegurar que tienen la estructura correcta
    // y añadir los iconos correspondientes
    return data.map(item => {
      // Asignar el icono correcto según el título o ID del elemento
      let icon;
      switch(item.id) {
        case 'home': icon = <Palmtree size={18} />; break;
        case 'about': icon = <Info size={18} />; break;
        case 'facilities': icon = <BookOpen size={18} />; break;
        // ... otros casos
        default: icon = null;
      }
      
      return {
        title: item.title,
        href: item.url,
        icon,
        isActive: false // Se actualizará en el componente
      };
    });
  } catch (error) {
    console.error('Error:', error);
    // Devolver navegación básica en caso de error
    return navigationItems; // Usar los datos estáticos como fallback
  }
}

// Ejemplo 3: Obtener imágenes de la galería con paginación
export async function getGalleryImages(page = 1, limit = 10): Promise<{
  images: GalleryImage[],
  totalPages: number,
  currentPage: number
}> {
  try {
    const response = await fetch(`/api/gallery?page=${page}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener imágenes de la galería');
    }
    
    const data = await response.json();
    
    // Transformar los datos para que coincidan con la interfaz GalleryImage
    const images = data.items.map(item => ({
      id: item.id.toString(),
      src: item.imageUrl,
      alt: item.description || 'Imagen de galería',
      width: item.width || 800,
      height: item.height || 600,
      featured: item.featured || false
    }));
    
    return {
      images,
      totalPages: data.totalPages,
      currentPage: data.currentPage
    };
  } catch (error) {
    console.error('Error:', error);
    // Devolver datos de ejemplo en caso de error
    return {
      images: galleryImages.slice(0, limit),
      totalPages: 1,
      currentPage: 1
    };
  }
}

// Ejemplo 4: Obtener contenido del hero con A/B testing
export async function getHeroContent(): Promise<HeroContent> {
  try {
    // Obtener el ID de usuario o sesión para A/B testing
    const userId = localStorage.getItem('user_id') || 'anonymous';
    
    const response = await fetch(`/api/hero-content?user=${userId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener contenido del hero');
    }
    
    const data = await response.json();
    
    // Registrar impresión para análisis
    await fetch('/api/analytics/impression', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        component: 'hero', 
        variant: data.variant,
        userId 
      })
    });
    
    return {
      title: data.title,
      subtitle: data.subtitle,
      primaryButtonText: data.cta_primary,
      secondaryButtonText: data.cta_secondary,
      backgroundImage: data.background_image
    };
  } catch (error) {
    console.error('Error:', error);
    // Devolver contenido por defecto en caso de error
    return heroContent;
  }
}

// Ejemplo 5: Obtener promociones activas según la fecha
export async function getActivePromotions(): Promise<Promotion[]> {
  try {
    // Obtener fecha actual para filtrar promociones activas
    const today = new Date().toISOString().split('T')[0];
    
    const response = await fetch(`/api/promotions?active_on=${today}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener promociones');
    }
    
    const data = await response.json();
    
    // Transformar los datos para que coincidan con la interfaz Promotion
    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      discountPercentage: item.discount,
      validUntil: item.end_date,
      buttonText: item.cta_text || 'Reservar ahora'
    }));
  } catch (error) {
    console.error('Error:', error);
    // Devolver promoción por defecto en caso de error
    return [promotion];
  }
}
*/

