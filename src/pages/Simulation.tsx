import React, { useState, useMemo, useEffect } from 'react'
import { miimboColors } from '../theme/colors'

// ================= FUNCIONES FINANCIERAS AUXILIARES =================
function PMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return -pv / nper;
  return -(pv * rate * Math.pow(1 + rate, nper)) / (Math.pow(1 + rate, nper) - 1);
}

function IRR(cashflows: number[], guess: number = 0.1): number {
  const maxTries = 1000;
  const epsMax = 1e-10;
  let rate = guess;
  for (let i = 0; i < maxTries; i++) {
    let npvVal = 0;
    let npvDeriv = 0;
    for (let j = 0; j < cashflows.length; j++) {
      npvVal += cashflows[j] / Math.pow(1 + rate, j);
      npvDeriv -= j * cashflows[j] / Math.pow(1 + rate, j + 1);
    }
    if (Math.abs(npvDeriv) < epsMax) break;
    const newRate = rate - npvVal / npvDeriv;
    if (Math.abs(newRate - rate) < epsMax) return newRate;
    rate = newRate;
  }
  return rate;
}

function NPV(rate: number, cashflows: number[]): number {
  let val = 0;
  for (let i = 1; i < cashflows.length; i++) {
    val += cashflows[i] / Math.pow(1 + rate, i);
  }
  return val + cashflows[0];
}

// ================= INTERFACES Y TIPOS =================
type TasaVariable = {
  rango: string;
  rate: number | string;
}

export type SimulationRow = {
  NC: number; 
  TEA: number | null; 
  TEP: number | null; 
  PG: string | null; 
  SI: number | null;
  I: number | null; 
  Cuota: number | null; 
  A: number | null; 
  SegDes: number | null;
  SegRie: number | null; 
  Comision: number | null; 
  Portes: number | null; 
  GasAdm: number | null;
  SF: number | null; 
  Flujo: number | null;
}

type ResumenData = {
  Saldo?: number;
  Prestamo?: number;
  NCxA?: number;
  N?: number;
  pSegDesPer?: number;
  SegRiePer?: number;
  COKi?: number;
  tIntereses?: number;
  tAmortizacion?: number;
  tSegDesgravamen?: number;
  tSegRiesgo?: number;
  tComisiones?: number;
  tPortesGastosAdm?: number;
  tir?: number;
  tcea?: number;
  van?: number;
}

