import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react'
import { sendMessage } from '../api/chat'
import type { Message } from '../types'
import MessageBubble from './MessageBubble'

interface Props {
  onClose: () => void
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Soy BarberBot, tu asistente de Zac Barber. Puedo mostrarte servicios, precios o ayudarte a reservar una cita.',
}

export default function ChatWidget({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string>()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  const handleSend = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault()
      const text = input.trim()
      if (!text || loading) return

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
      }
      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setLoading(true)

      try {
        const res = await sendMessage(text, conversationId)
        setConversationId(res.conversation_id)
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: res.reply,
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content:
              'Lo siento, ocurrio un error. Puedes intentarlo de nuevo?',
          },
        ])
      } finally {
        setLoading(false)
        inputRef.current?.focus()
      }
    },
    [input, loading, conversationId],
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative flex h-full w-full flex-col overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl sm:h-[600px] sm:max-w-md sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm text-amber-400">
              &#9986;
            </div>
            <div>
              <p className="text-sm font-semibold">BarberBot</p>
              <p className="text-xs text-green-400">En linea</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xl leading-none text-zinc-500 transition-colors hover:text-white"
          >
            &#10005;
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {loading && (
            <div className="flex gap-1 px-4 py-2">
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-zinc-500"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-zinc-500"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="h-2 w-2 animate-bounce rounded-full bg-zinc-500"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex gap-2 border-t border-zinc-800 px-4 py-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={loading}
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 font-bold text-zinc-900 transition-colors hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500"
          >
            &#8593;
          </button>
        </form>
      </div>
    </div>
  )
}
