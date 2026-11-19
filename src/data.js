export const ESTRATEGIA_DJS = {
  empresa: "DJS NEW WORLD",
  consultora: "Vanguardia & Estrategia Consultores S.A.S.",
  mision: "Somos una empresa dedicada a la creación de prendas de alta calidad que combinan diseño moderno, funcionalidad y durabilidad. Buscamos superar las expectativas de nuestros clientes al proporcionar productos que no solo sigan las últimas tendencias de moda, sino que también sean fabricados de manera ética y sostenible, impulsando la innovación en cada proceso de producción, desde la elección de materiales hasta la distribución final.",
  vision: "Para el 2028, ser reconocidos como líderes en la industria de la confección de chaquetas y otros productos, destacándonos por nuestra innovación en cada elección, calidad excepcional y compromiso con la sostenibilidad. Nos esforzamos por ser la marca preferida en la moda, ofreciendo productos que reflejen estilo, comodidad y contribuyan al bienestar de la sociedad.",
  diagnostico7S: {
    estrategia: "2.25 / 5 (Brecha crítica en conexión rol-objetivos)",
    sistemas: "3.25 / 5 (Conocimiento tácito sin estandarizar)",
    habilidades: "3.25 / 5 (Necesidad de competencias digitales)",
    culturaBase: "4.16 / 5 (Alto liderazgo, valores y sentido de pertenencia)"
  }
};

export const COLABORADORES_INICIALES = [
  { id: 1, nombre: "Carlos Mendoza", cargo: "Cortador Principal", area: "Taller Bosa", tipo: "Planta" },
  { id: 2, nombre: "Marta Lucía Gómez", cargo: "Operaria Fileteadora", area: "Taller Bosa", tipo: "Planta" },
  { id: 3, nombre: "Jorge Eliécer Ruiz", cargo: "Confeccionista Chaquetas", area: "Taller Bosa", tipo: "Prestador Servicios" },
  { id: 4, nombre: "Sandra Milena Ortiz", cargo: "Control Calidad y Terminado", area: "Taller Bosa", tipo: "Planta" },
  { id: 5, nombre: "Luis Alberto Peña", cargo: "Operario Guateado / Puffer", area: "Taller Bosa", tipo: "Prestador Servicios" },
  { id: 6, nombre: "Diana Carolina Vargas", cargo: "Patronista y Muestras", area: "Taller Bosa", tipo: "Planta" },
  { id: 7, nombre: "Andrés Felipe Castro", cargo: "Asesor Mayorista El Gran San", area: "El Gran San", tipo: "Planta" },
  { id: 8, nombre: "Laura Valentina Díaz", cargo: "Vendedora Punto Físico", area: "El Gran San", tipo: "Planta" },
  { id: 9, nombre: "Camilo Andrés Torres", cargo: "Bodega y Despachos San Victorino", area: "El Gran San", tipo: "Planta" },
  { id: 10, nombre: "Paola Andrea Herrera", cargo: "Atención Clientes y Redes", area: "El Gran San", tipo: "Prestador Servicios" },
  { id: 11, nombre: "Héctor Fabio Morales", cargo: "Impulsador Temporada", area: "El Gran San", tipo: "Prestador Servicios" },
  { id: 12, nombre: "Juan David Rojas", cargo: "Dirección Comercial y Estrategia", area: "Administración", tipo: "Gerencia" },
  { id: 13, nombre: "Salvador Rojas", cargo: "Gerencia General / Fundador", area: "Administración", tipo: "Gerencia" },
  { id: 14, nombre: "Natalia Sofía Jiménez", cargo: "Compras e Insumos Textiles", area: "Administración", tipo: "Planta" },
  { id: 15, nombre: "Ricardo León Silva", cargo: "Logística Inter-sedes", area: "Administración", tipo: "Prestador Servicios" }
];

export const FRENTES_FASE_1 = [
  "Desarrollo de nuevos productos",
  "Tendencias emergentes del mercado",
  "Necesidades no satisfechas de clientes",
  "Optimización de procesos productivos",
  "Reducción de desperdicios y costos",
  "Agilización de procesos comerciales",
  "Fortalecimiento de canales digitales",
  "Experiencia y servicio al cliente"
];

export const CRITERIOS_FASE_4 = [
  { id: "estrategia", titulo: "Alineación Estratégica", pregunta: "¿Contribuye directamente a la Visión 2028 y objetivos de DJS NEW WORLD?" },
  { id: "valorCliente", titulo: "Valor para el Cliente", pregunta: "¿Responde a una necesidad real de mayoristas o cliente final?" },
  { id: "viabilidad", titulo: "Viabilidad Técnica", pregunta: "¿Puede desarrollarse con los recursos y maquinaria actuales?" },
  { id: "innovacion", titulo: "Innovación", pregunta: "¿Representa una mejora sustancial frente a la competencia importada?" },
  { id: "potencialComercial", titulo: "Potencial Comercial", pregunta: "¿Genera nuevas oportunidades de venta o fidelización?" },
  { id: "impactoInterno", titulo: "Impacto Interno", pregunta: "¿Optimiza tiempos, costos o estandariza procesos en Bosa/Gran San?" }
];

