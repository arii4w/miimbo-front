import { useState } from 'react'
import { miimboColors } from '../theme/colors'

export function Simulation() {
  const [tasaTipo, setTasaTipo] = useState('Constante')
  const [activeTab, setActiveTab] = useState('datos')

  return (
    <div className="space-y-6 relative max-w-5xl mx-auto">
      <header className="flex items-center justify-between border-b border-[rgba(12,8,41,0.1)] pb-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
            Simulación
          </h1>
          
          <div className="flex bg-white/40 p-1 rounded-full border border-white/60 shadow-sm backdrop-blur-md shrink-0">
            <button
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'datos' 
                  ? 'bg-gradient-to-r from-[#FF8400] to-[#FFA909] text-white shadow-md' 
                  : 'text-[rgba(12,8,41,0.6)] hover:bg-white/50'
            }`}
              onClick={() => setActiveTab('datos')}
            >
              Datos
            </button>
            <button
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'resultados' 
                  ? 'bg-gradient-to-r from-[#FF8400] to-[#FFA909] text-white shadow-md' 
                  : 'text-[rgba(12,8,41,0.6)] hover:bg-white/50'
            }`}
              onClick={() => setActiveTab('resultados')}
            >
              Resultados
            </button>
          </div>
        </div>

        <button
          type="button"
          className="rounded-full text-xs font-bold tracking-wide px-6 py-2.5 transition-transform hover:scale-[1.02] shrink-0"
          style={{
            background: 'linear-gradient(145deg, rgba(230,150,140,0.95) 0%, rgba(245,185,170,0.95) 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 15px rgba(226,164,153,0.3)',
          }}
          onClick={() => {
            setActiveTab('datos')
          }}
        >
          + Nueva Simulación
        </button>
      </header>

      {/* ======================= PESTAÑA 1: DATOS ======================= */}
      <section className={`space-y-6 transition-all duration-300 ${activeTab === 'datos' ? 'block animate-in fade-in slide-in-from-left-4' : 'hidden'}`}>
        <div className="grid gap-5 lg:grid-cols-3">
          
          <Panel variant="pink" title="Datos Principales">
            <div className="space-y-4">
              <div className="space-y-2">
                <Select label="Cliente" options={['Juan Pérez', 'María López']} />
                <div className="px-2 space-y-1">
                  <SummaryRow label="Ingreso Mensual" value="S/ 3,000.00" />
                  <SummaryRow label="Ingreso Familiar" value="S/ 5,200.00" />
                </div>
              </div>
              <hr className="border-t border-white/50" />
              <div className="space-y-2">
                <Select label="Inmueble" options={['Edificio ABC', 'Condominio XYZ']} />
                <div className="px-2">
                  <SummaryRow label="Precio de Venta" value="S/ 300,000.00" />
                </div>
              </div>
            </div>
          </Panel>

          <Panel variant="yellow" title="Datos del Préstamo">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="% Cuota Inicial" type="number" placeholder="Ej. 20" suffix="%" />
                <div className="flex flex-col justify-end pb-2">
                  <SummaryRow label="Cuota Inicial:" value="S/ 60,000.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select label="Frecuencia de pago" options={['Diaria', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual']} />
                <Input label="Nº de Años" type="number" placeholder="Ej. 10" />
              </div>
              <p className="text-[10px]" style={{ color: 'rgba(12,8,41,0.5)' }}>
                * Se considerarán 360 días por año (Req. Interbank)
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Input label="Nº Cuotas por Año" type="number" value="12" readOnly />
                <Input label="Nº Total de Cuotas (n)" type="number" value="120" readOnly />
              </div>
            </div>
          </Panel>

          <Panel variant="orange" title="Tasas y Bonos">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold" style={{ color: 'rgba(12,8,41,0.8)' }}>Tipo de Tasa</p>
                <div className="flex gap-4 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.7)' }}>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tasa" checked={tasaTipo === 'Constante'} onChange={() => setTasaTipo('Constante')} className="accent-[#E5A845]" />
                    Constante
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tasa" checked={tasaTipo === 'Variable'} onChange={() => setTasaTipo('Variable')} className="accent-[#E5A845]" />
                    Variable
                  </label>
                </div>
                {tasaTipo === 'Constante' ? (
                  <Input label="TEA" type="number" placeholder="Ej. 9.0" suffix="%" />
                ) : (
                  <div className="space-y-1">
                    <Input label="TEA Periodo 1-12" type="number" placeholder="Ej. 9.0" suffix="%" />
                    <button className="text-[10px] text-[#D98A36] font-bold">+ Agregar otro periodo</button>
                  </div>
                )}
              </div>
              <hr className="border-t border-white/50" />
              <div className="space-y-2 text-xs" style={{ color: 'rgba(12,8,41,0.7)' }}>
                <p className="font-semibold" style={{ color: 'rgba(12,8,41,0.8)' }}>Bono</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="bono" className="accent-[#E5A845]" />
                  Bono del Buen Pagador
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="bono" className="accent-[#E5A845]" />
                  Bono Familiar Habitacional
                </label>
                <div className="pt-1">
                  <SummaryRow label="Monto del Bono:" value="S/ 7,800.00" />
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel variant="yellow" title="Costes y Gastos">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase" style={{ color: 'rgba(12,8,41,0.5)' }}>Iniciales</h4>
                <div className="space-y-2">
                  <CostInput label="Notariales" defaultValue="150.00" />
                  <CostInput label="Registrales" defaultValue="200.00" />
                  <CostInput label="Tasación" defaultValue="80.00" />
                  <CostInput label="Comis. estudio" defaultValue="100.00" />
                  <CostInput label="Comis. activación" defaultValue="0.00" />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase" style={{ color: 'rgba(12,8,41,0.5)' }}>Periódicos</h4>
                <div className="space-y-2">
                  <CostInput label="Comisión periódica" defaultValue="3.00" />
                  <CostInput label="Portes" defaultValue="4.00" />
                  <CostInput label="Gastos Admin." defaultValue="8.00" />
                  <CostInput label="% Seguro desgrav." defaultValue="0.049" suffix="%" />
                  <CostInput label="% Seguro riesgo" defaultValue="0.400" suffix="%" />
                </div>
                <div className="pt-3">
                  <h4 className="text-[11px] font-bold uppercase mb-2" style={{ color: 'rgba(12,8,41,0.5)' }}>Costo Oportunidad</h4>
                  <CostInput label="Tasa de desc." defaultValue="20.00" suffix="%" />
                </div>
              </div>
            </div>
          </Panel>

          <div className="space-y-5 flex flex-col justify-between">
            <Panel variant="pink" title="Periodos de Gracia">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2 text-center">
                  <span className="text-xs font-bold text-[#D98A36]">SIN</span>
                  <Input label="" placeholder="Ej: 1-4" />
                </div>
                <div className="space-y-2 text-center">
                  <span className="text-xs font-bold text-[#D98A36]">PARCIAL</span>
                  <Input label="" placeholder="Ej: 5-6" />
                </div>
                <div className="space-y-2 text-center">
                  <span className="text-xs font-bold text-[#D98A36]">TOTAL</span>
                  <Input label="" placeholder="Ej: 7-8" />
                </div>
              </div>
            </Panel>
            
            <button
              type="button"
              onClick={() => setActiveTab('resultados')}
              className="w-full rounded-2xl text-sm font-bold tracking-wide py-4 transition-transform hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(145deg, rgba(230,150,140,0.95) 0%, rgba(245,185,170,0.95) 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 20px rgba(226,164,153,0.35)',
              }}
            >
              Generar Simulación
            </button>
          </div>
        </div>
      </section>

      {/* ======================= PESTAÑA 2: RESULTADOS ======================= */}
      <section className={`space-y-6 transition-all duration-300 ${activeTab === 'resultados' ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
        
        {/* Indicadores Finales Destacados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IndicatorCard label="Tasa de Descuento" value="3.08533%" />
          <IndicatorCard label="TIR de la Operación" value="1.69743%" />
          <IndicatorCard label="TCEA de la Operación" value="10.62665%" />
          <IndicatorCard label="VAN de la Operación" value="S/ 62,498.90" />
        </div>

        {/* Cuadro Resumen a todo lo ancho con TODA la información */}
        <Panel variant="yellow" title="Resumen del Financiamiento">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            
            {/* Columna 1: Generales y Préstamo */}
            <div className="space-y-5">
              <SummarySection title="Datos Generales">
                <SummaryItem label="Cliente" value="Juan Pérez" />
                <SummaryItem label="Inmueble" value="Edificio ABC" />
                <SummaryItem label="Bono aplicado" value="Bono del Buen Pagador" />
              </SummarySection>
              
              <SummarySection title="Del Préstamo">
                <SummaryItem label="Precio de Venta" value="250,000.00" />
                <SummaryItem label="% Cuota Inicial" value="15.000%" />
                <SummaryItem label="Nº de Años" value="10" />
                <SummaryItem label="Frecuencia de pago" value="60" />
                <SummaryItem label="Nº de días por año" value="360" />
              </SummarySection>
            </div>

            {/* Columna 2: Costos Iniciales y Periódicos */}
            <div className="space-y-5">
              <SummarySection title="De los Costes/Gastos Iniciales">
                <SummaryItem label="Costes Notariales" value="150.00" />
                <SummaryItem label="Costes Registrales" value="200.00" />
                <SummaryItem label="Tasación" value="80.00" />
                <SummaryItem label="Comisión de estudio" value="100.00" />
                <SummaryItem label="Comisión activación" value="-" />
              </SummarySection>

              <SummarySection title="De los Costes/Gastos Periódicos">
                <SummaryItem label="Comisión periódica" value="3.00" />
                <SummaryItem label="Portes" value="4.00" />
                <SummaryItem label="Gastos de Administración" value="8.00" />
                <SummaryItem label="% Seguro desgravamen" value="0.04900%" />
                <SummaryItem label="% Seguro riesgo" value="0.40000%" />
                <SummaryItem label="% Seguro desgrav. per." value="0.098%" />
                <SummaryItem label="Seguro riesgo" value="166.67" />
              </SummarySection>
            </div>

            {/* Columna 3: Financiamiento y Totales */}
            <div className="space-y-5">
              <SummarySection title="Del Financiamiento y Oportunidad">
                <SummaryItem label="Tasa de descuento" value="20.00000%" />
                <SummaryItem label="Saldo a financiar" value="212,500.00" />
                <SummaryItem label="Monto del préstamo" value="213,030.00" />
                <SummaryItem label="Nº Cuotas por Año" value="6" />
                <SummaryItem label="Nº Total de Cuotas" value="60" />
              </SummarySection>

              <SummarySection title="Totales de la Operación">
                <SummaryItem label="Intereses" value="98,097.33" />
                <SummaryItem label="Amortización del capital" value="222,409.85" />
                <SummaryItem label="Seguro de desgravamen" value="7,801.68" />
                <SummaryItem label="Seguro contra todo riesgo" value="10,000.00" />
                <SummaryItem label="Comisiones periódicas" value="180.00" />
                <SummaryItem label="Portes / Gastos de adm." value="720.00" />
              </SummarySection>
            </div>

          </div>
        </Panel>

        {/* Tabla del Cronograma */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold tracking-tight px-2" style={{ color: miimboColors.brand.midnight }}>
            Cronograma de Pagos Detallado
          </h2>
          <SimulationTable />
        </div>
      </section>
    </div>
  )
}

/* ================= COMPONENTES SECUNDARIOS ================= */

type PanelProps = {
  title?: string
  variant: 'pink' | 'yellow' | 'orange'
  children: React.ReactNode
}

function Panel({ title, variant, children }: PanelProps) {
  let background = ''
  if (variant === 'pink') background = 'linear-gradient(145deg, rgba(244,167,160,0.3) 0%, rgba(255,240,225,0.7) 100%)'
  else if (variant === 'yellow') background = 'linear-gradient(145deg, rgba(255,213,99,0.25) 0%, rgba(255,240,225,0.7) 100%)'
  else if (variant === 'orange') background = 'linear-gradient(145deg, rgba(255,132,0,0.15) 0%, rgba(255,240,225,0.7) 100%)'

  return (
    <section
      className="rounded-[24px] border border-white/70 px-6 py-5 shadow-[0_18px_45px_rgba(12,8,41,0.05)] backdrop-blur-xl relative"
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
  value?: string
  readOnly?: boolean
  suffix?: string
}

function Input({ label, type = 'text', placeholder, value, readOnly, suffix }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium shrink-0" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label}
      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
          className={`w-full rounded-xl border bg-white/60 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#D98A36]/50 focus:border-transparent transition-all backdrop-blur-sm ${readOnly ? 'opacity-70 bg-white/40 cursor-not-allowed' : ''}`}
          style={{ borderColor: 'rgba(255,255,255,0.8)', color: 'rgba(12,8,41,0.9)' }}
        />
        {suffix && <span className="absolute right-3 text-xs font-bold text-[rgba(12,8,41,0.5)]">{suffix}</span>}
      </div>
    </label>
  )
}

