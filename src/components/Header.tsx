export default function Header() {
  return (
    <header className="border-b border-zinc-800 px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-amber-400">Zac</span> Barber
        </h1>
        <span className="text-xs uppercase tracking-widest text-zinc-500">
          Barbería Premium
        </span>
      </div>
    </header>
  )
}
