'use client'

import React from 'react'
import ChatItem from '../ChatItem'
import useChatMessages from '@hooks/useChatMessages'

const ChatBody: React.FC = () => {
  const { messages } = useChatMessages()

  return (
    <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto [&>*:nth-child(odd)]:bg-background">
      {messages.map((message) => (
        <ChatItem message={message} key={message.id} />
      ))}
    </div>
  )
}

export default ChatBody
