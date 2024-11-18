import type { FetcherWithComponents } from '@remix-run/react'
import { useState, useEffect } from 'react'

interface Message {
  role: string
  content: string
}

interface ChatProps {
  fetcher: FetcherWithComponents<Message>
}

function Chat({ fetcher }: ChatProps) {
  const [messages, setMessages] = useState<Array<Message>>([
    { role: 'system', content: 'You are a helpful assistant.' },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (fetcher.data) {
      // Check if fetcher.data is of type Message before updating state
      const newMessage = fetcher.data
      if (newMessage.role && newMessage.content) {
        setMessages((prev) => [...prev, newMessage])
      }
    }
  }, [fetcher.data])

  function handleSend() {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]

    setMessages(newMessages)
    setInput('')

    fetcher.submit(
      { messages: JSON.stringify(newMessages) },
      { method: 'post', encType: 'application/json' },
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chat with OpenAI</h1>
      </div>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50 shadow-md mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-2 rounded ${
              msg.role === 'user'
                ? 'bg-blue-100 text-blue-800 self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
