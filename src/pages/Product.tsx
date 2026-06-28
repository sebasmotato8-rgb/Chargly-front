import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCT } from '../data/product'

type GalleryItem = { type: 'video'; src: string } | { type: 'image'; src: string }

function buildGallery(): GalleryItem[] {
  const items: GalleryItem[] = []
  if (PRODUCT.videos) {
    for (const v of PRODUCT.videos) items.push({ type: 'video', src: v })
  }
  for (const img of PRODUCT.images) items.push({ type: 'image', src: img })
  return items
}

const GALLERY = buildGallery()

export default function Product() {
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const navigate = useNavigate()
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!thumbRef.current) return
    const btn = thumbRef.current.children[selected] as HTMLElement | undefined
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [selected])

  function handleAdd() {
    addItem(PRODUCT, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addItem(PRODUCT, qty)
    navigate('/cart')
  }

  const current = GALLERY[selected]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* ── Gallery ── */}
          <div>
            <div
              className="mb-4 cursor-pointer overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100"
              onClick={() => setLightbox(selected)}
            >
              {current.type === 'video' ? (
                <video
                  src={current.src}
                  controls
                  playsInline
                  className="mx-auto h-80 w-full object-contain sm:h-[420px]"
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <img
                  src={current.src}
                  alt={PRODUCT.name}
                  className="mx-auto h-80 w-full object-contain p-4 sm:h-[420px]"
                />
              )}
            </div>

            {/* Thumbnail strip */}
            <div ref={thumbRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {GALLERY.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-xl border-2 bg-zinc-50 transition-colors ${
                    i === selected ? 'border-accent-500' : 'border-zinc-100 hover:border-zinc-300'
                  }`}
                  style={{ width: 72, height: 72 }}
                >
                  {item.type === 'video' ? (
                    <>
                      <video src={item.src} muted className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <svg className="h-5 w-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <img src={item.src} alt="" className="h-full w-full object-contain p-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Info ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-500 mb-2">{PRODUCT.brand}</p>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">{PRODUCT.name}</h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <span className="text-sm text-zinc-400">(127 reseñas)</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold">${PRODUCT.price}</span>
              <span className="text-lg text-zinc-400 line-through">${PRODUCT.comparePrice}</span>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">-50%</span>
            </div>

            <p className="mt-6 text-sm text-zinc-500 leading-relaxed">{PRODUCT.description}</p>

            {/* Quantity + Buttons */}
            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-500">Cantidad</label>
                <div className="inline-flex items-center rounded-xl border border-zinc-200">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >−</button>
                  <span className="w-12 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-2.5 text-zinc-400 hover:text-zinc-700 transition-colors"
                  >+</button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-full bg-accent-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 hover:scale-[1.01] active:scale-100"
                >
                  Comprar ahora — ${(PRODUCT.price * qty).toFixed(2)}
                </button>
                <button
                  onClick={handleAdd}
                  className={`flex-1 rounded-full border-2 py-3.5 text-sm font-bold transition-all ${
                    added
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
                  }`}
                >
                  {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: '🚚', label: 'Envío gratis' },
                { icon: '🛡️', label: 'Garantía 30d' },
                { icon: '🔒', label: 'Pago seguro' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1 rounded-xl bg-zinc-50 p-3 text-center">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-[11px] font-medium text-zinc-500">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Features list ── */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold mb-5">Características</h2>
            <ul className="space-y-3">
              {PRODUCT.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-zinc-600">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-5">Especificaciones técnicas</h2>
            <div className="rounded-2xl border border-zinc-100 overflow-hidden">
              {Object.entries(PRODUCT.specs).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex justify-between gap-4 px-5 py-3 text-sm ${
                    i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'
                  }`}
                >
                  <span className="font-medium text-zinc-500">{key}</span>
                  <span className="text-right text-zinc-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev / Next */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1) }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          {lightbox < GALLERY.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1) }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          <div className="max-h-[85vh] max-w-[90vw]" onClick={e => e.stopPropagation()}>
            {GALLERY[lightbox].type === 'video' ? (
              <video
                src={GALLERY[lightbox].src}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] max-w-[90vw] rounded-xl"
              />
            ) : (
              <img
                src={GALLERY[lightbox].src}
                alt={PRODUCT.name}
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
              />
            )}
          </div>

          <div className="absolute bottom-4 text-sm text-white/60">
            {lightbox + 1} / {GALLERY.length}
          </div>
        </div>
      )}
    </div>
  )
}
