import { miimboColors } from '../theme/colors'

export function Home() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-semibold tracking-tight" style={{ color: miimboColors.brand.midnight }}>
          Actividad Actual
        </h1>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Clientes Registrados"
          value="56"
          buttonLabel="Nuevo cliente"
          tone="soft-rose"
        />
        <StatCard
          title="Propiedades Actuales"
          value="20"
          buttonLabel="Nueva propiedad"
          tone="soft-gold"
        />
        <StatCard
          title="Simulaciones Realizadas"
          value="60"
          buttonLabel="Nueva simulación"
          tone="soft-amber"
        />
      </section>
    </div>
  )
}

type Tone = 'soft-rose' | 'soft-gold' | 'soft-amber'

type StatCardProps = {
  title: string
  value: string
  buttonLabel: string
  tone: Tone
}

function getToneColors(tone: Tone) {
  switch (tone) {
    case 'soft-rose':
      return {
        bg: 'linear-gradient(145deg, rgba(255,133,0,0.04) 0%, #F9DFC6 55%, #FEFBF7 100%)',
        accent: '#F5B4A4',
      }
    case 'soft-gold':
      return {
        bg: 'linear-gradient(145deg, rgba(255,133,0,0.08) 0%, #F9DFC6 55%, #FEFBF7 100%)',
        accent: '#FFCF73',
      }
    case 'soft-amber':
      return {
        bg: 'linear-gradient(145deg, rgba(255,133,0,0.12) 0%, #F9DFC6 55%, #FEFBF7 100%)',
        accent: '#FFB347',
      }
    default:
      return {
        bg: miimboColors.gradients.cardSoft,
        accent: miimboColors.brand.sunrise,
      }
  }
}

function StatCard({ title, value, buttonLabel, tone }: StatCardProps) {
  const colors = getToneColors(tone)

  return (
    <article
      className="rounded-3xl px-5 py-4 shadow-[0_14px_35px_rgba(12,8,41,0.16)] border border-white/60 backdrop-blur-lg flex flex-col gap-3"
      style={{ backgroundImage: colors.bg }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-wide text-[rgba(12,8,41,0.6)] uppercase">
            {title.split(' ')[0]}
          </p>
          <p className="text-[13px] font-medium text-[rgba(12,8,41,0.75)]">
            {title.split(' ').slice(1).join(' ')}
          </p>
        </div>
        <div
          className="h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-semibold"
          style={{ backgroundColor: colors.accent, color: miimboColors.brand.midnight }}
        >
          {value}
        </div>
      </div>

      <button
        type="button"
        className="mt-auto inline-flex items-center justify-center rounded-full border text-[11px] font-medium px-4 py-1.5 tracking-wide"
        style={{
          borderColor: 'rgba(12,8,41,0.12)',
          color: 'rgba(12,8,41,0.7)',
          backgroundColor: 'rgba(254,251,247,0.9)',
        }}
      >
        {buttonLabel}
      </button>
    </article>
  )
}

