import { useState } from 'react'
import { miimboColors } from '../theme/colors'

export function Clients() {
  // Estado para controlar la visibilidad del modal de "Nuevo Cliente"
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-8 relative">
      {/* Cabecera con Botón de Nuevo Cliente */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
            Clientes
          </h1>
          <p className="text-sm" style={{ color: 'rgba(12,8,41,0.6)' }}>
            Actualmente existen 56 clientes registrados.
          </p>
        </div>
        
        <PrimaryBarButton 
          label="+ Nuevo Cliente" 
          onClick={() => setIsModalOpen(true)}
          className="w-auto px-8 py-2.5" 
        />
      </header>

      <section className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-6 xl:gap-8">
        
        {/* Lado Izquierdo: Solo la Tabla de Clientes (ahora ocupa todo el alto) */}
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
            Clientes Registrados
          </h2>
          <ClientsTable />
        </div>

        {/* Lado Derecho: Panel lateral (Amarillo a crema) con detalles del cliente seleccionado */}
        <Panel variant="yellow" title="Cliente 1">
          <div className="space-y-5">
            {/* Bloque 1: Datos Personales */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(12,8,41,0.5)' }}>
                Datos Personales
              </h3>
              <div className="space-y-2">
                <InlineDisplay label="Nombre" value="Juan" />
                <InlineDisplay label="Apellidos" value="Pérez" />
                <InlineDisplay label="DNI" value="12345678" />
                <InlineDisplay label="Edad" value="35" />
                <InlineDisplay label="Correo" value="cliente@gmail.com" />
                <InlineDisplay label="Teléfono" value="999 999 999" />
              </div>
              <div className="pt-1 flex items-center gap-3">
                <input id="cliente1-posee-propiedades" type="checkbox" defaultChecked className="h-4 w-4 rounded border-[rgba(12,8,41,0.2)] accent-[#E5A845]" />
                <label htmlFor="cliente1-posee-propiedades" className="text-[11px] font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
                  Posee propiedades
                </label>
              </div>
            </div>

            <hr className="border-t border-white/50" />

            {/* Bloque 2: Perfil Financiero */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(12,8,41,0.5)' }}>
                Perfil Financiero
              </h3>
              <div className="space-y-2">
                <InlineDisplay label="Historial" value="Bueno" />
                <InlineDisplay label="Moneda" value="Soles (S/.)" />
                <InlineDisplay label="Salario" value="5000" />
                <InlineDisplay label="Ingr. Familiar" value="8500" />
              </div>
            </div>

            <hr className="border-t border-white/50" />

            {/* Bloque 3: Solicitudes */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(12,8,41,0.5)' }}>
                Solicitudes
              </h3>
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <RequestRow key={i} />
                ))}
              </div>
              <div className="pt-2">
                <SecondaryOutlineButton label="Nueva simulación" />
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* ================= MODAL DEL FORMULARIO DE NUEVO CLIENTE ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Fondo Crema Translúcido con Blur */}
          <div
            className="absolute inset-0 bg-[#FEFBF7]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Contenedor del Modal */}
          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[24px] shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <Panel variant="modal" title="Crear Nuevo Cliente">
              {/* Botón Cerrar (X) */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[rgba(12,8,41,0.8)] hover:bg-white transition-colors shadow-sm font-bold text-xs backdrop-blur-md"
              >
                ✕
              </button>

              <div className="space-y-6 mt-2">
                
                {/* Sección: Datos Personales */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/40 pb-1" style={{ color: 'rgba(12,8,41,0.6)' }}>
                    Datos Personales
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <Input label="Nombre" placeholder="Nombres" />
                    <Input label="Apellidos" placeholder="Apellidos" />
                    <Input label="DNI" placeholder="DNI" />
                    <Input label="Edad" type="number" placeholder="Edad" />
                    <Input label="Correo Electrónico" type="email" placeholder="Correo" />
                    <Input 
                      label="Teléfono" 
                      type="tel" 
                      placeholder="Teléfono" 
                      onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '') }} 
                    />
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <input id="modal-posee-propiedades" type="checkbox" className="h-4 w-4 rounded border-[rgba(12,8,41,0.2)] accent-[#E5A845]" />
                    <label htmlFor="modal-posee-propiedades" className="text-xs font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
                      ¿El cliente posee propiedades actualmente?
                    </label>
                  </div>
                </div>

                {/* Sección: Ingreso Mensual */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-white/40 pb-1" style={{ color: 'rgba(12,8,41,0.6)' }}>
                    Perfil Financiero
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <Select label="Historial Crediticio" options={['Bueno', 'Regular', 'Malo']} />
                    <Select label="Moneda" options={['Soles (S/.)', 'Dólares ($)']} />
                    <Input label="Salario" type="number" placeholder="Monto" />
                    <Input label="Ingreso Familiar" type="number" placeholder="Monto" />
                  </div>
                </div>

              </div>
              
              <div className="mt-8 flex justify-end">
                <PrimaryBarButton 
                  label="Guardar Cliente" 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full md:w-auto px-10" 
                />
              </div>
            </Panel>
          </div>
        </div>
      )}
    </div>
  )
}

/* ================= COMPONENTES SECUNDARIOS ================= */

type PanelProps = {
  title?: string
  variant: 'pink' | 'orange' | 'yellow' | 'modal'
  children: React.ReactNode
}