function CostInput({ label, defaultValue, suffix }: { label: string, defaultValue: string, suffix?: string }) {
  return (
    <div className="flex justify-between items-center text-[11px] gap-2">
      <span className="shrink" style={{ color: 'rgba(12,8,41,0.7)' }}>{label}</span>
      <div className="relative flex items-center w-20 shrink-0">
        <input 
          type="text" 
          defaultValue={defaultValue} 
          className="w-full text-right bg-white/70 border border-white/80 outline-none font-bold focus:ring-2 focus:ring-[#D98A36]/50 rounded-lg px-2 py-1 shadow-sm transition-all" 
          style={{ color: 'rgba(12,8,41,0.9)', paddingRight: suffix ? '1.2rem' : '0.5rem' }}
        />
        {suffix && <span className="absolute right-1 text-[10px] font-bold text-[rgba(12,8,41,0.5)]">{suffix}</span>}
      </div>
    </div>
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
        className="rounded-xl border bg-white/60 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#D98A36]/50 focus:border-transparent appearance-none backdrop-blur-sm"
        style={{ borderColor: 'rgba(255,255,255,0.8)', color: 'rgba(12,8,41,0.9)' }}
      >
        {options.map((opt) => <option key={opt}>{opt}</option>)}
      </select>
    </label>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex justify-between items-center text-[11px]">
      <span style={{ color: 'rgba(12,8,41,0.6)' }}>{label}</span>
      <span className="font-bold" style={{ color: '#D98A36' }}>{value}</span>
    </p>
  )
}

