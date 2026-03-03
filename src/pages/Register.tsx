import { Link } from 'react-router-dom'
import { miimboColors } from '../theme/colors'
import pantalla from '../assets/Pantalla.svg'
import fondoMivivienda from '../assets/fondomivivienda.svg'
import techoPropio from '../assets/techopropio.svg'

export function Register() {
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

      {/* 1. Redujimos el ancho de max-w-sm a max-w-[320px] para hacerlo más angosto */}
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

        {/* 2. Redujimos el padding de px-7 py-7 a px-6 py-6 */}
        <div
          className="rounded-[24px] px-6 py-6 border backdrop-blur-2xl shadow-[0_14px_60px_rgba(255,209,109,0.85)]"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,132,0,0.65) 0%, rgba(255,168,9,0.55) 40%, rgba(255,240,225,0.85) 100%)',
            borderColor: miimboColors.glass.warm.border,
          }}
        >
          {/* Redujimos un poco el tamaño del título de text-xl a text-lg */}
          <h1
            className="mb-4 text-lg font-semibold text-center tracking-tight"
            style={{ color: '#FEFBF7' }}
          >
            Crear Cuenta
          </h1>

          {/* Redujimos el espacio entre elementos (space-y-2.5 en lugar de 3) */}
          <form className="space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <Input label="Nombre" />
              <Input label="Apellidos" />
            </div>
            <Input label="Número de Documento" />
            <Input label="Correo Electrónico" type="email" />
            <Input label="Contraseña" type="password" />

            <button
              type="submit"
              className="mt-4 w-full rounded-full text-xs font-semibold tracking-wide py-2 transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(230, 140, 70, 0.3)', // Color translúcido más fiel a la imagen 1
                color: '#FEFBF7',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              }}
            >
              Crear Cuenta
            </button>
          </form>

          {/* Nota: En tu imagen 1 este texto no aparece, si quieres que sea EXACTO puedes borrar este <p> */}
          <p className="mt-4 text-[11px] text-center" style={{ color: 'rgba(254,251,247,0.9)' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="underline font-medium" style={{ color: '#FFF0E1' }}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

type InputProps = {
  label: string
  type?: string
}

// 3. Modificamos el componente Input para que no tenga <label> externo 
// y use el placeholder por dentro. También redujimos su py-2.5 a py-2 y su texto a text-xs.
function Input({ label, type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      placeholder={label}
      className="w-full rounded-full border px-4 py-2 text-xs outline-none bg-[rgba(254,251,247,0.95)] placeholder:text-gray-700/70"
      style={{
        borderColor: 'rgba(255,255,255,0.35)',
        color: miimboColors.brand.midnight,
      }}
    />
  )
}