function Panel({ title, variant, children }: PanelProps) {
  let background = ''
  if (variant === 'pink') {
    background = 'linear-gradient(145deg, rgba(244,167,160,0.3) 0%, rgba(255,240,225,0.7) 100%)'
  } else if (variant === 'yellow') {
    background = 'linear-gradient(145deg, rgba(255,213,99,0.25) 0%, rgba(255,240,225,0.7) 100%)'
  } else if (variant === 'orange') {
    background = 'linear-gradient(145deg, rgba(255,132,0,0.15) 0%, rgba(255,240,225,0.7) 100%)'
  } else if (variant === 'modal') {
    background = 'linear-gradient(145deg, rgba(235,195,185,0.8) 0%, rgba(253,235,218,0.95) 100%)'
  }

  return (
    <section
      className="rounded-[24px] border border-white/70 px-6 py-6 shadow-[0_18px_45px_rgba(12,8,41,0.08)] backdrop-blur-xl relative"
      style={{ background }}
    >
      {title && (
        <h2 className="mb-4 text-sm font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

type InputProps = {
  label: string
  type?: string
  placeholder?: string
  onInput?: React.FormEventHandler<HTMLInputElement>
}

function Input({ label, type = 'text', placeholder, onInput }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        onInput={onInput}
        className="rounded-xl border bg-white/80 px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[rgba(255,132,0,0.5)] focus:border-transparent transition-all shadow-sm"
        style={{ borderColor: 'rgba(255,255,255,0.9)', color: 'rgba(12,8,41,0.9)' }}
      />
    </label>
  )
}

type SelectProps = {
  label: string
  options: string[]
}

function Select({ label, options }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label}
      <select
        className="rounded-xl border bg-white/80 px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[rgba(255,132,0,0.5)] focus:border-transparent appearance-none shadow-sm"
        style={{ borderColor: 'rgba(255,255,255,0.9)', color: 'rgba(12,8,41,0.9)' }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

function InlineDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[1fr_1.5fr] items-center gap-2 text-[11px]">
      <span style={{ color: 'rgba(12,8,41,0.65)' }}>{label}</span>
      <input
        readOnly
        defaultValue={value}
        className="rounded-lg border bg-white/60 px-3 py-1.5 outline-none font-medium text-xs backdrop-blur-sm"
        style={{ borderColor: 'rgba(255,255,255,0.7)', color: 'rgba(12,8,41,0.9)' }}
      />
    </div>
  )
}

type PrimaryBarButtonProps = {
  label: string
  onClick?: () => void
  className?: string
}

function PrimaryBarButton({ label, onClick, className = 'w-full' }: PrimaryBarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full text-xs font-bold tracking-wide py-2.5 transition-transform hover:scale-[1.01] ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(244,167,160,0.9) 0%, rgba(249,198,181,0.9) 100%)',
        color: '#FFFFFF',
        boxShadow: '0 8px 20px rgba(226,164,153,0.35)',
      }}
    >
      {label}
    </button>
  )
}

function SecondaryOutlineButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="w-full rounded-full text-xs font-bold tracking-wide py-2 transition-colors hover:bg-white/40"
      style={{
        border: '1px solid rgba(255,132,0,0.5)',
        color: miimboColors.brand.sunrise,
        backgroundColor: 'rgba(255,255,255,0.3)',
      }}
    >
      {label}
    </button>
  )
}

function ClientsTable() {
  return (
    <div 
      className="overflow-hidden rounded-2xl border border-white/70 shadow-[0_18px_45px_rgba(12,8,41,0.08)] backdrop-blur-xl h-full"
      style={{ background: 'linear-gradient(145deg, rgba(255,132,0,0.15) 0%, rgba(255,240,225,0.7) 100%)' }}
    >
      <table className="w-full border-collapse text-xs">
        <thead
          className="text-[10px] font-bold tracking-wider uppercase border-b border-white/40"
          style={{ backgroundColor: 'rgba(255,132,0,0.15)', color: miimboColors.brand.midnight }}
        >
          <tr>
            <th className="px-5 py-3.5 text-left">Nombre Completo</th>
            <th className="px-5 py-3.5 text-left">DNI</th>
            <th className="px-5 py-3.5 text-left">Correo Electrónico</th>
            <th className="px-5 py-3.5 text-left">Teléfono</th>
            <th className="px-5 py-3.5 text-center">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 9 }).map((_, index) => (
            <tr
              key={index}
              className="border-b border-white/20 last:border-0 hover:bg-white/20 transition-colors"
              style={{ color: 'rgba(12,8,41,0.85)' }}
            >
              <td className="px-5 py-3 font-medium">Cliente {index + 1}</td>
              <td className="px-5 py-3">12345678</td>
              <td className="px-5 py-3">cliente@gmail.com</td>
              <td className="px-5 py-3">999 999 999</td>
              <td className="px-5 py-3 text-center">
                <button
                  type="button"
                  className="text-[11px] font-bold underline"
                  style={{ color: miimboColors.brand.sunrise }}
                >
                  Mostrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RequestRow() {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] border border-white/60 bg-white/40 px-4 py-2.5 text-xs shadow-sm backdrop-blur-md">
      <div>
        <p className="font-bold text-[11px]" style={{ color: 'rgba(12,8,41,0.85)' }}>
          Simulación #1234
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: 'rgba(12,8,41,0.6)' }}>
          Edificio ABC
        </p>
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full text-white shadow-sm" style={{ backgroundColor: miimboColors.brand.sunriseSoft }}>
        📄
      </div>
    </div>
  )
}