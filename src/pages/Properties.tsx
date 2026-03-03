import { useState } from 'react'
import { miimboColors } from '../theme/colors'

export function Properties() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [propertyType, setPropertyType] = useState('Departamento')

  return (
    <div className="space-y-8 relative">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
          Inmuebles
        </h1>
        <PrimaryBarButton 
          label="+ Nuevo Inmueble" 
          onClick={() => setIsModalOpen(true)}
          className="w-auto px-8 py-2.5" 
        />
      </header>

      <section className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <PropertyCard key={index} />
          ))}
        </div>
      </section>

      {/* ================= MODAL DEL FORMULARIO ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* ¡AQUÍ ESTÁ EL CAMBIO! 
            Fondo Crema Translúcido que cubre todo + Blur 
          */}
          <div
            className="absolute inset-0 bg-[#FFF0E1]/70 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Contenedor del Modal */}
          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[24px] shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Le ajustamos el gradiente al panel para que coincida 
               con el de tu imagen objetivo (más cremoso/rosado) 
            */}
            <Panel variant="modal" title="Datos del Inmueble">
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[rgba(12,8,41,0.8)] hover:bg-white/80 transition-colors shadow-sm font-bold text-xs"
              >
                ✕
              </button>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
                <Input label="Nombre del Proyecto" placeholder="Nombre" />
                <Input label="Código o nombre de la unidad" placeholder="Código" />
                
                <Select 
                  label="Tipo de inmueble" 
                  options={['Departamento', 'Casa']} 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                />

                <Input label="Dirección" placeholder="Dirección" />
                <Select label="Provincia" options={['Lima', 'Arequipa', 'Cusco', 'Piura']} />
                <Select label="Distrito" options={['Santiago de Surco', 'Miraflores', 'San Isidro']} />

                <Select label="Moneda" options={['Soles (S/.)', 'Dólares ($)']} />
                <Input label="Precio de venta del inmueble" type="number" placeholder="Monto total" />
                <Input label="Área total en m²" type="number" placeholder="Área" />

                {propertyType === 'Departamento' && (
                  <>
                    <Input label="Precio del departamento" type="number" placeholder="Monto" />
                    <Input label="Número de departamentos" type="number" placeholder="Cantidad" />
                  </>
                )}
              </div>
              
              <div className="mt-7 flex justify-end">
                <PrimaryBarButton 
                  label="Guardar Inmueble" 
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
  variant: 'modal' | 'yellow'
  children: React.ReactNode
}

function Panel({ title, variant, children }: PanelProps) {
  // Ajusté el gradiente del modal para que sea exactamente como la imagen que enviaste
  const background =
    variant === 'modal'
      ? 'linear-gradient(145deg, rgba(235,195,185,0.8) 0%, rgba(253,235,218,0.95) 100%)' 
      : 'linear-gradient(145deg, rgba(255,213,99,0.25) 0%, rgba(255,240,225,0.7) 100%)'

  return (
    <section
      className="rounded-[24px] border border-white/70 px-6 py-6 shadow-[0_18px_45px_rgba(12,8,41,0.08)] backdrop-blur-xl relative"
      style={{ background }}
    >
      {title && (
        <h2 className="mb-5 text-sm font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
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
}

function Input({ label, type = 'text', placeholder }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border bg-white/90 px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[rgba(255,132,0,0.5)] focus:border-transparent transition-all shadow-sm"
        style={{ borderColor: 'rgba(255,255,255,1)', color: 'rgba(12,8,41,0.9)' }}
      />
    </label>
  )
}

type SelectProps = {
  label: string
  options: string[]
  value?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label}
      <select
        value={value}
        onChange={onChange}
        className="rounded-xl border bg-white/90 px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[rgba(255,132,0,0.5)] focus:border-transparent appearance-none shadow-sm"
        style={{ borderColor: 'rgba(255,255,255,1)', color: 'rgba(12,8,41,0.9)' }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
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
      className={`rounded-full text-xs font-bold tracking-wide py-2.5 transition-transform hover:scale-[1.02] ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(230,150,140,0.95) 0%, rgba(245,185,170,0.95) 100%)',
        color: '#FFFFFF',
        boxShadow: '0 8px 20px rgba(226,164,153,0.35)',
      }}
    >
      {label}
    </button>
  )
}

// (El componente PropertyCard se mantiene igual, no lo copio para ahorrar espacio)
function PropertyCard() {
  return (
    <article
      className="flex flex-col justify-between rounded-[24px] border border-white/70 px-5 py-5 text-xs shadow-[0_18px_45px_rgba(12,8,41,0.08)] backdrop-blur-xl transition-transform hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(145deg, rgba(255,213,99,0.25) 0%, rgba(255,240,225,0.7) 100%)',
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 border-b border-white/40 pb-3">
          <p className="font-bold text-sm" style={{ color: '#D98A36' }}>
            Edificio ABC
          </p>
          <p className="text-[10px] font-medium" style={{ color: 'rgba(12,8,41,0.6)' }}>
            Código: #ABC123
          </p>
        </div>

        <div className="space-y-1.5 text-[11px] bg-white/40 p-3 rounded-xl border border-white/50">
          <p style={{ color: 'rgba(12,8,41,0.8)' }}>
            <span className="font-medium opacity-70">Dirección:</span> Av. Primavera 2390
          </p>
          <p style={{ color: 'rgba(12,8,41,0.8)' }}>
            <span className="font-medium opacity-70">Distrito:</span> Santiago de Surco
          </p>
          <p style={{ color: 'rgba(12,8,41,0.8)' }}>
            <span className="font-medium opacity-70">Provincia:</span> Lima
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-[11px]">
        <div className="flex justify-between items-center">
          <span className="font-bold" style={{ color: '#D98A36' }}>Precio del Inmueble</span>
          <span className="font-medium" style={{ color: 'rgba(12,8,41,0.9)' }}>s/ 504 000.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold" style={{ color: '#D98A36' }}>Costo por m²</span>
          <span className="font-medium" style={{ color: 'rgba(12,8,41,0.9)' }}>s/ 7 200.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold" style={{ color: '#D98A36' }}>Área total</span>
          <span className="font-medium" style={{ color: 'rgba(12,8,41,0.9)' }}>70m²</span>
        </div>
      </div>
    </article>
  )
}