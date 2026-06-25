export interface ChatResponse {
  reply: string
  conversation_id: string
  escalated: boolean
  usage: { input_tokens: number; output_tokens: number }
}

export interface ApiResponse<T> {
  success: true
  data: T
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}
