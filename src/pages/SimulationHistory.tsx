import { useState } from 'react'
import { miimboColors } from '../theme/colors'

export function SimulationHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-8 relative max-w-5xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
          Historial de Simulaciones
        </h1>
      </header>

      <section className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <HistoryTable onOpenDetails={() => setIsModalOpen(true)} />
      </section>

      {/* ================= MODAL DE DETALLES ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Fondo Crema Translúcido MEJORADO (Más limpio, menos turbio) */}
          <div
            className="absolute inset-0 bg-[#FEFBF7]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Contenedor del Modal */}
          <div className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[24px] shadow-2xl animate-in fade-in zoom-in duration-200 p-1">
            
            <Panel variant="modal">
              {/* Botón Cerrar (X) Flotante */}
              <div className="sticky top-0 z-10 flex justify-end pb-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[rgba(12,8,41,0.8)] hover:bg-white transition-colors shadow-sm font-bold text-sm backdrop-blur-md"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="px-2">
                  <h2 className="text-xl font-bold tracking-tight mb-1" style={{ color: miimboColors.brand.midnight }}>
                    Detalle de Simulación
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(12,8,41,0.6)' }}>Generada el 10-01-2026 para Juan Pérez</p>
                </div>

                {/* Indicadores Finales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <IndicatorCard label="Tasa de Descuento" value="3.08533%" />
                  <IndicatorCard label="TIR de la Operación" value="1.69743%" />
                  <IndicatorCard label="TCEA de la Operación" value="10.62665%" />
                  <IndicatorCard label="VAN de la Operación" value="S/ 62,498.90" />
                </div>

                {/* Cuadro Resumen a todo lo ancho */}
                <Panel variant="yellow" title="Resumen del Financiamiento">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                    {/* Columna 1 */}
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

                    {/* Columna 2 */}
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

                    {/* Columna 3 */}
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
                        <SummaryItem label="Portes / Gastos adm." value="720.00" />
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
              </div>
            </Panel>
          </div>
        </div>
      )}
    </div>
  )
}

/* ================= COMPONENTE DE LA TABLA DE HISTORIAL ================= */

function HistoryTable({ onOpenDetails }: { onOpenDetails: () => void }) {
  const rows = [
    {
      clientes: 'Juan Pérez\nMaría Pérez',
      fecha: '10-01-2026',
      inmueble: 'Edificio ABC',
      bono: 'Techo Propio',
    },
    {
      clientes: 'Jorge Pérez',
      fecha: '10-01-2026',
      inmueble: 'Edificio ABC',
      bono: 'Crédito MiVivienda',
    },
    {
      clientes: 'Juan Pérez',
      fecha: '10-01-2026',
      inmueble: 'Edificio ABC',
      bono: 'Crédito MiVivienda',
    },
    {
      clientes: 'Laura López\nPedro Jimenez',
      fecha: '10-01-2026',
      inmueble: 'Edificio ABC',
      bono: 'Techo Propio',
    },
  ]

  return (
    <div
      className="overflow-hidden rounded-[24px] border border-white/80 shadow-[0_18px_45px_rgba(11,8,41,0.06)] backdrop-blur-xl"
      style={{
        // Degradado sutil, siguiendo el estilo de la app
        background: 'linear-gradient(145deg, rgba(255,240,225,0.7) 0%, rgba(254,251,247,0.95) 100%)',
      }}
    >
      <table className="w-full border-collapse text-xs">
        <thead 
          className="text-[11px] font-bold uppercase tracking-wider"
          // Tono rosado suave idéntico a la Imagen 1
          style={{ backgroundColor: 'rgba(235, 175, 165, 0.65)' }}
        >
          <tr>
            <th className="px-6 py-4 text-left" style={{ color: miimboColors.brand.midnight }}>Clientes</th>
            <th className="px-6 py-4 text-left" style={{ color: miimboColors.brand.midnight }}>Fecha</th>
            <th className="px-6 py-4 text-left" style={{ color: miimboColors.brand.midnight }}>Inmueble</th>
            <th className="px-6 py-4 text-left" style={{ color: miimboColors.brand.midnight }}>Bono</th>
            <th className="px-6 py-4 text-center" style={{ color: miimboColors.brand.midnight }}>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-white/40 last:border-0 ${index % 2 === 0 ? 'bg-transparent' : 'bg-white/30'} hover:bg-white/50 transition-colors`}
              style={{ color: 'rgba(12,8,41,0.85)' }}
            >
              <td className="whitespace-pre-line px-6 py-3.5 font-medium">{row.clientes}</td>
              <td className="px-6 py-3.5">{row.fecha}</td>
              <td className="px-6 py-3.5">{row.inmueble}</td>
              <td className="px-6 py-3.5">{row.bono}</td>
              <td className="px-6 py-3.5 text-center">
                {/* Botón convertido en enlace naranja */}
                <button
                  type="button"
                  onClick={onOpenDetails}
                  className="text-[11.5px] font-bold underline transition-colors"
                  style={{ color: miimboColors.brand.sunrise }}
                  onMouseEnter={(e) => e.currentTarget.style.color = miimboColors.brand.sunriseSoft}
                  onMouseLeave={(e) => e.currentTarget.style.color = miimboColors.brand.sunrise}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      className="rounded-[20px] border border-white/80 p-4 text-center shadow-[0_12px_30px_rgba(12,8,41,0.06)] backdrop-blur-md"
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