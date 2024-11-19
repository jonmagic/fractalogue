import { ActionFunction, MetaFunction } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'

import Chat from '~/components/chat'
import { chat } from '~/services/openai'

interface Message {
  role: string
  content: string
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Chat - Fractalogue' },
    {
      name: 'description',
      content: 'A conversational interface powered by OpenAI',
    },
  ]
}

// Action to handle OpenAI requests
export const action: ActionFunction = async ({ request }) => {
  const body = await request.json()
  const messages = JSON.parse(body.messages) as Array<Message>

  try {
    const reply = await chat(messages)
    return new Response(JSON.stringify(reply), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in action:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to communicate with OpenAI' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

export default function Index() {
  // Explicitly type the fetcher hook
  const fetcher = useFetcher<Message>()

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Chat fetcher={fetcher} />
    </div>
  )
}
