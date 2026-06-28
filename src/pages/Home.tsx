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
      { threshold: 0.15 },
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

const GALLERY_IMAGES = PRODUCT.images.slice(2, 8)

const REVIEWS = [
  { name: 'Carlos M.', text: 'Lo uso todos los días. Se pega magnéticamente y me da dos cargas completas. Increíble lo delgado que es.' },
  { name: 'Valentina R.', text: 'Llegó en 17 días, bien empacado. La carga magnética funciona perfecto con mi iPhone 15 Pro Max.' },
  { name: 'Diego S.', text: 'Lo compré para viajes. Cabe en el bolsillo del pantalón y carga más rápido que mi cargador de pared.' },
]

export default function Home() {
  const { addItem } = useCart()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (!heroRef.current) return
      const y = window.scrollY
      heroRef.current.style.transform = `translateY(${y * 0.3}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleAddToCart() {
    addItem(PRODUCT, 1)
  }

  function playVideo() {
    setVideoPlaying(true)
    videoRef.current?.play()
  }

  const hasVideos = PRODUCT.videos && PRODUCT.videos.length > 0

  return (
    <div className="bg-black text-white">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
        <div ref={heroRef} className="absolute inset-0">
          <img
            src={PRODUCT.images[0]}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <p className="mb-6 text-xs font-medium tracking-[0.3em] text-white/50 uppercase">
            Chargly&trade; &mdash; Nueva Colecci&oacute;n
          </p>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.9] tracking-tight">
            CARGA<br />SIN L&Iacute;MITES
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-white/60 sm:text-lg">
            El power bank magn&eacute;tico m&aacute;s delgado del mercado.
            10,000mAh en la palma de tu mano.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/product"
              className="inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-bold tracking-wider text-black uppercase transition-transform hover:scale-105"
            >
              Comprar ahora
            </Link>
            <Link
              to="/product"
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-white/10"
            >
              Ver producto
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
            <svg className="h-5 w-5 animate-[scrollBounce_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ 2. STATS BAR ═══ */}
      <section className="border-y border-white/10 bg-[#0a0a0a]">
        <Reveal>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
            {[
              { value: '10,000', label: 'mAh de capacidad' },
              { value: '15W', label: 'Carga inalámbrica' },
              { value: '30', label: 'Días de garantía' },
              { value: '2x', label: 'Cargas completas iPhone' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center py-10 sm:py-14">
                <span className="font-display text-5xl tracking-tight text-orange-500 sm:text-6xl">{s.value}</span>
                <span className="mt-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ 3. PRODUCTO HERO ═══ */}
      <section className="bg-black py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
            <div>
              <span className="inline-block border border-white/20 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 mb-6">
                Dise&ntilde;o Premium
              </span>
              <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
                Delgado como<br />una tarjeta.
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/50">
                Dise&ntilde;ado para los que no se detienen. Carga magn&eacute;tica de 15W sin cables,
                compatible con iPhone y Android.
              </p>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-4xl text-white">$29.99</span>
                <span className="text-sm font-light text-white/30 line-through">$59.99</span>
                <span className="text-xs font-medium uppercase tracking-wider text-orange-500">USD</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-bold tracking-wider text-black uppercase transition-transform hover:scale-105 active:scale-100"
              >
                Agregar al carrito
              </button>
            </div>
            <div className="relative">
              <img
                src={PRODUCT.images[1]}
                alt={PRODUCT.name}
                className="w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 4. GALERÍA EDITORIAL ═══ */}
      <section className="bg-[#0a0a0a] py-24">
        <Reveal>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-500">Galer&iacute;a</span>
                <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">Cada &aacute;ngulo importa</h2>
              </div>
              <Link to="/product" className="hidden text-xs font-medium uppercase tracking-wider text-white/40 transition-colors hover:text-white sm:block">
                Ver todos &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <Link
                  key={i}
                  to="/product"
                  className="group relative aspect-square overflow-hidden bg-zinc-900"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/80">Ver detalle &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 5. VIDEO DEMO ═══ */}
      {hasVideos && (
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={PRODUCT.videos![0]}
            muted={!videoPlaying}
            loop
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 transition-opacity duration-700 ${videoPlaying ? 'bg-black/30' : 'bg-black/70'}`} />

          {!videoPlaying && (
            <Reveal className="relative z-10 text-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Demo</span>
              <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-7xl">V&eacute;lo en acci&oacute;n</h2>
              <button
                onClick={playVideo}
                className="mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 transition-all hover:border-white hover:scale-110"
              >
                <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </Reveal>
          )}
        </section>
      )}

      {/* ═══ 6. COMPATIBILIDAD ═══ */}
      <section className="bg-[#0a0a0a] py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 lg:gap-20">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-500">Compatibilidad</span>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">
                Compatible con todos tus dispositivos
              </h2>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { label: 'iPhone', path: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
                  { label: 'Android', path: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
                  { label: 'USB-C', path: 'M12 3v1m0 16v1m-4-9h8M8 8h8a4 4 0 010 8H8a4 4 0 010-8z' },
                  { label: 'MagSafe', path: 'M12 2a4 4 0 00-4 4v8a4 4 0 008 0V6a4 4 0 00-4-4zM6 6v8a6 6 0 0012 0V6' },
                ].map(item => (
                  <div key={item.label} className="flex flex-col items-center gap-3 py-4">
                    <div className="flex h-14 w-14 items-center justify-center border border-white/10">
                      <svg className="h-6 w-6 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={PRODUCT.images[7]}
                alt="Compatibilidad"
                className="w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 7. REVIEWS ═══ */}
      <section className="bg-black py-24">
        <Reveal>
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-16">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-orange-500">Testimonios</span>
              <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">Lo que dicen nuestros clientes</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {REVIEWS.map(r => (
                <div key={r.name} className="border border-white/10 p-8 transition-colors hover:border-white/20">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-white/60 mb-6">&ldquo;{r.text}&rdquo;</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mt-0.5">Compra verificada</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 8. CTA FINAL ═══ */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-gradient-to-b from-black via-[#0a0a0a] to-zinc-900 py-24">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight">
            &iquest;LISTO PARA NUNCA<br />QUEDARTE SIN<br />BATER&Iacute;A?
          </h2>
          <p className="mx-auto mt-8 text-lg font-light text-white/40">
            $29.99 USD &mdash; Env&iacute;o gratis a todo el mundo
          </p>
          <Link
            to="/product"
            className="mt-10 inline-flex items-center gap-3 bg-white px-10 py-5 text-sm font-bold tracking-wider text-black uppercase transition-transform hover:scale-105"
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
