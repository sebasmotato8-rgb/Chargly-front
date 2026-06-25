import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero onOpenChat={() => setChatOpen(true)} />

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-2xl text-zinc-900 shadow-lg transition-colors hover:bg-amber-400"
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}

      {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
    </div>
  )
}