// ================= COMPONENTE PRINCIPAL =================
export function Simulation() {
  const [activeTab, setActiveTab] = useState('datos')
  const [tasaTipo, setTasaTipo] = useState('Constante')

  // ================= ESTADOS Y VARIABLES FINANCIERAS =================
  const [PV] = useState<number>(250000) 
  const [pCI, setPCI] = useState<number>(15)
  const [NA, setNA] = useState<number>(10)
  const [frec, setFrec] = useState<number>(30)
  const NDxA = 360 

  // Ingresos del Cliente (ahora en estado para poder validarlos)
  const [ingresoMensual] = useState<number>(3000)
  const [ingresoFamiliar] = useState<number>(5200)

  const [costeNotarial, setCosteNotarial] = useState<number>(150)
  const [costeRegistral, setCosteRegistral] = useState<number>(200)
  const [tasacion, setTasacion] = useState<number>(80)
  const [comEstudio, setComEstudio] = useState<number>(100)
  const [comActivacion, setComActivacion] = useState<number>(0)

  const [ComPer, setComPer] = useState<number>(3)
  const [PortesPer, setPortesPer] = useState<number>(4)
  const [GasAdmPer, setGasAdmPer] = useState<number>(8)
  const [pSegDes, setPSegDes] = useState<number>(0.049) 
  const [pSegRie, setPSegRie] = useState<number>(0.400) 

  const [COK, setCOK] = useState<number>(20) 
  
  const [teaConstante, setTeaConstante] = useState<number>(9.0) 
  const [tasasVariables, setTasasVariables] = useState<TasaVariable[]>([{ rango: '1-12', rate: 9.0 }])

  const [graciaTotal, setGraciaTotal] = useState<string>('')
  const [graciaParcial, setGraciaParcial] = useState<string>('')
  const [graciaSin, setGraciaSin] = useState<string>('')

  // Estados de Validación
  const [validationError, setValidationError] = useState<string | null>(null)
  
  // Estados para Bonos
  const [bonoTipo, setBonoTipo] = useState<string>('')
  const [bonoError, setBonoError] = useState<string>('')

  // ================= ESTADOS PARA RESULTADOS =================
  const [cronogramaData, setCronogramaData] = useState<SimulationRow[]>([])
  const [resumenData, setResumenData] = useState<ResumenData>({})

  // ================= CÁLCULOS ESTÁTICOS BASE =================
  const GastosIni = costeNotarial + costeRegistral + tasacion + comEstudio + comActivacion
  const NCxA = frec > 0 ? Math.floor(NDxA / frec) : 0
  const N = NCxA * NA
  
  const Saldo = PV - (PV * (pCI / 100))
  const Prestamo = Saldo + GastosIni
  const pSegDesPer = (pSegDes / 100) / 30 * frec
  const SegRiePer = ((pSegRie / 100) * PV) / NCxA
  const COKi = Math.pow(1 + (COK / 100), frec / NDxA) - 1

  // ================= LÓGICA DE VALIDACIÓN DE BONOS =================
  const checkBonoRequirements = (tipo: string) => {
    if (tipo === 'BuenPagador') {
      if (PV < 68800 || PV > 362100) return 'El valor del inmueble debe estar entre S/68,800 y S/362,100.'
      if (ingresoMensual < 1000) return 'El ingreso mensual mínimo debe ser de S/1,000.'
      if (pCI < 7.5) return 'La cuota inicial debe ser de al menos 7.5%.'
      if (NA < 5) return 'No se puede pagar el crédito en menos de 5 años.'
    } else if (tipo === 'FamiliarHabitacional') {
      if (PV > 136000) return 'El valor del inmueble no puede superar los S/136,000.'
      if (ingresoFamiliar > 3715) return 'El ingreso familiar no puede superar los S/3,715.'
      if (ingresoMensual < 350) return 'El ingreso mensual mínimo debe ser de S/350.'
    }
    return ''
  }

  const handleBonoSelect = (tipo: string) => {
    // Si da click en el mismo que ya está seleccionado, lo deselecciona
    if (bonoTipo === tipo) {
      setBonoTipo('')
      setBonoError('')
      return
    }

    const error = checkBonoRequirements(tipo)
    if (error) {
      setBonoTipo('')
      setBonoError(error)
    } else {
      setBonoTipo(tipo)
      setBonoError('')
    }
  }

  // Re-validar si cambian los valores financieros mientras un bono está seleccionado
  useEffect(() => {
    if (bonoTipo) {
      const error = checkBonoRequirements(bonoTipo)
      if (error) {
        setBonoTipo('')
        setBonoError(`Bono desactivado: ${error}`)
      }
    }
  }, [PV, pCI, NA, ingresoMensual, ingresoFamiliar])


  // ================= LÓGICA DE VALIDACIÓN Y VECTORES =================
  useEffect(() => {
    if (N > 0) {
      setGraciaSin(`1-${N}`)
      setGraciaTotal('')
      setGraciaParcial('')
    }
  }, [N])

  const parseRangesToSet = (inputStr: string, maxN: number, existingSet: Set<number> = new Set()) => {
    const newSet = new Set<number>()
    let hasError = false
    let errorMessage = ''
    if (!inputStr) return { set: newSet, hasError, errorMessage }

    const ranges = inputStr.split(',')
    for (const range of ranges) {
      if (range.includes('-')) {
        const [start, end] = range.split('-')
        const s = parseInt(start.trim())
        const e = parseInt(end.trim())
        
        if (isNaN(s) || isNaN(e)) {
           hasError = true; errorMessage = "Formato de rango inválido."
        } else if (s < 1 || e > maxN) {
           hasError = true; errorMessage = `Rango fuera de límites (1-${maxN}).`
        } else if (s > e) {
           hasError = true; errorMessage = "El inicio del rango debe ser menor o igual al fin."
        } else {
          for (let i = s; i <= e; i++) {
            if (existingSet.has(i) || newSet.has(i)) { 
                hasError = true; 
                errorMessage = `El periodo ${i} se superpone.`
            }
            newSet.add(i)
          }
        }
      } else {
        const s = parseInt(range.trim())
        if (isNaN(s)) {
            hasError = true; errorMessage = "Formato inválido."
        } else if (s < 1 || s > maxN) {
           hasError = true; errorMessage = `Periodo fuera de límites (1-${maxN}).`
        } else {
          if (existingSet.has(s) || newSet.has(s)) { 
              hasError = true; 
              errorMessage = `El periodo ${s} se superpone.` 
          }
          newSet.add(s)
        }
      }
    }
    return { set: newSet, hasError, errorMessage }
  }

  // Validar en tiempo real (Vectores y Gracia)
  useEffect(() => {
     let currentError = null;

     const usedG = new Set<number>()
     const tr = parseRangesToSet(graciaTotal, N, usedG)
     tr.set.forEach(p => usedG.add(p))
     const pr = parseRangesToSet(graciaParcial, N, usedG)
     pr.set.forEach(p => usedG.add(p))
     const sr = parseRangesToSet(graciaSin, N, usedG)
     
     if (tr.hasError) currentError = `Gracia TOTAL: ${tr.errorMessage}`
     else if (pr.hasError) currentError = `Gracia PARCIAL: ${pr.errorMessage}`
     else if (sr.hasError) currentError = `Gracia SIN: ${sr.errorMessage}`

     if (!currentError && tasaTipo === 'Variable') {
       const usedT = new Set<number>()
       for (const tv of tasasVariables) {
          const res = parseRangesToSet(tv.rango, N, usedT)
          if (res.hasError) {
              currentError = `Tasa Variable: ${res.errorMessage}`
              break;
          }
          res.set.forEach(p => usedT.add(p))
       }
     }

     setValidationError(currentError)

  }, [graciaTotal, graciaParcial, graciaSin, tasasVariables, tasaTipo, N])

  const handleAddTasaVariable = () => {
    setTasasVariables([...tasasVariables, { rango: '', rate: '' }])
  }
  const handleUpdateTasaVariable = (index: number, field: keyof TasaVariable, value: string) => {
    const newTasas = [...tasasVariables]
    newTasas[index][field] = value
    setTasasVariables(newTasas)
  }
  const handleRemoveTasaVariable = (index: number) => {
    const newTasas = [...tasasVariables]
    newTasas.splice(index, 1)
    setTasasVariables(newTasas)
  }

  const tasas = useMemo(() => {
    if (N <= 0) return []
    if (tasaTipo === 'Constante') {
      return Array(N).fill(teaConstante / 100)
    } else {
      const vectorTasas = Array(N).fill(0)
      const usedPeriods = new Set<number>()
      
      tasasVariables.forEach(tv => {
        const r = parseFloat(String(tv.rate))
        const { set: periods } = parseRangesToSet(tv.rango, N, usedPeriods)
        
        periods.forEach(p => {
          vectorTasas[p - 1] = r / 100
          usedPeriods.add(p)
        })
      })
      return vectorTasas
    }
  }, [N, teaConstante, tasaTipo, tasasVariables])

  const periodosGracia = useMemo(() => {
    if (N <= 0) return []
    const vectorGracia = Array(N).fill('S')
    const usedPeriods = new Set<number>()

    const totalRes = parseRangesToSet(graciaTotal, N, usedPeriods)
    totalRes.set.forEach(p => { vectorGracia[p - 1] = 'T'; usedPeriods.add(p) })

    const parcialRes = parseRangesToSet(graciaParcial, N, usedPeriods)
    parcialRes.set.forEach(p => { vectorGracia[p - 1] = 'P'; usedPeriods.add(p) })

    const sinRes = parseRangesToSet(graciaSin, N, usedPeriods)
    sinRes.set.forEach(p => { vectorGracia[p - 1] = 'S'; usedPeriods.add(p) })

    return vectorGracia
  }, [N, graciaTotal, graciaParcial, graciaSin])

  // ================= LÓGICA CORE: GENERAR CRONOGRAMA =================
  const handleGenerarSimulacion = () => {
    if (validationError) return;

    const cronograma: SimulationRow[] = []
    const flujos: number[] = []
    
    let tIntereses = 0, tAmortizacion = 0, tSegDesgravamen = 0
    let tSegRiesgo = 0, tComisiones = 0, tPortesGastosAdm = 0

    cronograma.push({
      NC: 0, TEA: null, TEP: null, PG: null, SI: null, I: null, Cuota: null,
      A: null, SegDes: null, SegRie: null, Comision: null, Portes: null,
      GasAdm: null, SF: null, Flujo: Prestamo
    })
    flujos.push(Prestamo)

    let saldoPrevio = 0

    for (let i = 1; i <= N; i++) {
      const idx = i - 1
      const TEA = tasas[idx] || 0
      const PG = periodosGracia[idx] || 'S'
      
      const TEP = Math.pow(1 + TEA, frec / NDxA) - 1
      
      let SI = 0
      if (i === 1) {
        SI = Prestamo
      } else if (i <= N) {
        SI = saldoPrevio
      }

      const I = -SI * TEP
      const SegDes = -SI * pSegDesPer
      const SegRie = -SegRiePer
      const Comision = -ComPer
      const Portes = -PortesPer
      const GasAdm = -GasAdmPer

      let Cuota = 0
      if (PG === 'T') {
        Cuota = 0
      } else if (PG === 'P') {
        Cuota = I
      } else {
        Cuota = PMT(TEP + pSegDesPer, N - i + 1, SI)
      }

      let A = 0
      if (PG === 'T' || PG === 'P') {
        A = 0
      } else {
        A = Cuota - I - SegDes
      }

      let SF = 0
      if (PG === 'T') {
        SF = SI - I
      } else {
        SF = SI + A
      }
      
      saldoPrevio = SF

      const extraFlujo = (PG === 'T' || PG === 'P') ? SegDes : 0
      const Flujo = Cuota + SegRie + Comision + Portes + GasAdm + extraFlujo
      
      flujos.push(Flujo)

      cronograma.push({
        NC: i, TEA, TEP, PG, SI, I, Cuota, A,
        SegDes, SegRie, Comision, Portes, GasAdm, SF, Flujo
      })

      tIntereses += Math.abs(I)
      tAmortizacion += Math.abs(A)
      tSegDesgravamen += Math.abs(SegDes)
      tSegRiesgo += Math.abs(SegRie)
      tComisiones += Math.abs(Comision)
      tPortesGastosAdm += Math.abs(Portes + GasAdm)
    }

    const tir = IRR(flujos, 0.01)
    const tcea = Math.pow(1 + tir, NCxA) - 1
    const van = NPV(COKi, flujos)

    setCronogramaData(cronograma)
    setResumenData({
      Saldo, Prestamo, NCxA, N, pSegDesPer, SegRiePer, COKi,
      tIntereses, tAmortizacion, tSegDesgravamen, tSegRiesgo,
      tComisiones, tPortesGastosAdm, tir, tcea, van
    })
    
    setActiveTab('resultados')
  }

  const fmt = (num: number | null | undefined): string => typeof num === 'number' ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''
  const fmtPct = (num: number | null | undefined): string => typeof num === 'number' ? (num * 100).toLocaleString('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 }) + '%' : ''

  const frecuenciaOptions = [
    { label: 'Diaria', value: 1 }, { label: 'Quincenal', value: 15 },
    { label: 'Mensual', value: 30 }, { label: 'Bimestral', value: 60 },
    { label: 'Trimestral', value: 90 }, { label: 'Cuatrimestral', value: 120 },
    { label: 'Semestral', value: 180 }, { label: 'Anual', value: 360 },
  ]

  return (
    <div className="space-y-6 relative max-w-5xl mx-auto">
      {/* CABECERA */}
      <header className="flex items-center justify-between border-b border-[rgba(12,8,41,0.1)] pb-4">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
            Simulación
          </h1>
          <div className="flex bg-white/40 p-1 rounded-full border border-white/60 shadow-sm backdrop-blur-md shrink-0">
            <button className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'datos' ? 'bg-gradient-to-r from-[#FF8400] to-[#FFA909] text-white shadow-md' : 'text-[rgba(12,8,41,0.6)] hover:bg-white/50'}`} onClick={() => setActiveTab('datos')}>Datos</button>
            <button className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'resultados' ? 'bg-gradient-to-r from-[#FF8400] to-[#FFA909] text-white shadow-md' : 'text-[rgba(12,8,41,0.6)] hover:bg-white/50'}`} onClick={() => setActiveTab('resultados')}>Resultados</button>
          </div>
        </div>
        <button type="button" className="rounded-full text-xs font-bold tracking-wide px-6 py-2.5 transition-transform hover:scale-[1.02] shrink-0" style={{background: 'linear-gradient(145deg, rgba(230,150,140,0.95) 0%, rgba(245,185,170,0.95) 100%)', color: '#FFFFFF', boxShadow: '0 4px 15px rgba(226,164,153,0.3)'}} onClick={() => setActiveTab('datos')}>+ Nueva Simulación</button>
      </header>

      {/* ================= PESTAÑA 1: DATOS ================= */}
      <section className={`space-y-6 transition-all duration-300 ${activeTab === 'datos' ? 'block animate-in fade-in slide-in-from-left-4' : 'hidden'}`}>
        <div className="grid gap-5 lg:grid-cols-3">
          <Panel variant="pink" title="Datos Principales">
            <div className="space-y-4">
              <div className="space-y-2">
                <Select label="Cliente" options={[{label: 'Juan Pérez', value: '1'}]} value="1" onChange={()=>{}} />
                <div className="px-2 space-y-1">
                  <SummaryRow label="Ingreso Mensual" value={`S/ ${fmt(ingresoMensual)}`} />
                  <SummaryRow label="Ingreso Familiar" value={`S/ ${fmt(ingresoFamiliar)}`} />
                </div>
              </div>
              <hr className="border-t border-white/50" />
              <div className="space-y-2">
                <Select label="Inmueble" options={[{label: 'Edificio ABC', value: 'abc'}]} value="abc" onChange={()=>{}} />
                <div className="px-2">
                  <SummaryRow label="Precio de Venta (PV)" value={`S/ ${PV.toLocaleString('en-US', {minimumFractionDigits: 2})}`} />
                </div>
              </div>
            </div>
          </Panel>

          <Panel variant="yellow" title="Datos del Préstamo">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="% Cuota Inicial" type="number" value={pCI} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPCI(Number(e.target.value))} suffix="%" />
                <div className="flex flex-col justify-end pb-2">
                  <SummaryRow label="Cuota Inicial:" value={`S/ ${((PV * pCI) / 100).toLocaleString('en-US', {minimumFractionDigits: 2})}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select label="Frecuencia de pago" options={frecuenciaOptions} value={frec} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFrec(Number(e.target.value))}/>
                <Input label="Nº de Años" type="number" value={NA} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNA(Number(e.target.value))} />
              </div>
              <p className="text-[10px]" style={{ color: 'rgba(12,8,41,0.5)' }}>* Se considerarán {NDxA} días por año</p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Input label="Nº Cuotas por Año" type="number" value={NCxA} readOnly />
                <Input label="Nº Total de Cuotas (n)" type="number" value={N} readOnly />
              </div>
            </div>
          </Panel>

          <Panel variant="orange" title="Tasas y Bonos">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold" style={{ color: 'rgba(12,8,41,0.8)' }}>Tipo de Tasa</p>
                <div className="flex gap-4 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.7)' }}>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tasa" checked={tasaTipo === 'Constante'} onChange={() => setTasaTipo('Constante')} className="accent-[#E5A845]" /> Constante
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tasa" checked={tasaTipo === 'Variable'} onChange={() => setTasaTipo('Variable')} className="accent-[#E5A845]" /> Variable
                  </label>
                </div>
                {tasaTipo === 'Constante' ? (
                  <Input label="TEA" type="number" value={teaConstante} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeaConstante(Number(e.target.value))} suffix="%" />
                ) : (
                  <div className="space-y-3">
                    {tasasVariables.map((tv, idx) => (
                      <div key={idx} className="flex gap-2 items-end">
                        <div className="w-24"><Input label={idx === 0 ? "Rango" : ""} type="text" placeholder="Ej: 1-12" value={tv.rango} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateTasaVariable(idx, 'rango', e.target.value)} /></div>
                        <div className="flex-1"><Input label={idx === 0 ? "TEA" : ""} type="number" value={tv.rate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateTasaVariable(idx, 'rate', e.target.value)} suffix="%" /></div>
                        {idx > 0 && (<button type="button" onClick={() => handleRemoveTasaVariable(idx)} className="mb-2 text-red-400 font-black hover:text-red-600 px-1">✕</button>)}
                      </div>
                    ))}
                    <button type="button" onClick={handleAddTasaVariable} className="text-[10px] text-[#D98A36] font-bold">+ Agregar periodo</button>
                  </div>
                )}
              </div>
              
              <hr className="border-t border-white/50" />
              
              <div className="space-y-2 text-xs" style={{ color: 'rgba(12,8,41,0.7)' }}>
                <p className="font-semibold" style={{ color: 'rgba(12,8,41,0.8)' }}>Bono</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="bono" className="accent-[#E5A845]" checked={bonoTipo === 'BuenPagador'} onChange={() => handleBonoSelect('BuenPagador')} /> 
                  Bono del Buen Pagador
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="bono" className="accent-[#E5A845]" checked={bonoTipo === 'FamiliarHabitacional'} onChange={() => handleBonoSelect('FamiliarHabitacional')} /> 
                  Bono Familiar Habitacional
                </label>
                
                {/* Mensaje de Error de Bono (Si no cumple requisitos) */}
                {bonoError && (
                  <p className="text-[10px] text-red-500 font-bold leading-tight pt-1">
                    {bonoError}
                  </p>
                )}
                
                <div className="pt-1">
                  <SummaryRow label="Monto del Bono:" value={bonoTipo ? "S/ 7,800.00" : "S/ 0.00"} />
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel variant="yellow" title="Costes y Gastos">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/40 pb-1">
                  <h4 className="text-[11px] font-bold uppercase" style={{ color: 'rgba(12,8,41,0.5)' }}>Iniciales</h4>
                  <span className="text-[10px] font-bold" style={{ color: '#D98A36' }}>Total: {GastosIni}</span>
                </div>
                <div className="space-y-2">
                  <CostInput label="Notariales" value={costeNotarial} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCosteNotarial(Number(e.target.value))} />
                  <CostInput label="Registrales" value={costeRegistral} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCosteRegistral(Number(e.target.value))} />
                  <CostInput label="Tasación" value={tasacion} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTasacion(Number(e.target.value))} />
                  <CostInput label="Comis. estudio" value={comEstudio} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComEstudio(Number(e.target.value))} />
                  <CostInput label="Comis. activación" value={comActivacion} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComActivacion(Number(e.target.value))} />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase" style={{ color: 'rgba(12,8,41,0.5)' }}>Periódicos</h4>
                <div className="space-y-2">
                  <CostInput label="Comisión periódica" value={ComPer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComPer(Number(e.target.value))} />
                  <CostInput label="Portes" value={PortesPer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPortesPer(Number(e.target.value))} />
                  <CostInput label="Gastos Admin." value={GasAdmPer} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGasAdmPer(Number(e.target.value))} />
                  <CostInput label="% Seguro desgrav." value={pSegDes} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPSegDes(Number(e.target.value))} suffix="%" />
                  <CostInput label="% Seguro riesgo" value={pSegRie} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPSegRie(Number(e.target.value))} suffix="%" />
                </div>
                <div className="pt-3">
                  <h4 className="text-[11px] font-bold uppercase mb-2" style={{ color: 'rgba(12,8,41,0.5)' }}>Costo Oportunidad</h4>
                  <CostInput label="Tasa de desc." value={COK} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCOK(Number(e.target.value))} suffix="%" />
                </div>
              </div>
            </div>
          </Panel>

          <div className="space-y-5 flex flex-col justify-between">
            <Panel variant="pink" title="Periodos de Gracia">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2 text-center">
                  <span className="text-xs font-bold text-[#D98A36]">TOTAL</span>
                  <Input label="" placeholder="Ej: 1-2" value={graciaTotal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGraciaTotal(e.target.value)} />
                </div>
                <div className="space-y-2 text-center">
                  <span className="text-xs font-bold text-[#D98A36]">PARCIAL</span>
                  <Input label="" placeholder="Ej: 3-4" value={graciaParcial} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGraciaParcial(e.target.value)} />
                </div>
                <div className="space-y-2 text-center">
                  <span className="text-xs font-bold text-[#D98A36]">SIN</span>
                  <Input label="" placeholder={`Ej: 5-${N}`} value={graciaSin} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGraciaSin(e.target.value)} />
                </div>
              </div>
            </Panel>
            
            <div className="space-y-2">
              {validationError && (
                <p className="text-xs text-red-500 font-semibold px-2 bg-red-50 p-2 rounded-lg border border-red-200">
                  {validationError}
                </p>
              )}
              <button
                type="button"
                onClick={handleGenerarSimulacion}
                disabled={!!validationError}
                className={`w-full rounded-2xl text-sm font-bold tracking-wide py-4 transition-all ${validationError ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
                style={validationError ? {} : { background: 'linear-gradient(145deg, rgba(230,150,140,0.95) 0%, rgba(245,185,170,0.95) 100%)', color: '#FFFFFF', boxShadow: '0 8px 20px rgba(226,164,153,0.35)'}}
              >
                Generar Simulación
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PESTAÑA 2: RESULTADOS ================= */}
      <section className={`space-y-6 transition-all duration-300 ${activeTab === 'resultados' ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IndicatorCard label="Tasa de Descuento" value={`${fmtPct(resumenData.COKi)}`} />
          <IndicatorCard label="TIR de la Operación" value={`${fmtPct(resumenData.tir)}`} />
          <IndicatorCard label="TCEA de la Operación" value={`${fmtPct(resumenData.tcea)}`} />
          <IndicatorCard label="VAN de la Operación" value={`S/ ${fmt(resumenData.van)}`} />
        </div>
        
        <Panel variant="yellow" title="Resumen del Financiamiento">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            <div className="space-y-5">
              <SummarySection title="Datos Generales">
                <SummaryItem label="Cliente" value="Juan Pérez" />
                <SummaryItem label="Inmueble" value="Edificio ABC" />
                <SummaryItem label="Bono aplicado" value={bonoTipo === 'BuenPagador' ? "Bono del Buen Pagador" : bonoTipo === 'FamiliarHabitacional' ? "Bono Familiar Habitacional" : "Ninguno"} />
              </SummarySection>
              <SummarySection title="Del Préstamo">
                <SummaryItem label="Precio de Venta" value={fmt(PV)} />
                <SummaryItem label="% Cuota Inicial" value={`${pCI}%`} />
                <SummaryItem label="Nº de Años" value={NA.toString()} />
                <SummaryItem label="Frecuencia de pago" value={frec.toString()} />
                <SummaryItem label="Nº de días por año" value={NDxA.toString()} />
              </SummarySection>
            </div>
            <div className="space-y-5">
              <SummarySection title="De los Costes/Gastos Iniciales">
                <SummaryItem label="Costes Notariales" value={fmt(costeNotarial)} />
                <SummaryItem label="Costes Registrales" value={fmt(costeRegistral)} />
                <SummaryItem label="Tasación" value={fmt(tasacion)} />
                <SummaryItem label="Comisión de estudio" value={fmt(comEstudio)} />
                <SummaryItem label="Comisión activación" value={comActivacion === 0 ? '-' : fmt(comActivacion)} />
              </SummarySection>
              <SummarySection title="De los Costes/Gastos Periódicos">
                <SummaryItem label="Comisión periódica" value={fmt(ComPer)} />
                <SummaryItem label="Portes" value={fmt(PortesPer)} />
                <SummaryItem label="Gastos de Administración" value={fmt(GasAdmPer)} />
                <SummaryItem label="% Seguro desgravamen" value={`${pSegDes}%`} />
                <SummaryItem label="% Seguro riesgo" value={`${pSegRie}%`} />
                <SummaryItem label="% Seguro desgrav. per." value={`${fmtPct(resumenData.pSegDesPer)}`} />
                <SummaryItem label="Seguro riesgo" value={fmt(resumenData.SegRiePer)} />
              </SummarySection>
            </div>
            <div className="space-y-5">
              <SummarySection title="Del Financiamiento y Oportunidad">
                <SummaryItem label="Tasa de descuento" value={`${COK}%`} />
                <SummaryItem label="Saldo a financiar" value={fmt(resumenData.Saldo)} />
                <SummaryItem label="Monto del préstamo" value={fmt(resumenData.Prestamo)} />
                <SummaryItem label="Nº Cuotas por Año" value={resumenData.NCxA?.toString() || ''} />
                <SummaryItem label="Nº Total de Cuotas" value={resumenData.N?.toString() || ''} />
              </SummarySection>
              <SummarySection title="Totales de la Operación">
                <SummaryItem label="Intereses" value={fmt(resumenData.tIntereses)} />
                <SummaryItem label="Amortización del capital" value={fmt(resumenData.tAmortizacion)} />
                <SummaryItem label="Seguro de desgravamen" value={fmt(resumenData.tSegDesgravamen)} />
                <SummaryItem label="Seguro contra todo riesgo" value={fmt(resumenData.tSegRiesgo)} />
                <SummaryItem label="Comisiones periódicas" value={fmt(resumenData.tComisiones)} />
                <SummaryItem label="Portes / Gastos adm." value={fmt(resumenData.tPortesGastosAdm)} />
              </SummarySection>
            </div>
          </div>
        </Panel>

        <div className="space-y-3">
          <h2 className="text-sm font-bold tracking-tight px-2" style={{ color: miimboColors.brand.midnight }}>
            Cronograma de Pagos Detallado
          </h2>
          <SimulationTable data={cronogramaData} fmt={fmt} fmtPct={fmtPct} />
        </div>
      </section>
    </div>
  )
}

/* ================= COMPONENTES SECUNDARIOS ================= */

type SimulationTableProps = {
  data: SimulationRow[];
  fmt: (num: number | null | undefined) => string;
  fmtPct: (num: number | null | undefined) => string;
}

function SimulationTable({ data, fmt, fmtPct }: SimulationTableProps) {
  const headers = ['NC', 'TEA', "i'=TEP=TEM", 'P.G.', 'Saldo Inicial', 'Interés', 'Cuota (inc. Seg)', 'Amort.', 'Seg. Desgrav.', 'Seg. Riesgo', 'Comisión', 'Portes', 'Gastos Adm.', 'Saldo Final', 'Flujo']

  const getColorClass = (val: number | null) => {
    if (val === null) return ''
    return val < 0 ? 'text-red-500/90 font-medium' : 'text-blue-600/90 font-medium'
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/70 shadow-sm backdrop-blur-xl" style={{ background: 'linear-gradient(145deg, rgba(255,132,0,0.1) 0%, rgba(255,240,225,0.5) 100%)', maxHeight: '600px' }}>
      <table className="min-w-[1200px] w-full border-collapse text-[10px]">
        <thead className="font-bold text-center border-b border-white/50 sticky top-0 backdrop-blur-md z-10" style={{ backgroundColor: 'rgba(255,230,205,0.9)', color: miimboColors.brand.midnight }}>
          <tr>
            {headers.map((h, i) => <th key={i} className={`px-2 py-3 ${i === 0 || i === 3 ? 'text-center' : 'text-right'}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody className="text-right">
          {data.map((row, i) => (
            <tr key={i} className="border-b border-white/40 last:border-0 hover:bg-white/40 transition-colors" style={{ color: 'rgba(12,8,41,0.85)' }}>
              <td className="px-2 py-2.5 text-center font-bold">{row.NC}</td>
              <td className="px-2 py-2.5">{fmtPct(row.TEA)}</td>
              <td className="px-2 py-2.5">{fmtPct(row.TEP)}</td>
              <td className="px-2 py-2.5 text-center font-bold text-[#D98A36]">{row.PG || ''}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.SI)}`}>{fmt(row.SI)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.I)}`}>{fmt(row.I)}</td>
              <td className="px-2 py-2.5 font-bold text-[#D98A36]">{fmt(row.Cuota)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.A)}`}>{fmt(row.A)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.SegDes)}`}>{fmt(row.SegDes)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.SegRie)}`}>{fmt(row.SegRie)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.Comision)}`}>{fmt(row.Comision)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.Portes)}`}>{fmt(row.Portes)}</td>
              <td className={`px-2 py-2.5 ${getColorClass(row.GasAdm)}`}>{fmt(row.GasAdm)}</td>
              <td className={`px-2 py-2.5 font-bold ${getColorClass(row.SF)}`}>{fmt(row.SF)}</td>
              <td className={`px-2 py-2.5 font-bold ${getColorClass(row.Flujo)}`}>{fmt(row.Flujo)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type PanelProps = { title?: string; variant: 'pink' | 'yellow' | 'orange'; children: React.ReactNode }
function Panel({ title, variant, children }: PanelProps) {
  let background = ''
  if (variant === 'pink') background = 'linear-gradient(145deg, rgba(244,167,160,0.3) 0%, rgba(255,240,225,0.7) 100%)'
  else if (variant === 'yellow') background = 'linear-gradient(145deg, rgba(255,213,99,0.25) 0%, rgba(255,240,225,0.7) 100%)'
  else if (variant === 'orange') background = 'linear-gradient(145deg, rgba(255,132,0,0.15) 0%, rgba(255,240,225,0.7) 100%)'

  return (
    <section className="rounded-[24px] border border-white/70 px-6 py-5 shadow-[0_18px_45px_rgba(12,8,41,0.05)] backdrop-blur-xl relative" style={{ background }}>
      {title && <h2 className="mb-4 text-sm font-bold tracking-tight" style={{ color: miimboColors.brand.midnight }}>{title}</h2>}
      {children}
    </section>
  )
}

type InputProps = { label?: string; type?: string; placeholder?: string; value?: string | number; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; readOnly?: boolean; suffix?: string }
function Input({ label, type = 'text', placeholder, value, onChange, readOnly, suffix }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium shrink-0" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label && <span>{label}</span>}
      <div className="relative flex items-center">
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} readOnly={readOnly} className={`w-full rounded-xl border bg-white/60 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#D98A36]/50 focus:border-transparent transition-all backdrop-blur-sm ${readOnly ? 'opacity-70 bg-white/40 cursor-not-allowed' : ''}`} style={{ borderColor: 'rgba(255,255,255,0.8)', color: 'rgba(12,8,41,0.9)' }} />
        {suffix && <span className="absolute right-3 text-xs font-bold text-[rgba(12,8,41,0.5)]">{suffix}</span>}
      </div>
    </label>
  )
}

