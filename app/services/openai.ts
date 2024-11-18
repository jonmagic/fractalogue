import axios from 'axios'

const apiBase = 'https://api.openai.com/v1'

interface ChatMessage {
  role: string
  content: string
}

interface ChatArgs {
  messages: Array<ChatMessage>
}

interface OpenAIResponse {
  data: {
    choices: Array<{
      message: ChatReturn
    }>
  }
}

interface ChatReturn {
  role: string
  content: string
}

export async function chatWithOpenAI({
  messages,
}: ChatArgs): Promise<ChatReturn> {
  const apiKey = import.meta.env.OPENAI_API_KEY

  try {
    const response: OpenAIResponse = await axios.post(
      `${apiBase}/chat/completions`,
      {
        model: 'gpt-4o',
        messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    )
    return response.data.choices[0].message
  } catch (error) {
    console.error('Error communicating with OpenAI:', error)
    throw error
  }
}