/* --- Nuevos componentes para organizar el Resumen --- */

function SummarySection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[10px] font-bold uppercase mb-2 border-b border-white/40 pb-1" style={{ color: 'rgba(12,8,41,0.5)' }}>
        {title}
      </h4>
      <div className="space-y-1.5">
        {children}
      </div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-[11px] pb-1 gap-2">
      <span className="shrink" style={{ color: 'rgba(12,8,41,0.7)' }}>{label}</span>
      <span className="font-bold text-right shrink-0" style={{ color: 'rgba(12,8,41,0.9)' }}>{value}</span>
    </div>
  )
}

function IndicatorCard({ label, value }: { label: string, value: string }) {
  return (
    <div 
      className="rounded-[20px] border border-white/80 p-4 text-center shadow-[0_12px_30px_rgba(12,8,41,0.06)] backdrop-blur-md transition-transform hover:-translate-y-1"
      style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(253,235,218,0.9) 100%)' }}
    >
      <p className="text-[10px] uppercase font-bold text-[rgba(12,8,41,0.5)] tracking-wider truncate">{label}</p>
      <p className="text-xl font-black mt-1" style={{ color: '#D98A36' }}>{value}</p>
    </div>
  )
}

function SimulationTable() {
  const headers = ['Nº', 'TEA', "i'=TEP=TEM", 'P.G.', 'Saldo Inicial', 'Interés', 'Cuota (inc. Seg)', 'Amort.', 'Seg. Desgrav.', 'Seg. Riesgo', 'Comisión', 'Portes', 'Gastos Adm.', 'Saldo Final', 'Flujo']
  
  const sampleRow = [1, '9.0%', '1.44%', 'T', '213,030.00', '-3,081.82', '0.00', '0.00', '-208.77', '-166.67', '-3.00', '-4.00', '-8.00', '216,111.82', '-390.44']

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/70 shadow-sm backdrop-blur-xl" style={{ background: 'linear-gradient(145deg, rgba(255,132,0,0.1) 0%, rgba(255,240,225,0.5) 100%)' }}>
      <table className="min-w-[1200px] w-full border-collapse text-[10px]">
        <thead className="font-bold text-center border-b border-white/50" style={{ backgroundColor: 'rgba(255,132,0,0.15)', color: miimboColors.brand.midnight }}>
          <tr>
            {headers.map((h, i) => <th key={i} className={`px-2 py-3 ${i === 0 || i === 3 ? 'text-center' : 'text-right'}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody className="text-right">
          {Array.from({ length: 8 }).map((_, i) => (
            <tr key={i} className="border-b border-white/30 last:border-0 hover:bg-white/30 transition-colors" style={{ color: 'rgba(12,8,41,0.8)' }}>
              <td className="px-2 py-2 text-center font-bold">{sampleRow[0]}</td>
              <td className="px-2 py-2">{sampleRow[1]}</td>
              <td className="px-2 py-2">{sampleRow[2]}</td>
              <td className="px-2 py-2 text-center font-bold text-[#D98A36]">{sampleRow[3]}</td>
              <td className="px-2 py-2">{sampleRow[4]}</td>
              <td className="px-2 py-2 text-red-500/80">{sampleRow[5]}</td>
              <td className="px-2 py-2 font-bold text-[#D98A36]">{sampleRow[6]}</td>
              <td className="px-2 py-2 text-blue-600/80">{sampleRow[7]}</td>
              <td className="px-2 py-2">{sampleRow[8]}</td>
              <td className="px-2 py-2">{sampleRow[9]}</td>
              <td className="px-2 py-2">{sampleRow[10]}</td>
              <td className="px-2 py-2">{sampleRow[11]}</td>
              <td className="px-2 py-2">{sampleRow[12]}</td>
              <td className="px-2 py-2 font-bold">{sampleRow[13]}</td>
              <td className="px-2 py-2 text-blue-600/80 font-bold">{sampleRow[14]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}