type CostInputProps = { label: string; value?: string | number; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; suffix?: string }
function CostInput({ label, value, onChange, suffix }: CostInputProps) {
  return (
    <div className="flex justify-between items-center text-[11px] gap-2">
      <span className="shrink" style={{ color: 'rgba(12,8,41,0.7)' }}>{label}</span>
      <div className="relative flex items-center w-20 shrink-0">
        <input type="number" value={value} onChange={onChange} className="w-full text-right bg-white/70 border border-white/80 outline-none font-bold focus:ring-2 focus:ring-[#D98A36]/50 rounded-lg px-2 py-1 shadow-sm transition-all" style={{ color: 'rgba(12,8,41,0.9)', paddingRight: suffix ? '1.2rem' : '0.5rem' }} />
        {suffix && <span className="absolute right-1 text-[10px] font-bold text-[rgba(12,8,41,0.5)]">{suffix}</span>}
      </div>
    </div>
  )
}

type SelectOption = { label: string; value: string | number }
type SelectProps = { label: string; options: SelectOption[]; value?: string | number; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }
function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium" style={{ color: 'rgba(12,8,41,0.8)' }}>
      {label}
      <select value={value} onChange={onChange} className="rounded-xl border bg-white/60 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#D98A36]/50 focus:border-transparent appearance-none backdrop-blur-sm" style={{ borderColor: 'rgba(255,255,255,0.8)', color: 'rgba(12,8,41,0.9)' }}>
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </label>
  )
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p className="flex justify-between items-center text-[11px]">
      <span style={{ color: 'rgba(12,8,41,0.6)' }}>{label}</span>
      <span className="font-bold" style={{ color: '#D98A36' }}>{value}</span>
    </p>
  )
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[10px] font-bold uppercase mb-2 border-b border-white/40 pb-1" style={{ color: 'rgba(12,8,41,0.5)' }}>{title}</h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-[11px] pb-1 gap-2">
      <span className="shrink" style={{ color: 'rgba(12,8,41,0.7)' }}>{label}</span>
      <span className="font-bold text-right shrink-0" style={{ color: 'rgba(12,8,41,0.9)' }}>{value}</span>
    </div>
  )
}

function IndicatorCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-white/80 p-4 text-center shadow-[0_12px_30px_rgba(12,8,41,0.06)] backdrop-blur-md transition-transform hover:-translate-y-1" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(253,235,218,0.9) 100%)' }}>
      <p className="text-[10px] uppercase font-bold text-[rgba(12,8,41,0.5)] tracking-wider truncate">{label}</p>
      <p className="text-xl font-black mt-1" style={{ color: '#D98A36' }}>{value}</p>
    </div>
  )
}