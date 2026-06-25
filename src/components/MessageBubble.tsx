import type { Message } from '../types'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-amber-500 text-zinc-900'
            : 'bg-zinc-800 text-zinc-100'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
