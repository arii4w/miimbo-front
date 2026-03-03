export const miimboColors = {
  // Colores base
  brand: {
    // Azul profundo de fondo
    midnight: '#0B0829',
    // Naranja principal
    sunrise: '#FF8400',
    // Gris neutro para textos secundarios
    sky: '#8C8C8C',
    // Crema cálido para tarjetas/superficies
    sand: '#FFF0E1',
    // Fondo general claro
    linen: '#FEFBF7',
    // Naranja secundario y amarillo para acentos
    sunriseSoft: '#FFA909',
    gold: '#FFD563',
    muted: '#8C8C8C',
  },

  // Paletas por contexto de pantalla
  screens: {
    login: {
      background: '#FF8500',
      overlay: 'rgba(255, 255, 255, 0.12)',
      textPrimary: '#FEFBF7',
      textSecondary: '#F9DFC6',
      inputBackground: 'rgba(254, 251, 247, 0.9)',
      inputBorder: 'rgba(249, 223, 198, 0.9)',
      buttonBackground: '#0C0829',
      buttonText: '#FEFBF7',
    },
    register: {
      background: '#FF8500',
      overlay: 'rgba(254, 251, 247, 0.14)',
      textPrimary: '#FEFBF7',
      textSecondary: '#F9DFC6',
      inputBackground: 'rgba(254, 251, 247, 0.95)',
      inputBorder: 'rgba(249, 223, 198, 0.9)',
      buttonBackground: '#0C0829',
      buttonText: '#FEFBF7',
    },
    dashboard: {
      background: '#FEFBF7',
      sidebarBackground: '#FF8500',
      sidebarItemActive: 'rgba(254, 251, 247, 0.96)',
      sidebarItemHover: 'rgba(254, 251, 247, 0.85)',
      sidebarText: '#0C0829',
      cardBackground: '#F9DFC6',
      cardAccent: '#8FA0D8',
      textPrimary: '#0C0829',
      textSecondary: '#8FA0D8',
    },
  },

  // Gradientes principales usados en fondos grandes
  gradients: {
    // Fondo general de login/registro (naranja suave a crema)
    hero:
      'radial-gradient(circle at 0% 0%, #FFD16D 0%, rgba(255,209,109,0.0) 55%), radial-gradient(circle at 100% 100%, #EF422B 0%, rgba(239,66,43,0.0) 55%), linear-gradient(120deg, #F7981A 0%, #F57E1F 40%, #FFF0E1 100%)',
    // Sidebar: amarillo + naranjas + rosa
    sidebar: 'linear-gradient(180deg, #FFD563 0%, #FFA909 35%, #FF8400 65%, #F5AFA4 100%)',
    // Para botones destacados
    callToAction: 'linear-gradient(135deg, #FF8400 0%, #FFA909 40%, #FFD563 80%)',
    // Para fondos suaves de tarjetas
    cardSoft: 'linear-gradient(145deg, rgba(255,132,0,0.12) 0%, #FFF0E1 45%, #FEFBF7 100%)',
    // Techo superior (primer par de rectángulos, angular)
    roofTop:
      'conic-gradient(from 180deg at 50% 50%, #FFD16D 0deg, #FFD16D 30deg, #F7981A 140deg, #F57E1F 250deg, #EF422B 360deg)',
    // Techo inferior/brillo (segundo par de rectángulos, angular)
    roofBottom:
      'conic-gradient(from 180deg at 50% 50%, #FCB110 0deg, #FCB110 40deg, #EF872B 220deg, #EF872B 360deg)',
  },

  // Tokens para efecto "liquid glass" (fondos con blur + transparencia)
  glass: {
    light: {
      background: 'rgba(254, 251, 247, 0.75)',
      border: 'rgba(254, 251, 247, 0.9)',
      shadow: '0 24px 60px rgba(12, 8, 41, 0.22)',
    },
    warm: {
      background: 'rgba(249, 223, 198, 0.7)',
      border: 'rgba(254, 251, 247, 0.9)',
      shadow: '0 20px 55px rgba(12, 8, 41, 0.32)',
    },
    accent: {
      background: 'rgba(143, 160, 216, 0.32)',
      border: 'rgba(143, 160, 216, 0.9)',
      shadow: '0 18px 45px rgba(12, 8, 41, 0.42)',
    },
  },
} as const

export type MiimboColors = typeof miimboColors

