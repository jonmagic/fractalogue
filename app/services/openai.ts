import axios from 'axios'

const apiBase = 'https://api.openai.com/v1'

interface ChatMessage {
  role: string
  content: string
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

export async function chat(messages: Array<ChatMessage>): Promise<ChatReturn> {
  const apiKey = process.env.OPENAI_API_KEY

  try {
    const response: OpenAIResponse = await axios.post(
      `${apiBase}/chat/completions`,
      {
        model: 'gpt-4',
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
