import { Link, useNavigate } from 'react-router-dom' // 1. Importamos useNavigate
import { miimboColors } from '../theme/colors'
import pantalla from '../assets/Pantalla.svg'
import fondoMivivienda from '../assets/fondomivivienda.svg'
import techoPropio from '../assets/techopropio.svg'

export function Login() {
  const navigate = useNavigate() // 2. Inicializamos el hook de navegación

  // 3. Creamos la función que manejará el envío del formulario
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Evita que la página se recargue por defecto
    
    // Aquí irían las validaciones en el futuro (las dejamos comentadas)
    // if (email === '' || password === '') {
    //   alert('Por favor ingresa tus datos')
    //   return
    // }

    // Redirige directamente a la ruta Home
    navigate('/')
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${pantalla})`,
      }}
    >
      {/* Logos esquina inferior */}
      <img
        src={fondoMivivienda}
        alt="Fondo Mivivienda"
        className="pointer-events-none select-none absolute bottom-6 left-10 h-20 w-auto"
      />
      <img
        src={techoPropio}
        alt="Techo Propio"
        className="pointer-events-none select-none absolute bottom-7 right-10 h-20 w-auto"
      />

      <div className="relative max-w-[320px] w-full">
        {/* Marca fuera del formulario */}
        <div className="mb-3 text-center">
          <p
            className="text-[10px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: '#FEFBF7' }}
          >
            MIIMBO
          </p>
        </div>

        <div
          className="rounded-[24px] px-6 py-6 border backdrop-blur-2xl shadow-[0_14px_60px_rgba(255,209,109,0.85)]"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,132,0,0.65) 0%, rgba(255,168,9,0.55) 40%, rgba(255,240,225,0.85) 100%)',
            borderColor: miimboColors.glass.warm.border,
          }}
        >
          <h1
            className="mb-4 text-lg font-semibold text-center tracking-tight"
            style={{ color: '#FEFBF7' }}
          >
            Iniciar Sesión
          </h1>

          {/* 4. Le agregamos el evento onSubmit al formulario */}
          <form className="space-y-3" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="w-full rounded-full border px-4 py-2 text-xs outline-none bg-[rgba(254,251,247,0.95)] placeholder:text-gray-700/70"
              style={{
                borderColor: 'rgba(255,255,255,0.35)',
                color: miimboColors.brand.midnight,
              }}
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="w-full rounded-full border px-4 py-2 text-xs outline-none bg-[rgba(254,251,247,0.95)] placeholder:text-gray-700/70"
              style={{
                borderColor: 'rgba(255,255,255,0.35)',
                color: miimboColors.brand.midnight,
              }}
            />

            <button
              type="submit"
              className="mt-4 w-full rounded-full text-xs font-semibold tracking-wide py-2 transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(230, 140, 70, 0.3)',
                color: '#FEFBF7',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center" style={{ color: 'rgba(254,251,247,0.9)' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/crear-cuenta" className="underline font-medium" style={{ color: '#FFF0E1' }}>
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}