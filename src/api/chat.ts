import type { ApiResponse, ChatResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL
const SHOP_ID = import.meta.env.VITE_SHOP_ID

export async function sendMessage(
  message: string,
  conversationId?: string,
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/public/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-shop-id': SHOP_ID,
    },
    body: JSON.stringify({
      message,
      conversation_id: conversationId ?? null,
      channel: 'web_chat',
    }),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(
      (error as { error?: { message?: string } })?.error?.message ??
        `Error ${res.status}`,
    )
  }

  const json: ApiResponse<ChatResponse> = await res.json()
  return json.data
}