export const PROPUESTAS_INICIALES = [
  {
    id: 101,
    titulo: "Línea Cápsula Eco-Aviador con Retazos de Cuerina y Ovejero",
    equipo: "Equipo Innovación Bosa-SanVic",
    integrantes: ["Carlos Mendoza (Taller Bosa)", "Andrés Felipe Castro (El Gran San)", "Natalia Sofía Jiménez (Administración)"],
    sedeOrigen: "Taller Bosa",
    frente: "Reducción de desperdicios y costos",
    estado: "Aprobado a Piloto",
    imagen: "/chaqueta-aviador.png",
    criteriosAprobados: ["estrategia", "valorCliente", "viabilidad", "innovacion", "impactoInterno"],
    ochoPuntos: {
      problema: "En el corte de chaquetas aviador infantiles queda un 14% de retazos útiles de cuerina café y tela ovejero que hoy se desechan.",
      solucion: "Crear una colección edición limitada de chalecos infantiles y accesorios combinados aprovechando los sobrantes de corte.",
      justificacion: "Cumple directamente con el compromiso de sostenibilidad y fabricación ética declarado en la Misión de DJS NEW WORLD.",
      valor: "Reduce el desperdicio textil en un 60% y ofrece a los mayoristas de El Gran San un producto de entrada de alto margen.",
      recursos: "Moldes base adaptados, 40 horas de confección post-temporada en Bosa y etiquetas especiales de edición sostenible.",
      viabilidad: "Alta. Se fabrica con la misma maquinaria plana y fileteadora actual sin comprar insumos nuevos.",
      potencial: "Retorno estimado del 38% sobre costo de mano de obra; proyección de venta de 250 unidades en el primer lote.",
      prototipo: "Muestra física de chaleco aviador infantil talla 6-8 con parche circular DJS bordado."
    }
  },
  {
    id: 102,
    titulo: "Catálogo Mayorista Express WhatsApp + Preventa Digital",
    equipo: "Conexión Digital DJS",
    integrantes: ["Paola Andrea Herrera (El Gran San)", "Diana Carolina Vargas (Taller Bosa)", "Juan David Rojas (Administración)"],
    sedeOrigen: "El Gran San",
    frente: "Fortalecimiento de canales digitales",
    estado: "Listo para Pitch",
    imagen: "/chaqueta-puffer.png",
    criteriosAprobados: ["estrategia", "valorCliente", "viabilidad", "potencialComercial"],
    ochoPuntos: {
      problema: "La caída de ventas presenciales en San Victorino frente a plataformas asiáticas exige captar pedidos mayoristas antes de fabricar.",
      solucion: "Implementar un catálogo digital interactivo con fotos reales de muestras y toma de pedidos anticipados por WhatsApp Business.",
      justificacion: "Alinea la operación comercial con la Visión 2028 de liderazgo y modernización de canales de distribución.",
      valor: "Permite a clientes de otras ciudades reservar curvas de tallas en chaquetas puffer tricolor sin viajar a Bogotá.",
      recursos: "Sesión fotográfica con modelos infantiles/adultos, catálogo PDF/Web ligero y capacitación digital al equipo comercial.",
      viabilidad: "Inmediata. Requiere baja inversión y aprovecha el posicionamiento de los vendedores actuales.",
      potencial: "Incremento proyectado del 22% en pedidos recurrentes fuera de Bogotá durante temporada media.",
      prototipo: "Mockup de catálogo digital interactivo con tabla de curvas mayoristas y botón directo a asesor."
    }
  },
  {
    id: 103,
    titulo: "Estandarización de Fichas Técnicas y Guías de Costura Puffer",
    equipo: "Calidad Sin Fronteras",
    integrantes: ["Sandra Milena Ortiz (Taller Bosa)", "Luis Alberto Peña (Taller Bosa)", "Camilo Andrés Torres (El Gran San)"],
    sedeOrigen: "Taller Bosa",
    frente: "Optimización de procesos productivos",
    estado: "En Mentoría",
    imagen: "/coleccion-djs.png",
    criteriosAprobados: ["estrategia", "viabilidad", "impactoInterno"],
    ochoPuntos: {
      problema: "El diagnóstico 7S mostró que los procedimientos dependen de la memoria de cada operario (2/5 en sistemas escritos), generando reprocesos.",
      solucion: "Crear fichas técnicas visuales plastificadas por referencia (Varsity, Puffer, Denim) en cada módulo de máquina en Bosa.",
      justificacion: "Transforma el conocimiento tácito en conocimiento organizacional explícito para garantizar calidad excepcional.",
      valor: "Disminuye en un 35% los tiempos de ajuste cuando ingresan prestadores de servicio nuevos en temporada alta.",
      recursos: "Diseño de 10 fichas visuales, plastificado industrial y 2 jornadas de capacitación entre pares ('Aprendo de ti').",
      viabilidad: "Muy alta. Costo mínimo y alto impacto operativo inmediato.",
      potencial: "Ahorro estimado de 18 horas semanales de reproceso y reducción de devoluciones en punto de venta.",
      prototipo: "Ejemplo de ficha técnica visual tamaño carta para chaqueta Varsity con puntos críticos de control."
    }
  }
];
