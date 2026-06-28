import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCT } from '../data/product'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  const { addItem } = useCart()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      if (!heroImgRef.current) return
      heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function playVideo() {
    if (!videoRef.current) return
    videoRef.current.muted = false
    videoRef.current.play()
    setVideoPlaying(true)
  }

  const hasVideos = PRODUCT.videos && PRODUCT.videos.length > 0

  return (
    <div>

      {/* ═══ 1 · HERO — OSCURA ═══ */}
      <section className="relative flex h-screen min-h-[600px] items-center overflow-hidden bg-[#0D0D0D]">
        <div ref={heroImgRef} className="absolute inset-0">
          <img src={PRODUCT.images[0]} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.4) 100%)' }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-terra">
            Chargly&trade; &mdash; Power Bank Magn&eacute;tico
          </p>
          <h1 className="mt-5 font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.9] tracking-tight text-white">
            CARGA<br />SIN L&Iacute;MITES
          </h1>
          <div className="mt-5 h-px w-10 bg-terra" />
          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-[#aaaaaa] sm:text-lg">
            10,000mAh &middot; MagSafe 15W &middot; Compatible iPhone y Android
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/product" className="inline-flex items-center justify-center bg-terra px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all hover:bg-terra-dark">
              Comprar ahora
            </Link>
            <Link to="/product" className="inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/10">
              Ver producto
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <svg className="h-5 w-5 animate-[scrollBounce_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══ 2 · MÉTRICAS — CLARA ═══ */}
      <section className="bg-[#F5F2EE] py-20">
        <Reveal>
          <div className="mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-4">
            {[
              { value: '10,000', label: 'mAh' },
              { value: '15W', label: 'carga rápida' },
              { value: '30', label: 'días garantía' },
              { value: '2X', label: 'cargas iPhone' },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center py-6 ${i > 0 ? 'border-l border-[#D8D4CE]' : ''}`}>
                <span className="font-display text-5xl tracking-tight text-terra sm:text-6xl">{s.value}</span>
                <span className="mt-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#888880]">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ 3 · PRODUCTO ASIMÉTRICO — OSCURA ═══ */}
      <section className="bg-[#0D0D0D] py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[45%_55%] lg:gap-20">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-terra mb-6">
                &mdash; Dise&ntilde;o Premium
              </p>
              <h2 className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-[0.92] tracking-tight text-white">
                DELGADO COMO<br />UNA TARJETA
              </h2>
              <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-[#888888]">
                Dise&ntilde;ado para los que no se detienen.
                Tan delgado que lo olvidar&aacute;s en tu bolsillo,
                tan potente que nunca olvidar&aacute;s cargarlo.
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-6xl text-white">$29.99</span>
                <span className="text-sm font-light text-[#555555] line-through">$59.99</span>
              </div>
              <span className="mt-2 inline-block bg-terra px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                50% OFF
              </span>
              <div className="mt-8">
                <button
                  onClick={() => addItem(PRODUCT, 1)}
                  className="inline-flex items-center bg-terra px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all hover:bg-terra-dark"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <img src={PRODUCT.images[1]} alt={PRODUCT.name} className="w-full object-cover" />
              <div className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 80px rgba(13,13,13,0.5)' }} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 4 · GALERÍA EDITORIAL — CLARA ═══ */}
      <section className="bg-[#EEEBE6] py-24">
        <Reveal>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="font-display text-5xl tracking-tight text-[#1a1a1a] sm:text-6xl">LA COLECCI&Oacute;N</h2>
              <p className="mt-3 text-sm text-[#888880]">Disponible en m&uacute;ltiples colores y capacidades</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:grid-rows-2" style={{ gridTemplateRows: 'repeat(2, 280px)' }}>
              <Link to="/product" className="group relative row-span-2 overflow-hidden bg-[#FAFAF8]">
                <img src={PRODUCT.images[2]} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-terra/0 transition-colors duration-500 group-hover:bg-terra/[0.12]" />
              </Link>
              {PRODUCT.images.slice(3, 7).map((img, i) => (
                <Link key={i} to="/product" className="group relative overflow-hidden bg-[#FAFAF8]">
                  <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-terra/0 transition-colors duration-500 group-hover:bg-terra/[0.12]" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 5 · VIDEO — OSCURA ═══ */}
      {hasVideos && (
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0D0D0D]">
          <video
            ref={videoRef}
            src={PRODUCT.videos![0]}
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 transition-opacity duration-700 ${videoPlaying ? 'bg-[#0D0D0D]/30' : 'bg-[#0D0D0D]/55'}`} />

          {!videoPlaying && (
            <Reveal className="relative z-10 flex flex-col items-center text-center">
              <h2 className="font-display text-[clamp(3rem,8vw,5.5rem)] tracking-tight text-white">
                V&Eacute;LO EN ACCI&Oacute;N
              </h2>
              <button
                onClick={playVideo}
                className="mt-8 flex h-20 w-20 items-center justify-center border border-white/30 rounded-full transition-all hover:border-white hover:scale-110"
              >
                <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
              <p className="mt-6 text-sm font-light text-[#aaaaaa]">Sin cables. Sin l&iacute;mites.</p>
            </Reveal>
          )}
        </section>
      )}

      {/* ═══ 6 · FEATURES — CLARA ═══ */}
      <section className="bg-[#F5F2EE] py-24">
        <Reveal>
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-12 text-center font-display text-5xl tracking-tight text-[#1a1a1a] sm:text-6xl">
              POR QU&Eacute; CHARGLY
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Carga 15W', desc: 'La más rápida del mercado sin cables' },
                { icon: 'M4 8V6a6 6 0 0112 0v2h2a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h2zm6-4a4 4 0 00-4 4v2h8V6a4 4 0 00-4-4z', title: '10,000mAh', desc: 'Hasta 2 cargas completas de iPhone' },
                { icon: 'M12 2a4 4 0 00-4 4v8a4 4 0 008 0V6a4 4 0 00-4-4zM6 6v8a6 6 0 0012 0V6', title: 'MagSafe', desc: 'Adhesión magnética perfecta en iPhone 12-16' },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Garantía 30 días', desc: 'Sin preguntas, reembolso o reemplazo' },
              ].map(f => (
                <div key={f.title} className="border border-[#E0DCD6] bg-[#FAFAF8] p-6 rounded">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center">
                    <svg className="h-6 w-6 text-terra" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a]">{f.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-[#888880]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 7 · COMPATIBILIDAD — OSCURA ═══ */}
      <section className="bg-[#141414] py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-terra mb-4">
                Compatibilidad Universal
              </p>
              <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.92] tracking-tight text-white">
                FUNCIONA<br />CON TODO
              </h2>
              <ul className="mt-8 space-y-3">
                {[
                  'iPhone 12, 13, 14, 15, 16 — MagSafe',
                  'Android con Qi inalámbrico',
                  'Cualquier dispositivo USB-C',
                  'AirPods con carga inalámbrica',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#888888]">
                    <svg className="h-4 w-4 flex-shrink-0 text-terra" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/product"
                className="mt-10 inline-flex items-center border border-white/30 px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/10"
              >
                Ver especificaciones
              </Link>
            </div>
            <div>
              <img src={PRODUCT.images[7]} alt="Compatibilidad" className="w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 8 · REVIEWS — CLARA ═══ */}
      <section className="bg-[#EEEBE6] py-24">
        <Reveal>
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-14 text-center font-display text-5xl tracking-tight text-[#1a1a1a] sm:text-6xl">
              LO QUE DICEN
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { name: 'Carlos M.', city: 'Bogotá', text: 'Increíble. Lo llevo en el bolsillo todo el día y no lo noto. Carga perfectamente.' },
                { name: 'Valentina R.', city: 'Medellín', text: 'Llegó antes de lo esperado. El producto es exactamente como en las fotos.' },
                { name: 'Diego S.', city: 'Ciudad de México', text: 'Se adhiere solo al iPhone sin cables. Lo mejor que compré este año.' },
              ].map(r => (
                <div key={r.name} className="border border-[#E0DCD6] bg-[#FAFAF8] p-8 rounded">
                  <span className="font-display text-4xl leading-none text-terra">&ldquo;</span>
                  <div className="mt-2 flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 text-terra" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-[#555550] mb-6">&ldquo;{r.text}&rdquo;</p>
                  <div className="border-t border-[#E8E4DF] pt-4">
                    <p className="text-sm font-bold text-[#1a1a1a]">{r.name}</p>
                    <p className="text-[11px] text-[#888880] mt-0.5">{r.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 9 · CTA FINAL — OSCURA ═══ */}
      <section className="bg-gradient-to-b from-[#0D0D0D] to-zinc-900 py-40">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-terra mb-6">
            Oferta por tiempo limitado
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9] tracking-tight text-white">
            &iquest;LISTO PARA NUNCA<br />QUEDARTE SIN<br />BATER&Iacute;A?
          </h2>
          <p className="mt-6 text-base font-light text-[#888888]">
            $29.99 USD &mdash; Env&iacute;o gratis a todo el mundo
          </p>
          <Link
            to="/product"
            className="mt-10 inline-flex items-center gap-3 bg-white px-10 py-5 text-sm font-bold tracking-wider text-[#0D0D0D] uppercase transition-transform hover:scale-105"
          >
            Comprar ahora
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
