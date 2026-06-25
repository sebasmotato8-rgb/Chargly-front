interface HeroProps {
  onOpenChat: () => void
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="max-w-lg space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Tu corte perfecto,{' '}
            <span className="text-amber-400">sin esperas</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Reserva tu cita con nuestro asistente virtual BarberBot. Rápido,
            fácil y disponible 24/7.
          </p>
        </div>
        <button
          onClick={onOpenChat}
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-lg font-semibold text-zinc-900 transition-colors hover:bg-amber-400"
        >
          Reservar ahora
        </button>
      </div>
    </main>
  )
}
